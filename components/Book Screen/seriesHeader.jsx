// React
import { Text } from "react-native";
import { useState, useEffect } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useBookInfo } from "../../hooks/useBookInfo";
import { useEditRefresh } from "../../hooks/useEdit";
import { useColor } from "../../hooks/useTheme";
import { useBookName } from "../../hooks/useBookName";

export const ElectroSeriesHeader = (props) => {
    const [series, setSeries] = useState([]);
    const [bookInfo, setBookInfo] = useState([]);
    const {editRefresh} = useEditRefresh();
    const {primaryColor} = useColor();
    const { bookName } = useBookName();

    useEffect(() => {
        useBookInfo(bookName).then(data => setBookInfo(data));
    }, [editRefresh]);

    useEffect(() => {
        if (bookInfo != null) {
            if (bookInfo.series != undefined || bookInfo.series != null) {
                setSeries(bookInfo.series)
            };
        };
    }, [bookInfo]);

    return (
        <Text 
            style={[styles.booksScreenSeriesHeaderText, {color: primaryColor}]}
            numberOfLines={2}
        >{series == "" ? "Stand-Alone" : series}</Text>
    )
};