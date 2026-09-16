import { getRazorpay } from "@/lib/razorpay";

export async function POST(req: Request) {
  try {
    const body: { amount?: unknown; receipt?: unknown } = await req.json();

    const amount = body.amount;
    const receipt = body.receipt;

    if (
      typeof amount !== "number" ||
      !Number.isInteger(amount) ||
      amount <= 0
    ) {
      return Response.json(
        { error: "Invalid amount" },
        { status: 400 }
      );
    }

    if (typeof receipt !== "string" || !receipt.trim()) {
      return Response.json(
        { error: "Invalid receipt" },
        { status: 400 }
      );
    }

    const order = await getRazorpay().orders.create({
      amount,
      currency: "INR",
      receipt,
    });

    return Response.json({
      id: order.id,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch {
    return Response.json(
      { error: "Unable to create payment order." },
      { status: 500 }
    );
  }
}
