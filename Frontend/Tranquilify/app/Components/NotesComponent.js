import React, { useContext } from 'react';
import { Alert, View, TouchableOpacity, Text } from 'react-native';
import { AuthContext } from '../Services/AuthContext';
import { deleteEntry, dateFormatter } from '../Services/JournalServices';
import styles from '../Styles/Journal';


export default function NotesComponent({ note, setLoading }) {

    //converting from java.util.date to js date

    const { noteId, content, date } = note;

    const { userToken } = useContext(AuthContext);

    const jsDate = dateFormatter(date);

    const handleDeleteEntry = async () => {

      try{
        
          const response = await deleteEntry( noteId, userToken);
        
          if (response[0] === 'S' ) setLoading(-1);

          Alert.alert(response);
      }

      catch(error){}

    };

    return (

      <View style={styles.entry}>
      
        <View style={styles.entryHeader}>
      
          <Text style={styles.dateText}>{jsDate}</Text>
      
        </View>
      
        <Text style={styles.entryText}>{content}</Text>
      
        <View style={styles.actionButtons}>

          <TouchableOpacity style={styles.actionButton}>
          
            <Text style={styles.actionText}>Edit</Text>
          
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleDeleteEntry} style={styles.actionButton}>
          
            <Text style={[styles.actionText, { color: 'red' }]}>Delete</Text>
          
          </TouchableOpacity>
        
        </View>
      
      </View>
    );
};