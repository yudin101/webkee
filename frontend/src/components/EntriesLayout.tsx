import { FaSearch } from "react-icons/fa";
import Entry from "./Entry";
import { useContext, useState } from "react";
import { EntriesContext } from "../App";
import { useNavigate } from "react-router-dom";

export interface IEntry {
  id?: string;
  title?: string;
  username?: string;
  password?: string;
  group?: string;
  otp?: string;
  url?: string;
}

export default function EntriesLayout() {
  const navigate = useNavigate();

  const { entries } = useContext(EntriesContext);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredEntries = entries
    ? entries.filter((entry: IEntry) =>
        entry.title!.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

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
            Save
          </button>
        </div>

        <div className="bg-grn1 shadow-2xl rounded-xl mt-7 mb-7 px-10 py-5">
          <div className="flex items-center px-3 py-2 border-2 border-grn2 rounded-xl">
            <FaSearch className="text-grn4 size-5 mr-2" />
            <input
              type="text"
              placeholder="Search entries..."
              value={searchQuery}
              className="w-screen text-grn4 outline-none"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <hr className="mt-3 mb-3 border-1 border-grn2" />

          <div className="w-full">
            <table className="w-full text-left border-collapse text-sm text-gray-600">
              {/* Table Header Group */}
              <thead className="bg-grn3 text-xs font-semibold uppercase text-white">
                <tr>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Username</th>
                  <th className="px-6 py-3">Password</th>
                </tr>
              </thead>

              {/* Table Body Group */}
              <tbody className="divide-y divide-gray-200">
                {filteredEntries.length > 0 ? (
                  filteredEntries.map((entry: IEntry) => (
                    <Entry
                      key={entry.id}
                      title={entry.title}
                      username={entry.username}
                      password={entry.password}
                    />
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-6 py-8 text-center text-gray-400"
                    >
                      {entries ? "No matching entries found." : "Loading..."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
