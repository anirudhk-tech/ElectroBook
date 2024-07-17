import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useCheckUser = create(
    persist((set) => (
        {
            check: (false),      
            settingsCheck: (false),
            setCheck: (value) => set(() => ({ check: (value) })),
            setSettingsCheck: (value) => set(() => ({settingsCheck: (value)})),
        }),
        {
            name: "User Checks",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )   
);

export const useChecks = () => {
    const {check, settingsCheck} = useCheckUser(
        (state) => ({
            check: state.check,
            settingsCheck: state.settingsCheck,
        })
    ) 
    return [check, settingsCheck];
};

export const useCheckSetters = () => {
    const {setCheck, setSettingsCheck} = useCheckUser(
        (state) => ({
            setCheck: state.setCheck,
            setSettingsCheck: state.setSettingsCheck,
        })
    ) 
    return [setCheck, setSettingsCheck];
};




