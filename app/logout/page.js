"use client";
import { useRouter } from "next/navigation";
import deleteCookie from "@/utils/deleteCookieUser";
import signOut from "@/api/auth/logout";
export default function Logout() {
    const router = useRouter()
    signOut()
    deleteCookie()
    router.push('/')
}