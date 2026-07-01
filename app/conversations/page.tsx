import { Suspense } from "react";
import ConversationsClient from "./ConversationsClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ConversationsClient />
    </Suspense>
  );
}
