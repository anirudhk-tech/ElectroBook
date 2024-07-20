import { update_bookGenres, update_bookNotes, update_bookTropes } from "../app/backend/controller"

export const useBookUpdate = async (type, bookName, newValue) => {

    if (type == "genre") {
        await update_bookGenres(bookName, newValue);
    } else if (type == "trope") {
        await update_bookTropes(bookName, newValue);
    } else if (type == "note") {
        await update_bookNotes(bookName, newValue);
    };
};