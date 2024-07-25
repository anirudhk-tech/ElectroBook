import { fetch_book } from "../app/backend/controller"

export const useBookInfo = async (bookName) => {
    let bookData = "";
    await fetch_book(bookName).then(data => bookData = data);
    return bookData;
};