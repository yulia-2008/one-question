import { StatusBar } from 'expo-status-bar';
import React, { useState} from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';

export default function App() {
  const [answer, setAnswer] = useState(" ")
  const clickHandler = event => {
    setAnswer(event.target.title);
    console.log(event.target)
  }
  return (
    <View style={styles.container}>
      <View>
        <Text>Question 1 ?</Text>
      </View>
      <View style={styles.test}>
        <Button title="variant 1"  onPress = {(event) => clickHandler(event)}/>
      </View>
      <View style={styles.test}>
        <Button title="variant 2"  onPress = {clickHandler}/>
      </View>

      <Text> Your answer:</Text>
      <TextInput 
          style={styles.input}
          placehodle= "Enter your name"
          onChangeText={(val) => setName(val)}
          multiLine/>
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
    margin: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: 'red',
    margin: 10,
    width: 200,
  }
});
