import { authClient } from "./auth-client";
import { toast } from "react-toastify";

export const getTokenFromClient = async (): Promise<string | null> => {
  try {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
      console.error("Token Error:", error);
      toast.error("Authentication token not found");
      return null;
    }

    return data.token;
  } catch (error) {
    console.error("Get Token Error:", error);
    toast.error("Failed to get authentication token");
    return null;
  }
};