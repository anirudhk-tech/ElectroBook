import { create } from "zustand";
import { get_search_books } from "../app/backend/controller";

const useSearchMain = create((set) => ({
  searchActive: false,
  setSearchActive: () => set((state) => ({ searchActive: !state.searchActive })),
  searchValue: "",
  setSearchValue: (value) => set(() => ({ searchValue: value }))
}));

export const useSearchActive = () => {
    const { searchActive, setSearchActive } = useSearchMain ((state) => ({
        searchActive: state.searchActive,
        setSearchActive: state.setSearchActive,
    }));

    return { searchActive: searchActive, setSearchActive: setSearchActive };
};

export const useSearchValue = () => {
    const { searchValue, setSearchValue } = useSearchMain ((state) => ({
        searchValue: state.searchValue,
        setSearchValue: state.setSearchValue,
    }));

    return { searchValue: searchValue, setSearchValue: setSearchValue};
};

export const useSearchData = async (searchValue) => {
    let searchData = [];
    await get_search_books(searchValue).then(data => searchData = data);

    return searchData;
};