import localStorageService from '../../common/localStorage';
import { appUrl } from '../../constants/url';

import axiosRequest from './axios';

const getHeader = <T>(header?: T): object => {
  const defaultHeaders: Header = {
    'Content-Type': 'application/json',
  };

  if (header) {
    return { ...defaultHeaders, ...header };
  }

  return defaultHeaders;
};

const request = async <T>({ method, url, params, data, baseURL = appUrl, header }: RequestPayload): Promise<T> => {
  const Authorization = await localStorageService.get('Authorization');
  const Id = await localStorageService.get('Id');
  return axiosRequest({
    baseURL,
    method,
    url,
    params,
    data,
    headers: getHeader({ Authorization, Id, ...header }),
  });
};

const httpRequest = {
  request,
};

export default httpRequest;

interface RequestPayload {
  url: string;
  method: 'post' | 'get' | 'put' | 'delete';
  params?: object;
  header?: object;
  data?: object;
  baseURL?: string;
}

export interface Header {
  'Content-Type': string;
}

export interface ListResponse<T> {
  header: { message: string; success: string };
  body: T;
}

export function getFormData<T>(payload: T): FormData {
  const formData = new FormData();

  for (const key in payload) {
    if (payload[key]) {
      formData.append(key, payload[key]);
    }
  }

  return formData;
}
