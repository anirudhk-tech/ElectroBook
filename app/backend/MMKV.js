import { storage } from './MMKV.config';

export const storeData = async (key, value) => {
  try {
    storage.set(key, value);
  } catch (error) {

  }
};

export const getItemFor = async (key) => {
  try {
    const value = storage.getString(key)
  
    if (value !== null) {
      return value;
    };
  } catch (error) {
    return "error"
  }
};

export const deleteAll = async () => {
  storage.clearAll();
};