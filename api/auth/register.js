export default async function register(body) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/api/register`, {
      method: "POST",
      body: body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.error };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error register:", error);
    return { success: false, message: "Register error" };
  }
}
