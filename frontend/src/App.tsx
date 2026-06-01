import { useState, createContext } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage";
import NotFound from "./NotFound";
import EntriesLayout from "./components/EntriesLayout";
import { IEntry } from "./components/EntriesList";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <NotFound />,
  },
  {
    path: "/entries",
    element: <EntriesLayout />,
  },
]);

export const EntriesContext = createContext<any>(null);
export const FileContext = createContext<any>(null);

function App() {
  const [entries, setEntries] = useState<IEntry[] | null>(null);
  const [fileName, setFileName] = useState<string>("");

  return (
    <EntriesContext.Provider value={{ entries, setEntries }}>
      <FileContext.Provider value={{ fileName, setFileName }}>
        <RouterProvider router={router} />
      </FileContext.Provider>
    </EntriesContext.Provider>
  );
}

export default App;
