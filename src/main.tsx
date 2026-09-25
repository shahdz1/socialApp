import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthContextProvider } from "./context/authContext.tsx";
import { UserContextProvider } from "./context/userContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
const query = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={query}>
    {" "}
    <AuthContextProvider>
      <UserContextProvider>
        <StrictMode>
          <App />

          <ReactQueryDevtools initialIsOpen={false} />
        </StrictMode>
      </UserContextProvider>
    </AuthContextProvider>
  </QueryClientProvider>,
);
