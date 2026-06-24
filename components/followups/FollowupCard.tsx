import { Conversation } from "@/types/conversation";
import { Button } from "@/components/ui/button";
import { CalendarDays, CheckCircle } from "lucide-react";

type Props = {
  conversation: Conversation;
  onComplete?: (conversationId: string) => void;
};

export default function FollowupCard({ conversation, onComplete }: Props) {
  const followUp = conversation.followUp;

  if (!followUp?.date) return null;

  const now = new Date();
  const followUpDate = new Date(followUp.date);

  const isOverdue = !followUp.completed && followUpDate < now;

  const isToday = followUpDate.toDateString() === now.toDateString();

  return (
    <div className="border rounded-lg p-4 bg-background space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{conversation.contactId?.name}</h3>

          <p className="text-sm text-muted-foreground">
            {conversation.contactId?.phone}
          </p>
        </div>

        {isOverdue ? (
          <span className="text-xs font-medium text-red-500">Overdue</span>
        ) : isToday ? (
          <span className="text-xs font-medium text-yellow-500">Today</span>
        ) : (
          <span className="text-xs font-medium text-green-500">Upcoming</span>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm">
        <CalendarDays className="h-4 w-4" />

        <span>{followUpDate.toLocaleString()}</span>
      </div>

      {followUp.note && (
        <p className="text-sm text-muted-foreground">{followUp.note}</p>
      )}

      {!followUp.completed && onComplete && (
        <Button size="sm" onClick={() => onComplete(conversation._id)}>
          <CheckCircle className="h-4 w-4 mr-2" />
          Complete
        </Button>
      )}
    </div>
  );
}
