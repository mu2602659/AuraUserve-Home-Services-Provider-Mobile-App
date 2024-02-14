import {View,Text,Image,TouchableOpacity,ImageBackground,} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  const Prov_Requirement = () => {
    // Navigate to the ServiceProviderFormScreen when the button is pressed
    navigation.navigate("Prov_Requirement");
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../assets/images/background.jpg")}
        style={{ flex: 1, resizeMode: "cover" }}
      >
        <View
          style={{ flex: 1, justifyContent: "space-around", marginVertical: 4 }}
        >
          <Text
            style={{ color: "white",fontWeight: "bold",fontSize: 36, textAlign: "center", }}>
            Let's Get Started!
          </Text>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image
              source={require("../assets/images/welcome.png")}
              style={{ width: 200, height: 200 }}
            />
          </View>
          <View style={{ spaceY: 4 }}>
            <TouchableOpacity onPress={() => navigation.navigate("SignUp")}
              style={{paddingVertical: 15, backgroundColor: "#FFD700",marginHorizontal: 20,marginVertical: 8,borderRadius: 10,}}>
              <Text style={{fontSize: 18,fontWeight: "bold",textAlign: "center",color: "#555555"}} >
                Sign up as User
              </Text>
            </TouchableOpacity>
            <View style={{flexDirection: "row",justifyContent: "center", alignItems: "center",
              }}
            >
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
            <View
              style={{flexDirection: "row",alignItems: "center",justifyContent: "center",marginTop: 20,marginBottom: 20,}}>
              <View style={{backgroundColor: "#FFD700",height: 1,flex: 1,marginHorizontal: 10,}}/>
              <Text style={{fontWeight: "bold",color: "white",marginHorizontal: 10,fontSize: 25,}}>
                OR
              </Text>
              <View
                style={{
                  backgroundColor: "#FFD700",
                  height: 1,
                  flex: 1,
                  marginHorizontal: 10,
                }}
              />
            </View>
            <TouchableOpacity
              onPress={Prov_Requirement}
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
                Service Provider
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
