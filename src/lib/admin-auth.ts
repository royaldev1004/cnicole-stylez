import { createServerFn } from "@tanstack/react-start";
import { clearSession, getSession, updateSession } from "@tanstack/react-start/server";

type AdminSessionData = { authenticated?: boolean };

const sessionConfig = {
  password: process.env.SESSION_SECRET ?? "",
  name: "cnicole_admin_session",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

export const checkAdminAuth = createServerFn({ method: "GET" }).handler(async () => {
  if (!process.env.SESSION_SECRET) return { authenticated: false };
  const session = await getSession<AdminSessionData>(sessionConfig);
  return { authenticated: session.data.authenticated === true };
});

export const loginAdmin = createServerFn({ method: "POST" })
  .inputValidator((data: { password: string }) => data)
  .handler(async ({ data }) => {
    const expected = process.env.ADMIN_PASSWORD;
    if (!process.env.SESSION_SECRET || !expected || data.password !== expected) {
      return { success: false as const };
    }
    await updateSession<AdminSessionData>(sessionConfig, { authenticated: true });
    return { success: true as const };
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  await clearSession(sessionConfig);
  return { success: true as const };
});
