import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import CurrentMemo from './CurrentMemo.js'


export default function App() {
  const [memos, updateMemos] = useState([])
  const [currentMemo, setCurrentMemo] = useState(null)
  const [editButtonClicked, changeValue] = useState(false)

  const addHandler = () => {
    let createKey = Math.floor(Math.random() * 100)
    let newMemo = {title: "New Memo", key: createKey, body: " type..."}
    updateMemos(prev => { return [ newMemo, ...prev
      ]}) 
    setCurrentMemo(newMemo)  
  }

  const deleteHandler = memoForDeletion => {
    setCurrentMemo(memoForDeletion)
    Alert.alert(
      "Delete?", 
        `Delete "${memoForDeletion.title}" with all its content?`,
        [
          { text: "OK", 
            onPress: ()=> {
              let filtered = memos.filter(memo => memo.key != memoForDeletion.key)
              updateMemos (filtered)
              setCurrentMemo(null)
          }},

          { text: 'Cancel',  
            onPress: () => console.log('Cancel Pressed')    
          }
        ] 
    )        
  }

  const renderCurrentMemo = memo => {
    changeValue(false)
    setCurrentMemo(memo)
  }

  const editTitle = memoForEditing => {
    setCurrentMemo(memoForEditing)
    changeValue(true)
  }

  const editMemoBody = text => {
  let newMemos = [...memos]
  let  foundMemo = newMemos.find(memo => memo.key === currentMemo.key)
  foundMemo.body = text
  updateMemos(newMemos)
  }


  return (
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
      <View style={styles.container}>
        <View style={styles.head}>      
          <ScrollView horizontal={true} keyboardShouldPersistTaps='always' persistentScrollbar= {true} >
            {memos.map(memo=> {
             return <TouchableOpacity key={memo.key}
                                      style={memos.length===1?  styles.currentTitleContainer:
                                        currentMemo && currentMemo.key === memo.key ? 
                                              styles.currentTitleContainer :
                                              styles.titleContainer
                                            }>
                      {editButtonClicked && currentMemo.key === memo.key ?
                          <TextInput autoFocus={true}
                                    onEndEditing={()=> changeValue(false)}
                                    onChangeText={text=>props.edit(text)}
                                    placeholder="  type ...  "
                          /> :
                          <Text onPress={() => {renderCurrentMemo(memo)}}> {memo.title} </Text>                     
                      }                               
                      <AntDesign name="edit" size={24} color="black" 
                                 onPress={() => {editTitle(memo)
                                 }}/>           
                      <AntDesign name="delete" size={25} color="black" 
                                 onPress={() => {deleteHandler(memo)
                                 }}/>                            
                    </TouchableOpacity>
            })}
          </ScrollView>
          
          <TouchableOpacity style={styles.buttonAdd} onPress={addHandler}>
            <Ionicons name="add" size={50} color="black" />
          </TouchableOpacity> 
        </View> 
          
        { currentMemo !== null ? 
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
    // paddingBottom: 9,
    flexDirection: 'row',
    backgroundColor: 'grey',
    alignItems: 'flex-end',
    justifyContent: 'center',
    // padding: 0, 
  },
  titleContainer: {
    flex: 1,
    backgroundColor: '#D1D1D3', 
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: 'row', 
    padding: 5,
    margin: 5,
    alignItems: 'center',
  },
  currentTitleContainer:{
    flex: 1,
    backgroundColor: 'white', 
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: 'row', 
    padding: 5,
    margin: 0,
    alignItems: 'center',
  },
  // clicked memoTitle: {
  //   marginTop: 5,
  //  marginLeft: 5,
  //  marginRight: 5,}
  // clicked head: {
  // alignItems: 'flex-end',
  // },
  // box: {
  //   marginBottom: 0,
  //   paddingBottom: 0,
  // },
  buttonAdd: {
    backgroundColor: 'white',  
    padding: 0, 
    borderWidth: 1,
    borderRadius: 7,
    alignSelf: 'flex-end',
  },
});

 