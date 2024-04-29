import React, { useState, useEffect, useContext } from 'react';
import { View, Text, ActivityIndicator, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { getCryptoDetails, getCryptoHistoricalData } from './APIKEY';
import { useTheme } from '../context/ThemeContext';
import { FavouriteContext } from '../context/FavouritesContext';

const Detailed = ({ route }) => {
  const { cryptoId } = route.params;
  const [cryptoDetails, setCryptoDetails] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const { addFavourite } = useContext(FavouriteContext);
  const [viewMode, setViewMode] = useState('5day'); // '1day', '5day', or '30day'
  const [priceChange, setPriceChange] = useState({ change: 0, percentageChange: 0 });
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const details = await getCryptoDetails(cryptoId);
        const history = await getCryptoHistoricalData(cryptoId, viewMode === '1day' ? '1' : viewMode === '5day' ? '5' : '30');
        setCryptoDetails(details);
        setHistoricalData(history.prices.map((price) => ({
          x: new Date(price[0]).toLocaleDateString('en-GB', { day: '2-digit', month: 'long' }),
          y: price[1],
        })));
      } catch (error) {
        console.error('Failed to fetch data:', error);
        setCryptoDetails({});
      }
      setLoading(false);
    };

    fetchData();
  }, [cryptoId, viewMode]);

  useEffect(() => {
    const updateDimensions = () => {
      setScreenWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateDimensions);

    return () => {
      Dimensions.removeEventListener('change', updateDimensions);
    };
  }, []);

  useEffect(() => {
    const changeData = viewMode === '5day' ? historicalData.slice(-5) : historicalData;
    setPriceChange(calculateChange(changeData));
  }, [historicalData, viewMode]);

  const calculateChange = (data) => {
    if (data.length >= 2) {
      const startPrice = data[0].y;
      const endPrice = data[data.length - 1].y;
      const change = endPrice - startPrice;
      const percentageChange = ((change / startPrice) * 100).toFixed(2);
      return { change: change.toFixed(2), percentageChange };
    }
    return { change: 0, percentageChange: 0 };
  };

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
  };

  const renderChartLabels = () => {
    let labels = [];
    const weeks = Math.ceil(historicalData.length / 7);
    for (let i = 0; i < weeks; i++) {
      const index = i * 7;
      labels.push(historicalData[index]?.x);
    }
    return labels.filter(Boolean);
  };

  const handleAddToFavorites = () => {
    addFavourite(cryptoDetails);
    Alert.alert('Added to Favorites', `${cryptoDetails.name} has been added to your favorites!`);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#fff" />;
  }

  return (
    <View style={theme.detailContainer}>
      <Text style={theme.detailTitle}>
        {cryptoDetails?.name} ({cryptoDetails?.symbol?.toUpperCase()})
      </Text>
      <Text style={theme.detailPrice}>
        Current Price: ${cryptoDetails?.market_data?.current_price?.usd?.toFixed(2) || 'N/A'}
      </Text>
      <Text style={theme.detailPrice}>
        24h High: ${Math.max(...historicalData.map(data => data.y)).toFixed(2)}
      </Text>
      <Text style={theme.detailPrice}>
        24h Low: ${Math.min(...historicalData.map(data => data.y)).toFixed(2)}
      </Text>
      <Text style={[theme.detailPrice, { color: priceChange.change >= 0 ? 'green' : 'red' }]}>
        Change ({viewMode === '1day' ? 'Last 1 Day' : viewMode === '5day' ? 'Last 5 Days' : 'Last 30 Days'}): 
        ${priceChange.change} ({priceChange.percentageChange}%)
      </Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
        <TouchableOpacity
          style={[theme.button, viewMode === '1day' && theme.activeButton]}
          onPress={() => handleViewModeChange('1day')}>
          <Text style={theme.buttonText}>1 Day</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[theme.button, viewMode === '5day' && theme.activeButton]}
          onPress={() => handleViewModeChange('5day')}>
          <Text style={theme.buttonText}>5 Days</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[theme.button, viewMode === '30day' && theme.activeButton]}
          onPress={() => handleViewModeChange('30day')}>
          <Text style={theme.buttonText}>30 Days</Text>
        </TouchableOpacity>
      </View>
      <LineChart
        data={{
          labels: renderChartLabels(),
          datasets: [{ data: historicalData.map(data => data.y) }],
        }}
        width={screenWidth}
        height={220}
        chartConfig={{
          backgroundColor: '#000',
          backgroundGradientFrom: '#131313',
          backgroundGradientTo: '#477ee5',
          color: (opacity = 1) => {
            const startPrice = historicalData[0].y;
            const endPrice = historicalData[historicalData.length - 1].y;
            const change = endPrice - startPrice;
            return change >= 0 ? 'green' : 'red';
          },
          strokeWidth: 2,
          decimalPlaces: 2,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
            margin: 30
          },
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#ffa726"
          }
        }}
        withDots={false}
        withHorizontalLines={false}
        withVerticalLines={false}
        bezier
        style={theme.chart}
      />
      <TouchableOpacity
        style={theme.favouriteButton}
        onPress={() => handleAddToFavorites()}>
        <Text style={theme.favouriteButtonText}>Add to Favorites</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Detailed;
