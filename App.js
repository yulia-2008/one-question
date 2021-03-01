import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View,
         TouchableOpacity, TouchableWithoutFeedback,
         Keyboard, ScrollView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import CurrentMemo from './CurrentMemo.js'
import AsyncStorage from '@react-native-community/async-storage';
import { greaterThan } from 'react-native-reanimated';



export default function App() {
  
  //  AsyncStorage.clear()
  // let getData = async () => {
  //   try {
  //       const value = await AsyncStorage.getItem('storedMemos')
  //       .then(value => {return value})
  //      } catch (e) {
  //        console.log('Failed to get')
  //      } 
  // }   

let getData = async () =>  {
  await AsyncStorage.getItem('storedMemos')
  .then(data => JSON.parse(data))
  .then(value => { console.log("in getData",value), updateMemos(value)
   })  
}

// function getData() {
//   let data =  AsyncStorage.getItem('storedMemos') ;
//   // let resp = await data;
//   return data;
// }
  
//   let data;

// async componentDidMount() {
//   const response = await fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=10`);
//   const json = await response.json();
//   this.setState({ data: json });
// }

  const [memos, updateMemos] = useState([])
  const [currentMemo, setCurrentMemo] = useState(null)
  const [editButtonClicked, changeValue] = useState(false)
  

  useEffect(() => {getData()}, [])
  useEffect(() => { AsyncStorage.setItem("storedMemos", JSON.stringify(memos))}, [memos, currentMemo])

  const addHandler = () => {
    let newKey;
    if (memos.length >= 1) {
      let lastMemoKey = memos[0].key 
      //  new memo is added to the front , that is why memo[0]   
      newKey = lastMemoKey + 1
    }
    else {newKey = 0}
    let newMemo = {title: "New Memo", key: newKey, body: " type..."}
    // memos.push(newMemo)
    // let updated = memos
    // updateMemos(updated)
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

  const renderInput = memo => {
    setCurrentMemo(memo)
    changeValue(true)
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
    console.log("in returnn", memos.length),
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
      <View style={styles.container}>
        <View style={styles.head}>      
          <ScrollView horizontal={true} 
                      keyboardShouldPersistTaps='always' 
                      persistentScrollbar= {true}>
            {memos.map(memo=> {
             return <TouchableOpacity key={memo.key}
                                      style={memos.length === 1 ?  
                                        styles.currentTitleContainer:
                                          currentMemo && currentMemo.key === memo.key ? 
                                            styles.currentTitleContainer :
                                            styles.titleContainer
                                            }>
                      {editButtonClicked && currentMemo.key === memo.key ?
                          <TextInput autoFocus={true}
                                    onEndEditing={()=> changeValue(false)}
                                    onChangeText={text=>editTitle(text, memo)}
                                    placeholder="  type ...  "
                          /> :
                          <Text onPress={() => {renderCurrentMemo(memo)}}> {memo.title} key: {memo.key} </Text>                   
                      }  
                                           
                      <AntDesign name="edit" size={24} color="black" 
                                style={styles.editButton}
                                 onPress={() => {renderInput(memo)
                                 }}/>        
                      <AntDesign name="delete" size={25} color="black" 
                                 onPress={() => {deleteHandler(memo)
                                 }}/>   
                                                         
                    </TouchableOpacity>
                    
            })}
          </ScrollView>
          
          <TouchableOpacity style={styles.buttonAdd} onPress={addHandler}>
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
    margin: 10,
    alignItems: 'center',
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
  buttonAdd: {
    borderColor: "black",
    backgroundColor: 'lightgrey',  
    padding: 0, 
    borderWidth: 2,
    borderRadius: 7,
    alignSelf: 'center',
    marginLeft: 10,
  },
  editButton: {
    paddingLeft: 10,
    paddingRight: 10, 
  }
  
});

 