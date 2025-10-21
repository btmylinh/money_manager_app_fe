import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/MaterialIcons";
import DashboardScreen from "../screens/DashboardScreen";
import TransactionsChatScreen from "../screens/TransactionsChatScreen";
import BudgetsScreen from "../screens/BudgetsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import AddEntryScreen from "../screens/add/AddEntryScreen"; // màn “+”

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: "#22C55E" }}>
      <Tab.Screen name="Tổng quan" component={DashboardScreen}
        options={{ tabBarIcon: ({ color, size }) => <Icon name="insights" color={color} size={size} /> }}
      />
      <Tab.Screen name="Giao dịch" component={TransactionsChatScreen}
        options={{ tabBarIcon: ({ color, size }) => <Icon name="receipt-long" color={color} size={size} /> }}
      />
      <Tab.Screen name="Thêm" component={AddEntryScreen}
        options={{ tabBarIcon: ({ color, size }) => <Icon name="add-circle" color={color} size={size} /> }}
      />
      <Tab.Screen name="Ngân sách" component={BudgetsScreen}
        options={{ tabBarIcon: ({ color, size }) => <Icon name="pie-chart" color={color} size={size} /> }}
      />
      <Tab.Screen name="Tài khoản" component={ProfileScreen}
        options={{ tabBarIcon: ({ color, size }) => <Icon name="person" color={color} size={size} /> }}
      />
    </Tab.Navigator>
  );
}
