import { createContext, useState } from "react";

export const counterContext = createContext<any>(null);
export function CounterContextProvider({ children }: { children: React.ReactNode }) {
  const [count, setCount] = useState(0);
  return (
    <counterContext.Provider value={{ count, setCount }}>
      {children}
    </counterContext.Provider>
  );
}
