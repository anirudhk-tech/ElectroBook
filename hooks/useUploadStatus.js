import { create } from "zustand"

const useUploadStatusMain = create ((set) => ({
        uploadPressed: false,
        setUploadPressed: (value) => set(() => ({uploadPressed: value}))
      }),
);

export const useUploadPressed = () => {
    const {uploadPressed, setUploadPressed } = useUploadStatusMain ((state) => ({
        uploadPressed: state.uploadPressed,
        setUploadPressed: state.setUploadPressed,
    }));

    return {uploadPressed: uploadPressed, setUploadPressed: setUploadPressed};
};