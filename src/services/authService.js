const API_URL = "http://localhost:3000/api";

// REGISTER
export const registerUser = async ({ name, email, password }) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Registration failed.");
  }

  return result.data;
};

// LOGIN
export const loginUser = async ({ email, password }) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Login failed.");
  }

  return result.data.user;
};

// GET CURRENT USER
export const getCurrentUser = async (context) => {
  const response = await fetch(
    `${API_URL}/auth/me?context=${context}`,
    {
      method: "GET",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Not authenticated.");
  }

  return result.data;
};

// LOGOUT
export const logoutUser = async (context) => {
  const response = await fetch(
    `${API_URL}/auth/logout?context=${context}`,
    {
      method: "POST",
      credentials: "include",
    }
  );

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Logout failed.");
  }

  return result;
};