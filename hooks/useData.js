// Backend
import { 
    get_genres, 
    get_tropes, 
    get_authors, 
    get_series, 
    get_libraries, 
    get_books, 
    get_completed
} from '../app/backend/controller';

export const useData = async (type) => {
  let data = [];

  if (type.toLowerCase() == "author") {
      await get_authors().then(authors => {data = authors});
      return data;

  } else if (type.toLowerCase() == "library") {
      await get_libraries().then(libraries => {data = libraries});
      return data;

  } else if (type.toLowerCase() == "series") {
      await get_series().then(series => {data = series});
      return data;

  } else if (type.toLowerCase() == "note") {
      await get_genres().then(genres => {data = genres});
      return data;

  } else if (type.toLowerCase() == "trope") {
      await get_tropes().then(tropes => {data = tropes});
      return data;

  } else if (type.toLowerCase() == "genre") {
      await get_genres().then(genres => {data = genres});
      return data;

  } else if (type.toLowerCase() == "completed") {
      await get_completed().then(completed => {data = completed});
      return data;
      
  } else if (type.toLowerCase() == "book") {
    await get_books().then(books => {data = books});
    return data;
  };
};
