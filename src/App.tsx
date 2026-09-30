import "./App.css";
import { RouterProvider } from "react-router-dom";
import { routes } from "./Routes/route";
import { ToastContainer } from "react-toastify";
import { Offline} from "react-detect-offline";
function App() {
  return (
    <>
       <Offline>you offline...!</Offline>
      <div>
        <RouterProvider router={routes} />
        <ToastContainer />
      </div>
    </>
  );
}

export default App;
