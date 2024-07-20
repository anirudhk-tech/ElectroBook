import { create } from "zustand";

const useEditMain = create ((set) => ({
    editType: "",
    setEditType: (value) => set(() => ({ editType: value })),
    bookData: [],
    setBookData: (value) => set(() => ({ bookData: value})),
    data: [],
    setData: (value) => set(() => ({ data: value})),
    editRefresh: false,
    setEditRefresh: () => set((state) => ({ editRefresh: !state.editRefresh}))
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

export const useEditRefresh = () => {
    const { editRefresh, setEditRefresh } = useEditMain((state) => ({
        editRefresh: state.editRefresh,
        setEditRefresh: state.setEditRefresh,
    }));

    return {editRefresh: editRefresh, setEditRefresh: setEditRefresh};
};

