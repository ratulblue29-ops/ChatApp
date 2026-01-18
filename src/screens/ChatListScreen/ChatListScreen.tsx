import React, {useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Search, MessageCircle} from 'lucide-react-native';
import styles from './styles';
import {Chat, RootStackParamList} from '../../types';
import ChatCard from '../../components/ChatCard/ChatCard';
import {useSocket} from '../../contexts/SocketContext';

const ChatListScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const {isConnected} = useSocket();
  const [searchQuery, setSearchQuery] = useState('');

  const chats: Chat[] = [
    {
      id: 'room_1',
      name: 'Alex Thompson',
      lastMessage: 'Hey! How are you doing?',
      timestamp: Date.now() - 300000,
      unreadCount: 2,
      avatar: 'https://i.pravatar.cc/150?u=alex',
      isOnline: true,
    },
    {
      id: 'room_2',
      name: 'Sarah Miller',
      lastMessage: 'See you tomorrow!',
      timestamp: Date.now() - 3600000,
      unreadCount: 0,
      avatar: 'https://i.pravatar.cc/150?u=sarah',
      isOnline: true,
    },
    {
      id: 'room_3',
      name: 'Mike Johnson',
      lastMessage: 'Thanks for your help',
      timestamp: Date.now() - 7200000,
      unreadCount: 5,
      avatar: 'https://i.pravatar.cc/150?u=mike',
      isOnline: false,
    },
    {
      id: 'room_4',
      name: 'Emma Wilson',
      lastMessage: 'Great work on the project!',
      timestamp: Date.now() - 86400000,
      unreadCount: 0,
      avatar: 'https://i.pravatar.cc/150?u=emma',
      isOnline: true,
    },
  ];

  const filteredChats = chats.filter(chat =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const handleChatPress = (chat: Chat) => {
    navigation.navigate('Chat', {
      chatId: chat.id,
      chatName: chat.name,
      avatar: chat.avatar,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <View style={styles.connectionStatus}>
          <View
            style={[
              styles.statusDot,
              isConnected ? styles.statusConnected : styles.statusDisconnected,
            ]}
          />
          <Text style={styles.statusText}>
            {isConnected ? 'Connected' : 'Offline'}
          </Text>
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Search width={20} height={20} color="#9E9E9E" />
        <TextInput
          placeholder="Search messages..."
          placeholderTextColor="#9E9E9E"
          style={styles.input}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <MessageCircle width={20} height={20} color="#FFD900" />
            <Text style={styles.statNumber}>{chats.length}</Text>
            <Text style={styles.statLabel}>Active Chats</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.unreadIcon}>
              <Text style={styles.unreadIconText}>
                {chats.reduce((sum, chat) => sum + chat.unreadCount, 0)}
              </Text>
            </View>
            <Text style={styles.statNumber}>
              {chats.reduce((sum, chat) => sum + chat.unreadCount, 0)}
            </Text>
            <Text style={styles.statLabel}>Unread</Text>
          </View>
        </View>

        {filteredChats.length === 0 ? (
          <View style={styles.emptyState}>
            <MessageCircle width={48} height={48} color="#9E9E9E" />
            <Text style={styles.emptyText}>No chats found</Text>
          </View>
        ) : (
          filteredChats.map(chat => (
            <ChatCard
              key={chat.id}
              chat={chat}
              onPress={() => handleChatPress(chat)}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChatListScreen;