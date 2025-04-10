import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { AuthContext } from '../Services/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { 
  getUserChats, 
  getChatMessages, 
  startChatWithTherapist, 
  sendChatMessage 
} from '../Services/MessagingService';
import { styles } from '../Styles/MessagingStyles';

const MessagingScreen = () => {
  // Try to get authentication context, fall back to dummy user if not available
  const authContext = useContext(AuthContext);
  const dummyUser = { uid: 'user3UID' };
  
  // Use authenticated user with token if available, otherwise use dummy user
  // In Firebase, we'll use the userToken as the uid for database operations
  // const user = authContext?.userToken ? { uid: authContext.userToken } : dummyUser;
  const user = dummyUser;

  
  // Get first name from context if available
  const firstName = authContext?.firstName || 'User';
  
  // Use context's signOut if available, otherwise show alert
  const handleSignOut = () => {
    if (authContext?.signOut) {
      authContext.signOut();
    } else {
      Alert.alert('Sign Out', 'Sign out functionality will be implemented when authentication is fully connected.');
    }
  };

  // States for chats, selected chat, messages, error, etc.
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newChatUser, setNewChatUser] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  // Toggle for showing/hiding the sidebar (chat selector)
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Fetch chats that involve the current user
  useEffect(() => {
    const unsubscribe = getUserChats(user.uid, (userChats) => {
      setChatList(userChats);
    });
    return () => unsubscribe();
  }, [user]);

  // Listen for messages in the selected chat
  useEffect(() => {
    if (!selectedChat) return;
    
    const unsubscribe = getChatMessages(selectedChat.id, (messagesList) => {
      setMessages(messagesList);
    });
    
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [selectedChat]);

  // Function to start a new chat with a therapist
  const handleStartChat = async () => {
    setError(null);
    
    const result = await startChatWithTherapist(user.uid, newChatUser);
    
    if (result.success) {
      setSelectedChat(result.chat);
      setIsSidebarVisible(false);
      setNewChatUser('');
    } else {
      setError(result.error);
    }
  };

  // Function to send a message in the selected chat
  const handleSendMessage = () => {
    if (sendChatMessage(selectedChat.id, user.uid, newMessage)) {
      setNewMessage('');
    }
  };

  // Render each chat item in the sidebar
  const renderChatItem = ({ item }) => {
    const targetUserId = Object.keys(item.participants).find(
      (uid) => uid !== user.uid
    );
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => {
          setSelectedChat(item);
          setIsSidebarVisible(false);
        }}
      >
        <Text style={styles.chatText}>Chat with {targetUserId}</Text>
      </TouchableOpacity>
    );
  };

  // Render each message in the chat
  const renderMessageItem = ({ item }) => {
    return (
      <View
        style={[
          styles.messageItem,
          item.sender === user.uid ? styles.myMessage : styles.theirMessage,
        ]}
      >
        <Text style={styles.messageText}>{item.text}</Text>
        <Text style={styles.timestamp}>
          {new Date(item.timestamp).toLocaleTimeString()}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header with sidebar toggle arrow and Sign Out */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => setIsSidebarVisible(!isSidebarVisible)}
          style={styles.sidebarToggle}
        >
          <Text style={styles.arrowButton}>
            {isSidebarVisible ? '<' : '>'}
          </Text>
        </TouchableOpacity>
        <Text style={styles.header}>Chat ({firstName})</Text>
      </View>

      {/* Main content area */}
      <View style={styles.content}>
        {/* Sidebar for chat selection and new chat creation */}
        {isSidebarVisible && (
          <View style={styles.sidebar}>
            <Text style={styles.sidebarHeader}>Chats</Text>
            <FlatList
              data={chatList}
              keyExtractor={(item) => item.id}
              renderItem={renderChatItem}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No chats yet.</Text>
              }
            />
            <View style={styles.newChatContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter therapist username..."
                value={newChatUser}
                onChangeText={setNewChatUser}
              />
              <Button title="Start Chat" onPress={handleStartChat} />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </View>
        )}

        {/* Chat conversation area */}
        <View style={styles.chatContainer}>
          {selectedChat ? (
            <>
              <FlatList
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={renderMessageItem}
                ListEmptyComponent={
                  <Text style={styles.emptyText}>No messages yet.</Text>
                }
                style={styles.messagesList}
              />
              <KeyboardAvoidingView
                style={styles.messageInputContainer}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={90}
              >
                <TextInput
                  style={styles.messageInput}
                  placeholder="Type your message..."
                  value={newMessage}
                  onChangeText={setNewMessage}
                  multiline={true}
                />
                <TouchableOpacity 
                  style={styles.sendButton} 
                  onPress={handleSendMessage}
                  disabled={!newMessage.trim()}
                >
                  <Ionicons 
                    name="arrow-up" 
                    size={24} 
                    color={newMessage.trim() ? "#fff" : "#cccccc"} 
                  />
                </TouchableOpacity>
              </KeyboardAvoidingView>
            </>
          ) : (
            <View style={styles.noChatSelected}>
              <Text style={styles.noChatText}>
                Select a chat from the sidebar or start a new one.
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default MessagingScreen;