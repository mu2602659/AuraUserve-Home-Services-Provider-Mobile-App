import React, { useState, useEffect } from "react";
import { ActivityIndicator,ScrollView,ImageBackground,pickImage, View, Text, TouchableOpacity, Image, menuWidth,StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { getFirestore, collection, query, orderBy, limit, getDocs } from 'firebase/firestore';

const HeaderComponent = ({ userName, userEmail, }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [latestData, setLatestData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const navigateToHomeScreen = () => {
    navigation.navigate('home');
  };

  const navigateToServicesScreen = () => {
    navigation.navigate('Services');
  };

  const navigateToMongotry = () => {
    navigation.navigate('Mongotry');
  };

  const navigateToAbout = () => {
    navigation.navigate('About');
  };
  const handleLogout = async () => {
    try {
      await signOut(auth); 
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  

//////////////////
useEffect(() => {
    const fetchLatestData = async () => {
      try {
        const db = getFirestore();
        const q = query(collection(db, 'user_edit-profile'), orderBy('createdAt', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);
        const latest = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))[0];
        setLatestData(latest);
      } catch (error) {
        console.error("Error fetching latest data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestData();
  }, []);

  if (loading) {
    return (
      <View >
        <ActivityIndicator size="large" color="#FFBF00" />
      </View>
    );
  }

  if (!latestData) {
    return (
      <View >
        <Text>No data found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.header}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
      <TouchableOpacity onPress={navigateToMongotry} style={styles.profileContainer}>
          {latestData ? (
            <Image source={{ uri: latestData.imageUrl }} style={styles.profileImage} />
          ) : (
            <View style={styles.profilePlaceholder}>
              <Text style={styles.profilePlaceholderText}>Image</Text>
            </View>
          )}
        </TouchableOpacity>
      <Text style={{ fontSize:17, marginLeft:45, marginTop:-17, fontWeight:"900", color:"black",}}>Welcome To AuraUserve</Text>
      </View>

      {/* Cart Icon */}
      <TouchableOpacity style={styles.CartMenu} onPress={() => {/* Add your cart functionality */}}>
        <FontAwesome5 name="shopping-cart" size={24} color="black" />
      </TouchableOpacity>

      {/* Hamburger Menu */}
      <TouchableOpacity style={styles.hamburgerMenu} onPress={toggleMenu}>
        <FontAwesome5 name="bars" size={24} color="black" />
      </TouchableOpacity>

      {/* Menu Items */}
      {isMenuOpen && (
         <View style={[styles.menu, { width: menuWidth }]}>
          <ScrollView>
            <ImageBackground source={require('../assets/images/background.jpg')} style={{ width: undefined, padding: 16, paddingTop: 25 }}>
            <TouchableOpacity style={styles.editButton}  onPress={navigateToMongotry}>
            <FontAwesome5 style={styles.editButton} name="edit" size={23} color="white"  />
            </TouchableOpacity>
          <TouchableOpacity onPress={pickImage} style={styles.profileContainer1}>
          {latestData ? (
            <Image source={{ uri: latestData.imageUrl }} style={styles.profileImage1} />
                ) : (
              <View style={styles.profilePlaceholder1}>
                <Text style={styles.profilePlaceholderText1}>Profile Picture</Text>
              </View>
              )}
              
          </TouchableOpacity>
          <Text style={{ fontSize: 16, marginLeft: 8, color: 'white', fontWeight: "bold" }}>Name: {latestData.name}</Text>
         {/* <Text style={{ fontSize: 16, marginLeft: 8, color: 'white', fontWeight: "bold" }}>{userName}</Text>*/}
         {/* <Text style={{ fontSize: 16, marginLeft: 8, color: 'white', fontWeight:"bold" }}>{latestData.email}</Text>*/}
          <Text style={{ fontSize: 16, marginLeft: 8, color: 'white', fontWeight:"bold" }}>{userEmail}</Text>
          <Text style={{ fontSize: 16, marginLeft: 8, color: 'white', fontWeight: "bold" }}>{latestData.mobile}</Text>

    
            </ImageBackground>
          </ScrollView>
          <TouchableOpacity onPress={navigateToHomeScreen}>
            <View style={styles.menuItem}>
              <MaterialIcons name="home" size={24} color="black" />
              <Text style={styles.menuText}>Home</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={navigateToAbout}>
            <View style={styles.menuItem}>
              <MaterialIcons name="info" size={24} color="black" />
              <Text style={styles.menuText}>About</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={navigateToServicesScreen}>
            <View style={styles.menuItem}>
              <MaterialIcons name="settings" size={24} color="black" />
              <Text style={styles.menuText}>Services</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeMenu}>
            <View style={styles.menuItem}>
              <MaterialIcons name="announcement" size={24} color="black" />
              <Text style={styles.menuText}>Terms & Conditions</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={closeMenu}>
            <View style={styles.menuItem}>
              <MaterialIcons name="contacts" size={24} color="black" />
              <Text style={styles.menuText}>Contact</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogout} >
            <View style={styles.menuItem}>
              <MaterialIcons name="logout" size={24} color="black" />
              <Text style={styles.menuText}>LogOut</Text>
            </View>
          </TouchableOpacity>

          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
    resizeMode: "cover",
    borderRadius: 20,
  },
  hamburgerMenu: {
    marginRight: 10,
    marginLeft: -90,
    marginTop:-17,
  },
  CartMenu: {
    marginLeft: -90,
    marginTop:-17,
  },
  hoveredItem: {
    backgroundColor: "#f0f0f0",
  },
  menu: {
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: 'white',
    width: 280,
    height: 705,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1,
    width: menuWidth, // Media query applied here
  },
  menuItem: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 16,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
    fontWeight: "bold",
    color: "black",
  },
  profile: {
    width: 85,
    height: 85,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "#FFF",
    resizeMode: "center",
  },
  name: {
    color: "#FFF",
    fontSize: 22,
    fontWeight: "800",
    marginVertical: 8
  },
  Registered: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "700",
    marginVertical: 5
  },
  closeButton: {
    alignSelf: 'left',
    marginTop: 20,
    paddingHorizontal: 120,
    paddingVertical: 10,
    backgroundColor: '#FFD700',
  },
  hoveredItem: {
    backgroundColor: "#f0f0f0", // Change the background color when hovered
  },
  closeButtonText:{
    fontWeight: "bold",
    fontSize: 15,
  },
  editButton:{
    marginLeft: 110,
   marginTop: 0,

  },
  
  profileContainer: {
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 75,
  },
  profilePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 75,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePlaceholderText: {
    fontSize: 16,
    color: '#555',
  },
  
  profileContainer1: {
    marginBottom: 20,
  },
  profileImage1: {
    width: 110,
    height: 110,
    borderRadius: 75,
  },
  profilePlaceholder1: {
    width: 100,
    height: 100,
    borderRadius: 75,
    backgroundColor: 'lightgray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePlaceholderText1: {
    fontSize: 16,
    color: '#555',
  },
});

export default HeaderComponent;