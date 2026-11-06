
import { env } from "../config/env";

export class ApiError extends Error {
  constructor(message, { status = null, requestId = null } = {}) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.requestId = requestId;
  }
}

export async function apiRequest(path, options = {}) {
  const {
    method = "GET",
    headers = {},
    body,
    ...otherOptions
  } = options;

  const normalizedPath = path.startsWith("/")
    ? path
    : `/${path}`;

  const url = `${env.API_URL}${normalizedPath}`;

  const requestHeaders = new Headers(headers);

  let requestBody = body;

  // Automatically serialize ordinary JavaScript objects.
  if (
    body !== undefined &&
    body !== null &&
    typeof body === "object" &&
    !(body instanceof FormData)
  ) {
    requestHeaders.set("Content-Type", "application/json");
    requestBody = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, {
      ...otherOptions,
      method,
      headers: requestHeaders,
      body: requestBody,
      credentials: "include",
    });

    const requestId = response.headers.get("X-Request-ID");

    const responseText = await response.text();

    let result = null;

    if (responseText) {
      try {
        result = JSON.parse(responseText);
      } catch {
        throw new ApiError("Server returned an invalid response.", {
          status: response.status,
          requestId,
        });
      }
    }

    if (!response.ok || result?.success === false) {
      throw new ApiError(
        result?.message || `Request failed with status ${response.status}`,
        {
          status: response.status,
          requestId,
        }
      );
    }

    return result;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    throw new ApiError(
      "Unable to connect to the server. Please try again.",
      {
        requestId: null,
      }
    );
  }
}
