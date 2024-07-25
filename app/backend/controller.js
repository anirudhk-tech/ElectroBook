import * as MMKV from "./MMKV";
import * as SQL from "./sql";
import * as FS from "./fileSystem";


// START UP

export const establish_userDb = async () => {
  await SQL.getInfo();
};

export const create_user = async (libraryName) => {
  const uuid = await SQL.create_user();
  await MMKV.storeData("uuid", uuid);
  await MMKV.storeData("libraryName", libraryName);
  //await //FS.create_user();
};



// CREATION FUNCTIONS

export const create_library = async (libName, color) => {
  const result = await SQL.create_library(libName, color);
  if (result == "duplicate") {
    return "duplicate";
  }
};

export const create_image = async (handleImageSubmit) => {
  await FS.pickImage(handleImageSubmit);
};

export const create_book = async (info) => {
  const filesAdded = await FS.create_book(info.name.replaceAll('"', "'").replaceAll(",", ";"), info.imageUri);

  if (filesAdded != null) {
    for (let x in filesAdded) {
      const check = await SQL.check_duplicate(filesAdded[x]);
      if (check != "duplicate") {
        info["name"] = filesAdded[x].replaceAll('"', "'").replaceAll(",", ";");
        await SQL.create_book(info);
      } else {
        return "duplicate";
      };
    };
  } else {
    return "canceled";
  };
};

export const create_genre = async (genre, color) => {
  const insertGenre = await SQL.create_genre(genre, color);
  if (insertGenre == "duplicate") {
    return "duplicate";
  }
};

export const create_trope = async (trope, color) => {
  const insertTrope = await SQL.create_trope(trope, color);
  if (insertTrope == "duplicate") {
    return "duplicate";
  }
};

export const create_author = async (author, color) => {
  const insertAuthor = await SQL.create_author(author, color);
  if (insertAuthor == "duplicate") {
    return "duplicate";
  }
};

export const create_series = async (series, color) => {
  const insertSeries = await SQL.create_series(series, [], color);
  if (insertSeries == "duplicate") {
    return "duplicate";
  };
};



// DELETE FUNCTIONS 


export const delete_book = async (bookName) => {
  await SQL.delete_book(bookName);
  await FS.delete_book(bookName);
};

export const delete_library = async (lib, newLib) => {
  await SQL.delete_lib(lib);
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
  //await FS.delete_user();
  await MMKV.deleteAll();
};



// UPDATE FUNCTIONS

export const update_user = async (newLibraryName) => {
  MMKV.updateKey("library", newLibraryName);
};

export const update_bookName = async (bookName, newBookName) => {
 const result = await SQL.update_book(bookName, newBookName);
 if (result == "duplicate") {
  return "duplicate"
 } else {
  await FS.update_book(bookName, newBookName);
 };
};

export const update_library = async (libraryName, newLibraryName) => {
  const result = await SQL.update_library(libraryName, newLibraryName);

  if (result == "duplicate") {
    return "duplicate";
  };
};

export const update_series = async (series, newSeries) => {
  const result = await SQL.update_series(series, newSeries);
  if (result == "duplicate") {
    return "duplicate"
  };
};

export const update_genre = async (genre, newGenre) => {
  const result = await SQL.update_genre(genre, newGenre);
  if (result == "duplicate") {
    return "duplicate"
  };
};

export const update_trope = async (trope, newTrope) => {
  const result = await SQL.update_trope(trope, newTrope);
  if (result == "duplicate") {
    return "duplicate"
  };
};

export const update_author = async (author, newAuthor) => {
  const result = await SQL.update_author(author, newAuthor);
  if (result == "duplicate") {
    return "duplicate"
  };

};

export const update_color = async (type, name, color) => {
  await SQL.update_color(type, name, color);
};

// BOOK UPDATE FUNCTIONS

export const update_completed = async (bookName, newStatus) => {
  await SQL.update_completed(bookName, newStatus);
}; 

export const update_bookGenres = async (bookName, newGenres) => {
  await SQL.update_bookGenres(bookName, newGenres)
};

export const update_bookTropes = async (bookName, newTropes) => {
  await SQL.update_bookTropes(bookName, newTropes);
};

export const update_bookNotes = async (bookName, newNotes) => {
  await SQL.update_bookNotes(bookName, newNotes);
};

export const update_bookAuthor = async (bookName, newAuthor) => {
  await SQL.update_bookAuthor(bookName, newAuthor);
};

export const update_bookLibrary = async (bookName, newLibrary) => {
  await SQL.update_bookLibrary(bookName, newLibrary);
};

export const update_bookSeries = async (bookName, newSeries) => {
  await SQL.update_bookSeries(bookName, newSeries);
};

export const update_page = async (bookName, newPage) => {
  await SQL.update_bookPage(bookName, newPage);
};


// DATA FETCHING FUNCTIONS


export const check_duplicate = async (bookName) => {
  const check = await SQL.check_duplicate(bookName);
  return check
};

export const get_books_inLibrary = async (library) => {
  const books = await SQL.get_books_inLibrary(library);
  return books;
}
export const get_completed = async () => {
  const completed = await SQL.get_completed();
  return completed;
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

// BOOK INFO FUNCTIONS

export const fetch_book = async (bookName) => {
  let bookData = [];
  await SQL.fetch_book(bookName).then(data => bookData = data);
  return bookData;
};




// SEARCH FUNCTIONS

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


// USER DATA FETCHING FUNCTIONS

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
