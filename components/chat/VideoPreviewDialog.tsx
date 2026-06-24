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

    return () => URL.revokeObjectURL(url);
  }, [file]);

  useEffect(() => {
    if (!open) {
      setCaption("");
    }
  }, [open]);

  if (!open || !file) return null;

  const sizeMB = (file.size / 1024 / 1024).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 bg-black/70 p-2 sm:p-4">
      <div className="h-full w-full flex items-center justify-center">
        <div
          className="
            bg-white
            rounded-xl
            shadow-xl
            w-full
            max-w-3xl
            h-auto
            max-h-[95vh]
            flex
            flex-col
            overflow-hidden
          "
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b px-4 py-3 shrink-0">
            <h2 className="font-semibold text-lg">🎥 Video Preview</h2>

            <button
              onClick={onClose}
              disabled={loading}
              className="text-xl hover:text-red-500"
            >
              ×
            </button>
          </div>

          {/* Media Section */}
          <div className="mb-4 flex justify-center">
            {previewUrl && (
              <div
                className="
        w-full
        flex
        justify-center
        items-center
        bg-gray-100
        rounded
        border
        overflow-hidden
      "
                style={{
                  height: "320px",
                }}
              >
                <video
                  controls
                  className="
          max-w-full
          max-h-full
          object-contain
        "
                >
                  <source src={previewUrl} type={file.type} />
                </video>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="border-t px-4 py-3 shrink-0">
            <div className="text-sm font-medium truncate">{file.name}</div>

            <div className="text-xs text-muted-foreground mb-3">
              {sizeMB} MB
            </div>

            <textarea
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Add a caption (optional)"
              rows={3}
              className="
                w-full
                border
                rounded-md
                p-2
                resize-none
              "
            />
          </div>

          {/* Footer */}
          <div className="border-t px-4 py-3 flex justify-end gap-2 shrink-0">
            <button
              onClick={onClose}
              disabled={loading}
              className="
                border
                rounded-md
                px-4
                py-2
              "
            >
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
    </div>
  );
}
