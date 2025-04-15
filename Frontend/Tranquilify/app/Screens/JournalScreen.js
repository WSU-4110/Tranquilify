// JournalEntry.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TextInput, Button, TouchableOpacity, StyleSheet, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import NotesComponent from '../Components/NotesComponent';
import { getEntry, addEntry } from '../Services/JournalServices';
import { AuthContext } from '../Services/AuthContext';
import styles from '../Styles/Journal';
import { useContext } from 'react';
//import {NOTES_URL} from '@env'; //will fix this later

const JournalEntry = () => {
  // State to store journal entries.
  const [entries, setEntries] = useState([]);
  // State to store new entry text.
  const [newEntry, setNewEntry] = useState('');
  // State to track the entry currently being edited.
  const [editingEntryId, setEditingEntryId] = useState(null);
  // State for the editing text.
  const [editingText, setEditingText] = useState('');

  const [loading, setLoading] = useState(0);

  const { userToken } = useContext(AuthContext);

  const handleGetEntry = async () =>{

      try{

          const response = await getEntry(userToken);

          if (typeof response === 'string' && response.startsWith('Error')) {

            Alert.alert(response);
          
          } else {

            setEntries(response);
        }
      }
      catch(error){}
  };

  const handleAddEntry = async () => {

    try{

        const response = await addEntry(newEntry, userToken);

        if(response.startsWith('Success')) setLoading(loading + 1);

        Alert.alert(response);
    }
    catch(error){}
  };
   

  useEffect(() => {

     handleGetEntry();

  }, [loading]);

  //wont touch anything after this except for the notes card 
//----------------------------------------------------------------------------------------------------------------------------
  
  // Function to start editing an entry.
  const startEditing = (entry) => {
    setEditingEntryId(entry.id);
    setEditingText(entry.text);
  };

  // Function to save the edited entry.
  const saveEdit = () => {
    if (editingText.trim()) {
      const updatedEntries = entries.map((entry) => {
        if (entry.id === editingEntryId) {
          return { ...entry, text: editingText.trim() };
        }
        return entry;
      });
      setEntries(updatedEntries);
      cancelEditing();
    }
  };

  // Function to cancel editing.
  const cancelEditing = () => {

    setEditingEntryId(null);

    setEditingText('');
  };

  // Render each journal entry.

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
    >

      <Text style={styles.header}>Journal Entries</Text>

      {/* List of Journal Entries */}
      
      <FlatList
      
      data={entries}
      
      keyExtractor={(item) => item.noteId.toString()}
      
      renderItem= { ( {item} ) => ( <NotesComponent  key={item.noteId}  note={item} setLoading={setLoading} />) } 
      
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
        
        <Button title="Add Entry" onPress={handleAddEntry} />
      
      </View>
    
    </KeyboardAvoidingView>
  );
};

export default JournalEntry;


