import React, {useState} from 'react';
import { StyleSheet, Text, TextInput, View,
         TouchableOpacity, TouchableWithoutFeedback,
         Keyboard, ScrollView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import CurrentMemo from './CurrentMemo.js'
import AsyncStorage from '@react-native-community/async-storage';
import { greaterThan } from 'react-native-reanimated';



export default function App() {
  

//   let getData = async () => {
//     try {
//         const value = AsyncStorage.getItem('storedMemos')
//         .then(value => {data= value, console.log("in getData", data)})
//        } catch (e) {
//          console.log('Failed to get')
//        } 
// }   
  
//   let data;

async componentDidMount() {
  const response = await fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=10`);
  const json = await response.json();
  this.setState({ data: json });
}



  const [memos, updateMemos] = useState([])
  const [currentMemo, setCurrentMemo] = useState(null)
  const [editButtonClicked, changeValue] = useState(false)

  const addHandler = () => {
    let createKey = Math.floor(Math.random() * 100)
    let newMemo = {title: "New Memo", key: createKey, body: " type..."}
    updateMemos(prev => { return [ newMemo, ...prev
      ]}) 
    setCurrentMemo(newMemo) 
    
    // testing asyncStorage !!!
    
        // AsyncStorage.setItem("key", "age")
        // console.log('Data successfully saved')
        // let gett =  AsyncStorage.getItem("storedMemos")
        // let answer = JSON.parse( gett)
        // console.log(AsyncStorage.getItem("storedMemos"))
    //  getData()
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
    // AsyncStorage.setItem("storedMemos", JSON.stringify(newMemos))
    
  }

  const editMemoBody = text => {
  let newMemos = [...memos]
  let  foundMemo = newMemos.find(memo => memo.key === currentMemo.key)
  foundMemo.body = text
  updateMemos(newMemos)
  }



  return ( 
    // console.log("in return", getData()),
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
                          <Text onPress={() => {renderCurrentMemo(memo)}}> {memo.title} </Text>                   
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

 