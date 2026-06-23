"use client";

import { useRef } from "react";

type Props = {
  onSelect: (file: File) => void;
};

export default function VideoUploadButton({ onSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="border rounded px-3 py-2 hover:bg-gray-100"
        title="Upload Video"
      >
        🎥
      </button>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="video/mp4,video/3gpp,video/*"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          onSelect(file);

          // Allow selecting same file again
          e.target.value = "";
        }}
      />
    </>
  );
}
