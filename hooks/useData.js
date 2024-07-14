// Backend
import { get_genres } from '../app/backend/controller';

// React
import { useState } from 'react';

export const useData = (type) => {
  const [data, setData] = useState([]);

  if (type == "author") {
    const data = ["Anirudh", "Sara"];
    return data;
  } else if (type == "library") {
    const data = ["Anirudh", "Sara"];
    return data;
  } else if (type == "series") {
    const data = ["Anirudh", "Sara"];
    return data;
  } else if (type == "notes") {
    const data = ["Anirudh", "Sara"];
    return data;
  } else if (type == "tropes") {
    const data = [
      "Anirudh",
      "Sara",
      "option",
      "live",
      "tru",
      "dh",
      "ssdkfjdkjj",
    ];
    return data;
  } else if (type == "genres") {
    const data = get_genres().then(genres => setData(genres));
    console.log(data)
    return data;
  } else if (type == "completed") {
    const data = ["Anirudh", "Sara"];
    return data;
  }
};
