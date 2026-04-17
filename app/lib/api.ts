"use client";

export const API_BASE = "https://sentiment-platform-zgr8.onrender.com/api";

function getToken() {
  const match = document.cookie.match(/(^| )token=([^;]+)/);
  return match ? match[2] : null;
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    console.error("API error:", res.status, res.statusText);
    throw new Error(`API request failed: ${res.status}`);
  }

  return res.json();
}

export const api = {
  get: (path: string) => request(path, { method: "GET" }),
  post: (path: string, body: any) =>
    request(path, {
      method: "POST",
      body: JSON.stringify(body),
    }),
};
