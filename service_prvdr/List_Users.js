import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';

const List_Users = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [latestUser, setLatestUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all users
        const usersResponse = await axios.get('http://192.168.1.214:5001/users');
        setUsers(usersResponse.data);

        // Fetch latest user
        const latestUserResponse = await axios.get('http://192.168.1.214:5001/latest-user');
        setLatestUser(latestUserResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 10 }}>Latest User</Text>
      {latestUser && (
        <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
          <Text>Name: {latestUser.name}</Text>
          <Text>Email: {latestUser.email}</Text>
          <Text>Mobile: {latestUser.mobile}</Text>
        </View>
      )}
      <Text style={{ textAlign: 'center', fontSize: 20, marginBottom: 10 }}>User List</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: 20, marginBottom: 10 }}>
            <Text>Name: {item.name}</Text>
            <Text>Email: {item.email}</Text>
            <Text>Mobile: {item.mobile}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default List_Users;
