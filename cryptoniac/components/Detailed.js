import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { getCryptoDetails, getCryptoHistoricalData } from './APIKEY';
import { useTheme } from '../context/ThemeContext';
import { FavouriteContext } from '../context/FavouritesContext';

const screenWidth = Dimensions.get('window').width;

const Detailed = ({ route }) => {
  const { cryptoId } = route.params;
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const { addFavourite } = useContext(FavouriteContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const details = await getCryptoDetails(cryptoId);
        const history = await getCryptoHistoricalData(cryptoId);
        setCryptoDetails(details);
        setHistoricalData(history.prices.map((price) => ({x: new Date(price[0]), y: price[1]})));
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [cryptoId]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  const handleAddToFavourite = () => {
    if (cryptoDetails && cryptoDetails.id) {
      addFavourite(cryptoDetails);
      alert('Added to favourites!');
    } else {
      alert('Error: Missing cryptocurrency details!');
    }
  };

  return (
    <View style={theme.detailContainer}>
      {cryptoDetails && (
        <>
          <Text style={theme.title}>{cryptoDetails.name} ({cryptoDetails.symbol})</Text>
          <LineChart
            data={{
              labels: ["30 Days Ago", "20 Days Ago", "10 Days Ago", "Today"],
              datasets: [{ data: historicalData.map(data => data.y) }]
            }}
            width={screenWidth}
            height={220}
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            }}
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          />
          <TouchableOpacity onPress={handleAddToFavourite} style={theme.favouriteButton}>
            <Text style={theme.favouriteButtonText}>Add to Favourites</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Detailed;
