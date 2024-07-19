// React
import { View, Text } from "react-native";
import { useState, useEffect } from "react";

// Components
import { ElectroIcon } from "../General/icon";

// Hooks
import { useBookInfo } from "../../hooks/useBookInfo";

export const ElectroAuthorLibraryBox = (props) => {
    const [bookInfo, setBookInfo] = useState([]);

    useEffect(() => {
        useBookInfo(props.bookName).then(data => setBookInfo(data));
    }, []);

    return (
        <View>

        </View>
    )
}