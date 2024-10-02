import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { db } from "@/lib/database";
import { eq } from "drizzle-orm";
import { User, users } from "@/lib/database/scheme";
import { cookies } from "next/headers";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export async function verifyPassword(
  inputPassword: string,
  hashedPassword: string
) {
  return await bcrypt.compare(inputPassword, hashedPassword);
}

export type JWTPayload = Pick<User, "id" | "name">;

export function encode(user: User) {
  const payload: JWTPayload = { id: user.id, name: user.name };
  const token = jwt.sign(payload, process.env.JWT_SECRET!);
  return token;
}

export function decode(token: string) {
  const payload = jwt.verify(token, process.env.JWT_SECRET!) as JWTPayload;
  return payload;
}

export async function getMe() {
  const token = cookies().get("JWTToken")?.value;
  if (!token) {
    return null;
  }
  try {
    const payload = decode(token);
    const user = await db.query.users.findFirst({
      where: eq(users.id, payload.id),
    });
    return user || null;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return null;
  }
}
