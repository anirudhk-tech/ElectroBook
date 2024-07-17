// Node Modules
import * as SQLite from "expo-sqlite";
import * as Crypto from "expo-crypto";

// Backend
import { getItemFor } from "./MMKV";


let db = "";
let uuid = "";
export const getInfo = async () => {
  uuid = await getItemFor("uuid");
  db = await SQLite.openDatabaseAsync(`${uuid}.db`);
};

export const create_user = async () => {
  const uuid = Crypto.randomUUID();
  const db = await SQLite.openDatabaseAsync(`${uuid}.db`, {useNewConnection: true});

  db.execAsync(
    `CREATE TABLE IF NOT EXISTS books_database (option TEXT PRIMARY KEY, author TEXT, color TEXT, library TEXT, series TEXT, notes LIST, genres LIST, tropes LIST, completed TEXT, imageUri TEXT, page INT)`
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

  // ADD STARTER TROPES AND GENRES

  return uuid;
};

export const create_library = async (libName) => {
  const result = db.execAsync(
    `INSERT INTO libraries_database (option, color) VALUES ("${libName}", "")`
  );
};

export const create_genre = async (option) => {
  getInfo();
  const result = db.execAsync(
    `INSERT INTO genres_database (option, color) VALUES ("${option}", "")`
  );
};

export const create_trope = async (trope) => {
  const result = await db.execAsync(
    `INSERT INTO tropes_database (option, color) VALUES ("${trope}", "")`
  );
};

export const create_author = async (author) => {
  const result = await db.execAsync(
    `INSERT INTO authors_database (option, color) VALUES ("${author}", "")`
  );
};

export const create_series = async (seriesName) => {
  const result = db.execAsync(
    `INSERT INTO series_database (option) VALUES ("${seriesName}")`
  );
};

export const create_book = async (info) => {
    const name = info.name;
    const author = info.author;
    const library = info.library;
    const color = info.color;
    const notes = info.notes;
    const genres = info.genres;
    const tropes = info.tropes;
    const imageUri = info.imageUri;
    const series = info.series;

    const result = await db.execAsync(
      `INSERT INTO books_database (option, author, library, color, series, notes, genres, tropes, completed, imageUri, page) VALUES ("${name}", "${author}", "${library}", "${color}", "${series}", "${notes}", "${genres}", "${tropes}", "false", "${imageUri}", 0)`
    );
};

export const add_books_series = async (books, series) => {
  const db = await getInfo();
  for (let x = 0; x < books.length; x++) {
    db.execAsync(
      `INSERT INTO series_data (books) VALUES ("${books[x]}") WHERE series = ${series}`
    );
  }
};

export const delete_book = async (bookName) => {
  await db.execAsync(
    `DELETE FROM books_database WHERE option = "${bookName}"`
  );
};

export const delete_lib = async (lib) => {
  db.execAsync(`DELETE FROM libraries_database WHERE option = "${lib}"`);
};

export const delete_genre = async (genre) => {
  db.execAsync(`DELETE FROM genres_database WHERE option = "${genre}"`);
};

export const delete_trope = async (trope) => {
  db.execAsync(`DELETE FROM tropes_database WHERE option = "${trope}"`);
};

export const delete_series = async (series) => {
  db.execAsync(`DELETE FROM series_database WHERE option = "${series}"`);
};

export const delete_author = async (author) => {
  db.execAsync(`DELETE FROM authors_database WHERE option = "${author}"`)
};

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
    await db.execAsync(
      `UPDATE libraries_database SET color = "${color}" WHERE option = "${name}"`
    )
  } else if (type == "book") {
    await db.execAsync(
      `UPDATE books_database SET color = "${color}" WHERE option = "${name}"`
    )
  }
};

export const update_lib = async (lib, newLib) => {
  await db.execAsync(
    `UPDATE libraries_database SET lib = "${newLib}" WHERE option = "${lib}"`
  );
  await db.execAsync(
    `UPDATE books_database SET lib = "${newLib}" WHERE option = "${lib}"`
  );
};

export const update_genre = async (genre, newGenre) => {
  const db = await getInfo();
  const booksToUpdate = await db.execAsync(
    `SELECT * FROM books_database WHERE ${genre} IN genres`
  );
  await db.execAsync(
    `UPDATE genres_database SET genre = ${newGenre} WHERE genre = ${genre}`
  );
  for (let x = 0; x < booksToUpdate.length; x++) {
    const genres = booksToUpdate.genres.filter((x) => x == genre);
    genres.push(newGenre);
    await db.execAsync(
      `UPDATE books_database SET genre = ${genres} WHERE bookName = ${booksToUpdate.bookName}`
    );
  }
};

export const update_page = async (page, bookName) => {
  const db = await getInfo();
  await db.execAsync(
    `UPDATE books_database SET page = ${page} WHERE bookName = ${bookName}}`
  );
};

