"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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
