"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import { sendMsgToOpenAI } from "@/app/openai";
import useChatStore from "./store";

export default function Home() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // ✅ Sidebar toggle

  const {
    conversations,
    activeConversationId,
    createNewChat,
    setActiveConversation,
    addMessage,
  } = useChatStore();

  const messages =
    conversations.find((chat) => chat.id === activeConversationId)?.messages || [];

  useEffect(() => {
    if (conversations.length === 0) {
      createNewChat();
    } else if (!activeConversationId) {
      setActiveConversation(conversations[0].id);
    }
  }, [conversations, activeConversationId, createNewChat, setActiveConversation]);

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !activeConversationId) return;

    const text = input;
    setInput("");
    addMessage(text, false);

    try {
      const res = await sendMsgToOpenAI(text);
      addMessage(res, true);
    } catch (error) {
      addMessage("Error: Unable to fetch response.", true);
    }
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  return (
    <div className="flex h-screen bg-black text-white">
      {/* Sidebar - Responsive */}
      <div className={`fixed md:relative z-10 bg-black transition-all duration-300 ${isSidebarOpen ? "w-64" : "w-0"} md:w-1/5 h-full overflow-hidden`}>
        <div className="p-6 flex flex-col border-r border-gray-700">
          <div className="flex items-center mb-6">
            <Image src="/chatgpt.svg" alt="ChatGPT" className="w-8 h-8 mr-2" width={20} height={20} />
            <span className="text-lg font-bold">ChatGPT</span>
          </div>
          <button 
            className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded mb-4 flex items-center justify-center"
            onClick={createNewChat} 
          >
            <Image src="/add-30.png" alt="New Chat" className="w-5 h-5 mr-2" width={20} height={20} />New Chat
          </button>

          {/* Chat List */}
          <div className="flex flex-col space-y-2">
            {conversations.map((chat) => (
              <button 
                key={chat.id} 
                className={`p-3 rounded flex items-center ${chat.id === activeConversationId ? "bg-gray-700" : "bg-gray-600"}`}
                onClick={() => setActiveConversation(chat.id)}
              >
                <Image src="/message.svg" alt="Chat" className="w-5 h-5 mr-2" width={20} height={20} />
                Chat {chat.id.slice(0, 6)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Main Area */}
      <div className="flex-1 flex flex-col p-4 md:p-6">
        {/* Mobile Sidebar Toggle Button */}
        <button 
          className="md:hidden bg-gray-700 p-2 rounded mb-2 w-10 h-10 flex items-center justify-center"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Image src="/menu.svg" alt="Menu" className="w-6 h-6" width={24} height={24} />
        </button>

        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.map((message, i) => (
            <div key={i} className={`flex ${message.isBot ? "bg-gray-800 p-4 rounded" : "justify-end"}`}>
              <Image className="w-8 h-8 md:w-10 md:h-10 rounded mr-3" 
                src={message.isBot ? "/chatgptLogo.svg" : "/user-icon.png"} 
                alt={message.isBot ? "Bot" : "User"} 
                width={20} height={20}
              />
              <div className="text-gray-300 max-w-xs md:max-w-lg bg-gray-700 p-3 rounded-lg">
                <Markdown>{message.text}</Markdown>
              </div>
            </div>
          ))}
          <div ref={msgEnd} />
        </div>
        
        {/* Chat Input */}
        <div className="mt-auto p-4 bg-gray-800 flex items-center rounded">
          <input 
            type="text" 
            className="flex-1 p-3 bg-transparent border border-gray-600 rounded focus:outline-none text-white text-sm md:text-base" 
            placeholder="How can ChatGPT help you?" 
            value={input} 
            onKeyDown={handleEnter} 
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="ml-2 md:ml-4 p-2 bg-blue-600 hover:bg-blue-700 rounded" onClick={handleSend}>
            <Image src="/send.svg" alt="Send" className="w-5 h-5 md:w-6 md:h-6" width={20} height={20} />
          </button>
        </div>
        
      </div>
    </div>
  );
}
