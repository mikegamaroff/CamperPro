// useAddUser.ts
import { useContext } from "react";
import { UserContext } from "../context/userContext";
import { User } from "../model/user";

interface AddUserResponse {
  success: boolean;
  message: string;
}

export const useAddUser = () => {
  const { users, setUsers } = useContext(UserContext);

  const addUser = async (user: User): Promise<AddUserResponse> => {
    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        setUsers([...users, user]);
        return { success: true, message: data.message };
      } else {
        const errorData = await response.json();
        return { success: false, message: errorData.message };
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: "Internal server error" };
    }
  };

  return { addUser };
};
