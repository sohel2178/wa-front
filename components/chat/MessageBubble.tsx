import MessageStatus from "./MessageStatus";

import { Message } from "@/types/message";

type Props = {
  message: Message;
};

export default function MessageBubble({ message }: Props) {
  const isOutbound = message.direction === "outbound";

  const backendBaseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api", "");

  console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);
  console.log("MEDIA URL:", message.mediaUrl);

  const imageUrl = `${backendBaseUrl}${message.mediaUrl}`;

  console.log("FINAL URL:", imageUrl);

  return (
    <div
      className={`flex mb-2 ${isOutbound ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`
          max-w-[70%]
          rounded-lg
          px-3
          py-2
          text-sm
          ${isOutbound ? "bg-green-200" : "bg-white border"}
        `}
      >
        <>
          {message.type === "image" && message.mediaUrl && (
            <img src={imageUrl} alt="" className="rounded max-w-62.5" />
          )}

          {message.type === "document" && (
            <a
              href={`${backendBaseUrl}${message.mediaUrl}`}
              target="_blank"
              rel="noreferrer"
              className="block border rounded p-3"
            >
              📄 {message.fileName || message.text}
            </a>
          )}

          {message.type === "video" && message.mediaUrl && (
            <video
              controls
              className="max-w-75 rounded"
              src={`${backendBaseUrl}${message.mediaUrl}`}
            />
          )}

          {message.type === "audio" && message.mediaUrl && (
            <audio
              controls
              className="max-w-75"
              src={`${backendBaseUrl}${message.mediaUrl}`}
            />
          )}

          {message.type !== "image" && <div>{message.text}</div>}

          {message.type === "image" && message.text && (
            <div className="mt-2">{message.text}</div>
          )}
        </>

        <div className="flex justify-end mt-1">
          <MessageStatus status={message.status} />
        </div>
      </div>
    </div>
  );
}
