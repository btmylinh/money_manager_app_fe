import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, Card, ProgressBar, Text } from "react-native-paper";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { listWallets } from "../lib/api";

export default function DashboardScreen() {
  const { logout, user } = useAuth();
  const [sum, setSum] = useState(0);
useEffect(()=>{ (async()=>{ const w = await listWallets(); setSum((w||[]).reduce((a: number, b: any)=>a + (b.amount||0), 0)); })(); }, []);
  return (
    <View style={s.wrap}>
      <Text variant="titleLarge">Chào {user?.email || "bạn"}</Text>
      <Card style={{ marginTop: 16 }}>
        <Card.Title title="Tóm tắt tháng này" />
        <Card.Content>
          <Text variant="headlineMedium">Số dư hiện tại: {sum.toLocaleString()} đ</Text>
          <Text>Tổng chi: 0 ₫</Text>
          <Text>Tổng thu: 0 ₫</Text>
          <Text>Chênh lệch: 0 ₫</Text>
          <ProgressBar progress={0.3} style={{ marginTop: 12, borderRadius: 8 }} />
          <Text style={{ marginTop: 6, opacity: 0.7 }}>Ngân sách 30%</Text>
        </Card.Content>
      </Card>
      <Button mode="outlined" style={{ marginTop: 20 }} onPress={logout}>Đăng xuất</Button>
    </View>
  );
}

const s = StyleSheet.create({ wrap: { flex: 1, padding: 20, paddingTop: 60 } });
