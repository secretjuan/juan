import { create } from 'apisauce';

// eslint-disable-next-line camelcase
const base_url = process.env.REACT_APP_API_URL;
const apiClient = create({
  baseURL: base_url
});

apiClient.addAsyncRequestTransform(async (request) => {
  request.headers['X-API-KEY'] = process.env.REACT_APP_API_KEY;
});

export default apiClient;
