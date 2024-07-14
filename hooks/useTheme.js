import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useTheme = create(
  persist(
    (set) => ({
      primaryColor: "#24C2F4",
      secondaryColor: "black",
      setPrimary: (value) => set(() => ({ primaryColor: value })),
      setSecondary: (value) => set(() => ({ secondaryColor: value })),
    }),
    {
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export const changeTheme = () => {
  const { setPrimary, setSecondary } = useTheme((state) => ({
    setPrimary: state.setPrimary,
    setSecondary: state.setSecondary,
  }));

  return [setPrimary, setSecondary];
};

export const useColor = () => {
  const { primaryColor, secondaryColor } = useTheme((state) => ({
    primaryColor: state.primaryColor,
    secondaryColor: state.secondaryColor,
  }));

  return [primaryColor, secondaryColor];
};
