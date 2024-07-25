import { create } from "zustand";


const useUploadAlertMain = create(
    (set) => ({
        uploadAlertText: "",
        setUploadAlertText: (value) => set(() => ({ uploadAlertText: value })),
    })
);

export const useUploadAlert = () => {
    const { uploadAlertText, setUploadAlertText } = useUploadAlertMain ((state) => ({
        uploadAlertText: state.uploadAlertText,
        setUploadAlertText: state.setUploadAlertText,
    }));

    return { uploadAlertText, setUploadAlertText };
};
