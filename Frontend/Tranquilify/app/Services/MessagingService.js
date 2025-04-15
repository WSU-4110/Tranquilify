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


export const createUser = (userId) => {
  // const userRef = ref(database, 'users2/');
  // const userRef = ref(database, `users2/${userId}`);
  const userRef = ref(database, `users2/${userId}`);
  set(userRef, {
    'role': 'client', 'username': 'default'
  });
}

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

export const getUserData = async (userId) => {
  try {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    
    if (snapshot.exists()) {
      return { success: true, userData: snapshot.val() };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
    return { success: false, error: 'Error fetching user data' };
  }
};

export const getUsernameById = async (userId) => {
  try {
    const userRef = ref(database, `users/${userId}`);
    const snapshot = await get(userRef);
    
    if (snapshot.exists()) {
      const userData = snapshot.val();
      return { success: true, username: userData.username || userId };
    } else {
      return { success: false, error: 'User not found' };
    }
  } catch (error) {
    console.error('Error fetching username:', error);
    return { success: false, error: 'Error fetching username' };
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


// AI Therapist Constants
export const AI_THERAPIST_ID = 'ai-therapist';
export const AI_THERAPIST_USERNAME = 'AI Therapist';
// Use the environment variable for the API URL
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080'; 
const AI_ENDPOINT = `${API_BASE_URL}/suggestion`;

// Start or get chat with AI Therapist
export const startChatWithAITherapist = async (userId) => {
  try {
    // Create a chat ID using user ID and AI therapist ID
    const chatId = [userId, AI_THERAPIST_ID].sort().join('_');
    const chatRef = ref(database, `chats/${chatId}`);
    
    // Check if chat already exists
    const chatSnapshot = await get(chatRef);
    if (!chatSnapshot.exists()) {
      // Create a new chat if it doesn't exist
      await set(chatRef, {
        participants: {
          [userId]: true,
          [AI_THERAPIST_ID]: true,
        },
        messages: {},
        isAIChat: true
      });
    }
    
    return { 
      success: true, 
      chat: {
        id: chatId,
        participants: { [userId]: true, [AI_THERAPIST_ID]: true },
        isAIChat: true
      }
    };
  } catch (error) {
    console.error('Error starting AI chat:', error);
    return { success: false, error: 'An error occurred while starting the AI chat.' };
  }
};

// Send message to AI Therapist and get response
export const sendMessageToAITherapist = async (chatId, userId, messageText) => {
  if (!messageText.trim() || !chatId) return false;
  
  try {
    // Save user message
    const messagesRef = ref(database, `chats/${chatId}/messages`);
    const userMessageData = {
      sender: userId,
      text: messageText.trim(),
      timestamp: Date.now(),
    };
    
    // Push user message
    const newMessageRef = push(messagesRef, userMessageData);
    
    // Get AI response
    const response = await fetch(`${AI_ENDPOINT}?query=${encodeURIComponent(messageText)}`);
    const aiResponse = await response.text();
    
    // Save AI response
    const aiMessageData = {
      sender: AI_THERAPIST_ID,
      text: aiResponse,
      timestamp: Date.now() + 1, // +1 to ensure it appears after user message
    };
    
    // Push AI response
    push(messagesRef, aiMessageData);
    
    return true;
  } catch (error) {
    console.error('Error sending message to AI:', error);
    // Still return true because the user message was sent
    return true;
  }
};