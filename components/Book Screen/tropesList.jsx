// React
import { View, Text } from "react-native";
import { useEffect, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroListBadge } from "./listBadge";

// Hooks
import { useBookInfo } from "../../hooks/useBookInfo";
import { useEditRefresh } from "../../hooks/useEdit";
import { useBookName } from "../../hooks/useBookName";


export const ElectroTropesList = (props) => {
    const [bookInfo, setBookInfo] = useState([]);
    const [tropes, setTropes] = useState([]);
    const {editRefresh} = useEditRefresh();
    const { bookName } = useBookName();

    const tropesSplit = () => {
        const tropes = bookInfo.tropes.split(",");
        setTropes(tropes);
    };

    useEffect(() => {
        useBookInfo(bookName).then(data => setBookInfo(data));
    }, [editRefresh]);

    useEffect(() => {
        if (bookInfo != null) {
            if (bookInfo.tropes != undefined) {
                tropesSplit();
            };
        };
    }, [bookInfo]);

    return (
        <View style={styles.booksScreenListMainView}>
            {
                tropes.map (trope => {
                    return (
                       <ElectroListBadge key={tropes.indexOf(trope)} text={trope}/>
                    )
                })
            }
        </View>
    );
};