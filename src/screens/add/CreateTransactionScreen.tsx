import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Button, Dialog, Portal, SegmentedButtons, Text, TextInput } from "react-native-paper";
import { createTransaction, listWallets } from "../../lib/api";

export default function CreateTransactionScreen({ navigation }: any) {
  const [wallets, setWallets] = useState<any[]>([]);
  const [wallet_id, setWalletId] = useState<number|undefined>();
  const [type, setType] = useState<"thu"|"chi">("chi");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [store, setStore] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0,10));
  const [note, setNote] = useState("");
  const [review, setReview] = useState(false);

  useEffect(() => { (async()=>{ const w = await listWallets(); setWallets(w); setWalletId(w?.[0]?.id) })(); }, []);

  const onSave = async () => {
    await createTransaction({
      wallet_id: Number(wallet_id),
      user_category_id: Number(categoryId),
      amount: Number(amount),
      store_service: store,
      transaction_date: date,
      note,
      type: type === "thu" ? 1 : 2,
    });
    setReview(false);
    navigation.goBack();
  };

  const invalid = !wallet_id || !amount || !categoryId || !store;

  return (
    <View style={{ padding:16 }}>
      <SegmentedButtons
        value={type}
        onValueChange={(v:any)=>setType(v)}
        buttons={[{label:"Chi", value:"chi"}, {label:"Thu", value:"thu"}]}
      />
      <TextInput label="Ví (ID)" value={wallet_id?.toString() || ""} onChangeText={(t)=>setWalletId(Number(t) || undefined)} style={{ marginTop:12 }} />
      <TextInput label="Danh mục (user_category_id)" value={categoryId} onChangeText={setCategoryId} keyboardType="numeric" style={{ marginTop:12 }} />
      <TextInput label="Số tiền" value={amount} onChangeText={setAmount} keyboardType="numeric" style={{ marginTop:12 }} />
      <TextInput label="Cửa hàng/Dịch vụ" value={store} onChangeText={setStore} style={{ marginTop:12 }} />
      <TextInput label="Ngày" value={date} onChangeText={setDate} style={{ marginTop:12 }} />
      <TextInput label="Ghi chú" value={note} onChangeText={setNote} style={{ marginTop:12 }} />

      {/* Nhập thông minh (demo stub) */}
      <View style={{ flexDirection:"row", gap:8, marginTop:12 }}>
        <Button mode="outlined" icon="camera" onPress={()=>{ setStore("Highlands"); setAmount("55000"); }}>
          Ảnh (OCR)
        </Button>
        <Button mode="outlined" icon="microphone" onPress={()=>{ setStore("Grab"); setAmount("32000"); }}>
          Voice
        </Button>
        <Button mode="outlined" onPress={()=>{ setStore("Vinmart"); setAmount("200000"); }}>
          Gợi ý text
        </Button>
      </View>

      <Button mode="contained" disabled={invalid} style={{ marginTop:16 }} onPress={()=>setReview(true)}>
        Xem trước & Lưu
      </Button>

      <Portal>
        <Dialog visible={review} onDismiss={()=>setReview(false)}>
          <Dialog.Title>Xem trước</Dialog.Title>
          <Dialog.Content>
            <Text>{type === "chi" ? "Chi" : "Thu"} • {Number(amount).toLocaleString()} đ</Text>
            <Text>{store} • Ví #{wallet_id}</Text>
            <Text>Danh mục ID: {categoryId} • {date}</Text>
            {!!note && <Text>Ghi chú: {note}</Text>}
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={()=>setReview(false)}>Sửa</Button>
            <Button onPress={onSave}>Lưu</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}
