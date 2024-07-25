import { get_completed } from "../app/backend/controller";

export const useCompletedCount = async () => {
    let completedCount = 0;
    await get_completed().then(
        data => completedCount = data.length
    );

    return completedCount
};