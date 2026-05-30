import { useState } from "react";
import { IEntry } from "./EntriesLayout.tsx";
import CopyButton from "./CopyButton.tsx";
import { Eye, EyeOff, RefreshCw } from "lucide-react";
import { BACKEND_URL } from "../App.tsx";

export default function Entry({ title, username, password, url, otp }: IEntry) {
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [updatedOtp, setUpdatedOtp] = useState<string | null>(otp || null);

  const toggleIsHidden = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHidden(!isHidden);
  };

  const handleOtpUpdate = async (
    e: React.MouseEvent<HTMLButtonElement>,
    title: string,
  ) => {
    e.stopPropagation();

    const formData = new FormData();
    formData.append("title", title);

    const response = await fetch(`${BACKEND_URL}/updateOtp`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`OTP Refresh Failed: ${data.error}`);
      return;
    }

    setUpdatedOtp(data.otp);
  };

  return (
    <>
      <tr
        onClick={() => setIsOpen(!isOpen)}
        className="hover:bg-grn1hvr transition-colors cursor-pointer border-b border-gray-100 select-none"
      >
        <td className="px-6 py-4 font-medium text-gray-900">
          <div className="flex items-center space-x-2">
            <span>{title}</span>
          </div>
        </td>
        <td className="px-6 py-4 flex justify-between">
          <span className="truncate block max-w-[12rem]">{username}</span>
          <CopyButton content={username!} />
        </td>

        <td className="px-6 py-4 w-64 max-w-[16rem]">
          <div className="flex items-center justify-between w-full">
            <span className="font-mono truncate pr-4 block">
              {isHidden ? "••••••••" : password}
            </span>

            <div
              className="flex items-center flex-shrink-0 space-x-2"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={toggleIsHidden}
                className="cursor-pointer focus:outline-none"
              >
                {isHidden ? (
                  <Eye
                    size={20}
                    className="text-grn4 hover:opacity-80 transition-opacity"
                  />
                ) : (
                  <EyeOff
                    size={20}
                    className="text-grn4 hover:opacity-80 transition-opacity"
                  />
                )}
              </button>

              <CopyButton content={password!} />
            </div>
          </div>
        </td>
      </tr>

      {isOpen && (
        <tr className="">
          <td colSpan={3} className="px-12 py-4 border-b border-gray-200">
            <div className="grid grid-cols-2 gap-4 text-sm text-gray-600 animate-fadeIn">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  Website URL
                </p>
                <a
                  href={url?.startsWith("http") ? url : `https://${url}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 hover:underline inline-block mt-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {url || "None provided"}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                  One-Time Password (OTP)
                </p>
                <div className="flex items-center font-mono text-gray-900 mt-1">
                  {updatedOtp ? (
                    <>
                      <p className="mr-2">{updatedOtp}</p>
                      <button
                        type="button"
                        className="cursor-pointer"
                        onClick={(e) => handleOtpUpdate(e, title!)}
                      >
                        <RefreshCw
                          size={20}
                          className="text-grn4 mr-2 hover:opacity-80 transition-opacity"
                        />
                      </button>
                      <CopyButton content={updatedOtp} />
                    </>
                  ) : (
                    "Not configured"
                  )}
                </div>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}
