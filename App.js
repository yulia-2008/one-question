import React, { useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function App() {
  const [tab, addTab] = useState(["first tab"])
  const [tabName, setTabName] = useState("")



  const onchangeText = event => {
    setTabName(event.target.title);  
  }

 const pressHandler = () => {
   addTab(prev=>{ return [...prev, "added tab"]}) 
 }

 const clickHandler =()=>{
   
 }


  
  return (
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
      <View style={styles.container}>
      
      
        <ScrollView horizontal={true}>
        {tab.map(tab=> {
            return <View>
            
            <TextInput style={styles.input} 
                              onChangeText={text=>setTabName(text)}
                              placeholder='enter tab name'
                              onPress={clickHandler}
                              multiline /> 
            <AntDesign name="delete" size={24} color="black" />
            </View>
        })}
        </ScrollView>
       

        <TouchableOpacity onPress={pressHandler}>
          <Text style={styles.button}>Add Tab</Text>
        </TouchableOpacity>

      </View>
    </TouchableWithoutFeedback>
  );
  }

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 30,
    flexDirection: 'row',
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    marginTop: 5,
    padding: 0,
    backgroundColor: 'pink', 
    borderWidth: 1,
    textAlign: 'center'
  },
  button: {
    backgroundColor: 'pink', 
  }
  
});
