import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker from @react-native-picker/picker

const ProviderSignup = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedService, setSelectedService] = useState('');

  const handleSignup = () => {
    if (firstName && lastName && selectedService) {
      // Navigate to selected service screen with selected service as parameter
      navigation.navigate(selectedService, { firstName, lastName });
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
      <Text style={styles.title}>Provider Signup</Text>
      <TextInput
        style={styles.input}
        placeholder="First Name"
        onChangeText={setFirstName}
        value={firstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        onChangeText={setLastName}
        value={lastName}
      />
      <Text style={styles.label}>Select Service:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectedService}
        onValueChange={(itemValue) => setSelectedService(itemValue)}
      >
        <Picker.Item label="-------- (Select Services) -------" value="" />
        {serviceOptions.map((option, index) => (
          <Picker.Item key={index} label={option.label} value={option.value} />
        ))}
      </Picker>
      <TouchableOpacity style={styles.signupButton} onPress={handleSignup}>
        <Text style={styles.signupButtonText}>Sign Up</Text>
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
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  picker: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  signupButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  signupButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default ProviderSignup;
