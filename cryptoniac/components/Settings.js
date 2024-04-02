import React from 'react';
import { View, Button } from 'react-native';
import { useTheme } from '../context/ThemeContext';

const Settingspage = () => {
  const { toggleTheme } = useTheme();
  const {theme} = useTheme()

  return (
    <View style={theme.container}>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

export default Settingspage