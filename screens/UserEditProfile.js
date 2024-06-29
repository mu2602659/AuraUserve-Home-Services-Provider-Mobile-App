import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, TextInput, ImageBackground, StyleSheet, Image, Alert } from 'react-native';
import { Avatar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import colors from '../colors';

export default function UserEditProfile() {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [bio, setBio] = useState('');
    const [saveState, setSaveState] = useState('Save Profile'); // New state for button text
    const navigation = useNavigation();

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadMedia = async () => {
        if (!image) {
            Alert.alert('Please pick an image first.');
            return;
        }

        setUploading(true);
        setSaveState('Saving...');

        try {
            const { uri } = await FileSystem.getInfoAsync(image);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => resolve(xhr.response);
                xhr.onerror = (e) => reject(new TypeError('Network request failed'));
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);
            });

            const filename = image.substring(image.lastIndexOf('/') + 1);
            const storage = getStorage();
            const storageRef = ref(storage, `user_edit-profile/${filename}`);

            await uploadBytes(storageRef, blob);
            const imageUrl = await getDownloadURL(storageRef);

            const db = getFirestore();
            await addDoc(collection(db, 'user_edit-profile'), {
                firstName: firstName,
                lastName: lastName,
                email: email,
                gender: gender,
                mobileNumber: mobileNumber,
                address: address,
                bio: bio,
                imageUrl: filename, // Save only the filename
                createdAt: new Date()
            });

            setUploading(false);
            setSaveState('Saved');
            Alert.alert('Profile Updated Successfully!');
            setImage(null);

        } catch (error) {
            console.error('Error uploading image:', error);
            Alert.alert('Error uploading image. Please try again.');
            setUploading(false);
            setSaveState('Save Profile');
        }
    };

    return (
        <ScrollView
            keyboardShouldPersistTaps={'always'}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 40 }}>
            <View>
                {/* Header */}
                <View style={styles.header}>
                    <View style={{ flex: 2 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Ionicons name="arrow-back" size={30} style={styles.backIcon} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 10 }}>
                        <Text style={styles.nameText}>Edit Professional Profile</Text>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>

                {/* Avatar */}
                <View style={styles.camDiv}>
                    <ImageBackground source={require('../assets/images/background1.jpg')} style={{ padding: 250, paddingTop: 15, position: 'absolute', }} />
                    <TouchableOpacity onPress={pickImage}>
                        <Avatar.Image
                            size={140}
                            style={styles.avatar}
                            source={image ? { uri: image } : require('../assets/icon.png')}
                        />
                    </TouchableOpacity>
                    <View style={styles.camIconDiv}>
                        <Ionicons name="camera" size={22} style={styles.cameraIcon} />
                    </View>
                </View>

                <View style={styles.formContainer}>
                    <Text style={[{ fontWeight: 'bold', marginTop: '20%', marginLeft: '1%' }]}>First Name:</Text>
                    <TextInput
                        placeholder="Your First Name"
                        placeholderTextColor={'#999797'}
                        style={styles.inputField}
                        value={firstName}
                        onChangeText={setFirstName}
                    />
                    <Text style={[{ fontWeight: 'bold', marginLeft: '1%' }]}>Last Name:</Text>
                    <TextInput
                        placeholder="Your Last Name"
                        placeholderTextColor={'#999797'}
                        style={styles.inputField}
                        value={lastName}
                        onChangeText={setLastName}
                    />
                    <Text style={[{ fontWeight: 'bold', marginLeft: '1%' }]}>Email:</Text>
                    <TextInput
                        placeholder="Your Email"
                        placeholderTextColor={'#999797'}
                        style={styles.inputField}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Text style={styles.label}>Gender:</Text>
                    <Picker
                        selectedValue={gender}
                        style={styles.inputField}
                        onValueChange={(itemValue) => setGender(itemValue)}
                    >
                        <Picker.Item label="Select Gender" value="" />
                        <Picker.Item label="Male" value="Male" />
                        <Picker.Item label="Female" value="Female" />
                    </Picker>
                    <Text style={[{ fontWeight: 'bold', marginLeft: '1%' }]}>Mobile Number:</Text>
                    <TextInput
                        placeholder="Your Mobile Number"
                        placeholderTextColor={'#999797'}
                        keyboardType='numeric'
                        style={styles.inputField}
                        value={mobileNumber}
                        onChangeText={setMobileNumber}
                    />
                    <Text style={[{ fontWeight: 'bold', marginLeft: '1%' }]}>Address:</Text>
                    <TextInput
                        placeholder="Your Address"
                        placeholderTextColor={'#999797'}
                        style={styles.inputField}
                        value={address}
                        onChangeText={setAddress}
                    />
                    <Text style={[{ fontWeight: 'bold', marginLeft: '1%' }]}>Bio:</Text>
                    <TextInput
                        placeholder="Your Bio"
                        placeholderTextColor={'#999797'}
                        style={styles.inputField}
                        value={bio}
                        onChangeText={setBio}
                    />
                </View>

                <View style={styles.buttonDiv}>
                  <TouchableOpacity style={styles.saveButton} onPress={uploadMedia} disabled={uploading}>
                <Text style={styles.saveButtonText}>{saveState}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
}

// Styling for the professional edit screen
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'left',
        marginTop: -20,
        marginLeft: 0,
        padding: 50,
        backgroundColor: 'white', // Black header
    },
    backIcon: {
        alignItems: 'left',
        justifyContent: 'left',
        color: 'black', // White icon for visibility
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black', // White text for visibility
    },
    camDiv: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    avatar: {
        backgroundColor: '#fff', // White background for the avatar
        borderWidth: 1,
        borderColor: '#000', // Black border for the avatar
    },
    camIconDiv: {
        position: 'absolute',
        right: 142,
        zIndex: 1,
        bottom: 5,
        height: 36,
        width: 36,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 18,
    },
    formContainer: {
        paddingHorizontal: 20,
        marginTop: 20,
    },
    inputField: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    image: {
        width: '90%',
        height: 200,
        resizeMode: 'cover',
        borderRadius: 10,
    },
    buttonDiv: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    saveButton: {
        backgroundColor: '#000', // Black save button
        padding: 15,
        borderRadius: 5,
        width: '80%',

        alignItems: 'center',
    },
    saveButtonText: {
        color: '#fff', // White text for visibility
        fontSize: 18,
        fontWeight: 'bold',
    },
});
