// Node Modules
import * as SQLite from "expo-sqlite";
import * as Crypto from "expo-crypto";
import * as FileSystem from "expo-file-system";

// Backend
import { getItemFor } from "./MMKV";




// START UP

let db = "";
let uuid = "";
export const getInfo = async () => {
  uuid = await getItemFor("uuid");
  db = await SQLite.openDatabaseAsync(`${uuid}.db`);
};

export const create_user = async (library) => {
  const uuid = Crypto.randomUUID();
  const db = await SQLite.openDatabaseAsync(`${uuid}.db`, { useNewConnection: true, });
  const genres = [
    "Action", 
    "Romance", 
    "Thriller", 
    "Horror", 
    "History", 
    "Fantasy", 
    "Mystery", 
    "Science Fiction", 
    "Non-Fiction", 
    "Adventure"
  ];
  const tropes = [
    "The Chosen",
    "Enemies to Lovers",
    "Friends to Lovers",
    "Forced Proximity",
    "Second Chance",
    "Anti-Hero",
    "Amnesia",
    "Billionaire",
    "Secrets",
    "Coming-of-Age",
    "Side Quests",
  ];

  db.execAsync("PRAGMA journal_mode = WAL");

  db.execAsync(
    `CREATE TABLE IF NOT EXISTS books_database (option TEXT PRIMARY KEY, author TEXT, color TEXT, library TEXT, series TEXT, notes LIST, genres LIST, tropes LIST, completed TEXT, imageUri TEXT, page INT, pageCount INT)`
  );

  db.execAsync(
    `CREATE TABLE IF NOT EXISTS libraries_database (option TEXT PRIMARY KEY, color TEXT)`
  );

  db.execAsync(
    `CREATE TABLE IF NOT EXISTS authors_database (option TEXT PRIMARY KEY, color TEXT)`
  );

  db.execAsync(
    `CREATE TABLE IF NOT EXISTS genres_database (option TEXT PRIMARY KEY, color TEXT);`
  );

  db.execAsync(
    `CREATE TABLE IF NOT EXISTS tropes_database (option TEXT PRIMARY KEY, color TEXT)`
  );

  db.execAsync(
    `CREATE TABLE IF NOT EXISTS series_database (option TEXT PRIMARY KEY, color TEXT, books LIST)`
  );

  for (let x in genres) {
    await db.execAsync (
      `INSERT INTO genres_database (option, color) VALUES ("${genres[x]}", "")`
    );
  };

  for (let x in tropes) {
    await db.execAsync (
      `INSERT INTO tropes_database (option, color) VALUES ("${tropes[x]}", "")`
    );
  };

  await db.execAsync (
    `INSERT INTO libraries_database (option, color) VALUES ("${library}", "")`
  );

  return uuid;
};



// CREATION FUNCTIONS

export const create_library = async (libName) => {
try {  
    await db.execAsync(
      `INSERT INTO libraries_database (option, color) VALUES ("${libName}", "")`
    );
  } catch {
    return "duplicate"
  };
};

export const create_genre = async (option) => {
  try {  
    await db.execAsync(
      `INSERT INTO genres_database (option, color) VALUES ("${option}", "")`
    );
  } catch {
    return "duplicate"
  };
};

export const create_trope = async (trope) => {
try {  
    await db.execAsync(
      `INSERT INTO tropes_database (option, color) VALUES ("${trope}", "")`
    );
  } catch {
    return "duplicate"
  };
};

export const create_author = async (author) => {
  try {
    await db.execAsync(
      `INSERT INTO authors_database (option, color) VALUES ("${author}", "")`
    );
  } catch {
    return "duplicate"
  };

};

export const create_series = async (seriesName) => {
  try {  
    await db.execAsync(
        `INSERT INTO series_database (option) VALUES ("${seriesName}")`
      );
  } catch {
    return "duplicate"
  };
};

