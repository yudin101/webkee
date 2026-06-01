import { useNavigate } from "react-router-dom";
import EntriesList from "./EntriesList";
import { BACKEND_URL, FileContext } from "../App";
import { useContext } from "react";

export default function EntriesLayout() {
  const navigate = useNavigate();
  const { fileName } = useContext(FileContext);

  const handleDownload = async () => {
    const response = await fetch(
      `${BACKEND_URL}/download/${fileName === "No file chosen" ? "" : fileName}`,
    );

    if (!response.ok) {
      const data = await response.json();
      alert(`Error: ${data.error}`);
      return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = `${fileName}`;

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen max-h-full w-full bg-grn2 flex flex-col items-center overflow-hidden">
      <div className="w-11/15">
        <div className="flex justify-between items-center bg-grn1 px-10 py-5 rounded-xl mt-7">
          <h1
            className="font-extrabold text-grn4 text-2xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            WebKee
          </h1>
          <button
            className="bg-grn3 text-white py-2 px-7 rounded-md font-medium cursor-pointer outline-none hover:bg-grn4hvr transition"
            onClick={handleDownload}
          >
            Download
          </button>
        </div>

        <EntriesList />
      </div>
    </div>
  );
}
