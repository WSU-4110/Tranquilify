import { Text, View, TextInput, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useEffect } from "react";

export default function journal(props: any) {

  const uid = props.uid;

  const navigation = useNavigation();
  const [entries, setEntries] = useState([{}]);

  const testEntries = [
    {
      title: "Test Entry",
      date: "2021-09-01",
      body: "This is a test entry",
    },
    {
      title: "Test Entry 2",
      date: "2021-09-02",
      body: "This is another test entry",
    },
    {
      title: "Test Entry 3",
      date: "2021-09-03",
      body: "This is a third test entry",
    }
  ];

  useEffect(() => {
    // fetch("http://localhost:3000/api/entries")
    //   .then((response) => response.json())
    //   .then((data) => setEntries(data));
    setEntries(testEntries);
    console.log(entries);
  }, []);

  

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
          View your journal entries here!
        </Text>

        {entries ? entries.map((entry, index) => {
          return (
            <View key={index} style={{ margin: 10 }}>
              <Text style={{ color: "white", fontSize: 20, fontWeight: "bold" }}>{entry.title}</Text>
              <Text style={{ color: "white", fontSize: 15 }}>{entry.date}</Text>
              <Text style={{ color: "white", fontSize: 15 }}>{entry.body}</Text>
            </View>
          );
        }) : <Text style={{ color: "white", fontSize: 20 }}>No entries found</Text>}

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
        </View>
    </View>
  );
}