export const create_book = async (info) => {
    const name = info.name;
    const author = info.author;
    const library = info.library;
    const fileColor = info.fileColor;
    const notes = info.notes == "" ? info.notes : ["", ...info.notes];
    const genres = info.genres;
    const tropes = info.tropes;
    const imageUri = info.imageUri == "" ? "" : `${FileSystem.documentDirectory}Images/${info.name}`;
    const series = info.series;

  if (info.library == "") {
    return
  };

  try {
    await db.execAsync(
      `INSERT INTO books_database (option, author, library, color, series, notes, genres, tropes, completed, imageUri, page) VALUES ("${name}", "${author}", "${library}", "${fileColor}", "${series}", "${notes}", "${genres}", "${tropes}", "false", "${imageUri}", 0)`
    );
  } catch {
    return "duplicate"
  };
};



// DELETE FUNCTIONS 

export const delete_book = async (bookName) => {
  await db.execAsync(
    `DELETE FROM books_database WHERE option = "${bookName}"`
  );
};

export const delete_library = async (library) => {
  const books = await db.getAllAsync(
    `SELECT * FROM books_database WHERE library = "${library}"`
  );

  await db.execAsync(
    `DELETE FROM libraries_database WHERE option = "${library}";
    DELETE FROM books_database WHERE library = "${library}";
    `);

  return books
};

export const delete_genre = async (genre) => {
  await db.execAsync(`DELETE FROM genres_database WHERE option = "${genre}"`);
  const genresToCheck = await db.getAllAsync(
    `SELECT * FROM books_database WHERE genres LIKE "%${genre}%"`
  );
  for (let x in genresToCheck) {
    const bookName = genresToCheck[x].option;
    const genres = genresToCheck[x].genres.replace('"', '').split(",");
    const newGenres = genres.filter(x => x != genre);

    await db.execAsync(
      `UPDATE books_database SET genres = "${newGenres}" WHERE option = "${bookName}"`
    );
  };
};


export const delete_trope = async (trope) => {
  db.execAsync(`DELETE FROM tropes_database WHERE option = "${trope}"`);
  const tropesToCheck = await db.getAllAsync(
    `SELECT * FROM books_database WHERE tropes LIKE "%${trope}%"`
  );

  for (let x in tropesToCheck) {
    const bookName = tropesToCheck[x].option;
    const tropes = tropesToCheck[x].tropes.replace('"', '').split(",");
    const newtropes = tropes.filter(x => x != trope);
    await db.execAsync(
      `UPDATE books_database SET tropes = "${newtropes}" WHERE option = "${bookName}"`
    );
  };
};

export const delete_series = async (series) => {
  db.execAsync(
    `DELETE FROM series_database WHERE option = "${series}";
    UPDATE books_database SET series = "" WHERE series = "${series}";
  `);
};

export const delete_author = async (author) => {
  db.execAsync(
    `DELETE FROM authors_database WHERE option = "${author}";
    UPDATE books_database SET author = "" WHERE author = "${author}";
  `);
};


// UPDATE FUNCTIONS

export const update_color = async (type, name, color) => {
  if (type == "author") {
    await db.execAsync(
      `UPDATE authors_database SET color = "${color}" WHERE option = "${name}"`
    )
  } else if (type == "genre") {
    await db.execAsync(
      `UPDATE genres_database SET color = "${color}" WHERE option = "${name}"`
    )
  } else if (type == "trope") {
    await db.execAsync(
      `UPDATE tropes_database SET color = "${color}" WHERE option = "${name}"`
    )
  } else if (type == "series") {
    await db.execAsync(
      `UPDATE series_database SET color = "${color}" WHERE option = "${name}"`
    )
  } else if (type == "library") {
    await db.runAsync(
      `UPDATE libraries_database SET color = "${color}" WHERE option = "${name}"`
    )
  } else if (type == "book" || type.includes("booksIn")) {
    await db.execAsync(
      `UPDATE books_database SET color = "${color}" WHERE option = "${name}"`
    )
  }
};

export const update_book = async (bookName, newBookName) => {
  try {
    await db.getFirstAsync(
      `SELECT * from books_database WHERE option = "${bookName}"`
    );
    await db.execAsync(
      `UPDATE books_database SET option = "${newBookName}" WHERE option = "${bookName}"`
    );
} catch {
  return "duplicate"
};
};

