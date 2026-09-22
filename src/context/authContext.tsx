import { createContext, useState, type Dispatch, type SetStateAction } from "react";

type AuthContextType = {
    token: string | null,
    setToken: Dispatch<SetStateAction<string | null>>
}
export const authContext = createContext<AuthContextType | null >(null);
export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });
  return (
    <authContext.Provider value={{ token, setToken }}>
      {children}
    </authContext.Provider>
  );
}
