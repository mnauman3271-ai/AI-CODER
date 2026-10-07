"use client";

import React from 'react';
import { Conversation } from '@/types/chat';

interface SidebarProps {
  conversations: Conversation[];
  activeId: string;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeId,
  onSelectConversation,
  onNewChat,
}) => {
  return (
    <aside className="w-64 bg-gray-900 text-white h-screen flex flex-col p-4 border-r border-gray-800">
      <button
        onClick={onNewChat}
        className="w-full py-2 px-4 mb-6 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
      >
        <span>+</span> New Chat
      </button>

      <div className="flex-1 overflow-y-auto">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-2">
          Chat History
        </h2>
        <ul className="space-y-1">
          {conversations.map((chat) => (
            <li key={chat.id}>
              <button
                onClick={() => onSelectConversation(chat.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm truncate transition-colors ${
                  activeId === chat.id
                    ? 'bg-gray-800 text-white font-medium'
                    : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
                }`}
              >
                {chat.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}