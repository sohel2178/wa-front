"use client";

import { useRef } from "react";

type Props = {
  onSelect: (file: File) => void;
};

export default function AudioUploadButton({ onSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="border rounded px-3 py-2"
      >
        🎵
      </button>

      <input
        ref={inputRef}
        hidden
        type="file"
        accept="audio/*"
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            onSelect(file);
          }

          e.target.value = "";
        }}
      />
    </>
  );
}
