// Node Modules
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useSpeedMain = create(
    persist(
      (set) => ({
        speed: undefined,
        setSpeed: (value) => set(() => ({ speed: value })),
      }),
      {
        name: "Reading Speed",
        storage: createJSONStorage(() => AsyncStorage),
      }
    )
  );

export const useSpeed = () => {
    const { speed, setSpeed } = useSpeedMain((state) => ({
        speed: state.speed,
        setSpeed: state.setSpeed,
    }));

    return { speed: speed, setSpeed: setSpeed}
};