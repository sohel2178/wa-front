type Props = {
  status: string;
};

export default function MessageStatus({ status }: Props) {
  switch (status) {
    case "pending":
      return <span className="text-xs">⏳</span>;

    case "sent":
      return <span className="text-xs">✓</span>;

    case "delivered":
      return <span className="text-xs">✓✓</span>;

    case "read":
      return <span className="text-xs text-blue-500">✓✓</span>;

    default:
      return null;
  }
}
