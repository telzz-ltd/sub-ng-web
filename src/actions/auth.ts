"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";

export async function login(initialState: any, formData: FormData) {
  const c = await cookies();
  c.set({
    name: "accessToken",
    value: "vnsdvjnsvjndsjvnjsdnvsdj",
    maxAge: 60 * 60 * 24, //1day,
    httpOnly: true,
    path: "/",
  });
  c.set({
    name: "user",
    value: JSON.stringify({
      id: "test-user-id-1",
      name: "Test User",
      email: formData.get("email"),
    }),
    maxAge: 60 * 60 * 24, //1day,
    httpOnly: true,
    path: "/",
  });

  return redirect("/app");

  return { errors: { email: "email address is required" } };
}

export type Auth = {
  user: any;
  accessToken: string | null;
  refreshToken?: string | null;
};

export const getAuth = cache(async (): Promise<Auth> => {
  const cookieStore = await cookies();
  const userJSON = cookieStore.get("user")?.value;
  const accessToken = cookieStore.get("accessToken")?.value ?? null;
  const refreshToken = cookieStore.get("refreshToken")?.value ?? null;

  let user: any = null;

  try {
    user = userJSON ? JSON.parse(userJSON) : null;
  } catch (_: any) {
    cookieStore.delete("user");
    user = null;
  }

  return {
    user,
    accessToken,
    refreshToken,
  };
});
