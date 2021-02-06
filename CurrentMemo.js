import React from 'react';
import { StyleSheet, TextInput, ScrollView } from 'react-native';

export default function CurrentMemo(props) {
   
    return ( 
        
        <ScrollView>         
           <TextInput style={styles.input} 
                      multiline = {true}
                      onChangeText={text=>props.edit(text)}
                      value={props.memo.body}
                        // placeholder={props.memo.body}
                      />  
        </ScrollView>                                               
    );
    }
  
  const styles = StyleSheet.create({
    input: {
      padding: 15,
    } 
  });