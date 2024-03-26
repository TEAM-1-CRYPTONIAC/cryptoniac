import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { getCryptoDetails } from './APIKEY';

const Detailed = ({ route }) => {
  const { cryptoId } = route.params;
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      try {
        const details = await getCryptoDetails(cryptoId);
        setCryptoDetails(details);
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

  if (!cryptoDetails) {
    return (
      <View>
        <Text>No data available for this cryptocurrency</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Name: {cryptoDetails.name}</Text>
      <Text>Symbol: {cryptoDetails.symbol}</Text>
      <Text>Price: ${cryptoDetails.price}</Text>
      <Text>Market Cap: ${cryptoDetails.market_cap}</Text>
      <Text>Volume (24h): ${cryptoDetails.volume_24h}</Text>
      <Text>Circulating Supply: {cryptoDetails.circulating_supply}</Text>
      <Text>Total Supply: {cryptoDetails.total_supply}</Text>
    </View>
  );
};

export default Detailed;
