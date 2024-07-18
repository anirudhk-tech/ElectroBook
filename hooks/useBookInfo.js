import { get_page } from "../app/backend/controller"

export const useBookInfo = async (type, bookName) => {
    if (type != undefined) {
        if (type == "page") {
            let page = "";
            await get_page(bookName).then(book => page = book.page);
            return page
        };
    };
};