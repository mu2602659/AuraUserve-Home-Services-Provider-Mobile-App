// Importing necessary modules from React Native and other libraries
import 'firebase/auth';
import React, { useState } from 'react';
import { themeColors } from '../theme';
import { fr } from '../config/firebase'; 
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from 'firebase/firestore';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';


// Define the ProviderForm component
const ProviderForm = () => {
  // Using useNavigation hook from React Navigation
  const navigation = useNavigation();

  // State to manage form data
  const [formData, setFormData] = useState({
    profilePicture: '',
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
    skills: '',
    specialization: '',
    smartphoneType: '',
    bankAccountDetails: '',
  });

  // State to manage current page of the form
  const [currentPage, setCurrentPage] = useState(1);

  // Define form pages and their respective fields
  const pages = [
    {
      title: 'Profile Picture',
      fields: ['profilePicture'],
    },
    {
      title: 'Personal Information',
      fields: ['fullName', 'email', 'password'],
    },
    {
      title: 'Location',
      fields: ['address', 'city', 'state', 'zipCode'],
    },
    {
      title: 'Service Details',
      fields: ['serviceType', 'experienceYears', 'certifications'],
    },
    {
      title: 'Availability and Skills',
      fields: ['availability', 'skills', 'specialization'],
    },
    {
      title: 'Mobile and Payment',
      fields: ['smartphoneType', 'bankAccountDetails'],
    },
  ];

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
  

  // Function to handle moving to the next page of the form
  const handleNextPage = () => {
    const areAllFieldsFilled = pages[currentPage - 1].fields.every((field) => formData[field].trim() !== '');
    if (areAllFieldsFilled) {
      setCurrentPage(currentPage + 1);
    } else {
      Alert.alert('Incomplete Form', 'Please fill in all fields before proceeding.');
    }
  };

  // Function to handle moving to the previous page of the form
  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Function to handle displaying an alert for wrong format of input
  const handleWrongFormat = () => {
    Alert.alert('Wrong Format', 'Please enter the correct format for the field.');
    // Add more specific instructions or guide the user on how to correct the format
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          {/* Header */}
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <Text style={{ fontSize: 18, color: 'white' }}>Become A Service Provider</Text>
            <Image source={require('../assets/images/welcome.png')} style={{ width: 150, height: 150 }} />
            <Text style={{ fontSize: 18, color: 'white' }}>Profile picture</Text>
          </View>

          {/* Form */}
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: 'black', fontSize: 18, marginBottom: 8 }}>{pages[currentPage - 1].title}</Text>
            {pages[currentPage - 1].fields.map((field) => (
              <React.Fragment key={field}>
                <Text style={{ color: 'white', fontSize: 18, marginBottom: 4 }}>{getFieldLabel(field)}</Text>
                {/* Render input fields based on field type */}
                {field === 'serviceType' ? (
                  <Picker
                    style={{ color: 'black', backgroundColor: 'white', fontSize: 18, marginBottom: 8 }}
                    selectedValue={formData[field]}
                    onValueChange={(itemValue) => setFormData({ ...formData, [field]: itemValue })}
                  >
                    {/* Picker options */}
                    <Picker.Item label="Select Service" value="" />
                    <Picker.Item label="catering" value="catering" />
                    <Picker.Item label="Salon" value="Salon" />
                    {/* Add more service options as needed */}
                  </Picker>
                ) : field === 'availability' ? (
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
                    maxLength={2}
                    placeholder={`${ field === 'availability' ? 'how many hours you available from 24 hours' : ''}`} 
                    keyboardType={getFieldType(field)}
                    onChangeText={(text) => {
                      const availabilityValue = parseInt(text, 10);
                      if (!isNaN(availabilityValue) && availabilityValue <= 24) {
                        setFormData({ ...formData, availability: text });
                      } else {
                        handleWrongFormat();
                      }
                    }}
                  />
                ) : field === 'experienceYears' ? (
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
                    placeholder={`${ field === 'experienceYears' ? 'minimum 3 years' : ''}`} 
                    keyboardType={getFieldType(field)}
                    onChangeText={(text) => {
                      const experienceValue = parseInt(text, 10);
                      if (!isNaN(experienceValue) && experienceValue > 3) {
                        setFormData({ ...formData, experienceYears: text });
                      } else {
                        handleWrongFormat();
                      }
                    }}
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
          {/* Navigation Buttons */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', margin: 20 }}>
            {currentPage > 1 && (
              <TouchableOpacity onPress={handlePreviousPage} style={{ backgroundColor: '#FFD700', padding: 15, borderRadius: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Previous</Text>
              </TouchableOpacity>
            )}
            {currentPage < pages.length ? (
              <TouchableOpacity onPress={handleNextPage} style={{ backgroundColor: '#FFD700', padding: 15, borderRadius: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Next</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleFormSubmit} style={{ backgroundColor: '#FFD700', padding: 15, borderRadius: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Submit</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* Button to navigate to Provider Dashboard */}
        <TouchableOpacity
          onPress={() => navigation.navigate('PrvdrDashboard')}
          style={{
            backgroundColor: '#FFD700',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 20,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>Go to Provider Dashboard</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

// Function to get the label of a field
const getFieldLabel = (field) => {
  const fieldLabels = {
    profilePicture: 'Profile Picture',
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
    skills: 'Skills',
    specialization: 'Specialization',
    smartphoneType: 'Smartphone Type',
    bankAccountDetails: 'Bank Account Details',
  };
  return fieldLabels[field] || '';
};

// Function to get the type of keyboard for a field
const getFieldType = (field) => {
  const fieldTypes = {
    email: 'email-address',
    zipCode: 'numeric',
    experienceYears: 'numeric',
    availability:'numeric',
  };
  return fieldTypes[field] || 'default';
};

export default ProviderForm;
