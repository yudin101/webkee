import { useState } from "react";
import { IEntry } from "./EntriesList.tsx";
import { BACKEND_URL } from "../App.tsx";

interface EditModalProps {
  entry: IEntry | null;
  onClose: () => void;
  onSave: (updatedEntry: IEntry) => void;
}

export default function EditEntry({ entry, onClose, onSave }: EditModalProps) {
  // Initialize state with all existing field data
  const [formData, setFormData] = useState({
    id: entry?.id || "",
    title: entry?.title || "",
    username: entry?.username || "",
    password: entry?.password || "",
    url: entry?.url || "",
    group: entry?.group || "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dataToSend = new FormData();

    dataToSend.append("id", formData.id);
    dataToSend.append("title", formData.title);
    dataToSend.append("username", formData.username);
    dataToSend.append("password", formData.password);
    dataToSend.append("url", formData.url);
    dataToSend.append("group", formData.group);

    try {
      const response = await fetch(`${BACKEND_URL}/updateEntry`, {
        method: "POST",
        body: dataToSend,
      });

      if (!response.ok) throw new Error("Failed to save updates");

      // Pass updated data back to parent context state
      onSave({ ...entry, ...formData });
      onClose();
    } catch (err) {
      alert("Error saving modifications. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
          <h2 className="text-lg font-bold text-gray-900">Edit Entry Layout</h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-grn4"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-grn4"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Password
            </label>
            <input
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-grn4"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Group
            </label>
            <input
              type="text"
              name="group"
              value={formData.group}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-grn4"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-500 mb-1">
              Website URL
            </label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-grn4"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm text-gray-500 cursor-pointer hover:text-gray-700 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-semibold text-white bg-grn4 rounded cursor-pointer hover:opacity-90 disabled:opacity-50"
            >
              {isSubmitting ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
