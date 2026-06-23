"use client";

type Props = {
  file: File | null;
  open: boolean;
  loading?: boolean;
  onClose: () => void;
  onSend: () => void;
};

export default function DocumentPreviewDialog({
  file,
  open,
  loading = false,
  onClose,
  onSend,
}: Props) {
  if (!open || !file) return null;

  const fileSizeMB = (file.size / 1024 / 1024).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-112.5 p-6">
        <div className="flex flex-col items-center">
          <div className="text-6xl mb-4">📄</div>

          <h2 className="font-semibold text-lg text-center break-all">
            {file.name}
          </h2>

          <p className="text-gray-500 text-sm mt-2">
            {file.type || "Unknown file type"}
          </p>

          <p className="text-gray-500 text-sm">{fileSizeMB} MB</p>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onClose}
            disabled={loading}
            className="border rounded px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onSend}
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
