import React, {useState,useEffect,useLayoutEffect,useCallback,} from "react";
import { TouchableOpacity, Text } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {collection,addDoc,orderBy,query,onSnapshot,} from "firebase/firestore";
import { signOut } from "firebase/auth";
import { auth, fr } from "../config/firebase"; // Import your Firebase configuration
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../colors";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={{ marginRight: 10 }} onPress={onSignOut}>
          <AntDesign
            name="logout"
            size={24}
            color={colors.gray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const q = query(collection(fr, "chats"), orderBy("createdAt", "desc"));
  
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("Snapshot");
      const newMessages = querySnapshot.docs.map((doc) => ({
        _id: doc.id, // Use doc.id as the message ID
        createdAt: doc.data().createdAt.toDate(),
        text: doc.data().text,
        user: doc.data().user,
      }));
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages)
      );
    });
    return unsubscribe;
  }, []);
  
  
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    const currentUserEmail = auth.currentUser?.email;
    if (currentUserEmail) {
      const { _id, createdAt, text } = messages[0];
      addDoc(collection(fr, 'chats'), {
        _id,
        createdAt,
        text,
        user: {
          _id: currentUserEmail,
          avatar: 'https://i.pravatar.cc/300' // Provide a default avatar URL if needed
        }
      }).catch(error => console.error('Error adding message to Firestore:', error));
    } else {
      console.error('Error: Current user email is undefined');
    }
  }, []);
  

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={false}
      showUserAvatar={false}
      onSend={(messages) => onSend(messages)}
      messagesContainerStyle={{
        backgroundColor: "#fff",
      }}
      textInputStyle={{
        backgroundColor: "#fff",
        borderRadius: 20,
      }}
      user={{
        _id: auth?.currentUser?.email,
        avatar: "https://i.pravatar.cc/300",
      }}
    />
  );
}
