// Backend
import { 
      delete_genre, 
      delete_trope, 
      delete_author, 
      delete_library, 
      delete_series, 
      delete_book,
      delete_image
} from '../app/backend/controller';

export const useDelete = async (type, option) => {

if (type == "author") {
      delete_author(option);
      
} else if (type == "library") {
      delete_library(option);

} else if (type == "series") {
      delete_series(option);

} else if (type == "trope") {
      delete_trope(option);

} else if (type == "genre") {
      delete_genre(option);

} else if (type == "book" || type.includes("booksIn")) {
      delete_book(option);
} else if (type == "image") {
      delete_image(option)

};
};