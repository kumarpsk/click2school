export async function apiService(url, method, data) {
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    const options = {
      method,
      headers,
      cache: 'no-store',
      // next: { revalidate: 10 },
    };

    if (method !== "GET" && data) {
      options.body = JSON.stringify(data);
    }

    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const responseData = await response.json();

    return { data: responseData };
  } catch (error) {
    return { error: error.message };
  }
}
