import React from 'react';
// import React, {useState, useEffect} from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

export default function Themes(props) {
  
    const colors = [ {key: 0, color: "rgb(225, 189, 224)"},
                    {key: 2, color: "rgb(205, 233, 254)"},
                    {key: 3, color: "rgb(182, 173, 193)"},
                    {key: 4, color: "rgb(64, 128, 128)"},
                    {key: 5, color: "rgb(225, 225, 153)"},
                    {key: 6, color: "black"},
                    {key: 7, color: "grey"},
                    {key: 8, color: "white"},
                    {key: 9, color: "rgb(155, 155, 206)"},
    ]
    
   return ( 
       
        <FlatList style={styles.container}
            data={colors}
            numColumns={3}
            renderItem={ ({item}) =>
                <TouchableOpacity   style={{ backgroundColor: item.color, 
                                borderWidth: 1, width: 70,                                
                                margin: 10, height: 50                                                         
                        }}
                        onPress={() =>  props.colorChanger(item.color)} > 
                </TouchableOpacity>                        
            }          
        />
                                                   
    );
    }
  
  const styles = StyleSheet.create({
    container: { 
        alignSelf: 'center',
        margin: 40, 
    }    
  });