import httpRequest from './config/HttpRequest';

export type DailySobriety = {
  anxious: string;
  craving: string;
  depressed: string;
  feeling: 'Sad' | 'Happy' | 'Neutral';
  record_date: string;
};

export type HistoryResponse = {
  daily_sobriety: DailySobriety[];
  streak: { current_checkin: number | null; longest_checkin: number | null };
};

export async function getHistory(): Promise<HistoryResponse> {
  try {
    const response = await httpRequest.request<HistoryResponse>({
      url: '/history_page',
      method: 'get',
    });

    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export type HistoryByIntervalRequest = { interval?: 30 | 7; startDate?: string };

export async function getHistoryByInterval(params: HistoryByIntervalRequest): Promise<DailySobriety[]> {
  try {
    const response = await httpRequest.request<DailySobriety[]>({
      url: '/history_page_calender',
      method: 'get',
      params,
    });

    return response;
  } catch (e) {
    throw new Error(e);
  }
}
