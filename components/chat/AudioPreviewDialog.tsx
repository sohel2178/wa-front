"use client";

import { useEffect, useState } from "react";

type Props = {
  file: File | null;
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSend: () => void;
};

export default function AudioPreviewDialog({
  file,
  open,
  loading = false,
  onClose,
  onSend,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreviewUrl(null);
      return;
    }

    const url = URL.createObjectURL(file);

    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  if (!open || !file) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded w-125">
        <h2 className="font-semibold mb-4">🎵 Audio Preview</h2>

        <p className="mb-4">{file.name}</p>

        {previewUrl && <audio controls className="w-full" src={previewUrl} />}

        <div className="flex justify-end gap-2 mt-6">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>

          <button
            onClick={onSend}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
