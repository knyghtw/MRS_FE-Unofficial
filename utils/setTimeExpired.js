"use server";

import { cookies } from "next/headers";

export default async function setTimeExpired(expired) {
  cookies().set("expired", `${expired}`);
}
