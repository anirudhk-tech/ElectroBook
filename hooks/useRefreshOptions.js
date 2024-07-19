import { create } from "zustand";

export const useRefreshOptionsMain = create((set) => ({
    refreshStatus: false,
    setRefreshStatus: (value) => set(() => ({ refreshStatus: value })),
  }));

export const useRefreshOptions = () => {
    const {refreshStatus, setRefreshStatus} = useRefreshOptionsMain (
        (state) => ({
            refreshStatus: state.refreshStatus,
            setRefreshStatus: state.setRefreshStatus,
        })
    );
    return {refresh: refreshStatus, setRefresh: setRefreshStatus};
};