import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import styles from './cryptoniac/styles/Styles';
import LandingPage from './cryptoniac/components/Landingpage';
import SettingsPage from './cryptoniac/components/Settings'; // Import SettingsPage
import FavoritesPage from './cryptoniac/components/Favorites'; // Import FavoritesPage

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen 
              name="Landing"
              component={LandingPage}
            />
            <Tab.Screen 
              name="Settings"
              component={SettingsPage} // Change component to SettingsPage
            />
            <Tab.Screen 
              name="Favorites"
              component={FavoritesPage} // Change component to SettingsPage
            />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
