// React
import { View } from "react-native";
import { useEffect, useMemo, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroListBadge } from "./listBadge";

// Hooks
import { useBookInfo } from "../../hooks/useBookInfo";
import { useEditRefresh } from "../../hooks/useEdit";
import { useBookName } from "../../hooks/useBookName";


export const ElectroGenresList = () => {
    const { editRefreshGenres, setEditRefreshGenres } = useEditRefresh();
    const { bookName } = useBookName();
    const [ bookInfo, setBookInfo ] = useState([]);
    const [ genres, setGenres ] = useState([]);

    const genresSplit = () => {
        if (bookInfo != null && bookInfo.genres != undefined) {
            const genres = bookInfo.genres.split(",");
            return genres
        } else {
            return []
        };
    };

    const genresData = useMemo(() => genresSplit(), [bookInfo != null ? bookInfo.genres : {}])

    useEffect(() => {
        useBookInfo(bookName).then(data => setBookInfo(data));
    }, [editRefreshGenres]);

    useEffect(() => {
        if (bookInfo != null) {
            setGenres(genresData);
        } else {
            setEditRefreshGenres();
        };
    }, [bookInfo]);

    return (
        <View style={styles.booksScreenListMainView}>
            {
                genres.map (genre => {
                    return (
                       <ElectroListBadge key={genres.indexOf(genre)} text={genre}/>
                    )
                })
            }
        </View>
    )
};