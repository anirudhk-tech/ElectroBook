import { create } from "zustand";

const usePdfMain = create((set) => ({
    headToPage: null,
    setHeadToPage: (value) => set(() => ({ headToPage: value })),
    bgColor: undefined,
    setBgColor: (value) => set(() => ({ bgColor: value })),
    singlePage: false,
    setSinglePage: () => set((state) => ({ singlePage: !state.singlePage })),
}));

export const usePdf = () => {
    const {
        headToPage, 
        setHeadToPage,
        bgColor,
        setBgColor, 
        singlePage,
        setSinglePage
    } = usePdfMain((state) => ({
        headToPage: state.headToPage,
        setHeadToPage: state.setHeadToPage,
        bgColor: state.bgColor,
        setBgColor: state.setBgColor,
        singlePage: state.singlePage,
        setSinglePage: state.setSinglePage,
    }));

    return {
        headToPage: headToPage,
        setHeadToPage: setHeadToPage,
        bgColor: bgColor,
        setBgColor: setBgColor,
        singlePage: singlePage,
        setSinglePage: setSinglePage,
    };
};