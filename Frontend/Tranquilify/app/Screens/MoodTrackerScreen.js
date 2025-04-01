import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { addMoodEntry, getMoodEntries } from '../Services/MoodEntryService';
import styles from '../Styles/MoodTracker';
import { AuthContext } from '../Services/AuthContext';

export default function MoodTrackerScreen() {
  // Store mood entries as objects with a date and a numeric mood value
  const [moodData, setMoodData] = useState([]);
  
  const {userToken} = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  // Define the mood levels with corresponding emojis (values from 1 to 10)
  const moodEmojis = [
    { value: 1, emoji: '😭' },
    { value: 2, emoji: '😢' },
    { value: 3, emoji: '😞' },
    { value: 4, emoji: '😟' },
    { value: 5, emoji: '😐' },
    { value: 6, emoji: '🙂' },
    { value: 7, emoji: '😊' },
    { value: 8, emoji: '😀' },
    { value: 9, emoji: '😃' },
    { value: 10, emoji: '🤩' },
  ];

  //Function to get all mood entries

  const handleGetMoodEntry = async () => {

      try{

        const response = await getMoodEntries(userToken);

        if( typeof response === 'string' && response.startsWith('Error') ) Alert.alert(response);

        else setMoodData(response);
      }
      catch(error){};
  }

  // Function to add a mood entry based on the selected emoji value
  const handleAddMoodEntry = async (mood) => {

      try{

        const response = await addMoodEntry(mood, userToken);

        if (response.startsWith('Error')) Alert.alert(response);
                   
        else setLoading(!loading);
      }
      
      catch(error){};
  };

  useEffect(() => {
  
       handleGetMoodEntry();
  
    }, [loading]);


  const labels = moodData.map((entry) => entry.date.slice(5)); 

  const dataPoints = moodData.map((entry) => entry.value);

  const latestMoodEntry = moodData[moodData.length - 1];
  
  const latestMoodEmoji =  latestMoodEntry && moodEmojis.find((item) => item.value === latestMoodEntry.value)?.emoji;

  return (

    <View style={styles.container}>
    
      <Text style={styles.title}>Mood Tracker</Text>
    
      <Text style={styles.subtitle}>Select your mood for today:</Text>
      
      {/* Display row of emoji buttons */}
      <View style={styles.emojiContainer}>
    
        {moodEmojis.map((item) => (
    
            <TouchableOpacity key={item.value} onPress={() => handleAddMoodEntry(item.value)} style={styles.emojiButton} >

                <Text style={styles.emojiText}>{item.emoji}</Text>
          
            </TouchableOpacity>
        ))}
      
      </View>

      {/* Optionally, display the latest mood */}
      {latestMoodEntry && (
      
        <Text style={styles.latestMoodText}>
          
            Your latest mood: {latestMoodEmoji} (Score: {latestMoodEntry.value})
        
        </Text>
      )}

      {/* Display the mood trend chart if there is any data */}
      {moodData.length > 0 && (

        <LineChart
        
          data={{
          
            labels: labels,
          
            datasets: [{ data: dataPoints }],
          
          }}
          
          width={Dimensions.get('window').width - 32} // Adjust width as needed
          
          height={220}
          
          chartConfig={{
          
            backgroundColor: '#e26a00',
          
            backgroundGradientFrom: '#fb8c00',
          
            backgroundGradientTo: '#ffa726',
          
            decimalPlaces: 0,
          
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          
            style: { borderRadius: 16 },
          
            propsForDots: {
          
              r: '6',
          
              strokeWidth: '2',
          
              stroke: '#ffa726',
          
            },
          
          }}
          
          style={{
          
            marginVertical: 16,
          
            borderRadius: 16,
          
          }}
        />

      )}

    </View>
  );
}

