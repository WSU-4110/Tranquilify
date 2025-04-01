import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
    },
    header: {
      fontSize: 24,
      marginBottom: 10,
      fontWeight: 'bold',
      textAlign: 'center',
    },
    entry: {
      padding: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      marginBottom: 10,
      position: 'relative',
    },
    entryHeader: {
      position: 'absolute',
      top: 5,
      right: 10,
    },
    dateText: {
      fontSize: 12,
      color: 'lightgrey',
    },
    entryText: {
      fontSize: 16,
      paddingRight: 60, // To ensure text doesn't overlap with the date
      paddingTop: 10,
    },
    actionButtons: {
      flexDirection: 'row',
      marginTop: 10,
    },
    actionButton: {
      marginRight: 15,
    },
    actionText: {
      fontSize: 14,
      color: '#007BFF',
    },
    emptyText: {
      textAlign: 'center',
      fontStyle: 'italic',
      color: '#666',
      marginVertical: 20,
    },
    inputContainer: {
      marginTop: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 10,
      borderRadius: 5,
      marginBottom: 10,
      minHeight: 60,
      textAlignVertical: 'top', // For Android
    },
    editInput: {
      borderWidth: 1,
      borderColor: '#aaa',
      padding: 10,
      borderRadius: 5,
      minHeight: 60,
      textAlignVertical: 'top',
    },
    editButtons: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginTop: 10,
    },
});

export default styles;