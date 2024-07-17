export const useHeader = (type) => {
  if (type == "author") {
    const header = "Authors";
    return header;
  } else if (type == "library") {
    const header = "Libraries";
    return header;
  } else if (type == "series") {
    const header = "Series";
    return header;
  } else if (type == "note") {
    const header = "Notes";
    return header;
  } else if (type == "trope") {
    const header = "Tropes";
    return header;
  } else if (type == "genre") {
    const header = "Genres";
    return header;
  } else if (type == "completed") {
    const header = "Completed";
    return header;
  } else if (type == "book") {
    const header = "Books"
    return header
  };
};
