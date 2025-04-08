import { database } from './firebase/firebase';
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

// Get all chats for a user
export const getUserChats = (userId, callback) => {
  const chatsRef = ref(database, 'chats');
  return onValue(chatsRef, (snapshot) => {
    const chatsData = snapshot.val() || {};
    const userChats = [];
    for (let chatId in chatsData) {
      if (chatId.includes(userId)) {
        userChats.push({ id: chatId, ...chatsData[chatId] });
      }
    }
    callback(userChats);
  });
};

// Get all messages for a specific chat
export const getChatMessages = (chatId, callback) => {
  if (!chatId) return null;
  
  const messagesRef = ref(database, `chats/${chatId}/messages`);
  return onValue(messagesRef, (snapshot) => {
    const messagesData = snapshot.val() || {};
    const messagesList = Object.keys(messagesData).map((key) => ({
      id: key,
      ...messagesData[key],
    }));
    messagesList.sort((a, b) => a.timestamp - b.timestamp);
    callback(messagesList);
  });
};

// Find a therapist user by username and start a chat
export const startChatWithTherapist = async (currentUserId, therapistUsername) => {
  if (!therapistUsername.trim()) {
    return { success: false, error: 'Please enter a username' };
  }
  
  try {
    // Query the 'users' node for the target username
    const usersRef = ref(database, 'users');
    const userQuery = query(
      usersRef,
      orderByChild('username'),
      equalTo(therapistUsername.trim())
    );
    
    const snapshot = await get(userQuery);
    const userData = snapshot.val();
    
    if (!userData) {
      return { success: false, error: 'User does not exist.' };
    }
    
    // Assuming username is unique, get the first (and only) result
    const targetUserId = Object.keys(userData)[0];
    const targetUser = userData[targetUserId];
    
    if (targetUser.role !== 'therapist') {
      return { success: false, error: 'You can only message therapist users.' };
    }
    
    // Create a unique chat ID by sorting the two user IDs
    const chatId = [currentUserId, targetUserId].sort().join('_');
    const chatRef = ref(database, `chats/${chatId}`);
    
    const chatSnapshot = await get(chatRef);
    if (!chatSnapshot.exists()) {
      // Create a new chat if it doesn't exist
      await set(chatRef, {
        participants: {
          [currentUserId]: true,
          [targetUserId]: true,
        },
        messages: {},
      });
    }
    
    return { 
      success: true, 
      chat: {
        id: chatId,
        participants: { [currentUserId]: true, [targetUserId]: true },
      }
    };
  } catch (error) {
    console.error('Error starting chat:', error);
    return { success: false, error: 'An error occurred while starting the chat.' };
  }
};

// Send a message in a chat
export const sendChatMessage = (chatId, userId, messageText) => {
  if (!messageText.trim() || !chatId) return false;
  
  const messagesRef = ref(database, `chats/${chatId}/messages`);
  const messageData = {
    sender: userId,
    text: messageText.trim(),
    timestamp: Date.now(),
  };
  
  push(messagesRef, messageData);
  return true;
};