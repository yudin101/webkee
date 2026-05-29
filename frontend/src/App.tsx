import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import NotFound from "./NotFound";
import EntriesLayout from "./components/EntriesLayout";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <NotFound />,
  }, {
    path: "/entries",
    element: <EntriesLayout />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
