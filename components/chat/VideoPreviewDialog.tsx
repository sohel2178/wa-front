"use client";

import { useEffect, useState } from "react";

type Props = {
  file: File | null;
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSend: (caption: string) => void;
};

export default function VideoPreviewDialog({
  file,
  open,
  loading = false,
  onClose,
  onSend,
}: Props) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [caption, setCaption] = useState("");

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

  useEffect(() => {
    if (!open) {
      setCaption("");
    }
  }, [open]);

  if (!open || !file) return null;

  const sizeMB = (file.size / 1024 / 1024).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-175 max-w-[95vw]">
        <h2 className="text-lg font-semibold mb-4">🎥 Video Preview</h2>

        <div className="mb-4">
          {previewUrl && (
            <video controls className="w-full rounded border max-h-112.5">
              <source src={previewUrl} type={file.type} />
            </video>
          )}
        </div>

        <div className="mb-4">
          <div className="text-sm font-medium">{file.name}</div>

          <div className="text-xs text-gray-500">{sizeMB} MB</div>
        </div>

        <textarea
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Add a caption (optional)"
          rows={3}
          className="w-full border rounded p-2 resize-none"
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            disabled={loading}
            className="border rounded px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={() => onSend(caption)}
            disabled={loading}
            className="bg-green-600 text-white rounded px-4 py-2 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
