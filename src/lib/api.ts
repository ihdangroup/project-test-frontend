export async function apiFetch(
    url: string,
    options: RequestInit & { body?: any } = {}
  ) {
    const token = localStorage.getItem("token");

    const headers: HeadersInit = {
      Authorization: token ? `Bearer ${token}` : "",
      ...options.headers,
    };

    // kalau body berupa object → ubah ke JSON
    let body: any = options.body;
    if (body && !(body instanceof FormData)) {
      headers["Content-Type"] = "application/json";
      body = JSON.stringify(body);
    }

    const res = await fetch(`http://localhost:4000/api${url}`, {
      ...options,
      headers,
      body,
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(`API error: ${res.status} ${msg}`);
    }

    return res.json();
  }
