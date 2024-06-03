import React, { useEffect, useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { fr } from '../config/firebase';

const FetchImages = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

    //fetchind data of service provider form
 useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(fr, 'providerForms'));
        const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(dataList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </SafeAreaView>
    );
  }


  //fetchind data of user edit profile
/*  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(fr, 'user_edit-profile'));
        const dataList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(dataList);
      } catch (error) {
        console.error("Error fetching data: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#FFD700" />
      </View>
    );
  }*/

  return (
    <SafeAreaView style={styles.container}>
    <Text>All Data of Provider Form</Text>
      <ScrollView>
        {data.map(item => (
          <View key={item.id} style={styles.card}>
            {item.imageUrl && (
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            )}
            <Text style={styles.text}>Full Name: {item.fullName}</Text>
            <Text style={styles.text}>Email: {item.email}</Text>
            <Text style={styles.text}>Address: {item.address}</Text>
            <Text style={styles.text}>City: {item.city}</Text>
            <Text style={styles.text}>State: {item.state}</Text>
            <Text style={styles.text}>ZIP Code: {item.zipCode}</Text>
            <Text style={styles.text}>Service Type: {item.serviceType}</Text>
            <Text style={styles.text}>Years of Experience: {item.experienceYears}</Text>
            <Text style={styles.text}>Certifications: {Array.isArray(item.certifications) ? item.certifications.join(', ') : 'N/A'}</Text>
            <Text style={styles.text}>Availability: {item.availability}</Text>
            <Text style={styles.text}>Specialization: {item.specialization}</Text>
            <Text style={styles.text}>Smartphone Type: {item.smartphoneType}</Text>
          </View>
        ))}
      </ScrollView>
      <Text>All Data of user edit profile</Text>
      <ScrollView>
        {data.map(item => (
          <View key={item.id} style={styles.card}>
            {item.imageUrl && (
              <Image source={{ uri: item.imageUrl }} style={styles.image} />
            )}
            <Text style={styles.text}>Name: {item.name}</Text>
            <Text style={styles.text}>Email: {item.email}</Text>
            <Text style={styles.text}>Phone: {item.phone}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  card: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    margin: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: 'black',
    marginBottom: 5,
  },
});

export default FetchImages;
