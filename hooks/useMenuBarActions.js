import { create } from "zustand";

export const useMenuBarActionsMain = create((set) => ({
  menuDelete: "",
  menuColor: "",
  menuText: "",
  menuBack: "",
  setMenuDelete: (value) => set(() => ({ menuDelete: value })),
  setMenuColor: (value) => set(() => ({ menuColor: value })),
  setMenuText: (value) => set(() => ({ menuText: value })),
  setMenuBack: (value) => set(() => ({ menuBack: value })),
}));
  
export const useMenuDelete = () => {
    const { action, setAction } = useMenuBarActionsMain((state) => ({
        action: state.menuDelete,
        setAction: state.setMenuDelete,
    }));

    return { action: action, setAction: setAction }
};

export const useMenuColorPress = () => {
    const { action, setAction } = useMenuBarActionsMain((state) => ({
        action: state.menuColor,
        setAction: state.setMenuColor,
    }));

    return { action: action, setAction: setAction }
};

export const useMenuText = () => {
    const { action, setAction } = useMenuBarActionsMain((state) => ({
        action: state.menuText,
        setAction: state.setMenuText,
    }));

    return { action: action, setAction: setAction }
};

export const useMenuBack = () => {
    const { action, setAction } = useMenuBarActionsMain((state) => ({
        action: state.menuBack,
        setAction: state.setMenuBack,
    }));

    return { action: action, setAction: setAction }
};
