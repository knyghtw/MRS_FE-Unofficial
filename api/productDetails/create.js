import token from "@/utils/getCookie";
export default async function create(formData) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/api/product-details`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating product detail", error);
    throw error;
  }
}
