import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid"; // Unique IDs for chats

const useChatStore = create(
  persist(
    (set, get) => ({
      conversations: [], // List of chats
      activeConversationId: null, // Current chat session

      // ✅ Create a new conversation
      createNewChat: () => {
        const newChat = {
          id: nanoid(),
          messages: [{ text: "Hi, I am ChatGPT.", isBot: true }],
        };

        set((state) => ({
          conversations: [...state.conversations, newChat],
          activeConversationId: newChat.id,
        }));
      },

      // ✅ Set active conversation
      setActiveConversation: (id) => set({ activeConversationId: id }),

      // ✅ Add messages to active conversation
      addMessage: (text, isBot) => {
        set((state) => {
          const updatedChats = state.conversations.map((chat) =>
            chat.id === state.activeConversationId
              ? { ...chat, messages: [...chat.messages, { text, isBot }] }
              : chat
          );
          return { conversations: updatedChats };
        });
      },

      // ✅ Get active chat messages
      getActiveMessages: () => {
        const activeChat = get().conversations.find(
          (chat) => chat.id === get().activeConversationId
        );
        return activeChat ? activeChat.messages : [];
      },
    }),
    { name: "chat-storage" } // Persists chat in localStorage
  )
);

export default useChatStore;
