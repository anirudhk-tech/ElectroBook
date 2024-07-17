import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useUserData = create(
    persist((set) => (
        {
            uuid: "",
            libraryName: "",
            setUUID: (value) => set(() => ({uuid: (value)})),
            setLibraryName: (value) => set(() => ({libraryName: (value)})),
        }),
        {
            name: "User Info",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);

export const useUUID = () => {
    const { uuid } = useUserData(
        (state) => ({
            uuid: state.uuid,
        })
    )
    return uuid
};


export const useLibraryName = () => {
    const { libraryName } = useUserData(
        (state) => ({
            libraryName: state.libraryName,
        })
    )
    return libraryName
};

export const useChangeLibraryName = () => {
    const { changeLibraryName } = useUserData(
        (state) => ({
            changeLibraryName: state.setLibraryName,
        })
    )
    return changeLibraryName
};

