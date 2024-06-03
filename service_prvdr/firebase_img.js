import React, { useState } from 'react';
import { View, Text, Image, SafeAreaView, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../config/firebase';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';

const FirebaseImg = () => { // Changed the component name to start with uppercase letter

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const navigation = useNavigation(); // Hook to access navigation

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    };

    const uploadMedia = async () => {
        if (!image) {
            Alert.alert('Please pick an image first.');
            return;
        }

        setUploading(true);

        try {
            const { uri } = await FileSystem.getInfoAsync(image);
            console.log('Image info:', uri);

            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                };
                xhr.onerror = (e) => {
                    reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });

            const filename = image.substring(image.lastIndexOf('/') + 1);
            const ref = firebase.storage().ref().child(filename);

            await ref.put(blob);
            setUploading(false);
            Alert.alert('Photo Uploaded!!!');
            setImage(null);

            // Navigate to DisplayImage screen with the filename
            navigation.navigate('FetchImages', { filename });

        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error uploading image. Please try again.');
            setUploading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={styles.selectButton} onPress={pickImage}>
                <Text style={styles.buttonText}>Pick an image</Text>
            </TouchableOpacity>
            <View style={styles.imageContainer}>
                {image && 
                    <Image source={{ uri: image }} style={styles.image} />
                }
            </View>
            <TouchableOpacity style={styles.uploadButton} onPress={uploadMedia} disabled={!image || uploading}>
                <Text style={styles.buttonText}>{uploading ? 'Uploading...' : 'Upload image'}</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    uploadButton: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    imageContainer: {
        width: 200,
        height: 200,
        marginTop: 20,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        overflow: 'hidden',
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'cover',
    },
});

export default FirebaseImg;
