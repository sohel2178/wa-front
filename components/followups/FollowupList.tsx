import { Conversation } from "@/types/conversation";
import FollowupCard from "./FollowupCard";

type Props = {
  conversations: Conversation[];
  onComplete?: (conversationId: string) => void;
};

export default function FollowupList({ conversations, onComplete }: Props) {
  if (!conversations.length) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        No follow-ups found
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {conversations.map((conversation) => (
        <FollowupCard
          key={conversation._id}
          conversation={conversation}
          onComplete={onComplete}
        />
      ))}
    </div>
  );
}
