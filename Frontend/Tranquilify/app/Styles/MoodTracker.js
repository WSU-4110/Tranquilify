import { StyleSheet } from "react-native";

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

export default styles;