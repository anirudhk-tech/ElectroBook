import { create } from "zustand";

const useBookNameMain = create((set) => ({
    bookName: "",
    setBookName: (value) => set(() => ({ bookName: value }))
}))

export const useBookName = () => {
    const {bookName, setBookName} = useBookNameMain((state) => ({
        bookName: state.bookName,
        setBookName: state.setBookName,
    }));

    return {bookName: bookName, setBookName: setBookName};
};