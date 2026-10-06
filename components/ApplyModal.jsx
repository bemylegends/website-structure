import { PRIVACY_URL, TERMS_URL } from '@/data/links';

// Any element with data-open="apply" or data-open="login" opens this modal (logic in components/Interactions.jsx).
// Prototype: no backend yet. TODO: send the apply form to the CRM and connect Member login to the platform auth.
export function ApplyButton({ className, children, mode = 'apply' }) {
  return <button type="button" className={className} data-open={mode}>{children}</button>;
}

export default function ApplyModal() {
  return (
    <div className="am" role="dialog" aria-modal="true" aria-labelledby="am-t" hidden>
      <div className="am-box">
        <button type="button" className="am-x" aria-label="Close" data-close=""><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg></button>

        <div data-pane="apply">
          <h2 id="am-t">Apply to join Legends</h2>
          <p className="am-sub">Membership by approval. Tell us about yourself - we’ll review and be in touch.</p>
          <form className="am-f" data-form="apply">
            <label className="am-field"><span>Full name <b>*</b></span><input name="name" required placeholder="Your full name" autoComplete="name" /></label>
            <label className="am-field"><span>Email <b>*</b></span><input name="email" type="email" required placeholder="you@company.com" autoComplete="email" /></label>
            <label className="am-field"><span>Phone (with country code) <b>*</b></span><input name="phone" type="tel" required placeholder="+971 50 000 0000" autoComplete="tel" /></label>
            <label className="am-field"><span>LinkedIn URL <em>(optional)</em></span><input name="linkedin" type="text" placeholder="linkedin.com/in/..." /></label>
            <label className="am-check"><input type="checkbox" name="consent" /><span>Legends may contact me by phone, SMS, and messaging apps about my application, events, and related offers, and such calls may be recorded. I can withdraw at any time. <em>(Optional)</em></span></label>
            <button className="am-submit" type="submit">Submit · We’ll review &amp; be in touch →</button>
            <p className="am-legal">By submitting, you agree to our <a href={TERMS_URL}>Terms</a> &amp; <a href={PRIVACY_URL}>Privacy</a>.</p>
          </form>
        </div>

        <div data-pane="done" hidden>
          <div className="am-done">
            <span className="am-ok"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M5 12l5 5 9-10" /></svg></span>
            <h2>Application submitted</h2>
            <p>We’ll review your application and be in touch within 72 hours.</p>
            <button type="button" className="am-submit" data-close="">Close</button>
          </div>
        </div>

        <div data-pane="login" hidden>
          <h2>Member login</h2>
          <p className="am-sub">Sign in with the email you used for your membership.</p>
          <form className="am-f" data-form="login">
            <label className="am-field"><span>Email</span><input name="email" type="email" required placeholder="you@company.com" autoComplete="email" /></label>
            <label className="am-field"><span>Password</span><input name="password" type="password" required placeholder="••••••••" autoComplete="current-password" /></label>
            <a className="am-forgot" href="mailto:concierge@legends.app?subject=Password%20reset">Forgot password?</a>
            <p className="am-msg" role="status" hidden>Member access is being set up. We’ll email members as soon as the platform opens.</p>
            <button className="am-submit dark" type="submit">Sign in</button>
            <p className="am-legal">Not a member yet? <button type="button" className="am-link" data-open="apply">Apply to join</button></p>
          </form>
        </div>
      </div>
    </div>
  );
}
