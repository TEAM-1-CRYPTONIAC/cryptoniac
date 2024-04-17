import axios from 'axios';

const API_KEY = 'CG-UzFjEsJbsCPyL6QZ223iB1zq';

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  }
});

// Optional: Handle rate limiting with retries
api.interceptors.response.use(response => response, async (error) => {
  const { config, response } = error;
  const maxRetries = 3;

  if (response && response.status === 429 && config && config.retryCount < maxRetries) {
    config.retryCount = config.retryCount + 1 || 1;
    const retryAfter = response.headers['retry-after'] || 2; // Default to 2 seconds if header is missing
    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
    return api(config);
  }

  return Promise.reject(error);
});

export const getCryptoDetails = async (cryptoId) => {
  try {
    const response = await api.get(`/coins/${cryptoId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrency details:', error);
    throw error;
  }
};

export const getCryptoHistoricalData = async (cryptoId) => {
  try {
    const response = await api.get(`/coins/${cryptoId}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: '90',
        interval: 'daily'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching historical data:', error);
    throw error;
  }
};

export const getCryptoPrices = async () => {
  try {
    const response = await api.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 100,
        page: 1,
        sparkline: false
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrency prices:', error);
    throw error;
  }
};


export default api;
