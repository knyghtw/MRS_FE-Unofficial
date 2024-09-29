export default async function show(id) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/api/footer-contents/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error show footer:", error);
    throw error;
  }
}