export const update_library = async (libraryName, newLibraryName) => {
  try {
  await db.execAsync(
    `UPDATE libraries_database SET option = "${newLibraryName}" WHERE option = "${libraryName}";
    UPDATE books_database SET library = "${newLibraryName}" WHERE library = "${libraryName}"`
  );
} catch {
  return "duplicate"
};
};

export const update_genre = async (genre, newGenre) => {
  try {
    await db.execAsync(
      `UPDATE genres_database SET option = "${newGenre}" WHERE option = "${genre}"`
    );
    const genresToCheck = await db.getAllAsync(
      `SELECT * FROM books_database WHERE genres LIKE "%${genre}%"`
    );

    for (let x in genresToCheck) {
      const bookName = genresToCheck[x].option;
      const genres = genresToCheck[x].genres.replace('"', '').split(",");
      for (let x in genres) {
        if (genres[x] == genre) {
          genres[x] = newGenre;
          await db.execAsync(
            `UPDATE books_database SET genres = "${genres}" WHERE option = "${bookName}"`
          );
        };
      };
    };
  } catch {
    return "duplicate"
  };
};

export const update_trope = async (trope, newTrope) => {
  try {
    await db.execAsync(
      `UPDATE tropes_database SET option = "${newTrope}" WHERE option = "${trope}"`
    );

    const tropesToCheck = await db.getAllAsync(
      `SELECT * FROM books_database WHERE tropes LIKE "%${trope}%"`
    );
  
    for (let x in tropesToCheck) {
      const bookName = tropesToCheck[x].option;
      const tropes = tropesToCheck[x].tropes.replace('"', '').split(",");
      for (let x in tropes) {
        if (tropes[x] == trope) {
          tropes[x] = newTrope;
          await db.execAsync(
            `UPDATE books_database SET tropes = "${tropes}" WHERE option = "${bookName}"`
          );
        };
      };
    };

  } catch {
    return "duplicate"
  };
};

export const update_series = async (series, newSeries) => {
  try {
  await db.execAsync(
    `UPDATE books_database SET series = "${newSeries}" WHERE series = "${series}";
    UPDATE series_database SET option = "${newSeries}" WHERE option = "${series}";
    `)
  } catch {
    return "duplicate"
  }
};

export const update_author = async (author, newAuthor) => {
  try {
  await db.execAsync(
    `UPDATE authors_database SET option = "${newAuthor}" WHERE option = "${author}"`
  );
} catch {
  return "duplicate"
}
};


// BOOK UPDATE FUNCTIONS


export const update_page = async (page, bookName) => {
  try {
  await db.execAsync(
    `UPDATE books_database SET page = ${page} WHERE option = "${bookName}"}`
  );
} catch {
  return "duplicate"
}
};

export const update_completed = async (bookName, newStatus) => {
  await db.execAsync (
    `UPDATE books_database SET completed = "${newStatus}" WHERE option = "${bookName}"`
  ); 
};

export const update_bookGenres = async (bookName, newGenres) => {
  await db.execAsync (
    `UPDATE books_database SET genres = "${newGenres}" WHERE option = "${bookName}"`
  );
};

export const update_bookTropes = async (bookName, newTropes) => {
  await db.execAsync (
    `UPDATE books_database SET tropes = "${newTropes}" WHERE option = "${bookName}"`
  );
};

export const update_bookNotes = async (bookName, newNotes) => {
  await db.execAsync (
    `UPDATE books_database SET notes = "${newNotes}" WHERE option = "${bookName}"`
  );
};

export const update_bookAuthor = async (bookName, newAuthor) => {
  await db.execAsync (
    `UPDATE books_database SET author = "${newAuthor}" WHERE option = "${bookName}"`
  );
};

export const update_bookLibrary = async (bookName, newLibrary) => {
  await db.execAsync (
    `UPDATE books_database SET library = "${newLibrary}" WHERE option = "${bookName}"`
  );
};

export const update_bookSeries = async (bookName, newSeries) => {
  await db.execAsync (
    `UPDATE books_database SET series = "${newSeries}" WHERE option = "${bookName}"`
  );
};

export const update_bookPage = async (bookName, newPage) => {
  await db.execAsync (
    `UPDATE books_database SET page = ${newPage} WHERE option = "${bookName}"`
  );
};

