export const isObjectEmpty = (obj: object) => !Object.entries(obj).length;
export const areObjectsTrue = (objs: object) => {
  return !Object.values(objs).includes(false);
};
const httpFinderRegex = /^(http:)/;
export const addHttpsInUrl = (url = '') => url.replace(httpFinderRegex, 'https:');
