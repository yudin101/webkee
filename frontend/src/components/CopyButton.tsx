import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(content);

      // Show temporary visual feedback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Resets back to copy icon after 2 seconds
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="cursor-pointer focus:outline-none"
    >
      {copied ? (
        <Check size={20} className="text-grn4 animate-scaleIn" />
      ) : (
        <Copy
          size={20}
          className="text-grn4 hover:opacity-80 transition-opacity"
        />
      )}
    </button>
  );
}
