function timingSafeEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let diff = a.length === b.length ? 0 : 1;

  for (let i = 0; i < len; i++) {
    const aChar = a.charCodeAt(i % a.length || 0);
    const bChar = b.charCodeAt(i % b.length || 0);
    diff |= aChar ^ bChar;
  }

  return diff === 0;
}

export async function POST(req: Request) {
  const raw = await req.text();
  const sig = req.headers.get("x-razorpay-signature") || "";
  const secret = (
    globalThis as typeof globalThis & {
      process?: { env?: Record<string, string | undefined> };
    }
  ).process?.env?.RAZORPAY_WEBHOOK_SECRET;

  if (!secret) {
    return new Response("Webhook secret missing", { status: 503 });
  }

  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(raw),
  );
  const expected = Array.from(new Uint8Array(signature), (byte) =>
    byte.toString(16).padStart(2, "0"),
  ).join("");

  if (!timingSafeEqual(expected, sig)) {
    return new Response("Invalid signature", { status: 400 });
  }

  return new Response("ok");
}