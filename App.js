import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [name, setName] = useState("Yulia")
  const clickHandler = () => {
    setName("Olga");
  }
  return (
    <View style={styles.container}>
      <Text>My name is {name}</Text>
      <View style={styles.test}>
        <Button title="update name"  onPress = {clickHandler}/>
      </View>
      <Text> Enter name:</Text>
      <TextInput 
          style={styles.input}
          placehodle= "Enter your name"
          onChangeText={(val) => setName(val)}
          keyboardType='numeric'/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  test: {
    backgroundColor: 'pink',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'red',
    margin: 10,
    width: 200,
  }
});
