import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Image,
         TouchableOpacity, TouchableWithoutFeedback,
         Keyboard, ScrollView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import CurrentMemo from './CurrentMemo.js'
import AsyncStorage from '@react-native-community/async-storage';
import Image1 from './Image1.jpg'


export default function App() {
  
  const [memos, updateMemos] = useState([])
  const [currentMemo, setCurrentMemo] = useState(null)
     // currentMemo is null when open the app
     // currentMemo is false when delete the memo ot click outside of memo.
  const [editButtonClicked, clicked] = useState(false)
  const ref = React.useRef(null);
  

  useEffect(() => {getData()}, [])
  useEffect(() => { AsyncStorage.setItem("storedMemos", JSON.stringify(memos))}, [memos, currentMemo])

  let getData = async () =>  {
    await AsyncStorage.getItem('storedMemos')
    .then(data => JSON.parse(data))
    .then(value => {updateMemos(value)
    })  
  }

  const addHandler = () => {
    let newKey;
    if (memos.length >= 1) {
         let lastMemoKey = memos[0].key 
        //  new memo is added to the front , that is why memo[0] 
        // if needed to change for adding new memo to the end, use this: 
        // let lastMemoKey = memos[memo.length-1].key   
        newKey = lastMemoKey + 1
    }
    else {
      newKey = 0
    }

    let newMemo = {title: "New Memo", key: newKey, body: " type..."}
    updateMemos(prev => { return [ newMemo, ...prev
      ]}) 
    // if needed to change for adding new memo to the end, use this: 
    // updateMemos(prev => { return [ ...prev, newMemo 
    //    ]}) 
    setCurrentMemo(newMemo) 
    ref.current.scrollTo({x: 1, animated: true})
  }  
        

  const deleteHandler = memoForDeletion => {
    Alert.alert(
      "Delete?", 
        `Delete "${memoForDeletion.title}" with all its content?`,
        [
          { text: "OK", 
            onPress: ()=> {
              let filtered = memos.filter(memo => memo.key != memoForDeletion.key)
              // if the last memo left after deletion, last memo displays as current:
              // if(filtered.length === 1){
              //   setCurrentMemo(filtered[0])
              // }
              // else {
              // setCurrentMemo(null)
              // }
              setCurrentMemo(false)
              updateMemos (filtered)
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
    <TouchableWithoutFeedback onPress={()=>{setCurrentMemo(false), Keyboard.dismiss()} }>
      <View style={styles.container}>
        <View style={styles.head}>      
          <ScrollView  ref={ref}
                      horizontal={true} 
                      keyboardShouldPersistTaps='always' 
                      persistentScrollbar= {true}>
            {memos.map(memo=> {
             return <TouchableOpacity key={memo.key}
                                      // open app with only 1 memo - desplay it as current memo 
                                      // but if you have 2 memos and delete one of them, the last memo does not display as current, it will be false (not null)
                                      style={ memos.length === 1 && currentMemo === null || currentMemo && currentMemo.key === memo.key ?  
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

                      {memos.length === 1 && currentMemo === null || currentMemo && currentMemo.key === memo.key ? 
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
        
        <View style={styles.memoBodyContainer}>
           {/* open app with only 1 memo - desplay it as current memo
            but if you have 2 memos and delete one of them, the last memo does not display as current, it will be false (not null) */}
          { memos.length === 1 && currentMemo === null || currentMemo && currentMemo !== false ? 
            <CurrentMemo memo = {memos.length === 1 && currentMemo === null ? memos[0] : currentMemo } 
                         edit={editMemoBody} />
            : <Image style={styles.image} source = {Image1}/>
          }
        </View>
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
    // backgroundColor: '#5F9EA0',
    backgroundColor: "rgb(105, 190, 186)",
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
    margin: 15,
  },
  editButton: {
    paddingLeft: 10, 
    paddingBottom: 3,
  },
  deleteButton: {
    paddingTop: 3,
    paddingLeft: 7,
  }, 
  memoBodyContainer: {
    flex: 1,
    borderWidth: 1,
    backgroundColor: 'rgb(105, 190, 186)',
  }, 
  image: {
    width: 300,
    height: 350,
    alignSelf: 'center',
    margin: 50,
  }
});

 