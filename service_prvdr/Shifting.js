import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const handlePostImage = () => {
    // Logic for posting images
  };

const Shifting = ({ route }) => {
  const { firstName, lastName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Shifting, {firstName} {lastName}!</Text>
      {/* Your Beauty Salon content here */}
      <TouchableOpacity style={styles.button} onPress={handlePostImage}>
        <Text style={styles.buttonText}>Post Images</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff',
    },
    welcomeText: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#FFD700',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderRadius: 8,
      marginTop: 20,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#000',
    },
  });
  
export default Shifting;
