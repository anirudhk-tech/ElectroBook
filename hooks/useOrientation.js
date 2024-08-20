import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useOrientationMain = create (
    persist (
        (set) => ({
          orient: "potraitUp",
          setOrient: (value) => set(() => ({ orient: value })),
          orientSignal: false,
          setOrientSignal: () => set((state) => ({ orientSignal: !state.orientSignal })),
        }),
        {
          name: "Default Orientation",
          storage: createJSONStorage(() => AsyncStorage),
        }
      ),
);

export const useOrientation = () => {
    const { orient, setOrient } = useOrientationMain((state) => ({
        orient: state.orient,
        setOrient: state.setOrient,
    }));

    return { orient: orient, setOrient: setOrient };
};

export const useOrientationSignal = () => {
  const { orientSignal, setOrientSignal } = useOrientationMain((state) => ({
    orientSignal: state.orientSignal,
    setOrientSignal: state.setOrientSignal,
  }));

  return { orientSignal: orientSignal, setOrientSignal: setOrientSignal };
};