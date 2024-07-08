import * as SQLite from 'expo-sqlite';
import * as Crypto from 'expo-crypto';
import { getItemFor, storeData } from './asyncStore';

let uuid = "" ;
let db = "" ;

const getInfo = async () => {
    uuid = await getItemFor("uuid");
    db = await SQLite.openDatabaseAsync(`${uuid}.db`);
};

try {
    getInfo();
} catch {};

export const create_user = async () => {
    const uuid = Crypto.randomUUID();
    const db = await SQLite.openDatabaseAsync(`${uuid}.db`);

    db.execAsync(`CREATE TABLE IF NOT EXISTS books_database (name TEXT PRIMARY KEY, author TEXT, library TEXT, notes SET, genres SET, tropes SET, completed TEXT, imageUri TEXT)`);

    db.execAsync(`CREATE TABLE IF NOT EXISTS libraries_database (lib TEXT PRIMARY KEY, libColor TEXT)`);
    
    db.execAsync(`CREATE TABLE IF NOT EXISTS authors_database (author TEXT PRIMARY KEY, authorColor TEXT)`);
    
    db.execAsync(`CREATE TABLE IF NOT EXISTS genres_database (genre TEXT PRIMARY KEY, genreColor TEXT);`);

    db.execAsync(`CREATE TABLE IF NOT EXISTS tropes_database (trope TEXT PRIMARY KEY, tropeColor TEXT)`);

    db.execAsync(`CREATE TABLE IF NOT EXISTS series_database (series TEXT PRIMARY KEY, books SET)`);

    return uuid;
};

export const create_library = async (libName, color) => {
    const result = await db.execAsync(`INSERT INTO libraries_database (lib, libColor) VALUES ('${libName}', '${color}')`);

    console.log(result)            // Come back and implement not creating existing libs
};

export const create_genre = async(genre, color) => {
    await db.execAsync(`INSERT INTO genres_database (genre, genreColor) VALUES ('${genre}', '${color}')`);
};

export const create_trope = async (trope, color) => {
    const result = await db.execAsync(
        `INSERT INTO tropes_database (trope, tropeColor) VALUES ('${trope}', '${color}')`
    );

    console.log(result)
};

export const create_book = async (info) => {
    const name = info.name;
    const tropes = info.tropes;
    const genres = info.genres;
    const lib = info.lib;
    const notes = info.notes;
    const imageUri = info.imageUri;
    const completed = info.completed;

    const result = await db.execAsync(
        `INSERT INTO books_database (name, tropes, genres, lib, notes, completed, imageUri) VALUES ('${name}', '${tropes}', '${genres}', '${lib}', '${notes}', '${completed}', '${imageUri}')`
    );

    console.log(result)
};

export const create_author = async (author, color) => {
    const result = await db.execAsync(
        `INSERT INTO authors_database (author, authorColor) VALUES ('${author}', '${color}')`
    );

    console.log(result)
};

export const create_series = async (seriesName) => {
    db.execAsync(`INSERT INTO libraries_database (series) VALUES ('${seriesName}')`);
};

export const add_books_series = async(books, series) => {
    for (let x = 0; x < books.length; x++) {
        db.execAsync(`INSERT INTO series_data (books) VALUES ('${books[x]}') WHERE series = ${series}`);
    }
};

export const delete_book = async (bookName) => {
    await db.execAsync(`DELETE FROM books_database WHERE BookName = '${bookName}'`);
};

export const delete_lib = async (lib) => {
    await db.execAsync(`DELETE FROM libraries_database WHERE lib = '${lib}'`);
};

export const delete_genre = async(genre) => {
    await db.execAsync(`DELETE FROM genres_database WHERE genre = '${genre}'`);
};

export const delete_trope = async (trope) => {
    await db.execAsync(`DELETE FROM tropes_database WHERE trope = '${trope}'`);
};

export const delete_user = async () => {
    await SQLite.deleteDatabaseAsync(`${uuid}.db`);
};

