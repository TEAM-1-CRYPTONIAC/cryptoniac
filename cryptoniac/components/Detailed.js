import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import styles from '../styles/Styles';
import { getCryptoPrices } from './APIKEY'; 

const CryptoDetailPage = ({ route }) => {
  const { cryptoId } = route.params;
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const data = await getCryptoPrices();
        const crypto = data.data.find(item => item.id === cryptoId);
        if (crypto) {
          setPrice(crypto.quote.USD.price);
        } else {
          throw new Error('Crypto not found');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto prices:', error);
        setLoading(false);
      }
    };

    fetchPrices();
  }, [cryptoId]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Price: ${price ? price.toFixed(2) : 'N/A'}</Text>
    </View>
  );
};

export default CryptoDetailPage;
