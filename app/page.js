"use client";
import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";
import { sendMsgToOpenAI } from "@/app/openai";
export default function Home() {
  const msgEnd = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      text: "Hi, I am ChatGPT.",
      isBot: true,
    },
  ]);

  useEffect(() => {
    msgEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const text = input;
    setInput("");
    setMessages((prev) => [...prev, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(text);
    setMessages((prev) => [...prev, { text: res, isBot: true }]);
  };

  const handleEnter = async (e) => {
    if (e.key === "Enter") await handleSend();
  };

  const handleQuery = async (e) => {
    const text = e.target.value;
    setMessages((prev) => [...prev, { text, isBot: false }]);
    const res = await sendMsgToOpenAI(text);
    setMessages((prev) => [...prev, { text: res, isBot: true }]);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 p-6 flex flex-col border-r border-gray-700">
        <div className="flex items-center mb-6">
          <Image src="/chatgpt.svg" alt="chatgpt" className="w-8 h-8 mr-2" width={20} height={20}/>
          <span className="text-lg font-bold">ChatGPT</span>
        </div>
        <button 
          className="w-full bg-blue-600 hover:bg-blue-700 py-3 rounded mb-4 flex items-center justify-center"
          onClick={() => window.location.reload()}
        >
          <Image src= "/add-30.png" alt="new chat" className="w-5 h-5 mr-2" width={20} height={20}/>New Chat
        </button>
        <div className="flex flex-col space-y-2">
          <button className="bg-gray-700 p-3 rounded flex items-center" onClick={handleQuery} value="What is Programming ?">
            <Image src="/message.svg" alt="Query" className="w-5 h-5 mr-2" width={20} height={20}/>What is Programming ?
          </button>
          <button className="bg-gray-700 p-3 rounded flex items-center" onClick={handleQuery} value="How to use an API ?">
            <Image src="/message.svg" alt="Query" className="w-5 h-5 mr-2"  width={20} height={20}/>How to use an API ?
          </button>
        </div>
      </div>

      {/* Chat Main Area */}
      <div className="flex-1 flex flex-col p-6">
        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.map((message, i) => (
            <div key={i} className={`flex ${message.isBot ? "bg-gray-800 p-4 rounded" : "justify-end"}`}>
              <Image className="w-10 h-10 rounded mr-3" src={message.isBot ? "/chatgptLogo.svg" : "/user-icon.png"} alt={message.isBot ? "Bot" : "User"} width={20} height={20}/>
              <p className="text-gray-300">{message.text}</p>
            </div>
          ))}
          <div ref={msgEnd} />
        </div>
        
        {/* Chat Input */}
        <div className="mt-auto p-4 bg-gray-800 flex items-center rounded">
          <input 
            type="text" 
            className="flex-1 p-3 bg-transparent border border-gray-600 rounded focus:outline-none text-white" 
            placeholder="How can ChatGPT help you?" 
            value={input} 
            onKeyDown={handleEnter} 
            onChange={(e) => setInput(e.target.value)}
          />
          <button className="ml-4 p-2 bg-blue-600 hover:bg-blue-700 rounded" onClick={handleSend}>
            <Image src="/send.svg" alt="Send" className="w-6 h-6" width={20} height={20}/>
          </button>
        </div>
        <p className="text-gray-500 text-sm text-center mt-2">ChatGPT may produce incorrect results or inaccurate information.</p>
      </div>
    </div>
  );
}
