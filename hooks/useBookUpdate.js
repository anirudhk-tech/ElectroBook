import { 
    update_bookGenres, 
    update_bookNotes, 
    update_bookTropes, 
    update_completed, 
    update_bookSeries, 
    update_bookLibrary, 
    update_bookAuthor,
    update_page,
    update_pageCount,
    update_bookImage,
} from "../app/backend/controller"

export const useBookUpdate = async (type, bookName, newValue) => {

    if (type == "genre") {
        await update_bookGenres(bookName, newValue);
    } else if (type == "trope") {
        await update_bookTropes(bookName, newValue);
    } else if (type == "note") {
        await update_bookNotes(bookName, newValue);
    } else if (type == "completed") {
        await update_completed(bookName, newValue);
    } else if (type == "author") {
        await update_bookAuthor(bookName, newValue);
    } else if (type == "library") {
        await update_bookLibrary(bookName, newValue);
    } else if (type == "series") {
        await update_bookSeries(bookName, newValue);
    } else if (type == "page") {
        await update_page(bookName, newValue);
    } else if (type == "pageCount") {
        await update_pageCount(bookName, newValue);
    } else if (type == "image") {
        await update_bookImage(bookName, newValue);
    };
};