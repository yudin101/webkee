import { useState, ChangeEvent, SubmitEvent, useContext } from "react";
import { BACKEND_URL, EntriesContext, FileContext } from "../App";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [curentFieldType, setCurentFieldType] = useState<string>("password");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setFileName } = useContext(FileContext);

  const navigate = useNavigate();

  const { setEntries } = useContext(EntriesContext);

  // 1. Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]); // Get the first selected file
      setFileName(e.target.files[0].name);
    }
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const toggleCurrentFieldType = () => {
    setCurentFieldType(curentFieldType === "text" ? "password" : "text");
  };

  // 2. Handle form submission (API Upload)
  const handleUpload = async (e: SubmitEvent) => {
    e.preventDefault();
    if (!file) return alert("Please select a file first!");
    if (!password) return alert("Please enter the password!");

    setIsLoading(true);

    const formData = new FormData();
    formData.append("db-file", file);
    formData.append("db-password", password);

    try {
      const response = await fetch(`${BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`Error: ${data.error}`);
        return;
      }

      setEntries(data.entries);
      navigate("/entries");
    } catch (error) {
      alert(`Upload Failed: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleUpload}
        className="space-y-6 flex flex-col items-center"
      >
        {/* 1. Only the File Input has the dashed border wrapper */}
        <div className="w-11/12 max-w-md p-4 border-2 border-dashed border-grn3 rounded-xl mt-14">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-white file:text-grn4 hover:file:opacity-90 cursor-pointer"
          />
        </div>

        {/* 2. Password Input (clean, no dashed borders) */}
        <div className="flex w-11/12 max-w-md">
          <input
            type={curentFieldType}
            required
            onChange={handlePasswordChange}
            className="block w-11/12 max-w-md text-xl text-grn4 outline-none border-b-2 border-grn2 pb-2 focus:border-grn4 transition-colors"
            placeholder="Password"
          />

          <button
            type="button"
            onClick={toggleCurrentFieldType}
            className="cursor-pointer outline-none"
          >
            {curentFieldType === "text" ? (
              <EyeOff size={20} className="text-grn4" />
            ) : (
              <Eye size={20} className="text-grn4" />
            )}
          </button>
        </div>

        {/* 3. Submit Button (Now successfully inside the form) */}
        <button
          type="submit"
          disabled={isLoading}
          className="flex justify-center w-11/12 max-w-md bg-grn4 text-center text-white py-2 px-4 rounded-md font-medium cursor-pointer outline-none hover:bg-grn4hvr transition"
        >
          {isLoading ? (
            <Loader2 className="animate-spin size-5" />
          ) : (
            <span>Unlock</span>
          )}
        </button>
      </form>
    </>
  );
}
