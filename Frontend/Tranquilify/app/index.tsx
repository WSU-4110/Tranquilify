import { Text, View, TextInput, Button } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#BFD7ED",
      }}
    >
      <View
        style={{
          backgroundColor: "#1D4E89",
          padding: 20,
          borderRadius: 10,
          alignItems: "center",
        }}
        >
        <Text
          style={{
            color: "white",
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Welcome to Tranquilify!
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 20,
          }}
        >Sign in or create an account below</Text>
        <TextInput placeholder="Email" 
          style={{ 
            height: 40, width: 200, borderColor: 'white', borderWidth: 1, margin: 10,
            padding: 10, borderRadius: 5
            }} />
        <TextInput placeholder="Password" 
        style={{ 
          height: 40, width: 200, borderColor: 'white', borderWidth: 1, margin: 10,
          padding: 10, borderRadius: 5
          }} />
        <Button title="Sign In" 
          color="white"
          onPress={() => {alert("Sign In not implemented")}} 
         />
        
        <Button title="Create Account" 
          color="white"
          onPress={() => {alert("Create Account not implemented")}} 
        />
        </View>
    </View>
  );
}
