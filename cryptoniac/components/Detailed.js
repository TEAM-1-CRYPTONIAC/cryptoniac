import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { getCryptoPrices } from './APIKEY';
import styles from '../styles/Styles2';

const Detailed = ({ route }) => {
  const { cryptoId } = route.params;
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      try {
        const response = await getCryptoPrices();
        const crypto = response.data.find(crypto => crypto.id === cryptoId);
        if (!crypto) {
          throw new Error('Crypto details not found');
        }
        setCryptoDetails(crypto);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching crypto details:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCryptoDetails();
  }, [cryptoId]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>Market Cap Rank: {cryptoDetails?.market_cap?.toFixed(3)}</Text>
      <Text>Name: {cryptoDetails?.name}</Text>
      <Text>Symbol: {cryptoDetails?.symbol}</Text>
      <Text style={styles.price}>Price: {'$' + cryptoDetails?.quote?.USD?.price?.toFixed(3)}</Text>
      <Text>Circulating Supply: {cryptoDetails?.circulating_supply?.toFixed(3)}</Text>
      <Text>Total Supply: {cryptoDetails?.total_supply?.toFixed(3)}</Text>
      <Text>Max Supply: {cryptoDetails?.max_supply?.toFixed(3)}</Text>
      <Text>Number of Market Pairs: {cryptoDetails?.num_market_pairs?.toFixed(3)}</Text>
      <Text style={[styles.percentChange, { color: cryptoDetails.quote.USD.percent_change_24h >= 0 ? 'green' : 'red' }]}>
        Percent Change (24h): {cryptoDetails?.quote?.USD?.percent_change_24h?.toFixed(3)}%
      </Text>
      <Text style={[styles.percentChange, { color: cryptoDetails.quote.USD.percent_change_1h >= 0 ? 'green' : 'red' }]}>
        Percent Change (1h): {cryptoDetails?.quote?.USD?.percent_change_1h?.toFixed(3)}%
      </Text>
      <Text style={[styles.percentChange, { color: cryptoDetails.quote.USD.percent_change_7d >= 0 ? 'green' : 'red' }]}>
        Percent Change (7d): {cryptoDetails?.quote?.USD?.percent_change_7d?.toFixed(3)}%
      </Text>
    </View>
  );
};

export default Detailed;
