// messagingStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 60,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    position: 'relative', // Added for absolute positioning of children
  },
  sidebarToggle: {
    position: 'absolute',
    left: 15,
    padding: 10,
    zIndex: 10,
  },
  arrowButton: {
    fontSize: 24,
    color: '#0066cc', // Added blue color to make it more visible
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center', // Center the text
  },
  signOutButton: {
    position: 'absolute',
    right: 15,
    padding: 10,
    zIndex: 10,
  },
  signOutText: {
    color: '#0066cc',
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
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#fff',
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    paddingLeft: 15,
    minHeight: 40,
    maxHeight: 100,
    marginRight: 10,
    backgroundColor: '#f8f8f8',
  },
  sendButton: {
    backgroundColor: '#0066cc',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 20,
  },
  chatHeader: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  chatHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  aiProcessingText: {
    fontStyle: 'italic',
    color: '#888',
    padding: 5,
  },
  aiTherapistButton: {
    backgroundColor: '#4a90e2',
    padding: 12,
    borderRadius: 5,
    marginVertical: 10,
    marginHorizontal: 10,
  },
  aiTherapistButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});