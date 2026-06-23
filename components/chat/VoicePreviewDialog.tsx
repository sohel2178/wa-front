"use client";

import { useEffect, useState } from "react";

type Props = {
  file: File | null;
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSend: () => void;
};

export default function VoicePreviewDialog({
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

  if (!open || !file) return null;

  const sizeKB = (file.size / 1024).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-125">
        <h2 className="text-lg font-semibold mb-4">🎤 Voice Note Preview</h2>

        <p className="text-sm text-gray-500 mb-2">{file.name}</p>

        <p className="text-xs text-gray-400 mb-4">{sizeKB} KB</p>

        {previewUrl && <audio controls className="w-full" src={previewUrl} />}

        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            disabled={loading}
            className="border px-4 py-2 rounded"
          >
            Cancel
          </button>

          <button
            onClick={onSend}
            disabled={loading}
            className="bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
