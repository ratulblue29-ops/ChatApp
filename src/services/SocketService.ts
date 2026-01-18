import {io, Socket} from 'socket.io-client';
import {Message} from '../types';

class SocketService {
  private socket: Socket | null = null;
  private readonly SOCKET_URL = 'http://10.0.80.7:3000';

  connect(userId: string): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.socket = io(this.SOCKET_URL, {
          transports: ['websocket'],
          reconnection: true,
          reconnectionDelay: 1000,
          reconnectionDelayMax: 5000,
          reconnectionAttempts: 5,
          query: {userId},
        });

        this.socket.on('connect', () => {
          console.log('Socket connected:', this.socket?.id);
          resolve();
        });

        this.socket.on('connect_error', error => {
          console.error('Connection error:', error);
          reject(error);
        });

        this.socket.on('disconnect', reason => {
          console.log('Socket disconnected:', reason);
        });

        this.socket.on('error', error => {
          console.error('Socket error:', error);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinRoom(roomId: string): void {
    if (this.socket) {
      this.socket.emit('join_room', roomId);
    }
  }

  leaveRoom(roomId: string): void {
    if (this.socket) {
      this.socket.emit('leave_room', roomId);
    }
  }

  sendMessage(message: Message): void {
    if (this.socket) {
      this.socket.emit('send_message', message);
    }
  }

  onMessageReceived(callback: (message: Message) => void): void {
    if (this.socket) {
      this.socket.on('receive_message', callback);
    }
  }

  onUserTyping(callback: (data: {userId: string; roomId: string}) => void): void {
    if (this.socket) {
      this.socket.on('user_typing', callback);
    }
  }

  emitTyping(roomId: string): void {
    if (this.socket) {
      this.socket.emit('typing', roomId);
    }
  }

  onUserOnline(callback: (userId: string) => void): void {
    if (this.socket) {
      this.socket.on('user_online', callback);
    }
  }

  onUserOffline(callback: (userId: string) => void): void {
    if (this.socket) {
      this.socket.on('user_offline', callback);
    }
  }

  removeListener(event: string): void {
    if (this.socket) {
      this.socket.off(event);
    }
  }

  removeAllListeners(): void {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }

  isConnected(): boolean {
    return this.socket?.connected || false;
  }

  getSocket(): Socket | null {
    return this.socket;
  }
}

export default new SocketService();