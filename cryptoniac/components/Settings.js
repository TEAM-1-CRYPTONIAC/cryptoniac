import React from 'react';
import { View, Button, Pressable, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Settingspage = () => {
  const { toggleTheme } = useTheme();
  const {theme} = useTheme()

  return (
    <View style={theme.container}>
      <Text style={theme.infoText}>Dark / Light theme:</Text>
      <TouchableOpacity style={theme.touchableOpacity} onPress={toggleTheme} >
        <Text style={theme.touchableOpacityText}>Change theme</Text>
      </TouchableOpacity>

      <Text style={theme.infoText}> Dollars / Euros:</Text>
      <TouchableOpacity style={theme.touchableOpacity} /* onPress={ CURRENCY FUNCTION HERE} */ >
        <Text style={theme.touchableOpacityText}> Change currency </Text>
      </TouchableOpacity>

      <Text style={theme.cryptoniac}> CRYPTONIAC by Team 1</Text>
    </View>
  );
};

export default Settingspage