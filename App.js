import React, { useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 


export default function App() {
  const [memos, updateMemos] = useState([])
  const [memo, setMemo] = useState({})
  const [memoName, setMemoName] = useState("")
  // const [bool, changeBool] = useState(true)

 
  const [memoBody, setText] = useState(` press  +  to create first memo `)

  const renderMemo = memo => {
    const foundMemo = memos.find(m => m.key === memo.key)
    setText(foundMemo.body)

  }

const changeText = text => {
//  setMemo(Object.assign(memo, {body: text}))
setText(text)
 console.log("k")
}  

const addHandler = () => {
  let createKey = Math.floor(Math.random() * 100)
  updateMemos(prev => { return [
      {title: "new memo", key: createKey, body: "blank"}, ...prev
    ]}) 
  setText("type ...")
}

const deleteHandler = memoForDeletion => {
  Alert.alert(
     "Delete?", 
      `Delete "${memoForDeletion.title}" with all its content?`,
      [
        { text: "OK", 
          onPress: ()=> {
            let filtered = memos.filter(memo => memo.key != memoForDeletion.key)
            updateMemos (prev => {return filtered})
        }},

        { text: 'Cancel',  
          onPress: () => console.log('Cancel Pressed')    
        }
      ] 
  )        
}

const editHandler = memoforEditing => {
  // foundMemo = memos.find(memo => memo.key === memoforEditing.key) 
  // foundMemo.title
}



  return (
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>
      <View style={styles.container}>
        <View style={styles.head}>      
          <ScrollView horizontal={true}>
            {memos.map(memo=> {
             return <TouchableOpacity style={styles.inputBox} key={memo.key}>
                      <Text> key: {memo.key}</Text>
                      <Text onPress={arg => {renderMemo(memo)}}> title: {memo.title} </Text>           
                      
                      
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

        <View>
           {/* <Text>{memoBody}</Text>  */}
          <TextInput style={styles.memo} 
                    multiline = {true}
                    onChangeText={text=>changeText(text)}
                    value={memoBody}
                    // placeholder=' type...' 
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
  buttonAdd: {
    backgroundColor: 'white',  
    padding: 0, 
    borderWidth: 1,
    borderRadius: 7,
    alignSelf: 'flex-end',
  },
  
  // buttonDelete: {
  //   backgroundColor: 'white', 
  //   // margin: 0, 
  //   padding: 12, 
  //   borderWidth: 1,
  //   alignSelf: 'flex-end',
  //   borderRadius: 7,
  // },

  memo: {
    padding: 15,
  }
  
});

 {/* <View style={styles.inputBox} key={memo.key}>
             <TextInput style={styles.input} 
                               onSubmitEditing={text=>setMemoName(text)}
                               placeholder=' new memo  '
                              
                               /> */}
