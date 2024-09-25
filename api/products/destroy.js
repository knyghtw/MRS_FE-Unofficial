import token from "@/utils/getCookie";
export default async function destroy(id) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
    try {
      const response = await fetch(`${baseUrl}/api/products/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token()}`,
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
  