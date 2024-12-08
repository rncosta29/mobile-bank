import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as SplashScreen from 'expo-splash-screen';
import Home from './home';
import CardCredit from './credit';

SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

export default function RootLayout() {
  useEffect(() => {
    const hideSplashScreen = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await SplashScreen.hideAsync();
    };

    hideSplashScreen();
  }, []);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Aba "Home" */}
      <Tab.Screen 
        name="Home" 
        component={Home} // Passa o componente diretamente
      />

      {/* Aba "Credit" */}
      <Tab.Screen 
        name="Credit" 
        component={CardCredit} // Passa o componente diretamente
      />
    </Tab.Navigator>
  );
}
