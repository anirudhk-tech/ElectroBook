import { create } from "zustand";
import { get_search_books } from "../app/backend/controller";

const useSearchMain = create((set) => ({
  searchActive: false,
  bookSearchActive: false,
  setBookSearchActive: (value) => set((state) => ({ bookSearchActive: value != undefined ? value : !state.bookSearchActive })),
  setSearchActive: (value) => set((state) => ({ searchActive: value != undefined ? value : !state.searchActive })),
  searchValue: "",
  bookSearchValue: "",
  setSearchValue: (value) => set(() => ({ searchValue: value })),
  setBookSearchValue: (value) => set(() => ({ bookSearchValue: value})),
}));

export const useSearchActive = () => {
    const { searchActive, setSearchActive } = useSearchMain ((state) => ({
        searchActive: state.searchActive,
        setSearchActive: state.setSearchActive,
    }));

    return { searchActive: searchActive, setSearchActive: setSearchActive };
};

export const useSearchValue = () => {
    const { searchValue, setSearchValue, bookSearchValue, setBookSearchValue } = useSearchMain ((state) => ({
        searchValue: state.searchValue,
        setSearchValue: state.setSearchValue,
        bookSearchValue: state.bookSearchValue,
        setBookSearchValue: state.setBookSearchValue
    }));

    return { 
        searchValue: searchValue, 
        setSearchValue: setSearchValue,
        bookSearchValue: bookSearchValue,
        setBookSearchValue: setBookSearchValue,
    };
};

export const useSearchData = async (searchValue, library) => {
    let searchData = [];
    if (library) {
        await get_search_books(searchValue, library).then(data => searchData = data);
    } else {
        await get_search_books(searchValue).then(data => searchData = data);
    };

    return searchData;
};

export const useBookSearchActive = () => {
    const { searchActive, setSearchActive } = useSearchMain ((state) => ({
        searchActive: state.bookSearchActive,
        setSearchActive: state.setBookSearchActive,
    }));

    return { searchActive: searchActive, setSearchActive: setSearchActive};
};