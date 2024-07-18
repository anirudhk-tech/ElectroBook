import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLibraryScrollTypeMain = create(
    persist(
      (set) => ({
        type: "row",
        setType: (value) => set(() => ({ type: value })),
      }),
      {
        name: "App Library Scroll",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );

export const useLibraryScrollType = () => {
    const { type, setType } = useLibraryScrollTypeMain((state) => ({
        type: state.type,
        setType: state.setType,
    }));

    return [type, setType];
};
