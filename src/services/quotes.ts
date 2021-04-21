import httpRequest from './config/HttpRequest';

export type Params = Partial<{ max: number; page: number }>;

export type Quote = {
  author: string;
  id: string;
  image: string;
  image_landscape: string;
  name: string;
  text: string;
};

export type QuotesList = {
  quote_today: Quote | null;
  quote_collection: Quote[] | [];
  page: number;
};

export async function getQuotes({ max = 10, page = 1 }: Params): Promise<QuotesList> {
  try {
    const response = await httpRequest.request<QuotesList>({
      url: '/motivation_home',
      method: 'get',
      params: { max, page },
    });

    console.log({ motivation_home: response });

    return mock;
  } catch (e) {
    throw new Error(e);
  }
}

const mock = {
  quote_collection: [
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
  quote_today: {
    text: 'Lorem ipsum somthing something somthingew',
    name: 'sadswdasdasd',
    image: 'https://static.dw.com/image/56471330_303.jpg',
    image_landscape: 'https://www.esa.int/var/esa/storage/images/esa_multimedia/images/2020/04/mars_landscape/21916769-2-eng-GB/Mars_landscape_pillars.jpg',
    id: 'a3C3C000000I5fCUAS',
    author: 'Vinvent',
  },
  page: 1,
};
