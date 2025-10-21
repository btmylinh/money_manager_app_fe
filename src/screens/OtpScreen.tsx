import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/RootNavigator";
import { verifyOtp } from "../lib/api";
import { saveTokens } from "../lib/storage";
import { useAuth } from "../context/AuthContext";

type P = NativeStackScreenProps<RootStackParamList, "OTP">;

export default function OtpScreen({ route, navigation }: P) {
  const { email, purpose } = route.params;
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const { setUser } = useAuth();

  const onVerify = async () => {
    try {
      setLoading(true);
      const data: any = await verifyOtp(email, code, purpose);
      // BE nên trả token nếu là 2FA; nếu là register có thể trả user/tokens sau verify
      const access = data.accessToken || data.access_token;
      const refresh = data.refreshToken || data.refresh_token;
      if (access && refresh) await saveTokens(access, refresh);
      setUser({ id: data.user?.id ?? 0, email: data.user?.email ?? email });
      navigation.replace("AfterRegisterSetup");
    } catch (e: any) {
      setErr(e?.response?.data?.message || "Mã OTP không hợp lệ/đã hết hạn");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={s.wrap}>
      <Text variant="headlineSmall">Nhập OTP</Text>
      <Text style={{ opacity: 0.7, marginBottom: 12 }}>Mã đã gửi tới: {email}</Text>
      <TextInput label="Mã 6 số" value={code} onChangeText={setCode} keyboardType="number-pad" maxLength={6} />
      {!!err && <Text style={{ color: "#EF4444", marginTop: 8 }}>{err}</Text>}
      <Button mode="contained" onPress={onVerify} loading={loading} style={{ marginTop: 16 }}>
        Xác thực
      </Button>
    </View>
  );
}
const s = StyleSheet.create({ wrap: { flex: 1, padding: 20, justifyContent: "center" } });
