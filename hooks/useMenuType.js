import { create } from "zustand";

export const useMenuTypeMain = create ((set) => ({
    type: "",
    setType: (value) => set(() => ({ type: value })),
}));

export const useMenuType = () => {
    const { type, setType } = useMenuTypeMain ((state) => ({
        type: state.type,
        setType: state.setType,
    }));
    
    return {type: type, setType: setType};
};