export const update_lib = async (lib, newLib) => {
    await db.execAsync(`UPDATE libraries_database SET lib = ${newLib} WHERE lib = ${lib}`);
    await db.execAsync(`UPDATE books_database SET lib = ${newLib} WHERE lib = ${lib}`);
};

export const update_genre = async (genre, newGenre) => {
    await db.execAsync(`UPDATE genres_database SET genre = ${newGenre} WHERE genre = ${genre}`);
    const booksToUpdate = await db.execAsync(`SELECT * FROM books_database WHERE ${genre} IN genres`);
    for (let x = 0; x < booksToUpdate.length; x++) {
        const genres = booksToUpdate.genres.filter(x => x == genre);
        genres.push(newGenre)
        await db.execAsync(`UPDATE books_database SET genre = ${genres} WHERE bookName = ${booksToUpdate.bookName}`);
    }
    await db.execAsync
};

export const update_trope = async (trope, newTrope) => {
    await db.execAsync(`UPDATE tropes_database SET trope = ${newTrope} WHERE trope = ${trope}`);
    const booksToUpdate = await db.execAsync(`SELECT * FROM books_database WHERE ${trope} IN tropes`);
    for (let x = 0; x < booksToUpdate.length; x++) {
        const tropes = booksToUpdate.tropes.filter(x => x == trope);
        tropes.push(newTrope);
        await db.execAsync(`UPDATE books_database SET genre = ${tropes} WHERE bookName = ${booksToUpdate.bookName}`);
    }
};

export const update_author = async (author, newAuthor) => {
    await db.execAsync(`UPDATE authors_database SET author = ${newAuthor} WHERE author = ${author}`);
};

export const get_books = async (libs) => {
    if (libs != true) {
        const books = [];
        const booksData = await db.execAsync(`SELECT * FROM books_database`);
        for (let x = 0; x < booksData.length; x++) {
            books.push(booksData[x].name);
        };
        return books
    } else {
        const data = [];
        const booksData = await db.execAsync(`SELECT * FROM books_database WHERE lib = 'All'`);
        const libsData =  await db.execAsync(`SELECT * FROM libraries_database`);
        for (let x = 0; x < booksData.length; x++) {
            data.append(booksData[x].name);
        };
        for (let x = 0; x < libsData.length; x++) {
            data.append(libsData[x].libName);
        };
        return data
    };
};

export const completeBook = async (completeState, bookName) => {
    db.execAsync(`UPDATE books_database SET complete = ${completeState.toString()} WHERE bookName = ${bookName}`)
};

export const get_genres = async () => {
    const genres = await db.execAsync(`SELECT genre FROM genres_database`);
    return genres;
};

export const get_tropes = async () => {
    const tropes = await db.execAsync(`SELECT trope FROM tropes_database`);
    return tropes;
};

export const get_libraries = async () => {
    const libs = await db.execAsync(`SELECT * FROM libraries_database`);
    return libs;
}

export const get_search_genres = async (entry) => {
    const genres = await db.execAsync(`SELECT * FROM genres_database WHERE ${entry} IN genre`);
    return genres;
};

export const get_search_tropes = async (entry) => {
    const tropes = await db.execAsync(`SELECT * FROM tropes_database WHERE ${entry} IN trope`);
    return tropes;
};

export const get_search_authors = async (entry) => {
    const authors = await db.execAsync(`SELECT * FROM authors_database WHERE ${entry} IN author`);
    return authors;
};

export const get_search_libs = async (entry) => {
    const libs = await db.execAsync(`SELECT * FROM libraries_database WHERE ${entry} IN lib`);
    return libs;
};

export const get_search_books = async (entry) => {
    const books = await db.execAsync(`SELECT * FROM books_database WHERE ${entry} IN bookName`);
    return books;
};

export const fetch_book = async (bookName) => {
    const book = await db.execAsync(`SELECT * FROM books_database WHERE bookName = ${bookName}`);
    return book
};
