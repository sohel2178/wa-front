// "use client";

// import { useEffect } from "react";

// import { socket } from "@/lib/socket";

// export default function useSocket() {
//   useEffect(() => {
//     if (!socket.connected) {
//       socket.connect();
//     }

//     return () => {};
//   }, []);

//   return socket;
// }

"use client";

import { useEffect } from "react";

import { socket } from "@/lib/socket";
import { useAuthStore } from "@/store/authStore";

export default function useSocket() {
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    socket.connect();

    const handleConnect = () => {
      if (user?._id) {
        socket.emit("user:online", user._id);
      }
    };

    socket.on("connect", handleConnect);

    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off("connect", handleConnect);
    };
  }, [user?._id]);

  return socket;
}
