import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

const useChatStore = create((set) => ({
  conversations: [],
  activeConversationId: null,

  createNewChat: () => {
    const newChat = { id: uuidv4(), messages: [] };
    set((state) => ({
      conversations: [...state.conversations, newChat],
      activeConversationId: newChat.id,
    }));
  },

  setActiveConversation: (id) => set({ activeConversationId: id }),

  addMessage: (text, isBot) => {
    set((state) => ({
      conversations: state.conversations.map((chat) =>
        chat.id === state.activeConversationId
          ? { ...chat, messages: [...chat.messages, { text, isBot }] }
          : chat
      ),
    }));
  },

  deleteConversation: (id) => {
    set((state) => {
      const updatedChats = state.conversations.filter((chat) => chat.id !== id);
      return {
        conversations: updatedChats,
        activeConversationId: updatedChats.length > 0 ? updatedChats[0].id : null,
      };
    });
  },

  clearAllConversations: () => set({ conversations: [], activeConversationId: null }),
}));

export default useChatStore;
