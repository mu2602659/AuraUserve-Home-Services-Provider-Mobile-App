import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const AppointmentsScreen = () => {
  // Sample data for appointments
  const appointmentsData = [
    { id: '1', time: '10:00 AM', service: 'Haircut' },
    { id: '2', time: '11:30 AM', service: 'Manicure' },
    { id: '3', time: '1:00 PM', service: 'Massage' },
    { id: '4', time: '3:30 PM', service: 'Facial' },
  ];

  // Render each appointment item
  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.appointmentTime}>{item.time}</Text>
      <Text style={styles.appointmentService}>{item.service}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Appointments</Text>
      <FlatList
        data={appointmentsData}
        renderItem={renderAppointmentItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.appointmentList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  appointmentList: {
    flexGrow: 1,
  },
  appointmentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  appointmentTime: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  appointmentService: {
    fontSize: 16,
  },
});

export default AppointmentsScreen;
