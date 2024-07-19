import { create } from "zustand";

export const useRefreshInfoMain = create((set) => ({
    infoRefreshStatus: false,
    setInfoRefreshStatus: (value) => set(() => ({ infoRefreshStatus: value })),
  }));

export const useRefreshInfo = () => {
    const {infoRefreshStatus, setInfoRefreshStatus} = useRefreshInfoMain (
        (state) => ({
            infoRefreshStatus: state.infoRefreshStatus,
            setInfoRefreshStatus: state.setInfoRefreshStatus,
        })
    );
    return {refresh: infoRefreshStatus, setRefresh: setInfoRefreshStatus};
};