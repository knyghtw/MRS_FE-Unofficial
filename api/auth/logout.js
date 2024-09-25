import token from "@/utils/getCookie";
export default async function logout() {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/api/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logout:", error);
    throw error;
  }
}
