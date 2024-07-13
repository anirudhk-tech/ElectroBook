import { create } from "zustand";

export const useTheme = create((set) => ({
    primaryColor: "#24C2F4",
    secondaryColor: "black",
    setPrimary: (value) => set(() => ({primaryColor: value})),
    setSecondary: (value) => set(() => ({secondaryColor: value})),
}));

export const useColor = () => {
    const {primary, secondary} = useTheme((state) => ({
        primary: state.primaryColor,
        secondary: state.secondaryColor
    }));

    return [primary, secondary];
};
