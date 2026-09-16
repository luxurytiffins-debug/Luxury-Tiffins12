import { db } from "@/lib/db";
import { signSession, verifyPassword } from "@/lib/auth";
import { loginSchema } from "@/lib/validation";

export async function POST(req: Request) {
    try {
        const body = loginSchema.parse(await req.json());
        const user = await db.user.findUnique({ where: { email: body.email } });

        if (
            !user ||
            !user.active ||
            !(await verifyPassword(body.password, user.passwordHash))
        ) {
            return Response.json(
                { error: "Invalid email or password." },
                { status: 401 },
            );
        }

        const token = await signSession({ userId: user.id, role: user.role });

        return new Response(JSON.stringify({ ok: true }), {
            headers: {
                "content-type": "application/json",
                "set-cookie": `luxury_session=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=604800`,
            },
        });
    } catch {
        return Response.json(
            { error: "Invalid login details." },
            { status: 400 },
        );
    }
}