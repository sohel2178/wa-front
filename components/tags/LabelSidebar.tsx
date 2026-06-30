"use client";

import { Tag } from "@/types/tag";
import { ScrollArea } from "@/components/ui/scroll-area";

type Props = {
  tags: Tag[];

  selectedTagId: string | null;

  onSelect: (id: string | null) => void;

  onCreate: () => void;

  onManage: () => void;
};

export default function LabelSidebar({
  tags,
  selectedTagId,
  onSelect,
  onCreate,
  onManage,
}: Props) {
  return (
    <div className="border-b">
      <div className="p-2">
        <div style={{ height: 115 }} className="overflow-y-auto">
          <div className="grid grid-cols-3 gap-2 pr-2 auto-rows-max">
            <button
              onClick={() => onSelect(null)}
              className={`
        px-3 py-2
        rounded
        text-sm
        truncate
        ${
          selectedTagId === null
            ? "bg-primary text-primary-foreground"
            : "hover:bg-muted border"
        }
      `}
            >
              All
            </button>

            {tags.map((tag) => (
              <button
                key={tag._id}
                onClick={() => onSelect(tag._id)}
                className={`
          px-3 py-2
          rounded
          text-sm
          border
          flex
          items-center
          justify-center
          gap-2
          truncate
          ${
            selectedTagId === tag._id
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          }
        `}
              >
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    backgroundColor: tag.color,
                  }}
                />

                <span className="truncate">{tag.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t p-2 space-y-2">
        <button
          onClick={onCreate}
          className="w-full text-left px-3 py-2 rounded hover:bg-muted"
        >
          + New Label
        </button>

        <button
          onClick={onManage}
          className="w-full text-left px-3 py-2 rounded hover:bg-muted"
        >
          Manage Labels
        </button>
      </div>
    </div>
  );
}

// export default function LabelSidebar() {
//   return (
//     <div className="border-b">
//       <div
//         style={{
//           height: 120,
//           overflowY: "auto",
//           border: "2px solid red",
//           padding: 8,
//         }}
//       >
//         {Array.from({ length: 50 }).map((_, i) => (
//           <div key={i}>Label {i}</div>
//         ))}
//       </div>

//       <div className="border-t p-2">Footer</div>
//     </div>
//   );
// }
