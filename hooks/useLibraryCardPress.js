import { create } from "zustand";

export const useLibraryCardPressMain = create((set) => ({
  press: "",
  libraryPress: "",
  folderPress: "",
  bookCardPress: "Hello",
  setPress: (value) => set(() => ({press: value})),
  setLibraryPress: (value) => set(() => ({libraryPress: value})),
  setFolderPress: (value) => set(() => ({folderPress: value})),
  setBookCardPress: (value) => set(() => ({bookCardPress: value})),
}));

export const useLibraryCardPress = () => {
    const {press, setPress} = useLibraryCardPressMain((state) => ({
        press: state.press,
        setPress: state.setPress,
    }));

    return [press, setPress];
};

export const useLibraryIconPress = () => {
  const {press, setPress} = useLibraryCardPressMain((state) => ({
    press: state.libraryPress,
    setPress: state.setLibraryPress,
  }));
  
  return [press, setPress];
};

export const useLibraryFolderIconPress = () => {
  const {press, setPress} = useLibraryCardPressMain((state) => ({
    press: state.folderPress,
    setPress: state.setFolderPress,
  }));
  
  return [press, setPress];
};

export const useBookCardPress = () => {
  const {press, setPress} = useLibraryCardPressMain((state) => ({
    press: state.bookCardPress,
    setPress: state.setBookCardPress,
  }));

  return [press, setPress];
};