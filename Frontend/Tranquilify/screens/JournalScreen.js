// JournalEntry.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { AuthContext } from '../AuthContext';
import { useContext } from 'react';
import {
  AddEntryCommand,
  DeleteEntryCommand,
  SaveEditCommand,
  CancelEditCommand,
} from '../js/JournalCommand';

const JournalEntry = () => {
  // State to store journal entries.
  const [entries, setEntries] = useState([]);
  // State to store new entry text.
  const [newEntry, setNewEntry] = useState('');
  // State to track the entry currently being edited.
  const [editingEntryId, setEditingEntryId] = useState(null);
  // State for the editing text.
  const [editingText, setEditingText] = useState('');

  const { signOut } = useContext(AuthContext);

  // Command-based function to add a new journal entry.
  const addEntry = () => {
    const command = new AddEntryCommand(newEntry, entries, setEntries, setNewEntry);
    command.execute();
  };

  // Command-based function to delete an entry.
  const deleteEntry = (id) => {
    const command = new DeleteEntryCommand(id, entries, setEntries);
    command.execute();
  };

  // Function to start editing an entry.
  const startEditing = (entry) => {
    setEditingEntryId(entry.id);
    setEditingText(entry.text);
  };

  // Command-based function to save the edited entry.
  const saveEdit = () => {
    const command = new SaveEditCommand(editingText, editingEntryId, entries, setEntries, cancelEditing);
    command.execute();
  };

  // Command-based function to cancel editing.
  const cancelEditing = () => {
    const command = new CancelEditCommand(() => {
      setEditingEntryId(null);
      setEditingText('');
    });
    command.execute();
  };

  // Render each journal entry.
  const renderItem = ({ item }) => {
    // Format the date using the entry's id (which is a timestamp).
    const date = new Date(parseInt(item.id, 10)).toLocaleString();

    if (item.id === editingEntryId) {
      return (
        <View style={styles.entry}>
          <View style={styles.entryHeader}>
            <Text style={styles.dateText}>{date}</Text>
          </View>
          <TextInput
            style={styles.editInput}
            value={editingText}
            onChangeText={setEditingText}
            multiline
          />
          <View style={styles.editButtons}>
            <Button title="Save" onPress={saveEdit} />
            <Button title="Cancel" onPress={cancelEditing} color="gray" />
          </View>
        </View>
      );
    }

    return (
      <View style={styles.entry}>
        <View style={styles.entryHeader}>
          <Text style={styles.dateText}>{date}</Text>
        </View>
        <Text style={styles.entryText}>{item.text}</Text>
        <View style={styles.actionButtons}>
          <TouchableOpacity onPress={() => startEditing(item)} style={styles.actionButton}>
            <Text style={styles.actionText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteEntry(item.id)} style={styles.actionButton}>
            <Text style={[styles.actionText, { color: 'red' }]}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      <TouchableOpacity onPress={signOut}>
        <Text>Sign Out</Text>
      </TouchableOpacity>

      <Text style={styles.header}>Journal Entries</Text>

      {/* List of Journal Entries */}
      <FlatList
        data={entries}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No entries yet. Start writing below!</Text>
        }
      />

      {/* Input to Add New Journal Entry */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newEntry}
          onChangeText={setNewEntry}
          placeholder="Write your journal entry..."
          multiline
        />
        <Button title="Add Entry" onPress={addEntry} />
      </View>
    </View>
  );
};

export default JournalEntry;

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
