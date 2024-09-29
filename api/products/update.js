import token from "@/utils/getCookie";
export default async function update(id, body) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/api/products/${id}`, {
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
    console.error("Error creating product:", error);
    throw error;
  }
}
