import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker'
import { StatusBar } from 'expo-status-bar';

 export default function Prvdr_Dashboard(){

  const [hasGalleryPermission,setHasGalleryPermission]=useState(null);
  const[image, setImage]=useState(null);

  useEffect(() => {
    (async () => {
      const galleryStatus =await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasGalleryPermission(galleryStatus.status === 'granted');
    })();
    }, []);

    const pickImage = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing:true,
        aspect:[4,3],
        quality:1,
      });

      console.log(result);

      if(!result.cancelled){
        setImage(result.url);
      }
    };

    if (hasGalleryPermission === false){
      return<Text>No access to internal Storage</Text>
    }

    return (

      <View style={{flex:1, justifyContent:'center'}}>
      <Button title='Pick Image' onPress={() => pickImage()} style={{marginTop:30}} />
      {image && <Image source={{uri: image}} style={{flex:1/2}}/>}
      </View>

  );
  }