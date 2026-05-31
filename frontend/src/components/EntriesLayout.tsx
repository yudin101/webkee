import { useNavigate } from "react-router-dom";
import EntriesList from "./EntriesList";

export default function EntriesLayout() {
  const navigate = useNavigate();

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
          <button className="bg-grn3 text-white py-2 px-7 rounded-md font-medium cursor-pointer outline-none hover:bg-grn4hvr transition">
            Download
          </button>
        </div>

        <EntriesList />
      </div>
    </div>
  );
}
