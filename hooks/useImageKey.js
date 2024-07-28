import { create } from "zustand";

const useImageKeyMain = create((set) => ({
  imageKey: "",
  setImageKey: () => set((state) => ({ imageKey: state.imageKey + 5 })),
}));

export const useImageKey = () => {
    const { imageKey, setImageKey } = useImageKeyMain ((state) => ({
        imageKey: state.imageKey,
        setImageKey: state.setImageKey,
    }));

    return { imageKey: imageKey, setImageKey: setImageKey };
}