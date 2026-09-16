import { db } from "@/lib/db";
import { hashPassword } from "@/lib/auth";
import { registerSchema } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userData = registerSchema.parse(body);

    const existingUser = await db.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUser) {
      return Response.json(
        { error: "Email already registered." },
        { status: 409 }
      );
    }

    const user = await db.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        passwordHash: await hashPassword(userData.password),
      },
    });

    return Response.json(
      { id: user.id, name: user.name, email: user.email },
      { status: 201 }
    );
  } catch {
    return Response.json(
      { error: "Invalid registration details." },
      { status: 400 }
    );
  }
}
