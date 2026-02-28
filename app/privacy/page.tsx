export default function PrivacyPage() {
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

        .highlight-box {
          border: 1px solid #00ff4130;
          background: rgba(0,255,65,0.03);
          padding: 20px 24px;
          margin: 16px 0;
        }
      `}</style>

      <main style={{ maxWidth: "720px", margin: "0 auto", padding: "60px 24px 100px" }}>

        <a href="/" className="back-link">&lt; BACK TO VAULT</a>

        <h1>PRIVACY POLICY</h1>
        <p style={{ fontSize: "10px", color: "#00ff4140", letterSpacing: "3px", marginBottom: "40px" }}>
          LAST UPDATED: 2025 · PETI SIMPANAN
        </p>

        <hr className="divider" />

        <div className="highlight-box">
          <p style={{ color: "#00ff41", fontSize: "13px" }}>
            &gt; TL;DR — We cannot see your messages. We do not know who you are.
            We store nothing that can identify you. Ever.
          </p>
        </div>

        <h2>1. Who We Are</h2>
        <p>
          Peti Simpanan is a zero-knowledge encrypted message vault accessible at{" "}
          <a href="https://petisimpanan.vercel.app" style={{ color: "#00ff41" }}>
            petisimpanan.vercel.app
          </a>
          . This Privacy Policy explains what data we handle and why — spoiler: it is almost nothing.
        </p>

        <h2>2. What We Do NOT Collect</h2>
        <ul style={{ marginTop: "8px" }}>
          <li>Your name, email address, phone number, or any personal identifier.</li>
          <li>Your IP address — we do not log it.</li>
          <li>Your plaintext message — it never reaches our server.</li>
          <li>Your password — it never leaves your browser.</li>
          <li>Cookies, tracking pixels, or analytics of any kind.</li>
          <li>Device information or browser fingerprints.</li>
        </ul>

        <h2>3. What We DO Store (Temporarily)</h2>
        <p>
          When you store a message, the following is saved in our database:
        </p>
        <ul style={{ marginTop: "8px" }}>
          <li>
            <strong style={{ color: "#00ff41" }}>Encrypted ciphertext</strong> — your message after
            AES-GCM encryption. It is mathematically unreadable without your password.
            We cannot decrypt it.
          </li>
          <li>
            <strong style={{ color: "#00ff41" }}>A SHA-256 hash of your password</strong> — used
            only as a lookup key. This is a one-way hash. It cannot be reversed to recover
            your original password.
          </li>
        </ul>
        <p style={{ marginTop: "12px" }}>
          Both are automatically and permanently deleted either immediately upon retrieval
          or after 24 hours — whichever comes first. There is no archive, no backup, no log.
        </p>

        <h2>4. Zero-Knowledge Architecture</h2>
        <p>
          All encryption and decryption happens entirely inside your browser using the
          Web Crypto API (AES-GCM 256-bit). Your password and plaintext message are never
          transmitted to our server at any point. This means even if our server were
          compromised, there is nothing readable to steal.
        </p>

        <h2>5. Third Party Services</h2>
        <p>
          We use the following third-party infrastructure to operate the Service:
        </p>
        <ul style={{ marginTop: "8px" }}>
          <li>
            <strong style={{ color: "#00ff41" }}>Vercel</strong> — hosting and deployment.
            Vercel may collect standard server access logs. Refer to Vercel&apos;s Privacy Policy at vercel.com.
          </li>
          <li>
            <strong style={{ color: "#00ff41" }}>Upstash Redis</strong> — temporary encrypted
            data storage. Only the ciphertext and hashed key are stored. Refer to Upstash&apos;s Privacy Policy at upstash.com.
          </li>
        </ul>

        <h2>6. Compliance with Malaysian PDPA</h2>
        <p>
          Under Malaysia&apos;s Personal Data Protection Act 2010 (PDPA), we are committed to
          responsible data handling. As we do not collect any personal data as defined under
          the PDPA, the majority of the Act&apos;s obligations do not apply. Nonetheless, we
          voluntarily operate in the spirit of the Act by collecting the absolute minimum
          data required and deleting it as soon as possible.
        </p>

        <h2>7. Data Breach</h2>
        <p>
          In the unlikely event of a server breach, the attacker would only obtain encrypted
          ciphertext and hashed keys — neither of which can be used to read your messages or
          identify you. There is no meaningful data to breach.
        </p>

        <h2>8. Your Rights</h2>
        <p>
          Because we collect no personal data and cannot identify you, we are technically
          unable to fulfil requests to access, correct, or delete your data — we simply
          have nothing linked to you. Your data deletes itself automatically.
        </p>

        <h2>9. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. The latest version will
          always be available at this URL. Continued use of the Service constitutes
          acceptance of the updated policy.
        </p>

        <hr className="divider" />

        <p style={{ fontSize: "11px", color: "#00ff4140", letterSpacing: "2px", marginTop: "40px" }}>
          This policy is effective as of 2025. Peti Simpanan operates under Malaysian law.
        </p>

        <div style={{ display: "flex", gap: "32px", marginTop: "40px", flexWrap: "wrap" }}>
          <a href="/" className="back-link" style={{ marginBottom: 0 }}>&lt; BACK TO VAULT</a>
          <a href="/terms" className="back-link" style={{ marginBottom: 0 }}>TERMS &amp; CONDITIONS</a>
        </div>

      </main>
    </>
  );
}
