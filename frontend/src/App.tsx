import "./App.css";
import LandingPage from "./components/LandingPage";

export const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

function App() {
  return (
    <>
      <LandingPage />
    </>
  );
}

export default App;
