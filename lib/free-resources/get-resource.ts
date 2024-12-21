const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getResource = async (id) => {
  console.log("id", id);
  try {
    const response = await fetch(`${baseUrl}/api/resource/getresource`, {
      method: "POST",
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error(`Failed to retrieve resource: ${response.statusText}`);
    }
    const data = await response.json();
    return data.resource;
  } catch (error) {
    console.error("Error retrieving resource:", error);
    return null;
  }
};
