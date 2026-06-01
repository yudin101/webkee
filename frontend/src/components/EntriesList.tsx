import { FaSearch } from "react-icons/fa";
import Entry from "./Entry";
import EditEntry from "./EditEntry";
import { createContext, useContext, useState } from "react";
import { EntriesContext } from "../App";

export interface IEntry {
  id?: string;
  title?: string;
  username?: string;
  password?: string;
  group?: string;
  otp?: string;
  url?: string;
}

export const PropsContext = createContext<any>(null);

export default function EntriesList() {
  const { entries, setEntries } = useContext(EntriesContext);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const [activeEntry, setActiveEntry] = useState<IEntry | null>(null);

  const handleUpdateContextData = (updatedItem: IEntry) => {
    if (!entries) return;
    // Replace the old entry object within the master array matching by ID
    setEntries(
      entries.map((item: IEntry) =>
        item.id === updatedItem.id ? updatedItem : item,
      ),
    );
  };

  const filteredEntries = entries
    ? entries.filter((entry: IEntry) =>
        entry.title!.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <PropsContext.Provider value={{ setActiveEntry, setIsEditOpen }}>
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
                    id={entry.id}
                    title={entry.title}
                    username={entry.username}
                    password={entry.password}
                    group={entry.group}
                    url={entry.url}
                    otp={entry.otp}
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

      {isEditOpen && (
        <EditEntry
          entry={activeEntry}
          onClose={() => setIsEditOpen(false)}
          onSave={handleUpdateContextData}
        />
      )}
    </PropsContext.Provider>
  );
}
