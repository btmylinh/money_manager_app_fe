import React, { useState } from "react";
import { View } from "react-native";
import { Button, RadioButton, TextInput } from "react-native-paper";
import { createWallet } from "../../lib/api";

export default function CreateWalletScreen({ navigation }: any) {
  const [name, setName] = useState("");
  const [currency, setCurrency] = useState<"VND"|"USD">("VND");
  const [initial, setInitial] = useState("0");

  const onSubmit = async () => {
    await createWallet({ name, currency, initialAmount: Number(initial || 0) });
    navigation.goBack();
  };

  return (
    <View style={{ padding:16 }}>
      <TextInput label="Tên ví" value={name} onChangeText={setName} />
      <TextInput label="Số dư ban đầu" value={initial} onChangeText={setInitial} keyboardType="numeric" style={{ marginTop:12 }} />
      <RadioButton.Group value={currency} onValueChange={(v)=>setCurrency(v as any)}>
        <RadioButton.Item label="VND" value="VND" />
        <RadioButton.Item label="USD" value="USD" />
      </RadioButton.Group>
      <Button mode="contained" onPress={onSubmit}>Tạo ví</Button>
    </View>
  );
}
