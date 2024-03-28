import axios from 'axios';
import { COINMARKETCAP_API_KEY } from '@env';

const api = axios.create({
  baseURL: 'https://pro-api.coinmarketcap.com/v1',
  headers: {
    'X-CMC_PRO_API_KEY': COINMARKETCAP_API_KEY,
  },
});

export const getCryptoDetails = async (cryptoId) => {
  try {
    const response = await getCryptoPrices();
    const crypto = response.data.find(crypto => crypto.id === cryptoId);
    
    if (!crypto) {
      throw new Error('Crypto details not found');
    }

    console.log('Crypto details fetched:', crypto);
    return crypto;
  } catch (error) {
    console.error('Error fetching crypto details:', error);
    throw error;
  }
};

export const getCryptoPrices = async () => {
  try {
    const response = await api.get('/cryptocurrency/listings/latest');
    console.log('Crypto prices fetched:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching crypto prices:', error);
    throw error;
  }
};
