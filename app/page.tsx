"use client";

import { useState, useRef, useEffect } from 'react';
import { Conversation, Message } from '@/types/chat';
import { Sidebar } from '@/components/Sidebar';
import { ChatMessage } from '@/components/ChatMessage';

export default function Home() {
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'New Conversation',
      messages: [],
    },
  ]);
  const [activeChatId, setActiveChatId] = useState<string>('1');
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = conversations.find((c) => c.id === activeChatId);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleNewChat = () => {
    const newChatId = Date.now().toString();
    const newChat: Conversation = {
      id: newChatId,
      title: `Conversation ${conversations.length + 1}`,
      messages: [],
    };
    setConversations((prev) => [newChat, ...prev]);
    setActiveChatId(newChatId);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !activeChatId) return;

    const userMsgText = inputMessage;
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newUserMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: userMsgText,
      timestamp: time,
    };

    // 1. Add user message
    setConversations((prev) =>
      prev.map((chat) => {
        if (chat.id === activeChatId) {
          const isFirstMessage = chat.messages.length === 0;
          return {
            ...chat,
            title: isFirstMessage ? userMsgText.slice(0, 20) + '...' : chat.title,
            messages: [...chat.messages, newUserMessage],
          };
        }
        return chat;
      })
    );

    setInputMessage('');

    // 2. Simulate AI Assistant Response
    setTimeout(() => {
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'assistant',
        text: `This is a fake assistant response to: "${userMsgText}"`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setConversations((prev) =>
        prev.map((chat) =>
          chat.id === activeChatId
            ? { ...chat, messages: [...chat.messages, assistantMsg] }
            : chat
        )
      );
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-gray-950 text-gray-100">
      {/* Sidebar */}
      <Sidebar
        conversations={conversations}
        activeId={activeChatId}
        onSelectConversation={setActiveChatId}
        onNewChat={handleNewChat}
      />

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col h-full">
        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {activeConversation?.messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
              Type a message to start the conversation.
            </div>
          ) : (
            activeConversation?.messages.map((msg) => (
              <ChatMessage key={msg.id} message={msg} />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Form */}
        <div className="p-4 border-t border-gray-800 bg-gray-900">
          <form onSubmit={handleSendMessage} className="flex gap-3 max-w-4xl mx-auto">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 text-white rounded-xl px-4 py-3 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}