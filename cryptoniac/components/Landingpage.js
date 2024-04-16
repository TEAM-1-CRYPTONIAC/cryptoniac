import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { getCryptoPrices } from './APIKEY';
import { useTheme } from '../context/ThemeContext';
import { Icon } from 'react-native-paper'

const LandingPage = ({ navigation }) => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');
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

  const handleSearch = text => {
    const onlyLetters = /^[A-Za-z]+$/

    if (onlyLetters.test(text) || text === '') {
    setSearchText(text)}
    else {
      alert('Please search only with letters of the English alphabet')
    };
  };

  const filteredCryptos = cryptos.filter(
    crypto => crypto.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <View style={theme.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={theme.container}>
      <View style={theme.searchView}>
      <Icon color='#4c86f1' source={'database-search'} size={38}/>
      <TextInput
        style={theme.searchInput}
        onChangeText={handleSearch}
        value={searchText}
        placeholder="Search by name..."
        placeholderTextColor={theme.searchInput.placeholderTextColor}
      />
      </View>
      
      <FlatList
        data={filteredCryptos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={theme.item}
            onPress={() => navigation.navigate('CryptoDetail', { cryptoId: item.id })}
          >
            <Text style={theme.title}>{item.name} ({item.symbol})</Text>
            <Text style={theme.price}>${item.current_price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default LandingPage;
