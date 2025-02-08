import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function MoodTrackerScreen() {
  // Store mood entries as objects with a date and a numeric mood value
  const [moodData, setMoodData] = useState([]);

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

  // Function to add a mood entry based on the selected emoji value
  const addMoodEntry = (mood) => {
    const newEntry = {
      date: new Date().toISOString().split('T')[0], // Format: YYYY-MM-DD
      mood,
    };
    setMoodData([...moodData, newEntry]);
  };

  const sortedData = [...moodData].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
  const labels = sortedData.map((entry) => entry.date.slice(5)); 
  const dataPoints = sortedData.map((entry) => entry.mood);

  const latestMoodEntry = sortedData[sortedData.length - 1];
  const latestMoodEmoji =
    latestMoodEntry &&
    moodEmojis.find((item) => item.value === latestMoodEntry.mood)?.emoji;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mood Tracker</Text>
      <Text style={styles.subtitle}>Select your mood for today:</Text>
      
      {/* Display row of emoji buttons */}
      <View style={styles.emojiContainer}>
        {moodEmojis.map((item) => (
          <TouchableOpacity
            key={item.value}
            onPress={() => addMoodEntry(item.value)}
            style={styles.emojiButton}
          >
            <Text style={styles.emojiText}>{item.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Optionally, display the latest mood */}
      {latestMoodEntry && (
        <Text style={styles.latestMoodText}>
          Your latest mood: {latestMoodEmoji} (Score: {latestMoodEntry.mood})
        </Text>
      )}

      {/* Display the mood trend chart if there is any data */}
      {sortedData.length > 0 && (
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5F5F5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 8,
    color: '#555',
  },
  emojiContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 12,
  },
  emojiButton: {
    margin: 6,
    padding: 10,
    borderRadius: 50,
    backgroundColor: '#FFF',
    elevation: 2, // Android shadow
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  emojiText: {
    fontSize: 32,
  },
  latestMoodText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#333',
    marginTop: 8,
  },
});
