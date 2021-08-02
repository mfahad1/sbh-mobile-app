import httpRequest from './config/HttpRequest';
import { Params } from './quotes';
enum MediaType {
  text = 'text',
  video = 'video',
  audio = 'audio',
}
export type Guide = {
  author: string;
  id: string;
  image: string;
  image_landscape: string;
  name: string;
  text: string;
  resourceUrl: string;
  type: MediaType;
};

export type GuidesResponse = {
  learn_collection: Guide[];
  learn_primary: Guide | null;
  maxLimit: number;
  page: number;
};

export enum FilterMediaType {
  All = 'all',
  Audio = 'audio',
  Video = 'video',
  Text = 'text',
}

export enum GuideType {
  anxious = 'anxious',
  depressed = 'depressed',
  craving = 'craving',
}

export type GetGuidesParam = { guideType?: GuideType } & Params;

export async function getGuides({ max = 10, page = 1, type, guideType }: GetGuidesParam): Promise<GuidesResponse> {
  try {
    let params: { max: number; page: number; tag?: GuideType } = { max, page };
    let url = type && type !== 'all' ? `/learn_home?type=${type}` : '/learn_home';
    if (guideType) {
      params = { ...params, tag: guideType };
    }
    const response = await httpRequest.request<GuidesResponse>({
      url,
      method: 'get',
      params,
    });

    return response;
  } catch (e) {
    throw new Error(e);
  }
}

export type Challenge = {
  id: string;
  name: string;
  text: string;
  image: string;
  imageLandscape: string;
  participant: number;
  duration: number;
};

export type ChallengesResponse = {
  challenges_collection: Challenge[];
  maxLimit: number;
  page: number;
};

export async function getChallenges({ max = 10, page = 1 }: Params): Promise<ChallengesResponse> {
  try {
    const response = await httpRequest.request<ChallengesResponse>({
      url: '/challenges',
      method: 'get',
      params: { max, page },
    });

    return response;
  } catch (e) {
    throw new Error(e);
  }
}

const mock = {
  learn_collection: [
    {
      text: 'Lorem ipsum somthing something somthingew',
      name: 'tttt',
      image: 'https://static.dw.com/image/56471330_303.jpg',
      image_landscape: 'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2020/04/mars_landscape/21916769-2-eng-GB/Mars_landscape_pillars.jpg',
      id: 'a3C3C000000I5f2UAC',
      author: 'Vinvent',
    },
    {
      text: 'Lorem ipsum somthing something somthingew',
      name: 'sadasdsa',
      image: 'https://static.dw.com/image/56471330_303.jpg',
      image_landscape: 'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2020/04/mars_landscape/21916769-2-eng-GB/Mars_landscape_pillars.jpg',
      id: 'a3C3C000000I5f7UAC',
      author: 'Vinvent',
    },
    {
      text: 'Lorem ipsum somthing something somthingew',
      name: 'sadswdasdasd',
      image: 'https://static.dw.com/image/56471330_303.jpg',
      image_landscape: 'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2020/04/mars_landscape/21916769-2-eng-GB/Mars_landscape_pillars.jpg',
      id: 'a3C3C000000I5fCUAS',
      author: 'Vinvent',
    },
  ],
  learn_primary: {
    text: 'Lorem ipsum somthing something somthingew',
    name: 'sadswdasdasd',
    image: 'https://static.dw.com/image/56471330_303.jpg',
    image_landscape: 'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2020/04/mars_landscape/21916769-2-eng-GB/Mars_landscape_pillars.jpg',
    id: 'a3C3C000000I5fCUAS',
    author: 'Vinvent',
  },
  page: 1,
  maxLimit: 10,
};
