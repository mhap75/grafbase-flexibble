import { SessionInterface } from "@/common.type";
import { authOptions } from "@/lib/session";
import { getServerSession } from "next-auth/next";

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
}
