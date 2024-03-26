import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper';
import styles from './cryptoniac/styles/Styles';
import LandingPage from './cryptoniac/components/Landingpage';
import CryptoDetailPage from './cryptoniac/components/Detailed';
import SettingsPage from './cryptoniac/components/Settings';
import FavoritesPage from './cryptoniac/components/Favorites';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        options={{
          headerRight: () => (
            <Image
              style={{ width: 100, height: 40 }}
              source={require('./cryptoniac/assets/cryplogo.png')}
              resizeMode="contain"
            />
          ),
        }}
        component={LandingPage}
      />
      <Stack.Screen name="CryptoDetail" component={CryptoDetailPage} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Tab.Navigator>
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Settings" component={SettingsPage} />
            <Tab.Screen name="Favorites" component={FavoritesPage} />
          </Tab.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
