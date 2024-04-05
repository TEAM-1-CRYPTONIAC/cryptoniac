import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { getCryptoPrices } from './APIKEY';
import styles from '../styles/Styles';
import { useTheme } from '../context/ThemeContext';
import { FavouriteContext } from '../context/FavouritesContext';

const Detailed = ({ route }) => {
  const { cryptoId } = route.params;
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { theme } = useTheme();
  const {setFavourite } = useContext(FavouriteContext)


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

  const AddFavourite = () => {

    const newFavourite = {}
  }

  return (
    <View style={theme.detailContainer}>
      <Text style={theme.detailText}>Market Cap Rank: {cryptoDetails?.market_cap?.toFixed(3)}</Text>
      <Text style={theme.detailText}>Name: {cryptoDetails?.name}</Text>
      <Text style={theme.detailText}>Symbol: {cryptoDetails?.symbol}</Text>
      <Text style={theme.detailPrice}>Price: {'$' + cryptoDetails?.quote?.USD?.price?.toFixed(3)}</Text>
      <Text style={theme.detailText}>Circulating Supply: {cryptoDetails?.circulating_supply?.toFixed(3)}</Text>
      <Text style={theme.detailText}>Total Supply: {cryptoDetails?.total_supply?.toFixed(3)}</Text>
      <Text style={theme.detailText}>Max Supply: {cryptoDetails?.max_supply?.toFixed(3)}</Text>
      <Text style={theme.detailText}>Number of Market Pairs: {cryptoDetails?.num_market_pairs?.toFixed(3)}</Text>
      <Text style={[theme.percentChange, { color: cryptoDetails.quote.USD.percent_change_24h >= 0 ? 'green' : 'red' }]}>
        Percent Change (24h): {cryptoDetails?.quote?.USD?.percent_change_24h?.toFixed(3)}%
      </Text>
      <Text style={[theme.percentChange, { color: cryptoDetails.quote.USD.percent_change_1h >= 0 ? 'green' : 'red' }]}>
        Percent Change (1h): {cryptoDetails?.quote?.USD?.percent_change_1h?.toFixed(3)}%
      </Text>
      <Text style={[theme.percentChange, { color: cryptoDetails.quote.USD.percent_change_7d >= 0 ? 'green' : 'red' }]}>
        Percent Change (7d): {cryptoDetails?.quote?.USD?.percent_change_7d?.toFixed(3)}%
      </Text>

      <TouchableOpacity style={theme.favouriteButton}/* onPress={toggleFavourite} */> 
      <Text style={theme.favouriteButtonText}>Add to Favourites</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Detailed;
