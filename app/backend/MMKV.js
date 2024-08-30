import { storage } from './MMKV.config';

export const storeData = async (key, value) => {
  try {
    storage.set(key, value);
  } catch (error) {

  }
};

export const getItemFor = async (key) => {
  try {
    const value = storage.getString(key);
  
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

export const recent = async (bookName) => {
  const raw_recents = storage.getString("recents");
  if (raw_recents == undefined || raw_recents == null) {
    storage.set("recents", JSON.stringify([]));
  };

  try {
    let recents = JSON.parse(raw_recents);

    if (bookName == undefined) {
      return recents;
    };
    
    if (!recents.includes(bookName)) {
      if (recents.length == 3) {
        recents.pop();
        recents = [bookName, ...recents];
      } else {
        recents = [bookName, ...recents];
      };
    } else {
      recents = [bookName, ...recents.filter((x) => x != bookName)]; 
    };

    storage.set("recents", JSON.stringify(recents));
    return recents;

  } catch {
    return [];

  };
};