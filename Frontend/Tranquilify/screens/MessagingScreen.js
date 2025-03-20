// MessagingScreen.js
import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { database } from '../firebase/firebase';
import {
  ref,
  onValue,
  push,
  set,
  get,
  orderByChild,
  query,
  equalTo,
} from 'firebase/database';
import { AuthContext } from '../AuthContext';

const MessagingScreen = () => {
  const { uid, signOut } = useContext(AuthContext);
  const user = { uid };

  // States for chats, selected chat, messages, error, etc.
  const [chatList, setChatList] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [newChatUser, setNewChatUser] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState(null);
  // Toggle for showing/hiding the sidebar (chat selector)
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  // Fetch chats that involve the current user.
  useEffect(() => {
    const chatsRef = ref(database, 'chats');
    const unsubscribe = onValue(chatsRef, (snapshot) => {
      const chatsData = snapshot.val() || {};
      const userChats = [];
      for (let chatId in chatsData) {
        if (chatId.includes(user.uid)) {
          userChats.push({ id: chatId, ...chatsData[chatId] });
        }
      }
      setChatList(userChats);
    });
    return () => unsubscribe();
  }, [user]);

  // Listen for messages in the selected chat.
  useEffect(() => {
    if (!selectedChat) return;
    const messagesRef = ref(database, `chats/${selectedChat.id}/messages`);
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const messagesData = snapshot.val() || {};
      const messagesList = Object.keys(messagesData).map((key) => ({
        id: key,
        ...messagesData[key],
      }));
      messagesList.sort((a, b) => a.timestamp - b.timestamp);
      setMessages(messagesList);
    });
    return () => unsubscribe();
  }, [selectedChat]);

  // Function to start a new chat with a therapist.
  const startChat = () => {
    setError(null);
    if (!newChatUser.trim()) return;
    const targetUsername = newChatUser.trim();

    // Query the 'users' node for the target username.
    const usersRef = ref(database, 'users');
    const userQuery = query(
      usersRef,
      orderByChild('username'),
      equalTo(targetUsername)
    );
    get(userQuery)
      .then((snapshot) => {
        const userData = snapshot.val();
        if (!userData) {
          setError('User does not exist.');
          return;
        }
        // Assuming username is unique, get the first (and only) result.
        const targetUserId = Object.keys(userData)[0];
        const targetUser = userData[targetUserId];
        if (targetUser.role !== 'therapist') {
          setError('You can only message therapist users.');
          return;
        }
        // Create a unique chat ID by sorting the two user IDs.
        const chatId = [user.uid, targetUserId].sort().join('_');
        const chatRef = ref(database, `chats/${chatId}`);
        get(chatRef).then((chatSnapshot) => {
          if (!chatSnapshot.exists()) {
            // Create a new chat if it doesn't exist.
            set(chatRef, {
              participants: {
                [user.uid]: true,
                [targetUserId]: true,
              },
              messages: {},
            });
          }
          // Select this chat and hide the sidebar.
          setSelectedChat({
            id: chatId,
            participants: { [user.uid]: true, [targetUserId]: true },
          });
          setIsSidebarVisible(false);
        });
      })
      .catch((error) => {
        console.error('Error starting chat:', error);
        setError('An error occurred while starting the chat.');
      });
  };

  // Function to send a message in the selected chat.
  const sendMessage = () => {
    if (!newMessage.trim() || !selectedChat) return;
    const messagesRef = ref(database, `chats/${selectedChat.id}/messages`);
    const messageData = {
      sender: user.uid,
      text: newMessage.trim(),
      timestamp: Date.now(),
    };
    push(messagesRef, messageData);
    setNewMessage('');
  };

  // Render each chat item in the sidebar.
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

  // Render each message in the chat.
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
        <Text style={styles.header}>Chat</Text>
        <TouchableOpacity onPress={signOut} style={styles.signOutButton}>
          <Text style={styles.signOutText}>Sign Out</Text>
        </TouchableOpacity>
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
              <Button title="Start Chat" onPress={startChat} />
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
                  style={styles.input}
                  placeholder="Type your message..."
                  value={newMessage}
                  onChangeText={setNewMessage}
                />
                <Button title="Send" onPress={sendMessage} />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  sidebarToggle: {
    padding: 10,
  },
  arrowButton: {
    fontSize: 24,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  signOutButton: {
    padding: 10,
  },
  signOutText: {
    color: 'blue',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: 250,
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRightWidth: 1,
    borderColor: '#ccc',
  },
  sidebarHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  newChatContainer: {
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
    minHeight: 40,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginVertical: 5,
  },
  chatContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  messagesList: {
    flex: 1,
  },
  noChatSelected: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noChatText: {
    fontSize: 16,
    color: '#666',
  },
  chatItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginVertical: 5,
  },
  chatText: {
    fontSize: 16,
  },
  messageItem: {
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#ECECEC',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  timestamp: {
    fontSize: 10,
    textAlign: 'right',
    color: 'gray',
  },
  messageInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
