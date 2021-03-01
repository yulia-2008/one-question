import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View,
         TouchableOpacity, TouchableWithoutFeedback,
         Keyboard, ScrollView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import CurrentMemo from './CurrentMemo.js'
import AsyncStorage from '@react-native-community/async-storage';


export default function App() {
  
  const [memos, updateMemos] = useState([])
  const [currentMemo, setCurrentMemo] = useState(null)
  const [editButtonClicked, clicked] = useState(false)
  

  useEffect(() => {getData()}, [])
  useEffect(() => { AsyncStorage.setItem("storedMemos", JSON.stringify(memos))}, [memos, currentMemo])

  let getData = async () =>  {
    await AsyncStorage.getItem('storedMemos')
    .then(data => JSON.parse(data))
    .then(value => { console.log("in getData",value), updateMemos(value)
     })  
  }

  const addHandler = () => {
    let newKey;
    if (memos.length >= 1) {
        let lastMemoKey = memos[0].key 
        //  new memo is added to the front , that is why memo[0]   
        newKey = lastMemoKey + 1
    }
    else {
      newKey = 0
    }

    let newMemo = {title: "New Memo", key: newKey, body: " type..."}
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

  const editTitle = (text, memoForEditing) => {
    let newMemos = [...memos]
    let  foundMemo = newMemos.find(memo => memo.key === memoForEditing.key)
    foundMemo.title = text
    updateMemos(newMemos) 
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
          <ScrollView horizontal={true} 
                      keyboardShouldPersistTaps='always' 
                      persistentScrollbar= {true}>
            {memos.map(memo=> {
             return <TouchableOpacity key={memo.key}
                                      style={memos.length === 1 ?  
                                        styles.currentTitleContainer :
                                        currentMemo && currentMemo.key === memo.key ? 
                                            styles.currentTitleContainer :
                                            styles.titleContainer
                                      }>
                      {editButtonClicked && currentMemo.key === memo.key ?
                          <TextInput autoFocus={true}
                                    onEndEditing={()=> clicked(false)}
                                    onChangeText={text=>editTitle(text, memo)}
                                    placeholder="  type ...  " />
                          :
                          <Text style={styles.title}
                                onPress={() => {setCurrentMemo(memo)} }>
                               {memo.title} </Text>                   
                      }  

                      { memos.length === 1 || currentMemo && currentMemo.key === memo.key ? 
                        <View >                                 
                            <FontAwesome  name="edit" size={25} 
                                          color="black" style={styles.editButton}
                                          onPress={() => {clicked(true)
                                          }} />                                                       
                            <AntDesign  name="delete" size={25} color="black" 
                                        style={styles.deleteButton}
                                        onPress={() => {deleteHandler(memo)
                                        }}/>                           
                        </View>
                        : null
                      }            
                                                         
                    </TouchableOpacity>
                    
            })}
          </ScrollView>
          
          <TouchableOpacity style={styles.addButton} onPress={addHandler}>
            <Ionicons name="add" size={40} color="black" />
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
    marginTop: 30,
    flexDirection: 'row',
    backgroundColor: '#5F9EA0',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  titleContainer: {
    flex: 1,
    backgroundColor: 'lightgrey',
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: 'row', 
    paddingRight: 7, 
    paddingLeft: 10,
    paddingBottom: 7,
    paddingTop: 7,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 12,
    marginRight: 12,
    alignItems: 'center',
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
  },
  currentTitleContainer:{
    flex: 1,
    backgroundColor: 'white', 
    borderWidth: 1,
    borderRadius: 7,
    flexDirection: 'row', 
    padding: 5,
    marginTop: 5,
    alignItems: 'center',
  },
  addButton: {
    borderColor: "black",
    backgroundColor: 'lightgrey',  
    padding: 0, 
    borderWidth: 2,
    borderRadius: 7,
    alignSelf: 'center',
    marginLeft: 15,
  },
  editButton: {
    paddingLeft: 10, 
    paddingBottom: 3,
  },
  deleteButton: {
    paddingTop: 3,
    paddingLeft: 7,
  }, 
});

 