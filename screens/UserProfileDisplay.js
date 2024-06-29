import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, Animated, Easing, TouchableOpacity } from 'react-native';
import { getFirestore, collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { useNavigation } from '@react-navigation/native';

const UserDisplay = () => {
  const [user, setUser] = useState({});
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const fadeAnim = useState(new Animated.Value(0))[0];
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const db = getFirestore();
        const storage = getStorage();
        
        const q = query(collection(db, 'user_edit-profile'), orderBy('createdAt', 'desc'), limit(1));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          setUser(userData);

          if (userData.imageUrl) {
            const imageRef = ref(storage, `user_edit-profile/${userData.imageUrl}`);
            const url = await getDownloadURL(imageRef);
            setImageUrl(url);
          }
        } else {
          console.log('No user profile found.');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.out(Easing.exp),
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const navigateToEditProfile = () => {
    navigation.navigate('UserEditProfile');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FFBF00" />
      </View>
    );
  }

  return (
    <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
      <View style={styles.profileContainer}>
        {imageUrl ? (
          <Image source={{ uri: imageUrl }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarPlaceholderText}>No Image</Text>
          </View>
        )}
        <Text style={styles.nameText}>{user.firstName} {user.lastName}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.infoText}>{user.email}</Text>
        <View style={styles.line} />

        <Text style={styles.label}>Gender:</Text>
        <Text style={styles.infoText}>{user.gender}</Text>
        <View style={styles.line} />

        <Text style={styles.label}>Mobile Number:</Text>
        <Text style={styles.infoText}>{user.mobileNumber}</Text>
        <View style={styles.line} />

        <Text style={styles.label}>Address:</Text>
        <Text style={styles.infoText}>{user.address}</Text>
        <View style={styles.line} />

        <Text style={styles.label}>Bio:</Text>
        <Text style={styles.infoText}>{user.bio}</Text>
        <View style={styles.line} />
      </View>
      <TouchableOpacity style={styles.editButton} onPress={navigateToEditProfile}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 20,
    backgroundColor: '#FFBF00',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 20,
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarPlaceholderText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  infoContainer: {
    padding: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 18,
    color: '#999',
    marginBottom: 5,
  },
  infoText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  line: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    marginTop: 20,
    backgroundColor: '#FFBF00',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
});

export default UserDisplay;
