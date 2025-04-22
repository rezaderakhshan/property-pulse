"use client";

import { GetUnreadMessageCount } from "@/app/actions/get-unread-message-count";
import { useSession } from "next-auth/react";
import { createContext, useContext, useEffect, useState } from "react";
type TMessageContext = {
  unreadCount: number;
  setUnreadCount: React.Dispatch<React.SetStateAction<number>>;
};

const MessageContext = createContext<TMessageContext | null>(null);

const MessageProvider = ({ children }: { children: React.ReactNode }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const { data: session } = useSession();
  useEffect(() => {
    // if (session && session.user) {
    //   // @ts-ignore
    //   GetUnreadMessageCount.then((res) => {
    //     if (res.count) setUnreadCount(res.count);
    //   });
    // }
    const setCount = async () => {
      if (session && session.user) {
        const res = await GetUnreadMessageCount();
        if (res.count) setUnreadCount(res.count);
      }
    };
    setCount();
  }, [session]);
  return (
    <MessageContext.Provider value={{ unreadCount, setUnreadCount }}>
      {children}
    </MessageContext.Provider>
  );
};

export default MessageProvider;

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageContext outside of provider");
  }

  return context;
};
