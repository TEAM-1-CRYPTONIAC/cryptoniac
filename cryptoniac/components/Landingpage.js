// LandingPage.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { getCryptoPrices } from './APIKEY';
import styles from '../styles/Styles';
import { Icon } from 'react-native-paper';



const LandingPage = ({ navigation }) => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const data = await getCryptoPrices();
        setCryptos(data.data); 
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchPrices();
  }, []);

  const handleSearch = text => {
    setSearchText(text);
  };

  const filteredCryptos = cryptos.filter(
    crypto => crypto.name.toLowerCase().includes(searchText.toLowerCase())
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
      <Icon source={'database-search-outline'} size={36}/>
        <TextInput
        style={styles.searchInput}
        onChangeText={handleSearch}
        value={searchText}
        placeholder="Search by name..."
      />
      </View>

      <FlatList
        data={filteredCryptos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigation.navigate('CryptoDetail', { cryptoId: item.id })}
          >
            <Text style={styles.title}>{item.name}({item.symbol})</Text>
            <Text style={styles.description}>Price: ${item.quote.USD.price.toFixed(2)}</Text> 
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default LandingPage;
