import Script from 'next/script';

export default function Home() {
  return (
    <>
      <div id="root" />
      <Script src="/prototype.js" strategy="afterInteractive" />
    </>
  );
}
