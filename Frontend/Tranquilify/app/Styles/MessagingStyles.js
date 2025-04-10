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
  emptyText: {
    textAlign: 'center',
    color: '#666',
    marginVertical: 20,
  },
});