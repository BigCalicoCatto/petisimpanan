"use client";

import { useState, useEffect, useRef } from "react";
import { encryptMessage, decryptMessage, hashPassword } from "@/lib/crypto";

// --- Matrix Rain Canvas ---
function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const chars =
      "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const fontSize = 14;
    let columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        if (drops[i] * fontSize > canvas.height * 0.98 || Math.random() > 0.975) {
          ctx.fillStyle = "#ffffff";
        } else {
          const brightness = Math.floor(Math.random() * 155 + 100);
          ctx.fillStyle = `rgb(0, ${brightness}, 0)`;
        }

        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 35);

    const handleResize = () => {
      resize();
      columns = Math.floor(canvas.width / fontSize);
      drops.length = columns;
      drops.fill(1);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-40"
      style={{ pointerEvents: "none" }}
    />
  );
}

function GlitchText({ text }: { text: string }) {
  return (
    <span className="glitch" data-text={text}>
      {text}
    </span>
  );
}

// --- T&C Popup ---
function TermsPopup({ onAccept }: { onAccept: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 600);
    return () => clearTimeout(t);
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{
        background: "rgba(0,0,0,0.92)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.6s ease",
      }}
    >
      <div
        style={{
          border: "1px solid #00ff41",
          boxShadow: "0 0 40px #00ff4140, inset 0 0 20px #00ff4108",
          background: "rgba(0,8,0,0.97)",
          maxWidth: "480px",
          width: "100%",
          padding: "40px 32px",
          fontFamily: "'Share Tech Mono', monospace",
        }}
      >
        <div style={{ fontSize: "11px", color: "#00ff4160", letterSpacing: "4px", marginBottom: "24px" }}>
          SYSTEM INITIALIZING<span className="blink">_</span>
        </div>

        <div
          style={{
            fontFamily: "'VT323', monospace",
            fontSize: "clamp(28px, 6vw, 42px)",
            color: "#00ff41",
            textShadow: "0 0 20px #00ff41, 0 0 40px #00ff41",
            letterSpacing: "6px",
            marginBottom: "8px",
          }}
        >
          <GlitchText text="PETI SIMPANAN" />
        </div>

        <div style={{ fontSize: "10px", color: "#00ff4150", letterSpacing: "3px", marginBottom: "28px" }}>
          ZERO-KNOWLEDGE ENCRYPTED VAULT
        </div>

        <div
          style={{
            fontSize: "12px",
            color: "#00ff4190",
            lineHeight: "1.8",
            marginBottom: "28px",
            borderTop: "1px solid #00ff4120",
            borderBottom: "1px solid #00ff4120",
            padding: "20px 0",
          }}
        >
          <p style={{ marginBottom: "12px" }}>&gt; By entering, you acknowledge and agree:</p>
          <p style={{ marginBottom: "8px", paddingLeft: "12px" }}>— This service stores encrypted messages only. We never see your plaintext or password.</p>
          <p style={{ marginBottom: "8px", paddingLeft: "12px" }}>— Messages self-destruct after retrieval or within 24 hours.</p>
          <p style={{ marginBottom: "8px", paddingLeft: "12px" }}>— You will not use this service for illegal, harmful, or malicious purposes.</p>
          <p style={{ paddingLeft: "12px" }}>— We are not liable for any misuse of this platform.</p>
        </div>

        <p style={{ fontSize: "11px", color: "#00ff4160", marginBottom: "24px" }}>
          Full terms at{" "}
          <a href="/terms" target="_blank" style={{ color: "#00ff41", textDecoration: "underline" }}>
            /terms
          </a>
        </p>

        <button
          onClick={onAccept}
          style={{
            width: "100%",
            background: "transparent",
            border: "1px solid #00ff41",
            color: "#00ff41",
            fontFamily: "'Share Tech Mono', monospace",
            fontSize: "14px",
            padding: "14px",
            cursor: "pointer",
            letterSpacing: "4px",
            textTransform: "uppercase",
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.background = "#00ff41";
            (e.target as HTMLButtonElement).style.color = "#000";
            (e.target as HTMLButtonElement).style.boxShadow = "0 0 20px #00ff41";
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.background = "transparent";
            (e.target as HTMLButtonElement).style.color = "#00ff41";
            (e.target as HTMLButtonElement).style.boxShadow = "none";
          }}
        >
          [ ACCEPT &amp; ENTER ]
        </button>
      </div>
    </div>
  );
}

type Mode = "store" | "retrieve";

