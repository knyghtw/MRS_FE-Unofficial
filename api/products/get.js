export default async function get(filter, limit) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/api/products?${filter}&with=productDetails&limit=${limit ? limit : 200}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
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
