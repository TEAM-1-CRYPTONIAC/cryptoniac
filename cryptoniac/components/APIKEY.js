import axios from 'axios';

// Assume the API_KEY is set in your environment variables for better security
const API_KEY = process.env.API_KEY;

const api = axios.create({
  baseURL: 'https://api.coingecko.com/api/v3',
  headers: {
    'Authorization': `Bearer ${API_KEY}`
  }
});

// Refactored retry logic into a separate function
const handleRateLimit = async (error) => {
  const { config, response } = error;
  const maxRetries = 3;
  if (response && response.status === 429 && config && (config.retryCount || 0) < maxRetries) {
    config.retryCount = (config.retryCount || 0) + 1;
    const retryAfter = response.headers['retry-after'] || 2;  // Default to 2 seconds if header is missing
    await new Promise(resolve => setTimeout(resolve, retryAfter * 1000));
    return api(config);
  }
  throw error;
};

api.interceptors.response.use(response => response, handleRateLimit);

// Standardizing error handling
async function fetchWithRetry(url, params = {}) {
  try {
    const response = await api.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${url}:`, error);
    throw error;  // Rethrowing the error to be handled by the caller
  }
}

export const getCryptoDetails = (cryptoId) => fetchWithRetry(`/coins/${cryptoId}`);
export const getCryptoHistoricalData = (cryptoId, days = '30') => fetchWithRetry(`/coins/${cryptoId}/market_chart`, {
  vs_currency: 'usd',
  days: days,
  interval: 'daily'
});
export const getCryptoPrices = () => fetchWithRetry('/coins/markets', {
  vs_currency: 'usd',
  order: 'market_cap_desc',
  per_page: 50,
  page: 1,
  sparkline: false
});

export default api;