export const update_trope = async (trope, newTrope) => {
  const db = await getInfo();
  const booksToUpdate = await db.execAsync(
    `SELECT * FROM books_database WHERE ${trope} IN tropes`
  );
  await db.execAsync(
    `UPDATE tropes_database SET trope = ${newTrope} WHERE trope = ${trope}`
  );
  for (let x = 0; x < booksToUpdate.length; x++) {
    const tropes = booksToUpdate.tropes.filter((x) => x == trope);
    tropes.push(newTrope);
    await db.execAsync(
      `UPDATE books_database SET genre = "${tropes}" WHERE bookName = "${booksToUpdate.bookName}"`
    );
  }
};

export const update_author = async (author, newAuthor) => {
  const db = await getInfo();
  await db.execAsync(
    `UPDATE authors_database SET author = ${newAuthor} WHERE author = "${author}"`
  );
};

export const get_completed = async () => {
  const completed = [];
  const completedData = db.getAllAsync(`SELECT * FROM books_database WHERE completed = "true"`);
  for (let x = 0; x < completedData.length; x++) {
    completed.push(completedData[x]);
  };
  return completed
};

export const get_books = async (libs) => {
  if (libs != true) {
    const books = [];
    const booksData = await db.getAllAsync(`SELECT * FROM books_database`);
    for (let x = 0; x < booksData.length; x++) {
      books.push(booksData[x]);
    }
    return books;
  } else {
    const data = [];
    const booksData = await db.getAllAsync(
      `SELECT * FROM books_database WHERE lib = "All"`
    );
    const libsData = db.getAllAsync(`SELECT * FROM libraries_database`);
    for (let x = 0; x < booksData.length; x++) {
      data.append(booksData[x].name);
    }
    for (let x = 0; x < libsData.length; x++) {
      data.append(libsData[x].libName);
    }
    return data;
  }
};

export const completeBook = async (completeState, bookName) => {
  const db = await getInfo();
  db.execAsync(
    `UPDATE books_database SET complete = ${completeState.toString()} WHERE bookName = ${bookName}`
  );
};

export const get_page = async (bookName) => {
  const db = await getInfo();
  const page = await db.execAsync(
    `SELECT page FROM books_database WHERE bookName = ${bookName}`
  );
  return page;
};

export const get_genres = async () => {
  const genres = [];
  const data = await db.getAllAsync(`SELECT * FROM genres_database`);

  for (let x = 0; x < data.length; x++) {
    genres.push(data[x]);
  }

  return genres;
};

export const get_tropes = async () => {
  const tropes = [];
  const data = await db.getAllAsync(`SELECT * FROM tropes_database`);

  for (let x = 0; x < data.length; x++) {
    tropes.push(data[x]);
  }

  return tropes;
};

export const get_libraries = async () => {
  const libs = [];
  const data = await db.getAllAsync(`SELECT * FROM libraries_database`);

  for (let x = 0; x < data.length; x++) {
    libs.push(data[x]);
  }

  return libs;
};

export const get_series = async () => {
  const series = [];
  const data = await db.getAllAsync(`SELECT * FROM series_database`);

  for (let x = 0; x < data.length; x++) {
    series.push(data[x]);
  }

  return data;
};

export const get_authors = async () => {
  const authors = [];
  const data = await db.getAllAsync(`SELECT * FROM authors_database`);

  for (let x = 0; x < data.length; x++) {
    authors.push(data[x]);
  }

  return authors;
};

export const get_search_genres = async (entry) => {
  const db = await getInfo();
  const genres = await db.execAsync(
    `SELECT * FROM genres_database WHERE ${entry} IN genre`
  );
  return genres;
};

export const get_search_tropes = async (entry) => {
  const db = await getInfo();
  const tropes = await db.execAsync(
    `SELECT * FROM tropes_database WHERE ${entry} IN trope`
  );
  return tropes;
};

export const get_search_authors = async (entry) => {
  const db = await getInfo();
  const authors = await db.execAsync(
    `SELECT * FROM authors_database WHERE ${entry} IN author`
  );
  return authors;
};

export const get_search_libs = async (entry) => {
  const db = await getInfo();
  const libs = await db.execAsync(
    `SELECT * FROM libraries_database WHERE ${entry} IN lib`
  );
  return libs;
};

export const get_search_books = async (entry) => {
  const db = await getInfo();
  const books = await db.execAsync(
    `SELECT * FROM books_database WHERE ${entry} IN bookName`
  );
  return books;
};

export const fetch_book = async (bookName) => {
  const db = await getInfo();
  const book = await db.execAsync(
    `SELECT * FROM books_database WHERE bookName = ${bookName}`
  );
  return book;
};
