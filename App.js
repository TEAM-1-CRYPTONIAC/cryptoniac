import React from 'react';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider, Icon } from 'react-native-paper';
import styles from './cryptoniac/styles/Styles';
import LandingPage from './cryptoniac/components/Landingpage';
import CryptoDetailPage from './cryptoniac/components/Detailed';
import SettingsPage from './cryptoniac/components/Settings';
import FavoritesPage from './cryptoniac/components/Favorites';
import { ThemeProvider } from './cryptoniac/context/ThemeContext';
import { FavouriteProvider } from './cryptoniac/context/FavouritesContext';  // Import the FavouriteProvider

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        options={{
          headerShown: false,
        }}
        component={LandingPage}
      />
      <Stack.Screen 
      name="CryptoDetail"
      options={{ headerStyle: { backgroundColor: '#477ee5'}}}
      component={CryptoDetailPage} />
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <ThemeProvider>
        <FavouriteProvider>
        <NavigationContainer>
          <Tab.Navigator screenOptions={{ headerStyle: { backgroundColor: '#161518'}, tabBarActiveTintColor: '#ffffff', 
          headerTintColor: '#ffffff', tabBarInactiveBackgroundColor: '#000000', tabBarActiveBackgroundColor: '#477ee5',
          tabBarStyle: {borderTopWidth: 0, height: 65}, tabBarLabelStyle: {fontSize: 15, paddingBottom: 5}}}>
           
            <Tab.Screen name="Home" component={HomeStack} 
            options={{ tabBarIcon: () => ( <Icon source='home' size={34} color='#ffffff'/>)}}/>

            <Tab.Screen name="Settings" component={SettingsPage} 
            options={{ tabBarIcon: () => ( <Icon source='cog' size={34} color='#ffffff'/>)}}/>

            <Tab.Screen name="Favorites" component={FavoritesPage} 
            options={{ tabBarIcon: () => ( <Icon source='heart' size={34} color='#ffffff'/>)}}/>
          </Tab.Navigator>
        </NavigationContainer>
        </FavouriteProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
