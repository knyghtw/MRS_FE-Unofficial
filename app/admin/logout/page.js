"use client";
import { useRouter } from "next/navigation";
import deleteCookie from "@/utils/deleteCookie";
import signOut from "@/api/auth/logout";
export default function logout() {
    signOut()
    deleteCookie()
    useRouter().push('/login')
}