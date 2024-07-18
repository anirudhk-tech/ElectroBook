import { get_books_inLibrary } from "../app/backend/controller";

export const useBooksInLibrary = async (library) => {
    let books = {}
    await get_books_inLibrary(library).then(data => books = data);
    return books
};