"use client";

import { useRef } from "react";

type Props = {
  onSelect: (file: File) => void;
};

export default function ImageUploadButton({ onSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="border rounded px-3"
      >
        📷
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (file) {
            onSelect(file);
          }
        }}
      />
    </>
  );
}
