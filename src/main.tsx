import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CounterContextProvider } from "./context/counterContext.tsx";
import { AuthContextProvider } from "./context/authContext.tsx";

createRoot(document.getElementById("root")!).render(
  <CounterContextProvider>
    <AuthContextProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </AuthContextProvider>
  </CounterContextProvider>,
);
