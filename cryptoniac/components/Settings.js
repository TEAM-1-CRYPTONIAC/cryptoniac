import React from 'react';
import { View, Button } from 'react-native';
import { useTheme } from './ThemeContext';

const Settingspage = () => {
  const { toggleTheme } = useTheme();

  return (
    <View>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};

export default Settingspage