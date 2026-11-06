
import { apiRequest } from "./apiClient";

export const registerUser = async ({ name, email, password }) => {
  const result = await apiRequest("/auth/register", {
    method: "POST",
    body: { name, email, password },
  });

  return result.data;
};

export const loginUser = async ({ email, password }) => {
  const result = await apiRequest("/auth/login", {
    method: "POST",
    body: { email, password },
  });

  return result.data.user;
};

export const getCurrentUser = async (context) => {
  const result = await apiRequest(
    `/auth/me?context=${encodeURIComponent(context)}`
  );

  return result.data;
};

export const logoutUser = async (context) => {
  return apiRequest(
    `/auth/logout?context=${encodeURIComponent(context)}`,
    {
      method: "POST",
    }
  );
};
