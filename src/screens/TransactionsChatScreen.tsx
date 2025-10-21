import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { Card, Text } from "react-native-paper";
import { listTransactionsChat } from "../lib/api";

export default function TransactionsChatScreen() {
  const [items, setItems] = useState<any[]>([]);
  useEffect(()=>{ (async()=>{ const d = await listTransactionsChat(); setItems(d.chat || []); })(); }, []);

  return (
    <FlatList
      contentContainerStyle={{ padding:16, gap:12 }}
      data={items}
      keyExtractor={(i)=>String(i.id)}
      renderItem={({ item }) => (
        <View style={{ alignItems: item.role === "out" ? "flex-end" : "flex-start" }}>
          <Card style={{ maxWidth:"85%", borderRadius:16, backgroundColor: item.role === "out" ? "#DCFCE7" : "#F1F5F9" }}>
            <Card.Content>
              <Text style={{ fontWeight:"700" }}>{item.amount} đ</Text>
              <Text>{item.text}</Text>
              <Text style={{ opacity:0.6, marginTop:4 }}>{new Date(item.date).toLocaleString()} • {item.wallet}</Text>
            </Card.Content>
          </Card>
        </View>
      )}
      ListEmptyComponent={<Text style={{ textAlign:"center", marginTop:48 }}>Chưa có giao dịch</Text>}
    />
  );
}
