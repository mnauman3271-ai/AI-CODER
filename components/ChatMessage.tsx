
import React from "react";
import { Message } from "@/types/chat";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  const isUser = message.sender === "user";

  return (
    <div
      className={`flex w-full ${
        isUser ? "justify-end" : "justify-start"
      } my-2`}
    >
      <div
        className={`max-w-[70%] p-3 rounded-xl text-sm leading-relaxed ${
          isUser
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-slate-800 text-slate-100 rounded-bl-none border border-slate-700"
        }`}
      >
        <p className="whitespace-pre-wrap">
          {message.text}
        </p>

        <span
          className={`text-[10px] opacity-60 mt-1 block ${
            isUser ? "text-right" : "text-left"
          }`}
        >
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}