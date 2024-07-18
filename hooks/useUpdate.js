import { update_bookName, update_library, update_author, update_genre, update_trope, update_series, update_completed } from "../app/backend/controller";

export const useUpdate = (type, oldValue, newValue) => {
    if (type == "book") {
        update_bookName(oldValue, newValue);
    } else if (type == "library") {
        update_library(oldValue, newValue);
    } else if (type == "author") {
        update_author(oldValue, newValue);
    } else if (type == "genre") {
        update_genre(oldValue, newValue);
    } else if (type == "trope") {
        update_trope(oldValue, newValue);
    } else if (type == "series") {
        update_series(oldValue, newValue);
    };
};

export const useComplete = (bookName, oldStatus) => {
    update_completed(bookName, oldStatus);
} ;