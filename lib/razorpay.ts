declare const require: (id: string) => any;

type RazorpayCtor = new (options: { key_id: string; key_secret: string }) => unknown;

type RazorpayEnv = {
  process?: {
    env?: Record<string, string | undefined>;
  };
};

export function getRazorpay() {
  const env = (globalThis as typeof globalThis & RazorpayEnv).process?.env ?? {};
  const keyId = env.RAZORPAY_KEY_ID;
  const keySecret = env.RAZORPAY_KEY_SECRET;

  if (!keyId || !keySecret) {
    throw new Error("Razorpay credentials are not configured.");
  }

  const Razorpay = require("razorpay") as RazorpayCtor;
  return new Razorpay({ key_id: keyId, key_secret: keySecret });
}