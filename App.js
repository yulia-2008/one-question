import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, TextInput, View, Image,
         TouchableOpacity, TouchableWithoutFeedback,
         Keyboard, ScrollView, Alert } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import CurrentMemo from './CurrentMemo.js';
import Themes from './Themes.js';
import AsyncStorage from '@react-native-community/async-storage';
import Image2 from './Image2.png'
import Image4 from './Image4.png'


export default function App() {
  
  const [memos, updateMemos] = useState([])
  const [currentMemo, setCurrentMemo] = useState(null)
     // currentMemo is null when open the app
     // currentMemo is false when delete or close the memo.
  const [editButtonClicked, showInput] = useState(false)
  const [settingButtonClicked, showContainer] = useState(false)
  const [theme, setTheme] = useState("green")
  const ref = React.useRef(null);
  

  useEffect(() => {getData(), getTheme()}, [])
  useEffect(() => { AsyncStorage.setItem("storedMemos", JSON.stringify(memos))}, [memos, currentMemo])

  let getTheme = async() => {
    let keys = await AsyncStorage.getAllKeys()
    if (keys.includes('storedTheme')){ 
       await AsyncStorage.getItem('storedTheme')
      .then (data => {setTheme(data)
      })
    }
    else {
      setTheme("rgb(184, 231, 228)")
    }
  }
    

     
  

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
    ref.current.scrollTo({x: 0, animated: true})
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

  const themeHandler = selectedColor => {
    setTheme(selectedColor)
    AsyncStorage.setItem("storedTheme", selectedColor)
  }


  return ( 
    <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()} }>
      <View style={styles.container}>
        <View style={[styles.head, {backgroundColor: theme}]} >  
         {/* combaned styles go to array*/}
          <ScrollView  ref={ref}
                      horizontal={true} 
                      keyboardShouldPersistTaps='always' 
                      persistentScrollbar= {true} 
                      >
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
                                    onEndEditing={()=> showInput(false)}
                                    onChangeText={text=>editTitle(text, memo)}
                                    placeholder="  type ...  " /> 
                          :
                          <Text style={styles.title}
                                onPress={() => {setCurrentMemo(memo)} }>
                               {memo.title} </Text>                   
                      }  

                      {memos.length === 1 && currentMemo === null || currentMemo && currentMemo.key === memo.key ? 
                        <View style={styles.buttonContainer}>                                 
                            <FontAwesome  name="edit" size={25} 
                                          color="black" style={styles.button}
                                          onPress={() => {showInput(true)
                                          }} />                                                       
                            <AntDesign  name="delete" size={25} color="black" 
                                        style={styles.button}
                                        onPress={() => {deleteHandler(memo)
                                        }}/>                           
                            <AntDesign name="closesquareo" size={23} color="black"
                                      style={styles.button}
                                      onPress={() => { setCurrentMemo(false)
                                       }} />
                        </View>
                        : null
                      }            
                                                         
                    </TouchableOpacity>
                    
            })}
          </ScrollView>          
        </View> 
        
        <View style={[styles.memoBodyContainer, {backgroundColor: theme}]}>
           {/* open app with only 1 memo - desplay it as current memo
            but if you have 2 memos and delete one of them, the last memo does not display as current, it will be false (not null) */}
          { memos.length === 1 && currentMemo === null || currentMemo && currentMemo !== false ? 
            <CurrentMemo memo = {memos.length === 1 && currentMemo === null ? memos[0] : currentMemo }
                         color = {theme}
                         edit={editMemoBody} /> :
            <View>
                {settingButtonClicked ? 
                  <> 
                    <Themes colorChanger = {themeHandler}/>
                    <Ionicons name="arrow-back" size={40} color="black" 
                              style={styles.lowerButton} 
                              onPress = {() =>  showContainer(false)}/>
                  </>
                  :
                  <>
                    <Image style={styles.image} source = {Image4}/> 
                    <View style={styles.lowerButtonContainer}>
                      <Ionicons name="add" size={40} color="black"
                                style={styles.lowerButton}
                                onPress={addHandler}/>
                      <Ionicons name="settings-outline" size={40} color="black"
                                style={styles.lowerButton}
                                onPress = {() =>  showContainer(true)} />
                    </View>          
                  </>          
                }                           
            </View>
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
    // backgroundColor: "rgb(105, 190, 186)",
    // backgroundColor: "rgb(184, 231, 228)",
    // alignItems: 'flex-end',
    justifyContent: 'center',
    paddingLeft: 10,
    height: 75,
  },
  titleContainer: {
    flex: 1,
    backgroundColor: 'lightgrey',
    borderWidth: 1,
    // borderColor: '#5F9EA0',
    borderColor: 'grey',
    borderRadius: 7,
    flexDirection: 'column', 
    paddingRight: 7, 
    paddingLeft: 10,
    paddingBottom: 7,
    paddingTop: 5,
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
    // borderColor: '#5F9EA0',
    borderColor: 'grey',
    borderRadius: 7,
    flexDirection: 'column', 
    paddingTop: 0,
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 0,
    marginTop: 5,
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    flex: 1,
    flexDirection: 'row', 
    justifyContent: 'space-around',
    paddingTop: 5,
  },
  lowerButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },

  lowerButton: {
    // width: '100%',
    backgroundColor: 'lightgrey', 
    // backgroundColor: 'rgb(225, 250, 131)',
    paddingTop: 5,
    paddingLeft: 5, 
    borderWidth: 2,
    // borderColor: '#5F9EA0',
    borderColor: 'grey',
    borderRadius: 7,
    alignSelf: 'center',
    margin: 7,
  },
  button: {
    padding: 3,
    alignSelf: 'center',
  },
  memoBodyContainer: {
    flex: 1,
    borderTopWidth: 1,
    // borderColor: '#5F9EA0',
    borderTopColor: 'grey',
    // backgroundColor: 'rgb(184, 231, 228)',
    // justifyContent: 'flex-start',
  }, 
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    margin: 50,
  }
});

 