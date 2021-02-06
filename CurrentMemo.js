 import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default function CurrentMemo(props) {
   
    return (          
           <TextInput style={styles.input} 
                      multiline = {true}
                      onChangeText={text=>props.edit(text)}
                      value={props.memo.body}
                        // placeholder={props.memo.body}
                      />                                    
    );
    }
  
  const styles = StyleSheet.create({
    input: {
      padding: 15,
    } 
  });