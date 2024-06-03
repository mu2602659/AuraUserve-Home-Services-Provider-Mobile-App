import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image,ImageBackground, StyleSheet, ScrollView, ActivityIndicator, FlatList, RefreshControl, } from "react-native";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import HeaderComponent from "./HeaderComponent";
import FooterComponent from "./FooterComponent";
import axios from 'axios';
import { IMG_URL } from "../config/ip_address";

const HomeScreen = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [profileImage, setProfileImage] = useState(require("../assets/images/logoo.png"));
  const [posterImages, setPosterImages] = useState([]);
  const [refreshing, setRefreshing] = useState(false); // State for refreshing
  const [loading, setLoading] = useState(true);
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
  ];

  // Customer Reviews Data
  const customerReviews = [
    { id: '1', name: 'John Doe', review: 'Amazing service! Highly recommended.' },
    { id: '2', name: 'Jane Smith', review: 'Excellent experience. Will use again.' },
  ];
 

  const navigateToScreen = (screenName) => {
    navigation.navigate(screenName);
  };

  //images from backend
  useEffect(() => {
    fetchPosterImages();
  }, []);


  const fetchPosterImages = async () => {
    try {
      const allResponse = await axios.get(`${IMG_URL}/post-images`);
      setPosterImages(allResponse.data);
      setRefreshing(false); // Stop refreshing
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
      setLoading(false);
      setRefreshing(false); // Stop refreshing
    }
  };
  const onRefresh = () => {
    setRefreshing(true); // Start refreshing
    fetchPosterImages(); // Fetch images again
  };
  const navigateToPostDetails = (post) => {
    navigation.navigate('PostDetails', { post });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
      <ImageBackground source={require("../assets/images/srvc9.jpg")} style={{ padding: 220, paddingTop:7,position: 'absolute' }}/>
        <HeaderComponent 
          userName={userName} 
          userEmail={userEmail} 
          profileImage={profileImage} 
          handleProfileClick={handleProfileClick}
          navigation={navigation} 
        />
          <View style={styles.servicesHeader}>
            <Text style={styles.ourServicesText}>Our Services</Text>

            <TouchableOpacity style={styles.seeAllLink} onPress={() => navigation.navigate("Services")}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>

          <ScrollView horizontal contentContainerStyle={styles.scrollViewContent}>
            {services.map((service) => (
              <TouchableOpacity
                key={service.name}
                style={styles.serviceBlock}
                onPress={() => navigateToService(service.name)}>

                <Image source={service.icon} style={styles.serviceIcon}/>
                <Text style={styles.serviceName}>{service.displayName}</Text>
              </TouchableOpacity>
            ))}

        </ScrollView>
        <ScrollView>
        
          <Text style={[styles.specialOffersText, {paddingTop:20,}]}>Special Offers</Text>
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

          <ScrollView style={styles.content}>
          {/* Poster Section */}
          <View style={[styles.posterContainer, {paddingTop:20,}]}>
          <Text style={styles.postsHeader}>Services Posts</Text>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <FlatList
                data={posterImages}
                keyExtractor={(item) => item._id}
                horizontal
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => navigation.navigate('PostDetails', { post: item })}>
                  <View style={styles.postContainer}>
                    <Image
                      source={{ uri: `data:image/jpeg;base64,${item.imageData}` }}
                      style={{ width: 250, height: 150 }}
                    />
                    <Text style={styles.postTitle}>{item.title}</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={[styles.postPrice, { fontWeight: 'bold', color: 'blue',marginRight: 50  }]}> Rs. {item.price}</Text>
                      <View style={[styles.postServiceLabel, { backgroundColor: 'lightblue' }]}>
                        <Text style={styles.postServiceLabelText}>{item.service}</Text>
                      </View>
                    </View>
                  </View>
                  </TouchableOpacity>
                )}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} // Add RefreshControl
              />
            )}
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

        </ScrollView>
        <FooterComponent Prov_Requirement={Prov_Requirement} handleLogout={handleLogout} />

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color:"white",
    backgroundColor: "#FFFFFF",
  },
  content: {
    flex: 1,
  },
  contents: {
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
    fontStyle:'italic',
    fontSize: 22,
    fontWeight: "bold",
    color: "black",
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
    color:"white",
    fontWeight: 90,
    fontSize: 100,
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
    color: "white",
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
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 12,
    marginTop: 12,
    marginLeft: 8,
    color: "black",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
  },
   posterContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  customerReviewsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 8,
    marginLeft: 8,
    color: "black",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
  },
  reviewBlock: {
    backgroundColor: "#FFD700",
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
  postsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  postsHeader: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    marginBottom: 8,
    marginLeft: -11,
    color: "black",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexDirection: "row",
  
  },
  postContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
  },
 
  postService: {
    backgroundColor: 'rgba(0, 0, 255, 0.3)', // Blue transparent background
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 10,
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  postTitle: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  postPrice: {
    fontSize: 16,
    color: 'blue',
  },
  postServiceLabel: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  postServiceLabelText: {
    fontWeight: 'bold',
    color: 'blue',
  },
  postImage: {
    width: '100%',
    height: 200,
  },
  postTextContainer: {
    backgroundColor: '#fff',
    padding: 10,
  },
  postText: {
    fontSize: 16,
  },
  servicesBackgroundImage: {
    width: "100%",
    height: 180, 
    resizeMode: "cover",
  },
});

export default HomeScreen;
