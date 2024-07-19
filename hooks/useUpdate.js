import { update_bookName, update_library, update_author, update_genre, update_trope, update_series, update_completed } from "../app/backend/controller";

export const useUpdate = async (type, oldValue, newValue) => {
    if (type == "book") {
        const result = await update_bookName(oldValue, newValue);
        if (result == "duplicate") {
            return "duplicate";
        };
    } else if (type == "library") {
        const result = await update_library(oldValue, newValue);
        if (result == "duplicate") {
            return "duplicate";
        };
    } else if (type == "author") {
        const result = await update_author(oldValue, newValue);
        console.log (result)
        if (result == "duplicate") {
            return "duplicate";
        };
    } else if (type == "genre") {
        const result = await update_genre(oldValue, newValue);
        if (result == "duplicate") {
            return "duplicate";
        };
    } else if (type == "trope") {
        const result = await update_trope(oldValue, newValue);
        if (result == "duplicate") {
            return "duplicate";
        };
    } else if (type == "series") {
        const result = await update_series(oldValue, newValue);
        if (result == "duplicate") {
            return "duplicate";
        };
    };
};

export const useComplete = (bookName, oldStatus) => {
    update_completed(bookName, oldStatus);
} ;