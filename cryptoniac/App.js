import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider, Icon } from 'react-native-paper';
import styles from './styles/Styles'

const Tab = createBottomTabNavigator()

export default function App() {
  return (
    <PaperProvider>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </PaperProvider>
  );
}

function Navigation() {

  return (
    <NavigationContainer>
      <Tab.Screen name='' component={}/>
      <Tab.Screen name='' component={}/>
    </NavigationContainer>
  )
}