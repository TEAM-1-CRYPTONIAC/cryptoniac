import axios from 'axios';
import { COINMARKETCAP_API_KEY } from '@env';

const api = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com',
  headers: {
    'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
  },
});

export const getCryptoPrices = async () => {
  try {
    const response = await api.get('/v1/cryptocurrency/listings/latest');
    console.log('Crypto prices fetched:', response.data); // Log fetched data
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
};

export const getCryptoDetails = async (cryptoId) => {
  try {
    const response = await api.get(`/v1/cryptocurrency/info?id=${cryptoId}`);
    console.log('Crypto details fetched:', response.data); // Log fetched data
    const { data } = response;

    if (!data || !data.data || !data.data[cryptoId]) {
      throw new Error('Invalid crypto details');
    }

    const cryptoDetails = data.data[cryptoId];
    const { name, symbol, description } = cryptoDetails;

    // Extract additional properties if available in the response
    const { quote } = cryptoDetails;
    let price, market_cap, volume_24h, circulating_supply, total_supply;
    if (quote && quote.USD) {
      const { price: cryptoPrice, market_cap: cryptoMarketCap, volume_24h: cryptoVolume24h, circulating_supply: cryptoCirculatingSupply, total_supply: cryptoTotalSupply } = quote.USD;
      price = cryptoPrice;
      market_cap = cryptoMarketCap;
      volume_24h = cryptoVolume24h;
      circulating_supply = cryptoCirculatingSupply;
      total_supply = cryptoTotalSupply;
    }

    return {
      name,
      symbol,
      description,
      price,
      market_cap,
      volume_24h,
      circulating_supply,
      total_supply
    };
  } catch (error) {
    console.error('Error fetching crypto details:', error);
    throw error;
  }
};
