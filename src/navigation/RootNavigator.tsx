import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "../screens/OnboardingScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import OtpScreen from "../screens/OtpScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import DashboardScreen from "../screens/DashboardScreen";
import AfterRegisterSetupScreen from "../screens/setup/AfterRegisterSetupScreen";
import { useAuth } from "../context/AuthContext";

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  Register: undefined;
  OTP: { email: string; purpose: "register"| "2fa" }; 
  AfterRegisterSetup: undefined;
  Forgot: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="OTP" component={OtpScreen} />
            <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="AfterRegisterSetup" component={AfterRegisterSetupScreen} />
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
