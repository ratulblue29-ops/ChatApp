import React from 'react';
import {Text, View, TouchableOpacity, Image} from 'react-native';
import {Chat} from '../../types';
import styles from './styles';

type ChatCardProps = {
  chat: Chat;
  onPress: () => void;
};

const ChatCard = ({chat, onPress}: ChatCardProps) => {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <Image source={{uri: chat.avatar}} style={styles.avatar} />
        {chat.isOnline && <View style={styles.onlineDot} />}
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.topRow}>
          <Text style={styles.name}>{chat.name}</Text>
          <Text style={styles.time}>{formatTime(chat.timestamp)}</Text>
        </View>

        <View style={styles.bottomRow}>
          <Text style={styles.lastMessage} numberOfLines={1}>
            {chat.lastMessage}
          </Text>
          {chat.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadText}>{chat.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ChatCard;