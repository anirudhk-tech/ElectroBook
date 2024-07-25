// React
import { View } from "react-native";
import { useEffect, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroListBadge } from "./listBadge";

// Hooks
import { useBookInfo } from "../../hooks/useBookInfo";
import { useEditRefresh } from "../../hooks/useEdit";
import { useBookName } from "../../hooks/useBookName";


export const ElectroGenresList = (props) => {
    const {editRefresh} = useEditRefresh();
    const { bookName } = useBookName();
    const [bookInfo, setBookInfo] = useState([]);
    const [genres, setGenres] = useState([]);

    const genresSplit = () => {
        const genres = bookInfo.genres.split(",");
        setGenres(genres);
    };

    useEffect(() => {
        useBookInfo(bookName).then(data => setBookInfo(data));
    }, [editRefresh]);

    useEffect(() => {
        if (bookInfo != null) {
            if (bookInfo.genres != undefined || bookInfo.genres != null) {
                genresSplit();
            };
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