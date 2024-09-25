import token from "@/utils/getCookie";
export default async function create(body) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/api/footer-contents`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token()}`,
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating footers:", error);
    throw error;
  }
}
