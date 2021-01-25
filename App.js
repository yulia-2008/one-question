import React, { useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 

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
            return <View style={styles.box}>
            
            <TextInput style={styles.input} 
                              onChangeText={text=>setTabName(text)}
                              placeholder='enter tab name'
                              onPress={clickHandler}
                              multiline /> 
            <AntDesign  name="delete" size={25} color="black" />
            </View>
        })}
        </ScrollView>
       

        <TouchableOpacity style={styles.button} onPress={pressHandler}>
            <Ionicons name="add" size={50} color="black" />
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
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0, 
  },
  input: {
    margin: 0,
    padding: 0,
    backgroundColor: 'white', 
    // borderWidth: 1,
    textAlign: 'center',
    // borderRadius: 5 ,
  },
  box: {
    flex: 1,
    backgroundColor: '#D1D1D3', 
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: 'row', 
    padding: 5,
    margin: 5,
  },
  button: {
    backgroundColor: 'grey', 
    margin: 0, 
    padding: 0, 
    borderWidth: 1,
  }
  
});
