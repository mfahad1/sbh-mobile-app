import Axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { getToken } from '../login';

export class APIError extends Error {
  public status: number;

  constructor(message: string, status: number) {
    super(message);

    this.status = status;
  }
}

const axios: AxiosInstance = Axios.create({
  timeout: 10000,
});

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const {
      response: { status },
      config,
    } = error;

    if (status === 401) {
      console.log('retrying....');
      const token = await getToken();

      if (!token) {
        throw new Error('Token is required');
      }

      if (config.tryNumber && config.tryNumber > 3) {
        throw new Error('Maximum try limit exceeded');
      }

      config.headers = { ...config.headers, ...{ Authorization: `${token.token_type} ${token.access_token}1` } };

      config.tryNumber = config.tryNumber ? ++config.tryNumber : 1;

      return Promise.resolve(config);
    }

    if (!error.response) {
      return Promise.reject(new APIError('Unable to reach server', 0));
    }

    if (error.response.data.message) {
      return Promise.reject(new APIError(error.response.data.message, error.response.status));
    }

    return Promise.reject(new APIError(`Request failed with ${error.response.status}`, error.response.status));
  },
);

async function axiosRequest(options: AxiosRequestConfig): Promise<any> {
  const response = await axios(options);
  if ((response as any).adapter) {
    const retryResponse = await axios(response);

    return retryResponse.data;
  }
  return response.data;
}

export default axiosRequest;
