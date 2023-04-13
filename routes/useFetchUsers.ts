// useFetchUsers.ts
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";

export const useFetchUsers = () => {
  const { users, setUsers } = useContext(UserContext);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch("/api/users", {
        method: "GET", // Explicitly specify the method
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error("Failed to fetch users");
      }
    }

    fetchUsers();
  }, [setUsers]);

  return { users, setUsers };
};
