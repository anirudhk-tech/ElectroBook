import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useTitle = create((set) => ({
  title: "",
  setTitle: (value) => set(() => ({ title: value })),
}));

export const useLibrary = create(
  persist (
    (set) => ({
      library: "",
      setLibrary: (value) => set(() => ({ library: value })),
    }),
    {
      name: "Default Library",
      storage: createJSONStorage(() => AsyncStorage),
    }
  ),
);

export const useAuthor = create((set) => ({
  author: "",
  setAuthor: (value) => set(() => ({ author: value })),
}));

export const useGenres = create((set) => ({
  genres: [],
  addGenres: (value) => set((state) => ({ genres: [...state.genres, value] })),
  removeGenres: (value) =>
    set((state) => ({ genres: state.genres.filter((x) => x != value) })),
  clearGenres: () => set(() => ({ genres: [] })),
}));

export const useTropes = create((set) => ({
  tropes: [],
  addTropes: (value) => set((state) => ({ tropes: [...state.tropes, value] })),
  removeTropes: (value) =>
    set((state) => ({ tropes: state.tropes.filter((x) => x != value) })),
  clearTropes: () => set(() => ({ tropes: [] })),
}));

export const useSeries = create((set) => ({
  series: "",
  setSeries: (value) => set(() => ({ series: value })),
}));

export const useFileColor = create((set) => ({
  fileColor: "",
  setFileColor: (value) => set(() => ({ fileColor: value })),
}));

export const useNotes = create((set) => ({
  notes: [],
  addNotes: (value) => set((state) => ({ notes: [...state.notes, value] })),
  removeNotes: (value) =>
    set((state) => ({ notes: state.notes.filter((x) => x != value) })),
  editNote: (prevNotes, oldValue, newValue, afterNotes) =>
    set(() => ({
      notes: [...prevNotes, newValue, ...afterNotes].filter(
        (x) => x != oldValue
      ),
    })),
  clearNotes: () => set(() => ({ notes: [] })),
}));

export const useImage = create((set) => ({
  imageUri: "",
  setImageUri: (value) => set(() => ({ imageUri: value}))
}));