export default function VaultPage() {
  const [accepted, setAccepted] = useState(false);
  const [mode, setMode] = useState<Mode>("store");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    text: string;
  }>({ type: "idle", text: "" });
  const [decryptedMessage, setDecryptedMessage] = useState("");
  const [showDecrypted, setShowDecrypted] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("ps-accepted") === "true") {
      setAccepted(true);
    }
  }, []);

  const handleAccept = () => {
    sessionStorage.setItem("ps-accepted", "true");
    setAccepted(true);
  };

  const handleStore = async () => {
    if (!password || !message) {
      setStatus({ type: "error", text: "> ERROR: FIELDS CANNOT BE EMPTY" });
      return;
    }
    setStatus({ type: "loading", text: "> ENCRYPTING MESSAGE..." });
    try {
      const { encrypted, iv } = await encryptMessage(message, password);
      const key = await hashPassword(password);
      const res = await fetch("/api/vault", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, encrypted, iv }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");
      setStatus({ type: "success", text: "> MESSAGE STORED. SELF-DESTRUCTS IN 24H." });
      setPassword("");
      setMessage("");
    } catch (err: unknown) {
      setStatus({
        type: "error",
        text: `> ERROR: ${err instanceof Error ? err.message.toUpperCase() : "UNKNOWN FAILURE"}`,
      });
    }
  };

  const handleRetrieve = async () => {
    if (!password) {
      setStatus({ type: "error", text: "> ERROR: PASSWORD REQUIRED" });
      return;
    }
    setStatus({ type: "loading", text: "> ACCESSING VAULT..." });
    try {
      const key = await hashPassword(password);
      const res = await fetch(`/api/vault?key=${encodeURIComponent(key)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unknown error");

      setStatus({ type: "loading", text: "> DECRYPTING..." });
      const plaintext = await decryptMessage(data.encrypted, data.iv, password);
      setDecryptedMessage(plaintext);
      setShowDecrypted(true);
      setStatus({ type: "success", text: "> MESSAGE RETRIEVED. IT HAS BEEN DESTROYED." });
      setPassword("");
    } catch (err: unknown) {
      setStatus({
        type: "error",
        text: `> ERROR: ${err instanceof Error ? err.message.toUpperCase() : "DECRYPTION FAILED"}`,
      });
    }
  };

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

        .glitch {
          color: #00ff41;
          text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 40px #00ff41;
          animation: flicker 4s infinite;
        }

        @keyframes flicker {
          0%, 19%, 21%, 23%, 25%, 54%, 56%, 100% {
            text-shadow: 0 0 10px #00ff41, 0 0 20px #00ff41, 0 0 40px #00ff41;
          }
          20%, 24%, 55% { text-shadow: none; color: #003b0e; }
        }

        .blink { animation: blink 1s step-end infinite; }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        .terminal-box {
          border: 1px solid #00ff41;
          box-shadow: 0 0 8px #00ff4150, inset 0 0 8px #00ff4108;
          background: rgba(0, 10, 0, 0.85);
        }

        .terminal-input {
          background: transparent;
          border: none;
          border-bottom: 1px solid #00ff4160;
          color: #00ff41;
          font-family: 'Share Tech Mono', monospace;
          outline: none;
          width: 100%;
          padding: 8px 4px;
          font-size: 14px;
          caret-color: #00ff41;
          transition: border-color 0.2s;
        }

        .terminal-input::placeholder { color: #00ff4140; }

        .terminal-input:focus {
          border-bottom-color: #00ff41;
          box-shadow: 0 2px 0 0 #00ff4130;
        }

        .terminal-btn {
          background: transparent;
          border: 1px solid #00ff41;
          color: #00ff41;
          font-family: 'Share Tech Mono', monospace;
          font-size: 14px;
          padding: 10px 24px;
          cursor: pointer;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: all 0.15s;
          overflow: hidden;
        }

        .terminal-btn:hover { background: #00ff41; color: #000; box-shadow: 0 0 20px #00ff41; }
        .terminal-btn:active { transform: scale(0.97); }
        .terminal-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .tab-btn {
          background: transparent;
          border: none;
          border-bottom: 2px solid transparent;
          color: #00ff4170;
          font-family: 'Share Tech Mono', monospace;
          font-size: 13px;
          padding: 14px 0;
          cursor: pointer;
          letter-spacing: 2px;
          text-transform: uppercase;
          transition: all 0.2s;
          flex: 1;
          text-align: center;
        }

        .tab-btn.active {
          color: #00ff41;
          border-bottom-color: #00ff41;
          text-shadow: 0 0 8px #00ff41;
        }

        .tab-btn:hover:not(.active) { color: #00ff4199; }

        .scan-line {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #00ff4140, transparent);
          animation: scan 8s linear infinite;
          z-index: 1;
          pointer-events: none;
        }

        @keyframes scan {
          0% { top: 0; }
          100% { top: 100vh; }
        }

        .status-text { font-size: 12px; letter-spacing: 1px; min-height: 20px; }

        .decrypted-box {
          border: 1px solid #00ff4160;
          background: rgba(0,255,65,0.04);
          padding: 16px;
          font-size: 14px;
          line-height: 1.7;
          white-space: pre-wrap;
          word-break: break-word;
          animation: fadeIn 0.5s ease;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .loading-dots::after {
          content: '';
          animation: dots 1.2s steps(4, end) infinite;
        }

        @keyframes dots {
          0%   { content: ''; }
          25%  { content: '.'; }
          50%  { content: '..'; }
          75%  { content: '...'; }
          100% { content: ''; }
        }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #000; }
        ::-webkit-scrollbar-thumb { background: #00ff4140; }
      `}</style>

      <MatrixRain />
      <div className="scan-line" />

      {!accepted && <TermsPopup onAccept={handleAccept} />}

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">

        {/* Header */}
        <div className="text-center mb-12 select-none">
          <div
            style={{
              fontFamily: "'VT323', monospace",
              fontSize: "clamp(52px, 12vw, 96px)",
              lineHeight: 1,
              letterSpacing: "8px",
              color: "#00ff41",
              textShadow: "0 0 20px #00ff41, 0 0 40px #00ff41",
              marginBottom: "10px",
            }}
          >
            <GlitchText text="PETI SIMPANAN" />
          </div>
          <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "11px", color: "#00ff4170", letterSpacing: "4px", textTransform: "uppercase" }}>
            zero-knowledge · burn-after-reading · encrypted vault
          </p>
        </div>

        {/* Main Card */}
        <div className="terminal-box w-full max-w-2xl" style={{ minHeight: "520px" }}>

          {/* Tabs — two equal columns */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: "1px solid #00ff4125" }}>
            <button
              className={`tab-btn ${mode === "store" ? "active" : ""}`}
              onClick={() => { setMode("store"); setStatus({ type: "idle", text: "" }); setShowDecrypted(false); }}
            >
              [ STORE ]
            </button>
            <button
              className={`tab-btn ${mode === "retrieve" ? "active" : ""}`}
              onClick={() => { setMode("retrieve"); setStatus({ type: "idle", text: "" }); setShowDecrypted(false); }}
            >
              [ RETRIEVE ]
            </button>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            {mode === "store" ? (
              <div className="space-y-8">
                <div>
                  <label style={{ fontSize: "11px", letterSpacing: "3px", color: "#00ff4180" }}>PASSWORD</label>
                  <input
                    type="password"
                    className="terminal-input mt-2"
                    placeholder="enter encryption key..."
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                  />
                </div>
                <div>
                  <label style={{ fontSize: "11px", letterSpacing: "3px", color: "#00ff4180" }}>SECRET MESSAGE</label>
                  <textarea
                    className="terminal-input mt-2 resize-none"
                    placeholder="enter message to encrypt..."
                    rows={7}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{
                      background: "transparent",
                      border: "1px solid #00ff4160",
                      color: "#00ff41",
                      fontFamily: "'Share Tech Mono', monospace",
                      outline: "none",
                      width: "100%",
                      padding: "10px",
                      fontSize: "14px",
                      marginTop: "8px",
                    }}
                  />
                </div>
                <button className="terminal-btn w-full" onClick={handleStore} disabled={status.type === "loading"}>
                  ENCRYPT &amp; STORE
                </button>
              </div>
            ) : (
              <div className="space-y-8">
                <div>
                  <label style={{ fontSize: "11px", letterSpacing: "3px", color: "#00ff4180" }}>PASSWORD</label>
                  <input
                    type="password"
                    className="terminal-input mt-2"
                    placeholder="enter decryption key..."
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (showDecrypted) { setShowDecrypted(false); setDecryptedMessage(""); }
                    }}
                    autoComplete="current-password"
                  />
                </div>
                <button className="terminal-btn w-full" onClick={handleRetrieve} disabled={status.type === "loading"}>
                  RETRIEVE &amp; DESTROY
                </button>

                {showDecrypted && decryptedMessage && (
                  <div>
                    <p style={{ fontSize: "11px", letterSpacing: "3px", color: "#00ff4180", marginBottom: "8px" }}>DECRYPTED MESSAGE</p>
                    <div className="decrypted-box">{decryptedMessage}</div>
                    <p style={{ fontSize: "10px", color: "#ff000080", marginTop: "8px", letterSpacing: "2px" }}>
                      ⚠ THIS MESSAGE HAS BEEN PERMANENTLY DESTROYED
                    </p>
                  </div>
                )}
              </div>
            )}

            {status.text && (
              <div
                className={`status-text mt-8 ${status.type === "loading" ? "loading-dots" : ""}`}
                style={{
                  color: status.type === "error" ? "#ff4444" : status.type === "success" ? "#00ff41" : "#00ff4199",
                }}
              >
                {status.text}
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <p style={{ marginTop: "24px", fontSize: "10px", color: "#00ff4130", letterSpacing: "3px", textAlign: "center" }}>
          SERVER SEES NOTHING · AES-GCM · SHA-256 · 24H AUTO-EXPIRY
        </p>
        <div style={{ display: "flex", gap: "32px", marginTop: "12px", flexWrap: "wrap", justifyContent: "center" }}>
          <a
            href="/terms"
            style={{ fontSize: "10px", color: "#00ff4140", letterSpacing: "3px", textDecoration: "none", fontFamily: "'Share Tech Mono', monospace", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#00ff41")}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#00ff4140")}
          >
            TERMS &amp; CONDITIONS
          </a>
          <a
            href="/privacy"
            style={{ fontSize: "10px", color: "#00ff4140", letterSpacing: "3px", textDecoration: "none", fontFamily: "'Share Tech Mono', monospace", transition: "color 0.2s" }}
            onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = "#00ff41")}
            onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = "#00ff4140")}
          >
            PRIVACY POLICY
          </a>
        </div>

      </main>
    </>
  );
}
