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
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error; // Propagate error
  }
};

export const getCryptoDetails = async (cryptoId) => {
  try {
    const response = await api.get(`/v1/cryptocurrency/info?id=${cryptoId}`);
    const { data } = response;

    if (!data || !data.data || !data.data[cryptoId]) {
      throw new Error('Invalid crypto details');
    }

    const cryptoDetails = data.data[cryptoId];
    const { name, symbol, quote } = cryptoDetails;

    if (!quote || !quote.USD) {
      throw new Error('Invalid crypto quote details');
    }

    const { USD } = quote;
    const { price, market_cap, volume_24h, circulating_supply, total_supply } = USD;

    return {
      name,
      symbol,
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
