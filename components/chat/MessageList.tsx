"use client";
import { useEffect, useRef } from "react";

import MessageBubble from "./MessageBubble";

import { Message } from "@/types/message";

type Props = {
  messages: Message[];
};

export default function MessageList({ messages }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);
  return (
    <div ref={bottomRef} className="flex-1 overflow-y-auto p-4">
      {messages.map((message) => (
        <MessageBubble key={message._id} message={message} />
      ))}
    </div>
  );
}
