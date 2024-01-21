// ServiceProviderFormScreen.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput, ScrollView, CheckBox } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { themeColors } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { TouchableHighlight } from 'react-native-web';

const ProviderForm = () => {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    fullName: '', // text string
    email: '', // email format
    password: '', // password format
    address: '', // text string
    city: '', // text string
    state: '', // text string
    zipCode: '', // digits
    serviceType: '', // text string
    experienceYears: '', // digits
    certifications: [], // array to store certification images
    availability: '', // text string
    skills: '', // text string
    specialization: '', // text string
    idProof: null, // file upload
    backgroundCheckConsent: false, // checkbox
    smartphoneType: '', // text string
    bankAccountDetails: '', // text string
    profilePicture: null, // file upload
    skillsProvidedByUs: '', // text string, skills provided by your platform
  });

  const [currentPage, setCurrentPage] = useState(1);

  const pages = [
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
      title: 'Documents',
      fields: ['idProof', 'backgroundCheckConsent'],
    },
    {
      title: 'Mobile and Payment',
      fields: ['smartphoneType', 'bankAccountDetails'],
    },
    {
      title: 'Profile Picture and Skills Provided by Us',
      fields: ['profilePicture', 'skillsProvidedByUs'],
    },
  ];

  const handleFormSubmit = () => {
    // Handle form submission, e.g., send data to server
    console.log('Form submitted:', formData);
    // Display a message that the application is submitted
    alert('Your application is submitted!');
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: themeColors.bg }}>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginTop: 20, marginLeft: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{ backgroundColor: '#FFD700', padding: 10, borderRadius: 10 }}
            >
              <ArrowLeftIcon size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center', marginVertical: 20 }}>
            <Image source={require('../assets/images/welcome.png')} style={{ width: 150, height: 150 }} />
          </View>
          <View style={{ paddingHorizontal: 20 }}>
            <Text style={{ color: 'black', fontSize: 18, marginBottom: 8 }}>{pages[currentPage - 1].title}</Text>

            {/* Add form fields dynamically based on the current page */}
            {pages[currentPage - 1].fields.map((field) => (
              <React.Fragment key={field}>
                <Text style={{ color: 'white', fontSize: 18, marginBottom: 4 }}>{getFieldLabel(field)}</Text>
                {field === 'backgroundCheckConsent' ? (
                  <CheckBox
                    value={formData[field]}
                    onValueChange={(value) => setFormData({ ...formData, [field]: value })}
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
                    secureTextEntry={field === 'password'} // Secure entry for password
                    keyboardType={getFieldType(field)} // Set keyboard type based on the field
                  />
                )}
              </React.Fragment>
            ))}
          </View>

          {/* Previous and Next Buttons */}
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
      </ScrollView>
    </SafeAreaView>
  );
};

// Helper function to get the label for a field
const getFieldLabel = (field) => {
  // Define field labels here
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
    skills: 'Skills',
    specialization: 'Specialization',
    idProof: 'ID Proof',
    backgroundCheckConsent: 'Consent for Background Check',
    smartphoneType: 'Smartphone Type',
    bankAccountDetails: 'Bank Account Details',
    profilePicture: 'Profile Picture',
    skillsProvidedByUs: 'Skills Provided by Us',
  };

  return fieldLabels[field] || '';
};

// Helper function to get the keyboard type for a field
const getFieldType = (field) => {
  // Define field types here
  const fieldTypes = {
    email: 'email-address',
    zipCode: 'numeric',
    experienceYears: 'numeric',
  };

  return fieldTypes[field] || 'default';
};

export default ProviderForm;
