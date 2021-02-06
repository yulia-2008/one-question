import React, { useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ScrollView, Alert } from 'react-native';

export default function CurrentMemo(props) {
   
    return (
      <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss();}}>        
           <TextInput style={styles.input} 
                      multiline = {true}
                      onChangeText={text=>props.edit(text)}
                      value={props.memo.body}
                        // placeholder={props.memo.body}
                      />                    
      </TouchableWithoutFeedback>
    );
    }
  
  const styles = StyleSheet.create({
    input: {
      padding: 15,
    } 
  });