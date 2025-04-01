import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#F5F5F5',
      justifyContent: 'center',
      alignItems: 'center',
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
    breathingCircle: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: '#0D47A1',
      opacity: 0.5,
      marginVertical: 12,
    },
    timerContainer: {
      width: Dimensions.get('window').width - 32, 
      height: 120,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
      borderRadius: 16,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      marginVertical: 12,
    },
    timerText: {
      fontSize: 36,
      fontWeight: 'bold',
      color: '#0D47A1',
    },
    feedbackText: {
      fontSize: 16,
      textAlign: 'center',
      color: '#388E3C',
      marginVertical: 8,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 12,
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 25,
      marginHorizontal: 10,
      elevation: 2, 
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    startButton: {
      backgroundColor: '#0D47A1',
    },
    stopButton: {
      backgroundColor: '#D32F2F',
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    recordText: {
      fontSize: 18,
      textAlign: 'center',
      color: '#333',
      marginTop: 8,
    },
});

export default styles;
