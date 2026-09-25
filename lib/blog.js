// Pulls the full essay from the live Legends blog (belegends.club/blog/<slug>) at build time
// and turns it into simple blocks rendered in the new design. Re-fetched every hour (ISR).
import { parse } from 'node-html-parser';

const ORIGIN = 'https://belegends.club';
const STOP = /^rooms where conversations like this/i; // promo block at the end of every essay
const abs = (u) => (!u ? u : u.startsWith('http') ? u : ORIGIN + (u.startsWith('/') ? u : '/' + u));
const clean = (s) => s.replace(/\s+/g, ' ').trim();

export async function getEssay(slug) {
  try {
    const res = await fetch(`${ORIGIN}/blog/${slug}`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return extract(await res.text());
  } catch {
    return null;
  }
}

// keep only simple inline formatting from the original paragraph
function safeInline(h) {
  return h
    .replace(/\s+/g, ' ')
    .replace(/<(\/?)(b|strong|i|em|br)(\s[^>]*)?>/gi, '<$1$2>')
    .replace(/<a\s[^>]*href="([^"]*)"[^>]*>/gi, (_, href) => `<a href="${abs(href)}" target="_blank" rel="noopener noreferrer">`)
    .replace(/<(?!\/?(b|strong|i|em|br|a)(\s|>|\/))[^>]*>/gi, '')
    .trim();
}

export function extract(html) {
  const root = parse(html);
  // pick the container with the most paragraphs (the article body)
  const candidates = root.querySelectorAll('article, main, [class*="article"], [class*="post"], [class*="content"], [class*="prose"], body');
  let box = null, best = 0;
  for (const c of candidates) {
    const n = c.querySelectorAll('p').length;
    if (n > best || (n === best && box && c.innerHTML.length < box.innerHTML.length)) { best = n; box = c; }
  }
  if (!box || best < 3) return null;

  const blocks = [];
  const seenImg = new Set();
  let started = false, stopped = false;
  const walk = (node) => {
    if (stopped || node.nodeType !== 1) return;
    const tag = node.tagName?.toLowerCase();
    if (['nav', 'header', 'footer', 'script', 'style', 'form', 'button', 'svg'].includes(tag)) return;
    if (tag === 'h1') return; // title is rendered by our own hero
    if (tag === 'h2' || tag === 'h3') {
      const t = clean(node.text);
      if (STOP.test(t)) { stopped = true; return; }
      if (t) { blocks.push({ [tag === 'h2' ? 'h' : 'h3']: t }); started = true; }
      return;
    }
    if (tag === 'blockquote') { const t = clean(node.text); if (t) blocks.push({ quote: t }); return; }
    if (tag === 'img') {
      const src = abs(node.getAttribute('src') || node.getAttribute('data-src'));
      if (src && !seenImg.has(src) && !/logo|avatar|icon/i.test(src)) {
        seenImg.add(src);
        const fig = node.closest('figure');
        const cap = fig?.querySelector('figcaption');
        blocks.push({ img: src, alt: node.getAttribute('alt') || '', caption: cap ? clean(cap.text) : '' });
      }
      return;
    }
    if (tag === 'figcaption') return;
    if (tag === 'ul' || tag === 'ol') {
      const items = node.querySelectorAll('li').map((li) => clean(li.text)).filter(Boolean);
      if (items.length) blocks.push({ list: items, ordered: tag === 'ol' });
      return;
    }
    if (tag === 'p') {
      const t = clean(node.text);
      // skip meta lines (date · read time) before the essay starts
      if (t && (started || t.length > 90)) { blocks.push({ p: safeInline(node.innerHTML), plain: t }); started = true; }
      return;
    }
    node.childNodes.forEach(walk);
  };
  walk(box);
  // the first image is usually the cover (rendered by our hero)
  return blocks.length > 3 ? blocks : null;
}
