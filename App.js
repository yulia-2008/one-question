import React, { useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import CurrentMemo from './CurrentMemo.js'


export default function App() {
  const [memos, updateMemos] = useState([])
  const [currentMemo, setCurrentMemo] = useState({})
  // const [memoName, setMemoName] = useState("")

const addHandler = () => {
  let createKey = Math.floor(Math.random() * 100)
  updateMemos(prev => { return [
      {title: "new memo", key: createKey, body: "blank"}, ...prev
    ]}) 
}

const deleteHandler = memoForDeletion => {
  Alert.alert(
     "Delete?", 
      `Delete "${memoForDeletion.title}" with all its content?`,
      [
        { text: "OK", 
          onPress: ()=> {
            let filtered = memos.filter(memo => memo.key != memoForDeletion.key)
            updateMemos (filtered)
        }},

        { text: 'Cancel',  
          onPress: () => console.log('Cancel Pressed')    
        }
      ] 
  )        
}

const editMemoTitle = memoforEditing => {
  // foundMemo = memos.find(memo => memo.key === memoforEditing.key) 
  // foundMemo.title
}

const editMemoBody = text => {
 let newMemos = [...memos]
 let  foundMemo = newMemos.find(memo => memo.key === currentMemo.key)
 foundMemo.body = text
 updateMemos(newMemos)
}


  return (
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
      <View style={styles.container}>
        <View style={styles.head}>      
          <ScrollView horizontal={true}>
            {memos.map(memo=> {
             return <TouchableOpacity style={styles.memoTitle} key={memo.key}>
                      <Text> key: {memo.key}</Text>
                      <Text onPress={arg => {setCurrentMemo(memo)}}> title: {memo.title} </Text>                               
                      <AntDesign name="edit" size={24} color="black" 
                                 onPress={arg => {editHandler(memo)}}/>            
                      <AntDesign name="delete" size={25} color="black" 
                                 onPress={arg => {deleteHandler(memo)}}/>           
                    </TouchableOpacity>
            })}
          </ScrollView>
          <TouchableOpacity style={styles.buttonAdd} onPress={addHandler}>
            <Ionicons name="add" size={50} color="black" />
          </TouchableOpacity> 
        </View> 
          
        { memos.length >=1 ? 
          <CurrentMemo memo = {currentMemo} edit={editMemoBody}/>
          : null
        }

      </View>
    </TouchableWithoutFeedback>
  );
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  memoTitle: {
    flex: 1,
    backgroundColor: '#D1D1D3', 
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: 'row', 
    padding: 5,
    margin: 5,
  },
  buttonAdd: {
    backgroundColor: 'white',  
    padding: 0, 
    borderWidth: 1,
    borderRadius: 7,
    alignSelf: 'flex-end',
  },
});

 