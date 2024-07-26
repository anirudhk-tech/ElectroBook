import { create } from "zustand";

const useAnimation = create((set) => ({
    progressBarComplete: false,
    setProgressBarComplete: (value) => set(() => ({ progressBarComplete: value }))
}));

export const useProgressBarAnimation = () => {
    const { progressBarComplete, setProgressBarComplete } = useAnimation((state) => ({
        progressBarComplete: state.progressBarComplete,
        setProgressBarComplete: state.setProgressBarComplete,
    }));

    return {progressBarComplete: progressBarComplete, setProgressBarComplete: setProgressBarComplete};
};