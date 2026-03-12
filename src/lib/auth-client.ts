import { useAuthToken } from "@/hooks/use-auth-token";
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: "http://localhost:3000",
  fetchOptions: {
    auth: {
      type: "Bearer",
      token: () => useAuthToken.getState().bearerToken || "",
    },
  },
});
