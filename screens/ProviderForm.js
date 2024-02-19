// ProviderForm.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';



const ProviderForm = () => {
  const navigation = useNavigation();

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

  const [currentPage, setCurrentPage] = useState(1);

  const pages = [
    {
      title: 'Profile Picture ',
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

  const handleFormSubmit = () => {
    // Handle form submission, e.g., send data to server
    console.log('Form submitted:', formData);
    // Display a message that the application is submitted
    Alert.alert('Success', 'Your application is submitted!');
  };

  const handleNextPage = () => {
    // Validate if all fields are filled
    const areAllFieldsFilled = pages[currentPage - 1].fields.every((field) => formData[field].trim() !== '');

    if (areAllFieldsFilled) {
      setCurrentPage(currentPage + 1);
    } else {
      Alert.alert('Incomplete Form', 'Please fill in all fields before proceeding.');
    }
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleWrongFormat = () => {
    Alert.alert('Wrong Format', 'Please enter the correct format for the field.');
    // Add more specific instructions or guide the user on how to correct the format
  };

  const ServicesScreen = () => {
    // Navigate to the ServiceProviderFormScreen when the button is pressed
    navigation.navigate('ServicesScreen');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          
         
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
           <Text  style={{ fontSize: 18, color:'white' }} >Become A Service Provider</Text>
            <Image source={require('../assets/images/welcome.png')} style={{ width: 150, height: 150 }} />
            <Text style={{ fontSize: 18, color:'white' }}>Profile picture</Text>
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: 'black', fontSize: 18, marginBottom: 8 }}>{pages[currentPage - 1].title}</Text>
            {pages[currentPage - 1].fields.map((field) => (
              <React.Fragment key={field}>
                <Text style={{ color:'white',fontSize: 18, marginBottom: 4 }}>{getFieldLabel(field)}</Text>
                {field === 'serviceType' ? (
                  <Picker
                    style={{ color: 'black', backgroundColor:'white', fontSize: 18, marginBottom: 8 }}
                    selectedValue={formData[field]}
                    onValueChange={(itemValue) => setFormData({ ...formData, [field]: itemValue })}
                  >
                    <Picker.Item  style={{ color: 'black', fontSize: 18}}label="Select Service" value="" />
                    <Picker.Item  style={{ color: 'black', fontSize: 18}}label="catering" value="catering" />
                    <Picker.Item  style={{ color: 'black', fontSize: 18}}label="Salon" value="Salon" />
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
                    keyboardType="numeric"
                    maxLength={2}
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
                    keyboardType="numeric"
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
          {currentPage === pages.length && (
            <TouchableOpacity onPress={() => navigation.navigate('Services')} style={{ backgroundColor: '#FFD700', padding: 10, borderRadius: 10, marginLeft:97 ,marginRight:97 }}>
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', textAlign: 'center', marginVertical: 10 }}>
                Explore Our App
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Button to navigate to Prvdr_Dashboard */}
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

const getFieldType = (field) => {
  const fieldTypes = {
    email: 'email-address',
    zipCode: 'numeric',
    experienceYears: 'numeric',
  };
  return fieldTypes[field] || 'default';
};

export default ProviderForm;
