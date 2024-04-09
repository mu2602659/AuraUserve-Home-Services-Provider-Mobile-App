import React, { useState } from "react";
import { View,Text,Image,TouchableOpacity,StyleSheet,ScrollView,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
const Prov_Requirement = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleContinue = () => {
    if (selectedOption === "Yes") {
      navigation.navigate("ProviderForm");
    } else {
      // Handle logic for "No" option or navigate back to the main page
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Content */}
          <View style={styles.mainContainer}>
            {/* Requirement 1 */}
            <View style={styles.leftDiv}>
              <Image
                source={require("../assets/icons/age.png")}
                style={styles.image}
              />
            </View>
            <View style={styles.rightDiv}>
              <Text style={styles.requirementHeading}>Age</Text>
              <Text style={styles.description}>
                You have to be over 18 years of age with a valid CNIC card to
                register with AuraUserve.
              </Text>
            </View>
            <View style={styles.divider} />

            {/* Requirement 2 */}
            <View style={styles.leftDiv}>
              <Image
                source={require("../assets/icons/booking.png")}
                style={styles.image}
              />
            </View>
            <View style={styles.rightDiv}>
              <Text style={styles.requirementHeading}>Booking</Text>
              <Text style={styles.description}>
                You should be able to manage and accept bookings through
                AuraUserve.
              </Text>
            </View>
            <View style={styles.divider} />

            {/* Requirement 3 */}
            <View style={styles.leftDiv}>
              <Image
                source={require("../assets/icons/warehouse.png")}
                style={styles.image}
              />
            </View>
            <View style={styles.rightDiv}>
              <Text style={styles.requirementHeading}>
                Registered Business Center Address
              </Text>
              <Text style={styles.description}>
                You should have a registered business center address such as an
                office, shop, or salon address.
              </Text>
            </View>
            <View style={styles.divider} />

            {/* Requirement 4 */}
            <View style={styles.leftDiv}>
              <Image
                source={require("../assets/icons/sim-card.png")}
                style={styles.image}
              />
            </View>
            <View style={styles.rightDiv}>
              <Text style={styles.requirementHeading}>
                Registered Mobile Number
              </Text>
              <Text style={styles.description}>
                You should have a registered mobile number where customers can
                call after booking the job.
              </Text>
            </View>
            <View style={styles.divider} />

            {/* Requirement 5 */}
            <View style={styles.leftDiv}>
              <Image
                source={require("../assets/icons/background-check.png")}
                style={styles.image}
              />
            </View>
            <View style={styles.rightDiv}>
              <Text style={styles.requirementHeading}>Background Check</Text>
              <Text style={styles.description}>
                The Background Check process may include drug tests, police
                reports, credit checks, etc.
              </Text>
            </View>
            <View style={styles.divider} />

            {/* Requirement 6 */}
            <View style={styles.leftDiv}>
              <Image
                source={require("../assets/icons/best-customer-experience.png")}
                style={styles.image}
              />
            </View>
            <View style={styles.rightDiv}>
              <Text style={styles.requirementHeading}>Experience</Text>
              <Text style={styles.description}>
                You should have at least 3 years of experience in a relevant
                field to register with AuraUserve.
              </Text>
            </View>
            <View style={styles.divider} />

            {/* Add more divs as needed for other requirements */}

            {/* Options Section */}
            <View style={styles.centeredContainer}>
              <Text style={styles.optionsHeading}>
                Do you have all these requirements?
              </Text>
              <View style={styles.optionsContainer}>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    selectedOption === "Yes" && styles.selectedOption,
                  ]}
                  onPress={() => handleOptionSelect("Yes")}
                >
                  <Text style={styles.optionButtonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    selectedOption === "No" && styles.selectedOption,
                  ]}
                  onPress={() => handleOptionSelect("No")}
                >
                  <Text style={styles.optionButtonText}>No</Text>
                </TouchableOpacity>
              </View>

              {/* Continue Button */}
              {selectedOption === "Yes" && (
                <TouchableOpacity
                  style={styles.continueButton}
                  onPress={handleContinue}
                >
                  <Text style={styles.continueButtonText}>Continue</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  scrollContainer: {
    flexGrow: 1,
  },
 
  backButton: {
    padding: 10,
  },
  divider: {
  borderBottomWidth: 1,
  borderBottomColor: "#CCCCCC",
  width: "100%",
  marginBottom: 10, // Adjust the margin as needed
},
  backButtonIcon: {
    backgroundColor: "#FFD700",
    padding: 5,
    borderRadius: 5,
  },
  mainContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
    paddingVertical: 12,
  },
  leftDiv: {
    width: "30%",
    textAlign: "center",
  },
  rightDiv: {
    width: "45%",
    textAlign: "left",
  },
  centeredContainer: {
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 10,
    marginVertical: 8,
  },
  requirementHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  description: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 16,
  },
  optionsHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    textAlign: "center",
  },
  optionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
  optionButton: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#FFD700",
  },
  optionButtonText: {
    fontWeight: "bold",
  },
  continueButton: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 16,
  },
  continueButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "black",
  },
});

export default Prov_Requirement;
