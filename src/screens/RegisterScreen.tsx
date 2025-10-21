import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { register as apiRegister, requestOtp } from "../lib/api";

type P = NativeStackScreenProps<RootStackParamList, "Register">;

export default function RegisterScreen({ navigation }: P) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const onSubmit = async () => {
    try {
      setLoading(true);
      await apiRegister({email, password, confirmPassword, name});
      await requestOtp(email.trim(), "register");
      navigation.replace("OTP", { email: email.trim(), purpose: "register" });
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Đăng ký thất bại"); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.wrap}>
      <Text variant="headlineSmall" style={{ marginBottom: 12 }}>Đăng ký</Text>
      <TextInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput label="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry style={{ marginTop: 12 }} />
      <TextInput label="Nhập lại mật khẩu" value={confirmPassword} onChangeText={setConfirmPassword} secureTextEntry style={{ marginTop: 12 }} />
      <TextInput label="Tên của bạn" value={name} onChangeText={setName} keyboardType="default" style={{ marginTop: 12 }} />
      {!!err && <Text style={{ color: "#EF4444", marginTop: 8 }}>{err}</Text>}
      <Button mode="contained" onPress={onSubmit} loading={loading} style={{ marginTop: 16 }}>
        Tạo tài khoản
      </Button>
      <Button mode="text" onPress={() => navigation.replace("Login")} style={{ marginTop: 16 }}>
        Đăng nhập
      </Button>

    </View>
  );
}
const styles = StyleSheet.create({ wrap: { flex: 1, padding: 20, justifyContent: "center" } });
