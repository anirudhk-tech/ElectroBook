import { create } from "zustand";

export const useMenu = create ((set) => ({
        menuColor: "",
        setMenuColor: (value) => set(() => ({ menuColor: value} )),
    })
);

export const useMenuColor = () => {
    const {menuColor, setMenuColor} = useMenu ((state) => ({
            menuColor: state.menuColor,
            setMenuColor: state.setMenuColor,
        }));

    return {menuColor: menuColor, setMenuColor: setMenuColor};
};