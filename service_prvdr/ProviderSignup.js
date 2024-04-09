import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ProviderSignup = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const handleNavigateToMongotry = () => {
    navigation.navigate('Mongotry');
  };

  const handleNavigatefirebase_img = () => {
    navigation.navigate('firebase_img');
  };


  const handleSignup = () => {
    if (firstName && lastName && mobileNumber && selectedService) {
      // Navigate to the next screen with selected service and user details as parameters
      navigation.navigate('NextScreen', {
        firstName: firstName,
        lastName: lastName,
        mobileNumber: mobileNumber,
        selectedService: selectedService
      });
    } else {
      alert('Incomplete Form', 'Please fill in all fields before proceeding.');
    }
  };

  const serviceOptions = [
    { label: 'Beauty Salon', value: 'BeautySalon' },
    { label: 'Catering', value: 'Catering' },
    { label: 'Cleaning', value: 'Cleaning' },
    { label: 'Clinical', value: 'Clinical' },
    { label: 'Gardening', value: 'Gardening' },
    { label: 'HomeCare', value: 'HomeCare' },
    { label: 'Maintenance', value: 'Maintenance' },
    { label: 'Security', value: 'Security' },
    { label: 'Shifting', value: 'Shifting' },
    { label: 'Solar', value: 'Solar' },
    { label: 'Washing', value: 'Washing' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Service Provider Signup</Text>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>First Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your first name"
          onChangeText={setFirstName}
          value={firstName}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Last Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your last name"
          onChangeText={setLastName}
          value={lastName}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Mobile Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your mobile number"
          keyboardType="phone-pad"
          onChangeText={setMobileNumber}
          value={mobileNumber}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Select Service:</Text>
        <View style={styles.pickerBoundary}>
          <Picker
            style={styles.picker}
            selectedValue={selectedService}
            onValueChange={(itemValue) => setSelectedService(itemValue)}
          >
            <Picker.Item label="Select the Services" value="" />
            {serviceOptions.map((option, index) => (
              <Picker.Item key={index} label={option.label} value={option.value} />
            ))}
          </Picker>
        </View>
      </View>
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupButton} onPress={handleNavigateToMongotry}>
        <Text style={styles.signupButtonText}>Mongodb Attach</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.signupButton} onPress={handleNavigatefirebase_img}>
        <Text style={styles.signupButtonText}>image upload with firebase</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  inputGroup: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  pickerBoundary: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  picker: {
    width: '100%',
    height: 40,
  },
  signupButton: {
    backgroundColor: '#FDDA0D',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    margin:10,
    borderColor:'black',
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ProviderSignup;
