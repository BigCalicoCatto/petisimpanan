export default function TermsPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=VT323&display=swap');

        * { box-sizing: border-box; }

        body {
          background: #000;
          color: #00ff41;
          font-family: 'Share Tech Mono', monospace;
        }

        h1 {
          font-family: 'VT323', monospace;
          font-size: clamp(36px, 8vw, 64px);
          letter-spacing: 6px;
          color: #00ff41;
          text-shadow: 0 0 20px #00ff41, 0 0 40px #00ff41;
          margin-bottom: 4px;
        }

        h2 {
          font-size: 11px;
          letter-spacing: 4px;
          color: #00ff41;
          text-transform: uppercase;
          margin: 40px 0 12px 0;
          border-left: 2px solid #00ff41;
          padding-left: 12px;
        }

        p, li {
          font-size: 13px;
          line-height: 1.9;
          color: #00ff4199;
        }

        ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        ul li::before {
          content: "— ";
          color: #00ff4160;
        }

        a {
          color: #00ff41;
          text-decoration: underline;
        }

        .divider {
          border: none;
          border-top: 1px solid #00ff4120;
          margin: 32px 0;
        }

        .back-link {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 3px;
          color: #00ff4160;
          text-decoration: none;
          margin-bottom: 48px;
          transition: color 0.2s;
        }

        .back-link:hover { color: #00ff41; }
      `}</style>

      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "60px 24px 100px" }}>

        <a href="/" className="back-link">&lt; BACK TO VAULT</a>

        <h1>TERMS &amp; CONDITIONS</h1>
        <p style={{ fontSize: "10px", color: "#00ff4140", letterSpacing: "3px", marginBottom: "40px" }}>
          LAST UPDATED: 2025 · PETI SIMPANAN
        </p>

        <hr className="divider" />

        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing or using Peti Simpanan ("the Service"), you confirm that you have read,
          understood, and agree to be bound by these Terms and Conditions. If you do not agree,
          you must not use the Service.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          Peti Simpanan is a zero-knowledge, burn-after-reading encrypted message vault.
          Messages are encrypted entirely in your browser using AES-GCM encryption before
          being transmitted. The Service never receives, stores, or has access to your
          plaintext messages or passwords at any time.
        </p>

        <h2>3. How It Works</h2>
        <ul style={{ marginTop: "8px" }}>
          <li>Your message is encrypted in your browser before it leaves your device.</li>
          <li>Only the encrypted ciphertext is stored on our servers.</li>
          <li>Messages are permanently deleted immediately upon retrieval.</li>
          <li>Any message not retrieved will be automatically deleted after 24 hours.</li>
          <li>We cannot recover, restore, or access any message at any time.</li>
        </ul>

        <h2>4. Acceptable Use</h2>
        <p>You agree that you will NOT use this Service to:</p>
        <ul style={{ marginTop: "8px" }}>
          <li>Transmit, store, or communicate any content that is illegal under applicable law.</li>
          <li>Facilitate harassment, threats, or harm to any individual or group.</li>
          <li>Distribute malware, viruses, or any malicious code.</li>
          <li>Engage in fraud, scams, or any deceptive activity.</li>
          <li>Violate the rights of any third party, including intellectual property rights.</li>
          <li>Attempt to reverse-engineer, exploit, or disrupt the Service.</li>
        </ul>

        <h2>5. No Warranty</h2>
        <p>
          The Service is provided "as is" and "as available" without any warranties of any kind,
          either express or implied. We do not warrant that the Service will be uninterrupted,
          error-free, or free of security vulnerabilities. You use the Service entirely at your
          own risk.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Peti Simpanan and its operators shall not
          be liable for any direct, indirect, incidental, special, or consequential damages
          arising from your use or inability to use the Service, including but not limited to
          loss of data, loss of messages, or any damages resulting from unauthorised access
          to your transmissions.
        </p>

        <h2>7. No Data Recovery</h2>
        <p>
          Due to the zero-knowledge nature of this Service, we are technically incapable of
          recovering any message once it has been deleted or expired. We will not entertain
          any requests to recover lost messages. Please ensure you have the correct password
          before storing a message.
        </p>

        <h2>8. Privacy</h2>
        <p>
          We do not collect personally identifiable information. The only data stored on our
          servers is the encrypted ciphertext and a hashed (SHA-256) version of your password,
          which is used solely as a lookup key. Neither the ciphertext nor the hash can be used
          to identify you or recover your original message or password.
        </p>

        <h2>9. Modifications to Terms</h2>
        <p>
          We reserve the right to modify these Terms at any time. Continued use of the Service
          after any changes constitutes your acceptance of the new Terms.
        </p>

        <h2>10. Governing Law</h2>
        <p>
          These Terms shall be governed by and construed in accordance with the laws of Malaysia.
          Any disputes arising under these Terms shall be subject to the exclusive jurisdiction
          of the courts of Malaysia.
        </p>

        <hr className="divider" />

        <p style={{ fontSize: "11px", color: "#00ff4140", letterSpacing: "2px", marginTop: "40px" }}>
          These Terms are final. No correspondence will be entertained.
        </p>

        <a href="/" className="back-link" style={{ marginTop: "40px" }}>&lt; BACK TO VAULT</a>

      </main>
    </>
  );
}
