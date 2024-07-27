import { create } from "zustand";

const useEditMain = create ((set) => ({
    editType: "",
    setEditType: (value) => set(() => ({ editType: value })),
    bookData: [],
    setBookData: (value) => set(() => ({ bookData: value })),
    data: [],
    setData: (value) => set(() => ({ data: value })),
    notesData: [null],
    setNotesData: (value) => set(() => ({ notesData: value })),
    editRefreshGenres: false,
    setEditRefreshGenres: () => set((state) => ({ editRefreshGenres: !state.editRefreshGenres })),
    editRefreshTropes: false,
    setEditRefreshTropes: () => set((state) => ({ editRefreshTropes: !state.editRefreshTropes })),
    editRefreshSeries: false,
    setEditRefreshSeries: () => set((state) => ({ editRefreshSeries: !state.editRefreshSeries })),
    editRefreshAuthor: false,
    setEditRefreshAuthor: () => set((state) => ({ editRefreshAuthor: !state.editRefreshAuthor })),
    editRefreshLibrary: false,
    setEditRefreshLibrary: () => set((state) => ({ editRefreshLibrary: !state.editRefreshLibrary })),
    editRefreshPage: false,
    setEditRefreshPage: () => set((state) => ({ editRefreshPage: !state.editRefreshPage })),
    editRefreshNotes: false,
    setEditRefreshNotes: () => set((state) => ({ editRefreshNotes: !state.editRefreshNotes })),
    editRefreshCompleted: false,
    setEditRefreshCompleted: () => set((state) => ({ editRefreshCompleted: !state.editRefreshCompleted })),

}));

export const useEditType = () => {
    const { type, setType } = useEditMain ((state) => ({
        type: state.editType,
        setType: state.setEditType,
    }));

    return {type: type, setType: setType};
};

export const useEditData = () => {
    const { data, setData } = useEditMain ((state) => ({
        data: state.data,
        setData: state.setData,
    }));

    return {data: data, setData: setData};
};

export const useEditNotes = () => {
    const { data, setData } = useEditMain((state) => ({
        data: state.notesData,
        setData: state.setNotesData,
    }));

    return {data: data, setData: setData};
}

export const useEditRefresh = () => {
    const { 
        editRefreshGenres, 
        setEditRefreshGenres,
        editRefreshTropes,
        setEditRefreshTropes,
        editRefreshAuthor,
        setEditRefreshAuthor,
        editRefreshLibrary,
        setEditRefreshLibrary,
        editRefreshSeries,
        setEditRefreshSeries,
        editRefreshPage,
        setEditRefreshPage,
        editRefreshNotes,
        setEditRefreshNotes,
        editRefreshCompleted,
        setEditRefreshCompleted,
    } = useEditMain((state) => ({
        editRefreshGenres: state.editRefreshGenres,
        setEditRefreshGenres: state.setEditRefreshGenres,
        editRefreshTropes: state.editRefreshTropes,
        setEditRefreshTropes: state.setEditRefreshTropes,
        editRefreshSeries: state.editRefreshSeries,
        setEditRefreshSeries: state.setEditRefreshSeries,
        editRefreshAuthor: state.editRefreshAuthor,
        setEditRefreshAuthor: state.setEditRefreshAuthor,
        editRefreshLibrary: state.editRefreshLibrary,
        setEditRefreshLibrary: state.setEditRefreshLibrary,
        editRefreshPage: state.editRefreshPage,
        setEditRefreshPage: state.setEditRefreshPage,
        editRefreshNotes: state.editRefreshNotes,
        setEditRefreshNotes: state.setEditRefreshNotes,
        editRefreshCompleted: state.editRefreshCompleted,
        setEditRefreshCompleted: state.setEditRefreshCompleted,
    }));

    return {
        editRefreshGenres: editRefreshGenres,
        setEditRefreshGenres: setEditRefreshGenres,
        editRefreshTropes: editRefreshTropes,
        setEditRefreshTropes: setEditRefreshTropes,
        editRefreshSeries: editRefreshSeries,
        setEditRefreshSeries: setEditRefreshSeries,
        editRefreshAuthor: editRefreshAuthor,
        setEditRefreshAuthor: setEditRefreshAuthor,
        editRefreshLibrary: editRefreshLibrary,
        setEditRefreshLibrary: setEditRefreshLibrary,
        editRefreshPage: editRefreshPage,
        setEditRefreshPage: setEditRefreshPage,
        editRefreshNotes: editRefreshNotes,
        setEditRefreshNotes: setEditRefreshNotes,
        editRefreshCompleted: editRefreshCompleted,
        setEditRefreshCompleted: setEditRefreshCompleted,
    };
};

