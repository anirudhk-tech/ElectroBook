// Backend
import { create_genre, create_trope, create_author, create_series, create_library} from '../app/backend/controller';

export const useAdd = async (type, option, color) => {
  let data = [];

  if (type == "author") {
        const result = await create_author(option, color);
        if (result == "duplicate") {
            return "duplicate"
        };

  } else if (type == "library") {
        const result = await create_library(option, color);
        if (result == "duplicate") {
            return "duplicate"
        };

  } else if (type == "series") {
        const result = await create_series(option, color);
        if (result == "duplicate") {
            return "duplicate"
        };
        
  } else if (type == "notes") {
        await get_genres().then(genres => {data = genres});
        return data
  } else if (type == "trope") {
        const result = await create_trope(option, color);
        if (result == "duplicate") {
            return "duplicate"
        };

  } else if (type == "genre") {
        const result = await create_genre(option, color);
        if (result == "duplicate") {
            return "duplicate"
        };
  }
};