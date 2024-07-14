import { create } from "zustand";

export const useTheme = create((set) => ({
    primaryColor: "#24C2F4",
    secondaryColor: "black",
    setPrimary: (value) => set(() => ({primaryColor: value})),
    setSecondary: (value) => set(() => ({secondaryColor: value})),
}));

export const changeTheme = () => {
    const {setPrimary, setSecondary} = useTheme((state) => ({
        setPrimary: state.setPrimary,
        setSecondary: state.setSecondary,
    }));

    return [setPrimary, setSecondary];
};

export const useColor = () => {
    const {primaryColor, secondaryColor} = useTheme((state) => ({
        primaryColor: state.primaryColor,
        secondaryColor: state.secondaryColor,
    }));

    return [primaryColor, secondaryColor];
};
