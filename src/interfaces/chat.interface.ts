export interface ChatMessage {
  id: number;
  user: string;
  message: string;
  fileId?: string;
  fileType?: string;
  time: string;
}

export interface ChatStore {
  chats: Record<string, ChatMessage[]>;
  currentChatId: string | null;
}