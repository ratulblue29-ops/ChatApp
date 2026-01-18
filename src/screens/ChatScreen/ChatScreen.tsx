import React, {useState, useEffect, useRef} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation, useRoute, RouteProp} from '@react-navigation/native';
import {ArrowLeft, Send} from 'lucide-react-native';
import styles from './styles';
import {Message, RootStackParamList} from '../../types';
import MessageBubble from '../../components/MessageBubble/MessageBubble';
import {useSocket} from '../../contexts/SocketContext';

type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

const ChatScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<ChatScreenRouteProp>();
  const {chatId, chatName, avatar} = route.params;
  const {sendMessage, joinRoom, leaveRoom, messages, emitTyping} = useSocket();
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);
  const currentUserId = 'user_current';

  const roomMessages = messages.filter(msg => msg.roomId === chatId);

  useEffect(() => {
    joinRoom(chatId);
    return () => {
      leaveRoom(chatId);
    };
  }, [chatId]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({animated: true});
  }, [roomMessages]);

  const handleSend = () => {
    if (inputText.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        senderId: currentUserId,
        senderName: 'You',
        text: inputText.trim(),
        timestamp: Date.now(),
        roomId: chatId,
      };
      sendMessage(message);
      setInputText('');
    }
  };

  const handleTyping = () => {
    emitTyping(chatId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <ArrowLeft width={24} height={24} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Image source={{uri: avatar}} style={styles.headerAvatar} />
          <View>
            <Text style={styles.headerName}>{chatName}</Text>
            <Text style={styles.headerStatus}>Online</Text>
          </View>
        </View>

        <View style={styles.headerRight} />
      </View>

      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.messagesContainer}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({animated: true})
          }>
          {roomMessages.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No messages yet</Text>
              <Text style={styles.emptySubtext}>
                Start a conversation with {chatName}
              </Text>
            </View>
          ) : (
            roomMessages.map(message => (
              <MessageBubble
                key={message.id}
                message={message}
                currentUserId={currentUserId}
              />
            ))
          )}
        </ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            placeholderTextColor="#9E9E9E"
            value={inputText}
            onChangeText={text => {
              setInputText(text);
              handleTyping();
            }}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSend}
            disabled={!inputText.trim()}>
            <Send width={20} height={20} color={inputText.trim() ? '#111827' : '#7C7D7E'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;