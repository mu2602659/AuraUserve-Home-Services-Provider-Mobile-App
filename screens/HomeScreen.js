import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import ServicesScreen from "./ServicesScreen";

const HomeScreen = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [profileImage, setProfileImage] = useState(require("../assets/images/logoo.png"));
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName || "Unknown");
        setUserEmail(user.email || "Unknown");
      } else {
        setUserName("");
        setUserEmail("");
      }
    });
    // Unsubscribe when component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  const handleProfileClick = () => {
    const newProfileImage =
      profileImage === require("../assets/images/logoo.png")
        ? require("../assets/images/logoo.png")
        : require("../assets/images/logoo.png");
    setProfileImage(newProfileImage);
  };

  const Prov_Requirement = () => {
    // Navigate to the ServiceScreenProviderForm when the button is pressed
    navigation.navigate("Prov_Requirement");
  };

  // Services Data
  const services = [
    { id: '1', name: 'BeautySaloon', displayName: 'Beauty Saloon', icon: require('../assets/icons/beauty.png') },
    { id: '2', name: 'Clinical', displayName: 'Clinical', icon: require('../assets/icons/clinical.png') },
    { id: '3', name: 'Maintenance', displayName: 'Maintenance', icon: require('../assets/icons/maintenance.png') },
    { id: '4', name: 'Shifting', displayName: 'Shifting', icon: require('../assets/icons/shifting.png') },
    { id: '5', name: 'Solar', displayName: 'Solar', icon: require('../assets/icons/solar.png') },
    { id: '6', name: 'Cleaning', displayName: 'Cleaning', icon: require('../assets/icons/clean.png') },
    { id: '7', name: 'Catering', displayName: 'Event Organization', icon: require('../assets/icons/wedding.png') },
    { id: '8', name: 'Gardening', displayName: 'Gardening', icon: require('../assets/icons/garden.png') },
    { id: '9', name: 'Security', displayName: 'Security', icon: require('../assets/icons/security.png') },
    { id: '10', name: 'Washing', displayName: 'Vehicle Maintenance', icon: require('../assets/icons/vechile.png') },
    { id: '11', name: 'HomeCare', displayName: 'HomeCare Solutions', icon: require('../assets/icons/shield.png') },
  ]; 

  const navigateToService = (serviceName) => {
    console.log(`Navigating to ${serviceName}`);
    navigation.navigate(serviceName);
  };
  
  // Ads Data
  const adsData = [
    { id: '1', image: require('../assets/images/salon-ad.jpg'), description: 'Get salon services at the comfort of your home.', screen: 'BeautySaloonScreen' },
    { id: '2', image: require('../assets/images/doctor-ad.jpg'), description: 'Experienced doctors available for home consultations.', screen: 'ClinicalScreen' },
    // Add more ads as needed
  ];

  // Customer Reviews Data
  const customerReviews = [
    { id: '1', name: 'John Doe', review: 'Amazing service! Highly recommended.' },
    { id: '2', name: 'Jane Smith', review: 'Excellent experience. Will use again.' },
    // Add more reviews as needed
  ];

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <HeaderComponent 
          userName={userName} 
          userEmail={userEmail} 
          profileImage={profileImage} 
          handleProfileClick={handleProfileClick}
          navigation={navigation} 
        />

        <ScrollView style={styles.content}>
          <View style={styles.servicesHeader}>
            <Text style={styles.ourServicesText}>Our Services</Text>
            
            <TouchableOpacity
              style={styles.seeAllLink}
              onPress={() => navigation.navigate("Services")}
            >
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
            {services.map((service) => (
              <TouchableOpacity
                key={service.name}
                style={styles.serviceBlock}
                onPress={() => navigateToService(service.name)}
              >
                <Image source={service.icon} style={styles.serviceIcon}/>
                <Text style={styles.serviceName}>{service.displayName}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <Text style={styles.specialOffersText}>Special Offers</Text>

          <ScrollView horizontal contentContainerStyle={styles.adsScrollView}>
            {adsData.map((ad) => (
              <TouchableOpacity
                key={ad.id}
                style={styles.adBlock}
                onPress={() => navigateToScreen(ad.screen)}
              >
                <Image source={ad.image} style={styles.adImage} />
                <Text style={styles.adDescription}>{ad.description}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Poster Section */}
          <View style={styles.posterContainer}>
            <TouchableOpacity style={styles.posterBlock}>
              <Image source={require('../assets/images/poster.png')} style={styles.posterImage} />
            </TouchableOpacity>
          </View>

          {/* Customer Reviews Slider */}
          <View style={styles.customerReviewsContainer}>
            <Text style={styles.customerReviewsHeader}>Customer Reviews</Text>
            <ScrollView horizontal>
              {customerReviews.map((review) => (
                <View key={review.id} style={styles.reviewBlock}>
                  <Text style={styles.reviewText}>{review.review}</Text>
                  <Text style={styles.reviewName}>- {review.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </ScrollView>

        <FooterComponent Prov_Requirement={Prov_Requirement} handleLogout={handleLogout} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  seeAllLink: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: "#F5F5F5",
  },
  seeAllText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#555555",
  },
  servicesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginTop: 16,
  },
  ourServicesText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  servicesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  serviceBlock: {
    alignItems: "center",
    marginHorizontal: 8,
    marginVertical: 16,
  },
  serviceIcon: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  serviceName: {
    marginTop: 8,
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "center",
  },
  adsScrollView: {
    paddingHorizontal: 17,
  },
  adBlock: {
    width: 300,
    height: 210,
    marginRight: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: 'black',
  },
  adImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  adDescription: {
    padding: 10,
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  specialOffersText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 12,
    marginLeft: 17,
    color: "black",
  },
   posterContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  posterBlock: {
    width: '100%',
    height: 226,
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 20,
  },
  posterImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  customerReviewsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  customerReviewsHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: -20,
  },
  reviewBlock: {
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    padding: 15,
    marginRight: 10,
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 14,
    marginBottom: 5,
  },
  reviewName: {
    fontSize: 12,
    fontWeight: "bold",
    textAlign: "right",
  },
});

export default HomeScreen;
