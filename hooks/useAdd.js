// Backend
import { create_genre, create_trope, create_author, create_series, create_library} from '../app/backend/controller';

export const useAdd = async (type, option, color) => {
  let data = [];

  if (type == "author") {
        create_author(option, color);

  } else if (type == "library") {
        create_library(option, color);

  } else if (type == "series") {
        create_series(option, color);

  } else if (type == "notes") {
        await get_genres().then(genres => {data = genres});
        return data

  } else if (type == "trope") {
        create_trope(option, color);

  } else if (type == "genre") {
        create_genre(option, color);

  }
};