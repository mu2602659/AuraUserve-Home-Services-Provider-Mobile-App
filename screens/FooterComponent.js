import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

const FooterComponent = ({ Prov_Requirement, handleLogout }) => {
  return (
    <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <FontAwesome5 name="home" size={24} color="black" />
          <Text style={styles.footerText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={Prov_Requirement} style={styles.footerItem}>
          <FontAwesome5 name="briefcase" size={24} color="black" />
          <Text style={styles.footerText}>Job Opportunities</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.footerItem}>
          <FontAwesome5 name="book" size={24} color="black" />
          <Text style={styles.footerText}>Bookings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <FontAwesome5 name="user" size={24} color="black" />
          <Text style={styles.footerText}>My Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.footerItem}>
          <FontAwesome5 name="sign-out-alt" size={24} color="black" />
          <Text style={styles.footerText}>Logout</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 10,
    backgroundColor: "#F5F5F5",
  },
  footerItem: {
    alignItems: "center",
  },
  footerText: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default FooterComponent;
