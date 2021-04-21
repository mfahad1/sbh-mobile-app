import localStorageService from '../common/localStorage';
import { token } from '../constants/serverSetting';
import httpRequest, { getFormData } from './config/HttpRequest';

export type Token = {
  access_token: string;
  id: string;
  instance_url: string;
  issued_at: string;
  signature: string;
  token_type: string;
};

export async function getToken(): Promise<Token> {
  try {
    const response = await httpRequest.request<Token>({
      baseURL: 'https://test.salesforce.com/services/oauth2',
      url: '/token',
      method: 'post',
      data: getFormData(token),
      header: { 'Content-Type': 'application/x-www-form-urlencoded' },
    });

    localStorageService.set('Authorization', `${response.token_type} ${response.access_token}`);

    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  app_detail_Id: string;
  days_sober: number;
  first_login: boolean;
  success: boolean;
};

export async function loginService(params: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await httpRequest.request<LoginResponse>({
      url: `/Login?email=${params.email}&password=${params.password}`,
      method: 'get',
    });

    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export type UserType = {
  success: boolean;
  isEditable: boolean;
  inTake: boolean;
  days_sober: number;
  app_detail_Id: string;
};

export async function getUser(): Promise<UserType> {
  try {
    const response = await httpRequest.request<UserType>({
      url: '/GetUser',
      method: 'get',
    });

    return response;
  } catch (e) {
    throw new Error(e);
  }
}
