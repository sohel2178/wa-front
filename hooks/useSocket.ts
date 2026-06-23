"use client";

import { useEffect } from "react";

import { socket } from "@/lib/socket";

export default function useSocket() {
  useEffect(() => {
    if (!socket.connected) {
      socket.connect();
    }

    return () => {};
  }, []);

  return socket;
}
