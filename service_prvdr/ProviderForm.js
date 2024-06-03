import React, { useState } from "react";
import { fr, firebase } from "../config/firebase";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { collection, addDoc } from "firebase/firestore";
import { SafeAreaView } from "react-native-safe-area-context";
import {View,Text,TouchableOpacity,StyleSheet,ImageBackground,Image,TextInput,ScrollView,Alert,} from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from 'expo-document-picker';


const ProviderForm = () => {
  const navigation = useNavigation();

  const [image, setImage] = useState(null);
  const [saveState, setSaveState] = useState("Submit"); // New state for button text
  const [uploading, setUploading] = useState(false);
  
  const pickImage = async () => {
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
    fullName: "",
    email: "",
    password: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    serviceType: "",
    experienceYears: "",
    availability: "",
    specialization: "",
    smartphoneType: "",
  });

  const uploadImage = async (uri) => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      const filename = uri.substring(uri.lastIndexOf("/") + 1);
      const ref = firebase.storage().ref().child(filename);

      await ref.put(blob);

      return await ref.getDownloadURL();
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleFormSubmit = async () => {
    setUploading(true);
    try {
      let imageUrl = null;

      if (image) {
        imageUrl = await uploadImage(image);
      }
      setSaveState("Submiiting...");

      const docRef = await addDoc(collection(fr, "providerForms"), {
        ...formData,
        imageUrl,
      });

      console.log("Document written with ID: ", docRef.id);
      Alert.alert("Success", "Your application is submitted!");
      setUploading(false);
      setSaveState("Submitted");
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert(
        "Error",
        "Failed to submit application. Please try again later."
      );
      setUploading(false);
      setSaveState("Submit Form");
    }
  };

  // Function to handle displaying an alert for wrong format of input
  const handleWrongFormat = () => {
    Alert.alert(
      "Wrong Format",
      "Please enter the correct format for the field."
    );
    // Add more specific instructions or guide the user on how to correct the format
  };

  const navigateFetchImages = () => {
    navigation.navigate("FetchImages");
  };

  // Array of cities in Pakistan
  const citiesInPakistan = [
    "Karachi",
    "Lahore",
    "Islamabad",
    "Rawalpindi",
    "Faisalabad",
    "Multan",
    "Gujranwala",
    "Hyderabad",
    "Peshawar",
    "Quetta",
    // Add more cities as needed
  ];

  const statesInPakistan = [
    "Azad Jammu and Kashmir",
    "Balochistan",
    "Gilgit-Baltistan",
    "Islamabad",
    "Khyber Pakhtunkhwa",
    "Punjab",
    "Sindh",
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ImageBackground
        source={require("../assets/images/srvc1.jpg")}
        style={{ padding: 230, paddingTop: 7, position: "absolute" }}
      />
      <Text style={styles.text1}>Service Provider Form</Text>
      <TouchableOpacity
        onPress={pickImage}
        style={[styles.profileContainer, { alignItems: "center" }]}
      >
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <View style={styles.profilePlaceholder}>
            <Text style={styles.profilePlaceholderText}>
              Add Profile Picture
            </Text>
          </View>
        )}
      </TouchableOpacity>

      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          {/* Form */}
          <View style={{ paddingHorizontal: 20 }}>
            {Object.keys(formData).map((field) => (
              <React.Fragment key={field}>
                <Text style={{ color: "black", fontSize: 18, marginBottom: 4 }}>
                  {getFieldLabel(field)}
                </Text>
                {field === "serviceType" ? (
                  <View style={styles.pickerContainer}>
                    <Picker
                      style={[styles.picker, { borderWidth: 1 }]}
                      selectedValue={formData[field]}
                      onValueChange={(itemValue) =>
                        setFormData({ ...formData, [field]: itemValue })
                      }
                      mode="dropdown"
                      itemStyle={styles.pickerItem}
                    >
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
                    </Picker>
                  </View>
                ) : field === "availability" ? (
                  <TextInput
                    style={styles.input}
                    placeholder={`Enter your ${getFieldLabel(
                      field
                    ).toLowerCase()} (between 1-24)`}
                    value={formData[field]}
                    onChangeText={(text) => {
                      const value = parseInt(text, 10);
                      if (!isNaN(value) || (value >= 1 && value <= 24)) {
                        setFormData({ ...formData, [field]: text });
                      } else {
                        handleWrongFormat();
                      }
                    }}
                    keyboardType="numeric"
                  />
                ) : field === "experienceYears" ? (
                  <TextInput
                    style={styles.input}
                    placeholder={`Enter your ${getFieldLabel(
                      field
                    ).toLowerCase()} (minimum 3 years)`}
                    value={formData[field]}
                    onChangeText={(text) => {
                      const value = parseInt(text, 10);
                      if (!isNaN(value) && value >= 3) {
                        setFormData({ ...formData, [field]: text });
                      } else {
                        handleWrongFormat();
                      }
                    }}
                    keyboardType="numeric"
                  />
                ) : field === "smartphoneType" ? (
                  <View style={styles.pickerContainer}>
                    <Picker
                      style={styles.picker}
                      selectedValue={formData[field]}
                      onValueChange={(itemValue) =>
                        setFormData({ ...formData, [field]: itemValue })
                      }
                      mode="dropdown"
                    >
                      <Picker.Item label="Yes" value="Yes" />
                      <Picker.Item label="No" value="No" />
                    </Picker>
                  </View>
                ) : field === "state" ? (
                  <View style={styles.pickerContainer}>
                    <Picker
                      style={styles.picker}
                      selectedValue={formData[field]}
                      onValueChange={(itemValue) =>
                        setFormData({ ...formData, [field]: itemValue })
                      }
                      mode="dropdown"
                    >
                      <Picker.Item label="Select State" value="" />
                      {statesInPakistan.map((state) => (
                        <Picker.Item key={state} label={state} value={state} />
                      ))}
                    </Picker>
                  </View>
                ) : field === "city" ? (
                  <View style={styles.pickerContainer}>
                    <Picker
                      style={styles.picker}
                      selectedValue={formData[field]}
                      onValueChange={(itemValue) =>
                        setFormData({ ...formData, [field]: itemValue })
                      }
                      mode="dropdown"
                    >
                      {/* Populate the Picker with cities */}
                      <Picker.Item label="Select City" value="" />
                      {citiesInPakistan.map((city) => (
                        <Picker.Item key={city} label={city} value={city} />
                      ))}
                    </Picker>
                  </View>
                ) : (
                  <TextInput
                    style={styles.input}
                    placeholder={`Enter your ${getFieldLabel(
                      field
                    ).toLowerCase()}`}
                    value={formData[field]}
                    onChangeText={(text) =>
                      setFormData({ ...formData, [field]: text })
                    }
                    secureTextEntry={field === "password"}
                    keyboardType={getFieldType(field)}
                  />
                )}
              </React.Fragment>
            ))}
          </View>
          

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleFormSubmit}
            style={styles.submitButton}
            disabled={uploading}
          >
            <Text style={styles.submitButtonText}>{saveState}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={navigateFetchImages}
          >
            <Text style={styles.buttonText}>
              Fetch this form data from firebase
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// Function to get the label of a field
const getFieldLabel = (field) => {
  const fieldLabels = {
    fullName: "Full Name",
    email: "Email Address",
    password: "Password",
    address: "Address",
    city: "City",
    state: "State",
    zipCode: "ZIP Code",
    serviceType: "Type of Service",
    experienceYears: "Years of Experience",
    availability: "Availability",
    specialization: "Specialization",
    smartphoneType: "Smartphone Type",
  };
  return fieldLabels[field] || "";
};

