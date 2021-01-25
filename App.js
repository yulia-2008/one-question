import React, { useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 


export default function App() {
  const [memos, updateMemos] = useState([])
  const [memoName, setMemoName] = useState("")
  // const [bool, changeBool] = useState(true)

  const [memoText, setText] = useState("")


  // const onchangeText = event => {
  //   setTabName(event.target.title);  
  // }

 const pressHandler = () => {
   let findKey = memos.length
   updateMemos(prev => { return [
      {name: "added memo", key: findKey+1}, ...prev
    ]}) 
 }

 const deleteHandler = key => {
   console.log(key)
    let filteredMemos = memos.filter(memo => memo.key != key)
    updateMemos (prev => {return filteredMemos
    })
 }

//  const clickHandler =()=>{
   
//  }


  
  return (
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
      <View style={styles.container}>
        <View style={styles.head}>      
          <ScrollView horizontal={true}>
            {memos.map(memo=> {
            return <View style={styles.inputBox} key={memo.key}>
            <Text> {memo.name}</Text>
            
            {/* <TextInput style={styles.input} 
                              onSubmitEditing={text=>setMemoName(text)}
                              placeholder=' memo name '
                              
                              />  */}
            <TouchableOpacity  onPress={memo => {deleteHandler(memo.key)}}>
            <AntDesign name="delete" size={25} color="black" />
            </TouchableOpacity>

            <AntDesign name="edit" size={24} color="black" />
            </View>
            })}
          </ScrollView>

          <TouchableOpacity style={styles.button} onPress={pressHandler}>
            <Ionicons name="add" size={50} color="black" />
          </TouchableOpacity>

        </View>

        <View>
        <TextInput style={styles.memo} 
                   onChangeText={text=>setText(text)}
                   placeholder=' type '
                             /> 
        </View>    
      </View>
    </TouchableWithoutFeedback>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  head: {
    // flex:1,
    marginTop: 30,
    flexDirection: 'row',
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0, 
  },
  input: {
    marginRight: 3,
    padding: 0,
    backgroundColor: 'white', 
    // borderWidth: 1,
    textAlign: 'center',
    borderRadius: 4,
    fontWeight: 'bold',
  },
  inputBox: {
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
