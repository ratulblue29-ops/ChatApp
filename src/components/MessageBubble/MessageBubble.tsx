import React from 'react';
import {Text, View} from 'react-native';
import {Message} from '../../types';
import styles from './styles';

type MessageBubbleProps = {
  message: Message;
  currentUserId: string;
};

const MessageBubble = ({message, currentUserId}: MessageBubbleProps) => {
  const isSent = message.senderId === currentUserId;

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  };

  return (
    <View style={[styles.container, isSent ? styles.sentContainer : styles.receivedContainer]}>
      <View style={[styles.bubble, isSent ? styles.sentBubble : styles.receivedBubble]}>
        {!isSent && (
          <Text style={styles.senderName}>{message.senderName}</Text>
        )}
        <Text style={[styles.messageText, isSent ? styles.sentText : styles.receivedText]}>
          {message.text}
        </Text>
        <Text style={[styles.timestamp, isSent ? styles.sentTimestamp : styles.receivedTimestamp]}>
          {formatTime(message.timestamp)}
        </Text>
      </View>
    </View>
  );
};

export default MessageBubble;