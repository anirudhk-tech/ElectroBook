import { update_bookGenres } from "../app/backend/controller"

export const useBookUpdate = async (type, bookName, newValue) => {
    if (type == "genre") {
        await update_bookGenres(bookName, newValue)
    };
};