// React
import { View, Text } from "react-native";
import { useEffect, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroListBadge } from "./listBadge";

// Hooks
import { useBookInfo } from "../../hooks/useBookInfo";
import { useColor } from "../../hooks/useTheme";


export const ElectroGenresList = (props) => {
    const [bookInfo, setBookInfo] = useState([]);
    const [genres, setGenres] = useState([]);

    const genresSplit = () => {
        const genres = bookInfo.genres.split(",");
        setGenres(genres);
    };

    useEffect(() => {
        useBookInfo(props.bookName).then(data => setBookInfo(data));
    }, []);

    useEffect(() => {
        if (bookInfo.genres != undefined || bookInfo.genres != null) {
            genresSplit();
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