export const update_bookPageCount = async (bookName, newPageCount) => {
  await db.execAsync(
    `UPDATE books_database SET pageCount = ${newPageCount} WHERE option = "${bookName}"`
  );
};

export const update_bookImage = async (bookName, newImage) => {
  await db.execAsync(
    `UPDATE books_database SET imageUri = "${newImage}" WHERE option = "${bookName}"`
  ); 
};

// DATA FETCHING FUNCTIONS

export const check_duplicate = async (bookName) => {
  const check = await db.getFirstAsync(`SELECT * FROM books_database WHERE option = "${bookName}"`);

  if (check != null) { 
    return "duplicate"
  } else {
    return "safe"
  }
};

export const get_completed = async () => {
  const completed = [];
  const completedData = await db.getAllAsync(`SELECT * FROM books_database WHERE completed = "true" ORDER BY option`);
  for (let x = 0; x < completedData.length; x++) {
    completed.push(completedData[x]);
  };
  return completed
};

export const get_books = async () => {
  const data = [];

  const books = await db.getAllAsync(`SELECT * FROM books_database ORDER BY option`);
  for (let x = 0; x < books.length; x++) {
    data.push(books[x]);
  };

  return data;
};


export const get_books_inLibrary = async (library) => {
  const books = await db.getAllAsync(
    `SELECT * FROM books_database WHERE library = "${library}" ORDER BY option`
  );

  return books;
}

export const get_genres = async () => {
  const genres = [];
  const data = await db.getAllAsync(`SELECT * FROM genres_database ORDER BY option`);

  for (let x = 0; x < data.length; x++) {
    genres.push(data[x]);
  }

  return genres;
};

export const get_tropes = async () => {
  const tropes = [];
  const data = await db.getAllAsync(`SELECT * FROM tropes_database ORDER BY option`);

  for (let x = 0; x < data.length; x++) {
    tropes.push(data[x]);
  }

  return tropes;
};

export const get_libraries = async () => {
  const libs = [];
  const data = await db.getAllAsync(`SELECT * FROM libraries_database ORDER BY option`);
  for (let x = 0; x < data.length; x++) {
    libs.push(data[x]);
  }

  return libs;
};

export const get_series = async () => {
  const series = [];
  const data = await db.getAllAsync(`SELECT * FROM series_database ORDER BY option`);

  for (let x = 0; x < data.length; x++) {
    series.push(data[x]);
  }

  return data;
};

export const get_authors = async () => {
  const authors = [];
  const data = await db.getAllAsync(`SELECT * FROM authors_database ORDER BY option`);

  for (let x = 0; x < data.length; x++) {
    authors.push(data[x]);
  }

  return authors;
};


// BOOK INFO FUNCTIONS

export const fetch_book = async (bookName) => {
  let bookData = ""
  await db.getFirstAsync(
    `SELECT * FROM books_database WHERE option = "${bookName}"`
  ).then(
    data => bookData = data
  );
  return bookData;
};




// SEARCH FUNCTIONS

export const get_search_books = async (entry) => {
  if (entry == "") {
    return "No results"
  };
  
  const books = await db.getAllAsync(
    `SELECT * FROM books_database WHERE option LIKE "%${entry}%"`
  );

  const booksGenres = await db.getAllAsync(
    `SELECT * FROM books_database WHERE genres LIKE "%${entry}%"`
  );

  const booksTropes = await db.getAllAsync(
    `SELECT * FROM books_database WHERE tropes LIKE "%${entry}%"`
  );

  const booksAuthor = await db.getAllAsync(
    `SELECT * FROM books_database WHERE author LIKE "%${entry}%"`
  );

  const booksSeries = await db.getAllAsync(
    `SELECT * FROM books_database WHERE series LIKE "%${entry}%"`
  )

  const libraries = await db.getAllAsync(
    `SELECT * FROM libraries_database WHERE option LIKE "%${entry}%"`
  );

  const data = [...books, ...booksGenres, ...libraries, ...booksTropes, ...booksAuthor, ...booksSeries]

  if (data.length != 0) {
    return data
  } else {
    return "No results"
  };
};
