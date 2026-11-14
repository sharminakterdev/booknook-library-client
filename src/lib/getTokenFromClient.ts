import { authClient } from "./auth-client";
import { toast } from "react-toastify";

export const getTokenFromClient = async () => {
  const { data, error } = await authClient.token();

  console.log("TOKEN RESPONSE:", data);
  console.log("TOKEN ERROR:", error);

  if (error || !data?.token) {
    console.error("Token not found!");
    toast.error("Authentication token not found");
    return null;
  }

  const token = data.token;

  console.log("JWT TOKEN:", token);

  return token;
};