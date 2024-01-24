"use server";

export async function fetchItems() {
  try {
    const response = await fetch("/api", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log("Server Response:", response);

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}
