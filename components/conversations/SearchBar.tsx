"use client";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="p-4 border-b">
      <div className="flex items-center gap-3">
        <h2 className="font-bold text-lg shrink-0">Conversations</h2>

        <input
          type="text"
          placeholder="Search..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 border rounded px-3 py-2 text-sm"
        />
      </div>
    </div>
  );
}
