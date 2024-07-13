

export const useHeader = (type) => {
    if (type == "author") {
        const header = "Author";
        return header;
    } else if (type == "library") {
        const header = "Library";
        return header;
    } else if (type == "series") {
        const header = "Series";
        return header;
    } else if (type == "notes") {
        const header = "Notes";
        return header;
    } else if (type == "tropes") {
        const header = "Tropes";
        return header;
    } else if (type == "genres") {
        const header = "Genres";
        return header;
    } else if (type == "completed") {
        const header = "Completed";
        return header;
    };
};