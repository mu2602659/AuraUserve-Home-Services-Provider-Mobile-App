import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageBackground,
  } from "react-native";
  import React from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { themeColors } from "../theme";
  import { ArrowLeftIcon } from "react-native-heroicons/solid";
  import { useNavigation } from "@react-navigation/native";
  
  export default function UserScreen() {
    const navigation = useNavigation();
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ImageBackground
          source={require("../assets/images/background.jpg")} // Specify your background image path
          style={{ flex: 1, resizeMode: "cover" }}
        >
          <View className="flex-row justify-start mt-4">
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="bg-yellow-400 p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            >
              <ArrowLeftIcon size="20" color="black" />
            </TouchableOpacity>
          </View>
  
          <View
            style={{ flex: 1, justifyContent: "space-around", marginVertical: 4 }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 36,
                textAlign: "center",
              }}
            >
              Welcome User!
            </Text>
            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Image
                source={require("../assets/images/welcome.png")}
                style={{ width: 200, height: 200 }}
              />
            </View>
            <View style={{ spaceY: 4 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("SignUp")}
                style={{
                  paddingVertical: 15,
                  backgroundColor: "#FFD700",
                  marginHorizontal: 20,
                  marginVertical: 8,
                  borderRadius: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#555555",
                  }}
                >
                  Sign Up
                </Text>
              </TouchableOpacity>
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={{ color: "white", fontWeight: "bold" }}>
                  Already have an account?
                </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={{ fontWeight: "bold", color: "#FFD700" }}>
                    {" "}
                    Log In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
  