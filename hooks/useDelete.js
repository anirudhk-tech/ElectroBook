// Backend
import { delete_genre, delete_trope, delete_author, delete_library, delete_series} from '../app/backend/controller';

export const useDelete = async (type, option) => {
  let data = [];

  if (type == "author") {
      delete_author(option);

  } else if (type == "library") {
      delete_library(option);

  } else if (type == "series") {
      delete_series(option);

  } else if (type == "notes") {
      await get_genres().then(genres => {data = genres});
      return data

  } else if (type == "trope") {
      delete_trope(option);

  } else if (type == "genre") {
      delete_genre(option);

  } else if (type == "completed") {
      await get_genres().then(genres => {data = genres});
      return data
  }
};