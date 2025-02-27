import { create } from "zustand";
import { persist } from "zustand/middleware";

const useChatStore = create(
  persist(
    (set) => ({
      messages: [],
      addMessage: (role, content) =>
        set((state) => ({
          messages: [...state.messages, { role, content }],
        })),
      clearChat: () => set({ messages: [] }),
    }),
    { name: "chat-storage" } // Stores in localStorage
  )
);

export default useChatStore;

