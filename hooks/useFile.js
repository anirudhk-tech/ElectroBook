import { create } from "zustand";

export const useTitle = create((set) => ({
  title: "",
  setTitle: (value) => set(() => ({ title: value })),
}));

export const useLibrary = create((set) => ({
  library: "",
  setLibrary: (value) => set(() => ({ library: value })),
}));

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
  color: "",
  setColor: (value) => set(() => ({ color: value })),
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
