export type Message = {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: number;
  roomId: string;
};

export type Chat = {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: number;
  unreadCount: number;
  avatar: string;
  isOnline: boolean;
};

export type User = {
  id: string;
  name: string;
  avatar: string;
};

export type RootStackParamList = {
  ChatList: undefined;
  Chat: {
    chatId: string;
    chatName: string;
    avatar: string;
  };
};