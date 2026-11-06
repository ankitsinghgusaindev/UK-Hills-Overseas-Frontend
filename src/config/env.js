const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  throw new Error(
    "VITE_API_URL is missing. Check your frontend environment configuration."
  );
}

export const env = {
  API_URL: API_URL.replace(/\/+$/, ""),
};