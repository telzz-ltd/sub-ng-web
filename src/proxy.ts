import { cookies } from "next/headers";
import { NextRequest } from "next/server";

export default async function proxy(req: NextRequest) {
  const c = await cookies();
  const accessToken = c.get("accessToken");
  const user = c.get("user");

  console.log({ accessToken, user });
}
