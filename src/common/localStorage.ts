import AsyncStorage from '@react-native-community/async-storage';

function set<T>(key: string, value: T): void {
  if (value) {
    AsyncStorage.setItem(key, JSON.stringify(value));
  }
}

async function get<T>(key: string): Promise<T | null> {
  const value: string | null = await AsyncStorage.getItem(key);

  if (value) {
    return JSON.parse(value);
  }

  return null;
}

const localStorageService = {
  set,
  get,
  remove: (key: string): Promise<void> => AsyncStorage.removeItem(key),
  clear: (): Promise<void> => AsyncStorage.clear(),
};

export default localStorageService;
