export default async function login(body) {
  const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
  try {
    const response = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      body: body,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return { success: false, message: errorData.error || "Invalid username or password" };
    }    

    const data = await response.json();
    const curPath = window.location.pathname;    
    if (curPath.startsWith("/admin/login") && data.data.user_detail.is_admin === 0) {{
      return { success: false, message: "Invalid username or password"};
    }} else {
      return data;
    }
  } catch (error) {
    console.error("Error login:", error);
    return { success: false, message: "Network error or server unreachable" };
  }
}
