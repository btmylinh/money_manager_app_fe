import React from "react";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

export default function AddEntryScreen() {
  const nav = useNavigation<any>();
  return (
    <View style={{ flex:1, padding:16, justifyContent:"center" }}>
      <Card style={{ marginBottom:12 }}>
        <Card.Title title="Tạo giao dịch" />
        <Card.Actions><Button onPress={()=>nav.navigate("CreateTransaction")}>Mở</Button></Card.Actions>
      </Card>
      <Card style={{ marginBottom:12 }}>
        <Card.Title title="Sửa giao dịch" />
        <Card.Actions><Button onPress={()=>nav.navigate("EditTransaction")}>Mở</Button></Card.Actions>
      </Card>
      <Card>
        <Card.Title title="Tạo ví mới" />
        <Card.Actions><Button onPress={()=>nav.navigate("CreateWallet")}>Mở</Button></Card.Actions>
      </Card>
    </View>
  );
}
