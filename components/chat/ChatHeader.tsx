// import { Conversation } from "@/types/conversation";
// import { Search, Tag, MoreVertical, CalendarDays } from "lucide-react";

// type Props = {
//   conversation: Conversation;

//   onAssignLabels: () => void;

//   onSearchMessages: () => void;
//   onScheduleFollowup: () => void;
// };

// export default function ChatHeader({
//   conversation,
//   onAssignLabels,
//   onSearchMessages,
//   onScheduleFollowup,
// }: Props) {
//   return (
//     <div className="border-b bg-background px-4 py-3">
//       <div className="flex items-center justify-between">
//         {/* Left Side */}
//         <div className="min-w-0">
//           <div className="font-semibold text-sm truncate">
//             {conversation.contactId?.name || "Unknown Contact"}
//           </div>

//           <div className="text-xs text-muted-foreground truncate">
//             {conversation.contactId?.phone}
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="flex items-center gap-1">
//           <button
//             onClick={onSearchMessages}
//             className="p-2 rounded-full hover:bg-muted transition"
//             title="Search Messages"
//           >
//             <Search className="h-5 w-5" />
//           </button>

//           <button
//             onClick={onScheduleFollowup}
//             className="p-2 rounded-full hover:bg-muted transition"
//             title="Follow Up"
//           >
//             <CalendarDays className="h-5 w-5" />
//           </button>

//           <button
//             onClick={onAssignLabels}
//             className="p-2 rounded-full hover:bg-muted transition"
//             title="Labels"
//           >
//             <Tag className="h-5 w-5" />
//           </button>

//           <button
//             className="p-2 rounded-full hover:bg-muted transition"
//             title="More"
//           >
//             <MoreVertical className="h-5 w-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Conversation } from "@/types/conversation";

import { Search, Tag, MoreVertical } from "lucide-react";

import FollowUpBanner from "@/components/followups/FollowUpBanner";

type Props = {
  conversation: Conversation;

  onAssignLabels: () => void;

  onSearchMessages: () => void;

  onCreateFollowUp: () => void;

  onUpdateFollowUp: () => void;

  onCompleteFollowUp: () => void;

  onCancelFollowUp: () => void;
};

export default function ChatHeader({
  conversation,
  onAssignLabels,
  onSearchMessages,
  onCreateFollowUp,
  onUpdateFollowUp,
  onCompleteFollowUp,
  onCancelFollowUp,
}: Props) {
  return (
    <div className="border-b bg-background">
      {/* Header */}

      <div className="flex items-center justify-between px-4 py-3">
        <div>
          <div className="font-semibold">
            {conversation.contactId?.name || "Unknown Contact"}
          </div>

          <div className="text-xs text-muted-foreground">
            {conversation.contactId?.phone}
          </div>

          {conversation.assignedTo && (
            <div className="text-xs text-blue-600 mt-1">
              Assigned to {conversation.assignedTo.name}
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onSearchMessages}
            className="rounded-full p-2 hover:bg-muted"
          >
            <Search className="h-5 w-5" />
          </button>

          <button
            onClick={onAssignLabels}
            className="rounded-full p-2 hover:bg-muted"
          >
            <Tag className="h-5 w-5" />
          </button>

          <button className="rounded-full p-2 hover:bg-muted">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Follow-up */}

      <div className="px-4 pb-4">
        <FollowUpBanner
          followUp={conversation.followUp}
          onCreate={onCreateFollowUp}
          onEdit={onUpdateFollowUp}
          onComplete={onCompleteFollowUp}
          onCancel={onCancelFollowUp}
        />
      </div>
    </div>
  );
}
