import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";

type P = NativeStackScreenProps<RootStackParamList, "Login">;

export default function LoginScreen({ navigation }: P) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onLogin = async () => {
    try {
      setLoading(true);
      const { need2FA } = await login(email.trim(), password);
      if (need2FA) {
        navigation.replace("OTP", { email, purpose: "2fa" });
      } else {
        // RootNavigator sẽ tự điều hướng vào Dashboard khi user có session
      }
    } catch (e: any) {
      setError(e?.response?.data?.message || "Sai thông tin đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.wrap}>
      <Text variant="headlineSmall" style={{ marginBottom: 12 }}>Đăng nhập</Text>
      <TextInput label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />
      <TextInput label="Mật khẩu" value={password} onChangeText={setPassword} secureTextEntry style={{ marginTop: 12 }} />
      {!!error && <Text style={{ color: "#EF4444", marginTop: 8 }}>{error}</Text>}

      <TouchableOpacity onPress={() => navigation.navigate("Forgot")}>
        <Text style={{ textAlign: "right", marginTop: 8 }}>Quên mật khẩu?</Text>
      </TouchableOpacity>

      <Button mode="contained" onPress={onLogin} loading={loading} style={{ marginTop: 16 }}>
        Đăng nhập
      </Button>

      <Button mode="outlined" style={{ marginTop: 10 }} onPress={() => navigation.navigate("Register")}>
        Đăng ký
      </Button>
    </View>
  );
}

const s = StyleSheet.create({ wrap: { flex: 1, padding: 20, justifyContent: "center" } });
