"use client";

import { useEffect, useState } from "react";

type Props = {
  file: File | null;
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSend: (caption: string) => void;
};

export default function ImagePreviewDialog({
  file,
  open,
  onClose,
  loading = false,
  onSend,
}: Props) {
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const url = URL.createObjectURL(file);

    setPreview(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!open || !file) return null;

  if (!preview) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded w-125">
        <img src={preview} alt="" className="max-h-100 mx-auto" />

        <input
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Caption"
          className="border w-full p-2 mt-4"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button className="border px-4 py-2" onClick={onClose}>
            Cancel
          </button>

          <button
            onClick={() => onSend(caption)}
            disabled={loading}
            className="
                bg-green-600
                text-white
                rounded-md
                px-4
                py-2
                disabled:opacity-50
              "
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