// Function to get the type of keyboard for a field
const getFieldType = (field) => {
  const fieldTypes = {
    email: "email-address",
    zipCode: "numeric",
    experienceYears: "numeric",
    availability: "numeric",
  };
  return fieldTypes[field] || "default";
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "white", 
    position: "relative",
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
    backgroundColor: "lightgray",
    alignItems: "center",
    justifyContent: "center",
  },
  profilePlaceholderText: {
    fontSize: 16,
    color: "#555",
  },
  submitButton: {
    backgroundColor: "#FFD700",
    padding: 15,
    width: 200,
    borderRadius: 10,
    marginTop: 20,
    marginLeft: 100,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "white", 
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    color: "white", 
  },
  text1: {
    fontSize: 18,
    fontStyle: "italic",
    textAlign: "center",
    fontWeight: "500",
    alignContent: "center",
    marginBottom: 0,
    marginTop: 0,
    color: "black", 
  },
  pickerContainer: {
    height: 50,
    borderWidth: 1, 
    borderColor: "gray",
    borderRadius: 8,
    backgroundColor: "white", 
    marginBottom: 16, 
    justifyContent: "center", 
    paddingHorizontal: 10, 
  },
  picker: {
    color: "black",
    backgroundColor: "transparent",
    fontSize: 18,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    height: 50,
    width: "100%",
  },
  pickerItem: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 8,
  },
  input: {
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "gray",
    padding: 10,
    marginBottom: 16,
    borderRadius: 8,
    color: "black",
  },
});

export default ProviderForm;
