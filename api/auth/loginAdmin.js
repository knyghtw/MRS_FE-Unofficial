export default async function loginAdmin(body) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/api/admin/login`, {
      method: "POST",
      body: body,
    }); 

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.error || "Invalid password or Username" };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error login:", error);
    return { success: false, message: "Network error or server unreachable" };
  }
}
