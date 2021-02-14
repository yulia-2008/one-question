import React from 'react';
import { StyleSheet, TextInput, ScrollView } from 'react-native';
import {AsyncStorage} from '@react-native-community/async-storage';

export default function CurrentMemo(props) {
   
    return ( 
        
        <ScrollView>         
           <TextInput style={styles.input} 
                      multiline = {true}
                      autoFocus={true}
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