import * as MMKV from "./MMKV";
import * as SQL from "./sql";
import * as FS from "./fileSystem";

export const create_user = async (libraryName) => {
  const uuid = await SQL.create_user();
  await MMKV.storeData("uuid", uuid);
  await MMKV.storeData("libraryName", libraryName);
  //await FS.create_user();
};

export const create_library = async (libName, color) => {
  const result = await SQL.create_library(libName, color);
  if (result == null) {
    return "SQL error";
  } else {
    await FS.create_library(libName);
  }
};

export const create_book = async (info) => {
  const bookCreate = await SQL.create_book(info);
  if (bookCreate == null) {
    return "SQL error";
  } else {
    FS.create_book(info.name, info.lib);
    if (info.imageUri != null) {
      MMKV.storeData(info.name, info.imageUri);
    }
  }
};

export const create_genre = async (genre, color) => {
  const insertGenre = await SQL.create_genre(genre, color);
  if (insertGenre == null) {
    return "SQL error";
  }
};

export const create_trope = async (trope, color) => {
  const insertTrope = await SQL.create_trope(trope, color);
  if (insertTrope == null) {
    return "SQL error";
  }
};

export const create_author = async (author, color) => {
  const insertAuthor = await SQL.create_author(author, color);
  if (insertAuthor == null) {
    return "SQL Error";
  }
};

export const create_series = async (series, color) => {
  const insertSeries = await SQL.create_series(series, color);
  if (insertSeries == null) {
    return "SQL Error";
  };
};

export const delete_book = async (lib, bookName) => {
  await SQL.delete_book(bookName);
  await FS.delete_book(lib, bookName);
  await MMKV.deleteKey(bookName);
};

export const delete_library = async (lib, newLib) => {
  await SQL.delete_lib(lib);
  //await FS.delete_lib(lib, newLib);
};

export const delete_genre = async (genre) => {
  await SQL.delete_genre(genre);
};

export const delete_trope = async (trope) => {
  await SQL.delete_trope(trope);
};

export const delete_author = async (author) => {
  await SQL.delete_author(author);
};

export const delete_series = async (series) => {
  await SQL.delete_series(series);
};

export const delete_user = async () => {
  await FS.delete_user();
  await MMKV.deleteAll();
};

export const update_user = async (newLibraryName) => {
  MMKV.updateKey("library", newLibraryName);
};

export const update_lib = async (lib, newLib) => {
  const updateLib = SQL.update_lib(lib, newLib);
  if (updateLib == null) {
    return "SQL Error";
  } else {
    FS.update_lib(lib, newLib);
  }
};

export const update_genre = async (genre, newGenre) => {
  SQL.update_genre(genre, newGenre);
};

export const update_author = async (author, newAuthor) => {
  await SQL.update_author(author, newAuthor);
};

export const update_color = async (type, name, color) => {
  await SQL.update_color(type, name, color);
};

export const get_books = async (libs) => {
  const books = await SQL.get_books();
  return books;
};

export const get_genres = async () => {
  let genres = ""
  await SQL.get_genres().then(data => genres = data);
  return genres;
};

export const get_tropes = async () => {
  let tropes = ""
  await SQL.get_tropes().then(data => tropes = data);
  return tropes;
};

export const get_authors = async () => {
  let authors = ""
  await SQL.get_authors().then(data => authors = data);
  return authors;
};

export const get_libraries = async () => {
  let libraries = ""
  await SQL.get_libraries().then(data => libraries = data);
  return libraries;
}

export const get_series = async () => {
  let series = ""
  await SQL.get_series().then(data => series = data);
  return series;
};

export const get_search_genres = async (entry) => {
  const genres = await SQL.get_search_genres(entry);
  return genres;
};

export const get_search_tropes = async (entry) => {
  const tropes = await SQL.get_search_tropes(entry);
  return tropes;
};

export const get_search_authors = async (entry) => {
  const authors = await SQL.get_search_authors(entry);
  return authors;
};

export const get_search_books = async (entry) => {
  const books = await SQL.get_search_books(entry);
  return books;
};

export const get_search_libs = async (entry) => {
  const libs = await SQL.get_search_libs(entry);
  return libs;
};

export const fetch_book = async (bookName) => {
  const sqlInfo = SQL.fetch_book(bookName);
  const imageUri = await MMKV.getItemFor(bookName);
  const bookData = [...sqlInfo, imageUri];
  return bookData;
};

export const get_library_name = async () => {
  const libraryName = await MMKV.getItemFor("libraryName");
  return libraryName;
};

export const get_uuid = async () => {
  const uuid = await MMKV.getItemFor("uuid");
  return uuid;
};

export const store_data = async (key, data) => {
  await MMKV.storeData(key, data);
};

export const get_data = async (key) => {
  const data = await MMKV.getItemFor(key);
  return data;
};

export const convertToArray = (array) => {
  if (array == undefined) {
    return;
  }
  const newArray = array.replace("[", "").replace("]", "").split(",");
  return newArray;
};

// Make Reading TEST LATER
