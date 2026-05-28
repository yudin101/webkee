import { useState, ChangeEvent, SubmitEvent } from "react";
import { BACKEND_URL } from "../App";
import { Eye, EyeOff } from "lucide-react";

export default function FileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [curentFieldType, setCurentFieldType] = useState<string>("password");

  // 1. Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]); // Get the first selected file
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

    const formData = new FormData();
    formData.append("db-file", file);
    formData.append("db-password", password);

    try {
      const response = await fetch(`${BACKEND_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        alert("Error uploading the file.");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleUpload}
        className="space-y-6 flex flex-col items-center"
      >
        {/* 1. Only the File Input has the dashed border wrapper */}
        <div className="w-11/12 max-w-md p-4 border-2 border-dashed border-gray-300 rounded-xl mt-10">
          <input
            type="file"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-grn1 file:text-grn4 hover:file:opacity-90 cursor-pointer"
          />

          {file && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              Selected:{" "}
              <span className="font-medium text-black">{file.name}</span>
            </p>
          )}
        </div>

        {/* 2. Password Input (clean, no dashed borders) */}
        <div className="flex w-11/12 max-w-md">
          <input
            type={curentFieldType}
            required
            onChange={handlePasswordChange}
            className="block w-11/12 max-w-md text-xl text-grn4 outline-none border-b-2 border-gray-300 pb-2 focus:border-grn4 transition-colors"
            placeholder="Password"
          />

          <button type="button" onClick={toggleCurrentFieldType}>
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
          className="w-11/12 max-w-md bg-grn4 text-white py-2 px-4 rounded-md font-medium cursor-pointer outline-none hover:bg-grn4hvr transition"
        >
          Upload File
        </button>
      </form>
    </>
  );
}
