import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      padding: 20,
      backgroundColor: '#F5F5F5'
    },
    logo: { 
      width: 100, 
      height: 100, 
      marginBottom: 20 
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
      color: '#333'
    },
    input: { 
      width: '100%',
      borderWidth: 1, 
      borderColor: '#ccc', 
      padding: 10, 
      marginBottom: 10, 
      borderRadius: 5,
      backgroundColor: '#FFF',
      color: '#333'
    },
    linkText: {
      marginTop: 10,
      fontSize: 16,
      color: '#555'
    },
    linkAction: {
      color: '#1E90FF', 
      fontWeight: 'bold'
    },
    button: {
      backgroundColor: '#1E90FF',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 5,
      marginTop: 10,
      width: '100%',
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
});

export default styles;