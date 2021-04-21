export const isObjectEmpty = (obj: object) => !Object.entries(obj).length;
export const areObjectsTrue = (objs: object) => {
  return !Object.values(objs).includes(false);
};
