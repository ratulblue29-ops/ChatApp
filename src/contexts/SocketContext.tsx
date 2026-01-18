import React, {createContext, useContext, useEffect, useState} from 'react';
import SocketService from '../services/SocketService';
import {Message} from '../types';

type SocketContextType = {
  isConnected: boolean;
  sendMessage: (message: Message) => void;
  joinRoom: (roomId: string) => void;
  leaveRoom: (roomId: string) => void;
  emitTyping: (roomId: string) => void;
  messages: Message[];
};

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider = ({children}: {children: React.ReactNode}) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const userId = 'user_' + Math.random().toString(36).substr(2, 9);

    SocketService.connect(userId)
      .then(() => {
        setIsConnected(true);
        console.log('Connected to socket server');
      })
      .catch(error => {
        console.error('Failed to connect:', error);
        setIsConnected(false);
      });

    SocketService.onMessageReceived((message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    return () => {
      SocketService.removeAllListeners();
      SocketService.disconnect();
    };
  }, []);

  const sendMessage = (message: Message) => {
    SocketService.sendMessage(message);
    setMessages(prev => [...prev, message]);
  };

  const joinRoom = (roomId: string) => {
    SocketService.joinRoom(roomId);
  };

  const leaveRoom = (roomId: string) => {
    SocketService.leaveRoom(roomId);
  };

  const emitTyping = (roomId: string) => {
    SocketService.emitTyping(roomId);
  };

  return (
    <SocketContext.Provider
      value={{
        isConnected,
        sendMessage,
        joinRoom,
        leaveRoom,
        emitTyping,
        messages,
      }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};