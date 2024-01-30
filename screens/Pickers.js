import { View, Text } from 'react-native'
import { DocumentPickerOptions } from 'react-native-document-picker'
import  DocumentPicker from 'react-native-document-picker'
import React from 'react'
import { Button } from 'react-native-web'

const Pickers = () => {
    const selectDoc = async () =>{
        try{
            const doc = await DocumentPickerOptions.pick();
            console.log(doc)
        }
        catch(err){
            if(DocumentPickerOptions.isCancel(e))
            console.log(e);
        else
        console.log()
        }
    }
   
  return (
    <View style={{color:'black'}}>
      <Text>Document Pickers</Text>
     <View style={{marginHorizontal:40}}>
        <Button title="select Document" onPress={() =>{}}/>
     </View> 
    </View>
  )
}

export default Pickers