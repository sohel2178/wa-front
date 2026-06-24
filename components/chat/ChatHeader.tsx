import { Conversation } from "@/types/conversation";
import { Search, Tag, MoreVertical, CalendarDays } from "lucide-react";

type Props = {
  conversation: Conversation;

  onAssignLabels: () => void;

  onSearchMessages: () => void;
  onScheduleFollowup: () => void;
};

export default function ChatHeader({
  conversation,
  onAssignLabels,
  onSearchMessages,
  onScheduleFollowup,
}: Props) {
  return (
    <div className="border-b bg-background px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="min-w-0">
          <div className="font-semibold text-sm truncate">
            {conversation.contactId?.name || "Unknown Contact"}
          </div>

          <div className="text-xs text-muted-foreground truncate">
            {conversation.contactId?.phone}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-1">
          <button
            onClick={onSearchMessages}
            className="p-2 rounded-full hover:bg-muted transition"
            title="Search Messages"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            onClick={onScheduleFollowup}
            className="p-2 rounded-full hover:bg-muted transition"
            title="Follow Up"
          >
            <CalendarDays className="h-5 w-5" />
          </button>

          <button
            onClick={onAssignLabels}
            className="p-2 rounded-full hover:bg-muted transition"
            title="Labels"
          >
            <Tag className="h-5 w-5" />
          </button>

          <button
            className="p-2 rounded-full hover:bg-muted transition"
            title="More"
          >
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
