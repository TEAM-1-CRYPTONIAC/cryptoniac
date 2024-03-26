import React from 'react'; // Import React
import { StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as PaperProvider } from 'react-native-paper'; // Corrected import for PaperProvider
import styles from './cryptoniac/styles/Styles'; // Assuming this path is correct and Styles.js exists

// Import your screen components
import LandingPage from './cryptoniac/components/Landingpage'; // Adjust the path to your actual component files
import CryptoDetailPage from './cryptoniac/components/Detailed';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Landing"         
            options={{
          headerRight: props => (
            <Image
              style={{ width: 100, height: 40 }}
              source={require('./cryptoniac/assets/cryplogo.png')}
              resizeMode="contain"
            />
          ),
        }}component={LandingPage} />
            <Stack.Screen name="CryptoDetail" component={CryptoDetailPage} />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </PaperProvider>
  );
}
