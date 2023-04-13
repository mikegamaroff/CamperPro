// userContext.tsx
import React, { ReactNode, createContext, useState } from "react";
import { User } from "../model/user";

interface UserContextInterface {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

export const UserContext = createContext<UserContextInterface>({
  users: [],
  setUsers: () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      {children}
    </UserContext.Provider>
  );
};
