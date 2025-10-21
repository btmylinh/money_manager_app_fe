import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { LightTheme } from './src/theme';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <PaperProvider theme={LightTheme}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </PaperProvider>
  );
}
