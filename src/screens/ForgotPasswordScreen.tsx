import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { forgotPassword } from "../lib/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";

type P = NativeStackScreenProps<RootStackParamList, "Forgot">;

export default function ForgotPasswordScreen({ navigation }: P) {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      await forgotPassword(email.trim());
      setMsg("Đã gửi hướng dẫn khôi phục tới email.");
    } catch (e: any) {
      setMsg(e?.response?.data?.message || "Không gửi được email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.wrap}>
      <Text variant="headlineSmall" style={{ marginBottom: 12 }}>Quên mật khẩu</Text>
      <TextInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      {!!msg && <Text style={{ marginTop: 8 }}>{msg}</Text>}
      <Button mode="contained" onPress={onSubmit} loading={loading} style={{ marginTop: 16 }}>
        Gửi liên kết/OTP
      </Button>
      <Button mode="text" onPress={() => navigation.goBack()} style={{ marginTop: 8 }}>Quay lại</Button>
    </View>
  );
}
const s = StyleSheet.create({ wrap: { flex: 1, padding: 20, justifyContent: "center" } });
