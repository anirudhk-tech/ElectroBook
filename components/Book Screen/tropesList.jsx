// React
import { View } from "react-native";
import { useEffect, useState, useMemo } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroListBadge } from "./listBadge";

// Hooks
import { useBookInfo } from "../../hooks/useBookInfo";
import { useEditRefresh } from "../../hooks/useEdit";
import { useBookName } from "../../hooks/useBookName";


export const ElectroTropesList = () => {
    const [bookInfo, setBookInfo] = useState([]);
    const [tropes, setTropes] = useState([]);
    const { editRefreshTropes, setEditRefreshTropes } = useEditRefresh();
    const { bookName } = useBookName();

    const tropesSplit = () => {
        if (bookInfo != null && bookInfo.tropes != undefined) {
            const tropes = bookInfo.tropes.split(",");
            return tropes
        } else {
            return []
        };
    };

    const tropesData = useMemo(() => tropesSplit(), [bookInfo != null ? bookInfo.tropes : {}])

    useEffect(() => {
        useBookInfo(bookName).then(data => setBookInfo(data));
    }, [editRefreshTropes]);

    useEffect(() => {
        if (bookInfo != null) {
            setTropes(tropesData);    
        } else {
            setEditRefreshTropes();
        }
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