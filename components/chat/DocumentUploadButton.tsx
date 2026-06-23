"use client";

import { useRef } from "react";

type Props = {
  onSelect: (file: File) => void;
};

export default function DocumentUploadButton({ onSelect }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="border rounded px-3 py-2 hover:bg-gray-100"
        title="Upload Document"
      >
        📄
      </button>

      <input
        ref={inputRef}
        type="file"
        hidden
        accept="
          .pdf,
          .doc,
          .docx,
          .xls,
          .xlsx,
          .ppt,
          .pptx,
          .txt,
          .csv,
          .zip,
          .rar
        "
        onChange={(e) => {
          const file = e.target.files?.[0];

          if (!file) return;

          onSelect(file);

          e.target.value = "";
        }}
      />
    </>
  );
}
