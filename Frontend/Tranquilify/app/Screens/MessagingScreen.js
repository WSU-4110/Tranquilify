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
  sendChatMessage,
  getUsernameById,
  startChatWithAITherapist,
  sendMessageToAITherapist,
  AI_THERAPIST_USERNAME,
  AI_THERAPIST_ID,
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
  const [chatUsers, setChatUsers] = useState({});
  const [usernames, setUsernames] = useState({});
  const [isProcessingAIMessage, setIsProcessingAIMessage] = useState(false);
  // Toggle for showing/hiding the sidebar (chat selector)
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Fetch chats that involve the current user
  useEffect(() => {
    const unsubscribe = getUserChats(user.uid, async (userChats) => {
      setChatList(userChats);
      
      // Fetch usernames for each participant
      const usernamesData = {...usernames};
      
      for (let chat of userChats) {
        const otherUserId = Object.keys(chat.participants).find(
          (uid) => uid !== user.uid
        );
        
        if (otherUserId && !usernames[otherUserId]) {
          const result = await getUsernameById(otherUserId);
          if (result.success) {
            usernamesData[otherUserId] = result.username;
          }
        }
      }
      
      setUsernames(usernamesData);
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
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return;
    
    if (selectedChat.isAIChat) {
      setIsProcessingAIMessage(true);
      if (await sendMessageToAITherapist(selectedChat.id, user.uid, newMessage)) {
        setNewMessage('');
      }
      setIsProcessingAIMessage(false);
    } else {
      if (sendChatMessage(selectedChat.id, user.uid, newMessage)) {
        setNewMessage('');
      }
    }
  };

  // Render each chat item in the sidebar
  const renderChatItem = ({ item }) => {
    // If it's an AI chat, use the AI username
    if (item.isAIChat) {
      return (
        <TouchableOpacity
          style={styles.chatItem}
          onPress={() => {
            setSelectedChat(item);
            setIsSidebarVisible(false);
          }}
        >
          <Text style={styles.chatText}>Chat with {AI_THERAPIST_USERNAME}</Text>
        </TouchableOpacity>
      );
    }
    
    // Otherwise, handle regular chats
    const targetUserId = Object.keys(item.participants).find(
      (uid) => uid !== user.uid
    );
    
    // Get username or use ID as fallback
    const username = usernames[targetUserId] || targetUserId;
    
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => {
          setSelectedChat({...item, otherUserId: targetUserId});
          setIsSidebarVisible(false);
        }}
      >
        <Text style={styles.chatText}>Chat with {username}</Text>
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

  const handleStartAIChat = async () => {
    setError(null);
    
    const result = await startChatWithAITherapist(user.uid);
    
    if (result.success) {
      setSelectedChat(result.chat);
      setIsSidebarVisible(false);
    } else {
      setError(result.error);
    }
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
        <Text style={styles.header}>Chat</Text>
      </View>

      {/* Main content area */}
      <View style={styles.content}>
        {/* Sidebar for chat selection and new chat creation */}
        {isSidebarVisible && (
          <KeyboardAvoidingView 
            style={styles.sidebar}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 130 : 0}
          >
            <Text style={styles.sidebarHeader}>Chats</Text>
            <FlatList
              data={chatList}
              keyExtractor={(item) => item.id}
              renderItem={renderChatItem}
              ListEmptyComponent={
                <Text style={styles.emptyText}>No chats yet.</Text>
              }
            />
            
            <TouchableOpacity
              style={styles.aiTherapistButton}
              onPress={handleStartAIChat}
            >
              <Text style={styles.aiTherapistButtonText}>Chat with AI Therapist</Text>
            </TouchableOpacity>
            
            <View style={styles.newChatContainer}>
              <TextInput
                style={styles.input}
                placeholder="Enter therapist username..."
                value={newChatUser}
                onChangeText={setNewChatUser}
                autoCapitalize="none"
              />
              <Button title="Start Chat" onPress={handleStartChat} />
            </View>
            {error && <Text style={styles.errorText}>{error}</Text>}
          </KeyboardAvoidingView>
        )}

        {/* Chat conversation area */}
        <View style={styles.chatContainer}>
          {selectedChat ? (
            <>
            <View style={styles.chatHeader}>
              <Text style={styles.chatHeaderText}>
                {selectedChat.isAIChat 
                  ? AI_THERAPIST_USERNAME 
                  : (usernames[selectedChat.otherUserId] || selectedChat.otherUserId)
                }
              </Text>
            </View>
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
                keyboardVerticalOffset={130}
              >
                {isProcessingAIMessage && (
                  <Text style={styles.aiProcessingText}>AI is thinking...</Text>
                )}
                <TextInput
                  style={styles.messageInput}
                  placeholder="Type your message..."
                  value={newMessage}
                  onChangeText={setNewMessage}
                  multiline={true}
                  autoCapitalize="none"
                />
                <TouchableOpacity 
                  style={styles.sendButton} 
                  onPress={handleSendMessage}
                  disabled={!newMessage.trim() || isProcessingAIMessage}
                >
                  <Ionicons 
                    name="arrow-up" 
                    size={24} 
                    color={(newMessage.trim() && !isProcessingAIMessage) ? "#fff" : "#cccccc"} 
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