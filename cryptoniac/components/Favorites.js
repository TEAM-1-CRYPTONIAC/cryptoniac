import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const FavoritesPage = () => {

  const { theme } = useTheme();
  return (
    <View style={theme.container}>
      <Text style={theme.title}>Favorites Page</Text>
    </View>
  );
};

export default FavoritesPage;