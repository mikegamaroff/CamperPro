// hooks/useLogin.ts
import { useContext } from "react";
import { AuthContext } from "../context/authContext";

interface LoginResponse {
  success: boolean;
  message: string;
}

export const useLogin = () => {
  const { login } = useContext(AuthContext);

  const loginUser = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    try {
      const response = await fetch("/api/auth?action=login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        await login(email, password); // Pass only email and password
        return { success: true, message: "Logged in successfully" };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.message };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: "Internal server error" };
    }
  };

  return { loginUser };
};
