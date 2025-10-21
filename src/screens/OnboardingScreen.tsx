import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { Button, Text } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";

type P = NativeStackScreenProps<RootStackParamList, "Onboarding">;

export default function OnboardingScreen({ navigation }: P) {
  return (
    <View style={styles.wrap}>
      <Text variant="headlineMedium" style={{ textAlign: "center", marginBottom: 8 }}>
        Quản chi tiêu thông minh
      </Text>
      <Text style={{ textAlign: "center", opacity: 0.7, marginBottom: 24 }}>
        Ghi chép nhanh • Streak • Báo cáo trực quan
      </Text>
      <Image source={{uri:"https://dummyimage.com/600x400/22c55e/ffffff&text=Onboarding"}} style={{width:"100%",height:240,borderRadius:12}} />
      <Button mode="contained" style={{ marginTop: 24 }} onPress={() => navigation.replace("Login")}>
        Bắt đầu
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, padding: 20, justifyContent: "center" },
});