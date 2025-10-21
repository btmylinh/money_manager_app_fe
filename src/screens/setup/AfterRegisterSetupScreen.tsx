import React, { useState, useEffect, useRef } from "react";
import { View, ScrollView } from "react-native";
import { Button, Card, Checkbox, RadioButton, Text, TextInput, List } from "react-native-paper";
import * as API from "../../lib/api";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigation/RootNavigator";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swiper from 'react-native-swiper';

type P = NativeStackScreenProps<RootStackParamList, "AfterRegisterSetup">;

const DEFAULT_CATEGORY_IDS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function AfterRegisterSetupScreen({ navigation }: P) {
  const [currency, setCurrency] = useState<"VND" | "USD">("VND");
  const [walletName, setWalletName] = useState("Ví chính");
  const [initial, setInitial] = useState("0");
  const [selected, setSelected] = useState<number[]>(DEFAULT_CATEGORY_IDS);
  const [listCategoryOption, setListCategoryOption] = useState<any[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef<Swiper>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categories = await API.getListCategories();
        setListCategoryOption(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggle = (id: number) => {
    setSelected((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((i) => i !== id)
        : [...prevSelected, id]
    );
  };

  const onSubmit = async () => {
    // Setup wallet
    await API.createWallet({
      name: walletName,
      currency: currency,
      amount: Number(initial || 0),
    });

    // Setup categories
    await API.createUserCategories(
      selected.map((id) => {
        const category = listCategoryOption.find((cat) => cat.id === id);
        return {
          name: category?.name || ``,
          icon: category?.icon || "folder",
        };
      })
    );

    navigation.replace("Dashboard");
  };

  const nextSlide = () => {
    swiperRef.current?.scrollTo(currentSlide + 1);
  };

  const prevSlide = () => {
    swiperRef.current?.scrollTo(currentSlide - 1);
  };

  return (
    <View style={{ flex: 1 }}>
      <Swiper
        ref={swiperRef}
        style={{ flex: 1 }}
        showsPagination={true}
        loop={false}
        onIndexChanged={(index) => setCurrentSlide(index)}
      >
        {/* Slide 1: Chọn đơn vị tiền tệ */}
        <View style={{ flex: 1, padding: 16, justifyContent: "center" }}>
          <Card>
            <Card.Title style={{ marginTop: 12 }} title="Chọn đơn vị tiền tệ" />
            <Card.Content>
              <RadioButton.Group onValueChange={(v) => setCurrency(v as any)} value={currency}>
                <RadioButton.Item label="VND" value="VND" />
                <RadioButton.Item label="USD" value="USD" />
              </RadioButton.Group>
            </Card.Content>
          </Card>
        </View>

        {/* Slide 2: Tạo ví */}
        <View style={{ flex: 1, padding: 16 }}>
          <Card style={{ marginTop: 12 }}>
            <Card.Title title="Tạo ví đầu tiên" />
            <Card.Content>
              <TextInput 
                label="Tên ví" 
                value={walletName} 
                onChangeText={setWalletName} 
              />
              <TextInput
                label="Số dư ban đầu"
                value={initial}
                onChangeText={setInitial}
                keyboardType="numeric"
                style={{ marginTop: 12 }}
              />
            </Card.Content>
          </Card>
        </View>

        {/* Slide 3: Chọn danh mục */}
        <View style={{ flex: 1, padding: 16 }}>
          <Card style={{ marginTop: 12 }}>
            <Card.Title title="Chọn danh mục mặc định" />
            <Card.Content>
              <ScrollView style={{ maxHeight: 200 }}>
                {listCategoryOption.map((category) => (
                  <List.Item
                    key={category.id}
                    title={category.name}
                    left={(props) => <Icon {...props} name={category.icon} size={24} />}
                    right={() => (
                      <Checkbox
                        status={selected.includes(category.id) ? "checked" : "unchecked"}
                        onPress={() => toggle(category.id)}
                      />
                    )}
                  />
                ))}
              </ScrollView>
            </Card.Content>
          </Card>
        </View>
      </Swiper>

      {/* Navigation Buttons */}
      <View style={{ padding: 16, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          mode="outlined"
          onPress={prevSlide}
          disabled={currentSlide === 0}
        >
          Quay lại
        </Button>

        {currentSlide < 2 ? (
          <Button mode="contained" onPress={nextSlide}>
            Tiếp tục
          </Button>
        ) : (
          <Button mode="contained" onPress={onSubmit}>
            Bắt đầu trải nghiệm
          </Button>
        )}
      </View>
    </View>
  );
}