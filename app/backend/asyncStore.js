import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async(key,value) => {
    try {
        await AsyncStorage.setItem(key, value)
    }
    catch (error) {};
};

export const getItemFor = async(key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        };
    }
    catch (error) {};
};

export const deleteAll = async () => {
    await AsyncStorage.clear();
};

export const deleteKey = async (key) => {
    await AsyncStorage.removeItem(key)
};

export const updateKey = async (key, newValue) => {
    await AsyncStorage.setItem(key, newValue);
};

export const getColors = async () => {
    const bgColor = await AsyncStorage.getItem("backgroundColor");
    const tint = await AsyncStorage.getItem("tint");

    if (bgColor == null || tint == null) {
        return ({"bgColor": "black", "tint": "#24C2F4"});
    } else {
        return ({"bgColor": bgColor, "tint": tint});
    };
};