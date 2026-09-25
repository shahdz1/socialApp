import axios from "axios";
import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { baseUrl } from "../const/evn";
import type { IUser } from "../interface/User.interface";

type UserContextType = {
  userData: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
};

export const userContext = createContext<UserContextType | null>(null);

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [userData, setUser] = useState<IUser | null>(null);
  function getUserDate() {
    axios
      .get(`${baseUrl}/users/profile-data`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setUser(response.data.data.user);
        console.log("user", response.data.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      getUserDate();
    }
  }, []);
  return (
    <userContext.Provider value={{ userData, setUser }}>
      {children}
    </userContext.Provider>
  );
}
