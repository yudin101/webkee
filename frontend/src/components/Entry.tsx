import { useState } from "react";
import { IEntry } from "./EntriesLayout.tsx";
import CopyButton from "./CopyButton.tsx";
import { Eye, EyeOff } from "lucide-react";

export default function Entry({ title, username, password }: IEntry) {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  const toggleIsHidden = () => setIsHidden(!isHidden);

  return (
    <tr className="hover:bg-grn1hvr transition-colors">
      <td className="px-6 py-4 font-medium text-gray-900">{title}</td>
      <td className="px-6 py-4 flex justify-between">
        <span className="truncate block max-w-[12rem]">{username}</span>

        <CopyButton content={username!} />
      </td>

      {/* 1. Added a fixed width (w-64) and overflow management to the table cell */}
      <td className="px-6 py-4 w-64 max-w-[16rem]">
        <div className="flex items-center justify-between w-full">
          {/* 2. Added truncate to ensure long passwords don't stretch the layout */}
          <span className="font-mono truncate pr-4 block">
            {isHidden ? "••••••••" : password}
          </span>

          {/* 3. Grouped icons together cleanly with flex-shrink-0 so they never squish */}
          <div className="flex items-center flex-shrink-0 space-x-2">
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
  );
}
