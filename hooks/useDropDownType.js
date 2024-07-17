export const useDropDownType = (type) => {
  if (type == "author") {
    const multi = false;
    return multi;
  } else if (type == "library") {
    const multi = false;
    return multi;
  } else if (type == "series") {
    const multi = false;
    return multi;
  } else if (type == "notes") {
    const multi = true;
    return multi;
  } else if (type == "trope") {
    const multi = true;
    return multi;
  } else if (type == "genre") {
    const multi = true;
    return multi;
  } else if (type == "completed") {
    const multi = false;
    return multi;
  }
};
