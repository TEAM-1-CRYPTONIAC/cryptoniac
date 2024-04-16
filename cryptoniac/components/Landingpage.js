import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getCryptoPrices } from './APIKEY';
import { useTheme } from '../context/ThemeContext';

const LandingPage = ({ navigation }) => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const data = await getCryptoPrices();
        setCryptos(data); // Assuming the data is directly usable
        setLoading(false);
      } catch (error) {
        console.log('Failed to fetch prices:', error);
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  if (loading) {
    return (
      <View style={theme.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={theme.container}>
      <FlatList
        data={cryptos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={theme.item}
            onPress={() => navigation.navigate('CryptoDetail', { cryptoId: item.id })}
          >
            <Text style={theme.title}>{item.name} ({item.symbol})</Text>
            <Text>${item.current_price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default LandingPage;
