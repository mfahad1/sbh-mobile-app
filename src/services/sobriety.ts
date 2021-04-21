import httpRequest from './config/HttpRequest';
import { APIResponse } from './types';

export type SobrietyCheckRequest = {
  feeling: string;
  anxious: number;
  depressed: number;
  craving: number;
  note: string;
};

export async function sobrietyCheck(data: SobrietyCheckRequest): Promise<APIResponse> {
  try {
    const response = await httpRequest.request<APIResponse>({
      url: '/sobriety_check',
      method: 'post',
      data: { ...data, ...{ created_at: new Date() } },
    });

    return response;
  } catch (e) {
    throw new Error(e);
  }
}
