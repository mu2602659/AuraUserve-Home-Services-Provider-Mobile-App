// Importing necessary modules from React Native and other libraries
import 'firebase/auth';
import React, { useState } from 'react';
import { themeColors } from '../theme';
import { fr } from '../config/firebase'; 
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Image, TextInput, ScrollView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const ProviderForm = () => {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);

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


  // State to manage form data
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    serviceType: '',
    experienceYears: '',
    certifications: [],
    availability: '',
    specialization: '',
    smartphoneType: '',
  });

  
  const handleFormSubmit = async () => {
    try {
      const docRef = await addDoc(collection(fr, 'providerForms'), formData); // using fr for Firestore instance
      console.log('Document written with ID: ', docRef.id);
      Alert.alert('Success', 'Your application is submitted!');
    } catch (error) {
      console.error('Error adding document: ', error);
      Alert.alert('Error', 'Failed to submit application. Please try again later.');
    }
  };

  // Function to handle displaying an alert for wrong format of input
  const handleWrongFormat = () => {
    Alert.alert('Wrong Format', 'Please enter the correct format for the field.');
    // Add more specific instructions or guide the user on how to correct the format
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
          <TouchableOpacity onPress={pickImage} style={styles.profileContainer}>
           {image ? (
           <Image source={{ uri: image }} style={styles.profileImage} />
          ) : (
          <View style={styles.profilePlaceholder}>
            <Text style={styles.profilePlaceholderText}>Add Profile Picture</Text>
          </View>
          )}
      </TouchableOpacity>
          </View>

          {/* Form */}
          <View style={{ paddingHorizontal: 20 }}>
            {Object.keys(formData).map(field => (
              <React.Fragment key={field}>
                <Text style={{ color: 'black', fontSize: 18, marginBottom: 4 }}>{getFieldLabel(field)}</Text>
                {field === 'serviceType' ? (
                  <Picker
                    style={{ color: 'black', backgroundColor: 'white', fontSize: 18, marginBottom: 8 }}
                    selectedValue={formData[field]}
                    onValueChange={(itemValue) => setFormData({ ...formData, [field]: itemValue })}
                  >
                    {/* Picker options */}
                    <Picker.Item label="Select Services" value="" />
                    <Picker.Item label="BeautySaloon" value="BeautySaloon" />
                    <Picker.Item label="Catering" value="Catering" />
                    <Picker.Item label="Cleaning" value="Cleaning" />
                    <Picker.Item label="Clinical" value="Clinical" />
                    <Picker.Item label="Gardening" value="Gardening" />
                    <Picker.Item label="HomeCare" value="HomeCare" />
                    <Picker.Item label="Maintenance" value="Maintenance" />
                    <Picker.Item label="Security" value="Security" />
                    <Picker.Item label="Shifting" value="Shifting" />
                    <Picker.Item label="Solar" value="Solar" />
                    <Picker.Item label="Washing" value="Washing" />
                    {/* Add more service options as needed */}
                  </Picker>
                ) : field === 'availability' || field === 'experienceYears' ? (
                  <TextInput
                    style={{
                      borderWidth: 1,
                      backgroundColor: 'white',
                      borderColor: 'gray',
                      padding: 10,
                      marginBottom: 16,
                      borderRadius: 8,
                      color: 'black',
                    }}
                    placeholder={`Enter your ${getFieldLabel(field).toLowerCase()}`}
                    value={formData[field]}
                    onChangeText={(text) => {
                      const value = parseInt(text, 10);
                      if (!isNaN(value)) {
                        setFormData({ ...formData, [field]: text });
                      } else {
                        handleWrongFormat();
                      }
                    }}
                    keyboardType="numeric"
                  />
                ) : (
                  <TextInput
                    style={{
                      borderWidth: 1,
                      backgroundColor: 'white',
                      borderColor: 'gray',
                      padding: 10,
                      marginBottom: 16,
                      borderRadius: 8,
                      color: 'black',
                    }}
                    placeholder={`Enter your ${getFieldLabel(field).toLowerCase()}`}
                    value={formData[field]}
                    onChangeText={(text) => setFormData({ ...formData, [field]: text })}
                    secureTextEntry={field === 'password'}
                    keyboardType={getFieldType(field)}
                  />
                )}
              </React.Fragment>
            ))}
          </View>
          {/* Submit Button */}
          <TouchableOpacity onPress={handleFormSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Function to get the label of a field
const getFieldLabel = (field) => {
  const fieldLabels = {
    fullName: 'Full Name',
    email: 'Email Address',
    password: 'Password',
    address: 'Address',
    city: 'City',
    state: 'State',
    zipCode: 'ZIP Code',
    serviceType: 'Type of Service',
    experienceYears: 'Years of Experience',
    certifications: 'Certifications',
    availability: 'Availability',
    specialization: 'Specialization',
    smartphoneType: 'Smartphone Type',
  };
  return fieldLabels[field] || '';
};

// Function to get the type of keyboard for a field
const getFieldType = (field) => {
  const fieldTypes = {
    email: 'email-address',
    zipCode: 'numeric',
   

    email: 'email-address',
    zipCode: 'numeric',
    experienceYears: 'numeric',
    availability:'numeric',
  };
  return fieldTypes[field] || 'default';
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white', // Setting background color to white
    position: 'relative',
  },
  profileContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profilePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePlaceholderText: {
    fontSize: 16,
    color: '#555',
  },
  submitButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black', // Setting text color to black
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white', // Setting text color to white
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: 'white', // Setting text color to white
  },
  profileContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  profilePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePlaceholderText: {
    fontSize: 16,
    color: '#555',
  },
});

export default ProviderForm;


