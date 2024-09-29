"use server";

import { cookies } from "next/headers";

export default async function setCookie(cookie) {
  cookies().set("token", `${cookie}`);
}