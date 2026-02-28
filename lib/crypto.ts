// lib/crypto.ts
// All cryptography happens in the browser — server never sees plaintext or password.

/**
 * Derives a 256-bit AES-GCM key from a password string using PBKDF2.
 * Using PBKDF2 is stronger than raw SHA-256 for key derivation.
 */
async function deriveKey(password: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      // Fixed salt is fine here — purpose is key stretching, not uniqueness
      salt: enc.encode("peti-simpanan-salt"),
      iterations: 100_000,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypts a plaintext message with AES-GCM.
 * Returns base64-encoded encrypted data and IV.
 */
export async function encryptMessage(
  message: string,
  password: string
): Promise<{ encrypted: string; iv: string }> {
  const enc = new TextEncoder();
  const key = await deriveKey(password);
  const ivBytes = crypto.getRandomValues(new Uint8Array(12));

  const encryptedBuffer = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: ivBytes },
    key,
    enc.encode(message)
  );

  return {
    encrypted: bufToBase64(new Uint8Array(encryptedBuffer)),
    iv: bufToBase64(ivBytes),
  };
}

/**
 * Decrypts a base64-encoded AES-GCM ciphertext.
 * Throws if password is wrong or data is corrupt.
 */
export async function decryptMessage(
  encryptedB64: string,
  ivB64: string,
  password: string
): Promise<string> {
  const key = await deriveKey(password);
  const iv = base64ToBuf(ivB64);
  const encrypted = base64ToBuf(encryptedB64);

  const decryptedBuffer = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv },
    key,
    encrypted
  );

  return new TextDecoder().decode(decryptedBuffer);
}

/**
 * Hashes the password with SHA-256 to use as the Redis lookup key.
 * The server stores and retrieves by this hash — it never sees the password.
 */
export async function hashPassword(password: string): Promise<string> {
  const enc = new TextEncoder();
  const hashBuffer = await crypto.subtle.digest("SHA-256", enc.encode(password));
  return bufToBase64(new Uint8Array(hashBuffer));
}

// --- Helpers ---

function bufToBase64(buf: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < buf.length; i++) {
    binary += String.fromCharCode(buf[i]);
  }
  return btoa(binary);
}

function base64ToBuf(b64: string): Uint8Array<ArrayBuffer> {
  const binary = atob(b64);
  const buf = new Uint8Array(binary.length) as Uint8Array<ArrayBuffer>;
  for (let i = 0; i < binary.length; i++) {
    buf[i] = binary.charCodeAt(i);
  }
  return buf;
}
