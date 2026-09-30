import axios from "axios";
import { createContext, useContext, type ReactNode } from "react";
import { baseUrl } from "../const/evn";
import type { IUser } from "../interface/User.interface";
import { authContext, type AuthContextType } from "./authContext";
import { useQuery } from "@tanstack/react-query";

export type UserContextType = {
  userData: IUser | null;
};

export const userContext = createContext<UserContextType | null>(null);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const { token } = useContext(authContext) as AuthContextType;

  function getUserDate() {
    return axios.get(`${baseUrl}/users/profile-data`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  }

  let { data: userData } = useQuery({
    queryFn: getUserDate,
    queryKey: ["userData"],
    enabled: !!token,
    select: (data) => data?.data.data.user,
  });

  return (
    <userContext.Provider value={{ userData }}>{children}</userContext.Provider>
  );
}
