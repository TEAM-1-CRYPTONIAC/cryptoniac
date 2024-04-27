import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { getCryptoDetails, getCryptoHistoricalData } from './APIKEY';
import { useTheme } from '../context/ThemeContext';
import { FavouriteContext } from '../context/FavouritesContext';

const screenWidth = Dimensions.get('window').width;

const monthNames = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    margin: 10,
  },
  chart: {
    borderRadius: 16,
    backgroundColor: '#000',
  },
  button: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  priceText: {
    color: '#fff',
    fontSize: 18,
    marginVertical: 4,
  },
  priceChangeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  changeText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const Detailed = ({ route }) => {
  const { cryptoId } = route.params;
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const { addFavourite } = useContext(FavouriteContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const details = await getCryptoDetails(cryptoId);
        const history = await getCryptoHistoricalData(cryptoId);
        setCryptoDetails(details);
        setHistoricalData(history.prices.map((price) => ({
          x: price[0],
          y: price[1],
        })));
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
      setLoading(false);
    };

    fetchData();
  }, [cryptoId]);

  const calculateChange = (data) => {
    if (data.length >= 2) {
      const startPrice = data[0].y;
      const endPrice = data[data.length - 1].y;
      const change = endPrice - startPrice;
      const percentageChange = (change / startPrice) * 100;
      return { change, percentageChange };
    }
    return { change: 0, percentageChange: 0 };
  };

  const { change, percentageChange } = calculateChange(historicalData);
  const changeColor = change >= 0 ? 'green' : 'red';

  const formatXAxisLabel = (timestamp, index, dataLength) => {
    const date = new Date(timestamp);
    const label = `${date.getDate()} ${monthNames[date.getMonth()]}`; // Day Month format
    const interval = Math.floor(dataLength / 5); // Adjust the divisor as needed
    return index % interval === 0 ? label : '';
  };

  const chartConfig = {
    backgroundColor: '#000',
    backgroundGradientFrom: '#000',
    backgroundGradientTo: '#000',
    color: (opacity = 1) => changeColor, // Dynamic color based on price change
    strokeWidth: 2,
    decimalPlaces: 2,
    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    // ... (other configurations)
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#fff" />;
  }
  const highPrice = cryptoDetails.market_data.high_24h.usd.toFixed(2);
  const lowPrice = cryptoDetails.market_data.low_24h.usd.toFixed(2);
  return (
    <View style={styles.container}>
      {cryptoDetails && (
        <>
          <Text style={styles.title}>
            {cryptoDetails.name} ({cryptoDetails.symbol.toUpperCase()})
          </Text>
          <Text style={styles.priceText}>
            Current Price: ${cryptoDetails.market_data.current_price.usd.toFixed(2)}
            <Text style={[styles.priceChangeText, { color: changeColor }]}>
              {' '}({change >= 0 ? '+' : ''}{change.toFixed(2)} USD, {change >= 0 ? '+' : ''}{percentageChange.toFixed(2)}%)
            </Text>
          </Text>
          <Text style={styles.priceText}>
            24h High: ${highPrice}
          </Text>
          <Text style={styles.priceText}>
            24h Low: ${lowPrice}
          </Text>
          <LineChart
            data={{
              labels: historicalData.map((data, index) => formatXAxisLabel(data.x, index, historicalData.length)),
              datasets: [{ data: historicalData.map(data => data.y) }],
            }}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            withDots={false}
            withHorizontalLines={false}
            withVerticalLines={false}
            bezier
            style={styles.chart}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => addFavourite(cryptoDetails)}>
            <Text style={styles.buttonText}>Add to Favourites</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default Detailed;
