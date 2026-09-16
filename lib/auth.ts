declare const process: {
  env: Record<string, string | undefined>;
};

declare function require(name: string): any;

type SessionPayload = {
  userId: string;
  role: string;
};

type SignJWTInstance = {
  setProtectedHeader(header: Record<string, string>): SignJWTInstance;
  setIssuedAt(): SignJWTInstance;
  setExpirationTime(time: string): SignJWTInstance;
  sign(secret: Uint8Array): Promise<string>;
};

type JoseModule = {
  SignJWT: new (payload: Record<string, unknown>) => SignJWTInstance;
  jwtVerify: (
    token: string,
    secret: Uint8Array,
  ) => Promise<{ payload: Record<string, unknown> }>;
};

type BcryptModule = {
  hash(password: string, salt: number): Promise<string>;
  compare(password: string, hash: string): Promise<boolean>;
};

const { SignJWT, jwtVerify } = require("jose") as JoseModule;
const bcrypt = require("bcryptjs") as BcryptModule;

const secret = new TextEncoder().encode(
  process.env.AUTH_SECRET || "development-only-secret",
);

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export async function signSession(payload: { userId: string; role: string }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function readSession(token: string) {
  try {
    return (await jwtVerify(token, secret)).payload as {
      userId: string;
      role: string;
    };
  } catch {
    return null;
  }
}