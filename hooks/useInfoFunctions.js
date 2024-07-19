// React
import { useEffect, useState } from 'react';

// Expo
import * as FileSystem from 'expo-file-system';

// Hooks
import * as useFile from './useFile';
import { useRefreshInfo } from './useRefreshInfo';


export const useInfo = (type) => {
    const { title, setTitle } = useFile.useTitle((state) => ({
        title: state.title,
        setTitle: state.setTitle,
    }));
    
    const { genres, clearGenres } = useFile.useGenres((state) => ({
        genres: state.genres,
        clearGenres: state.clearGenres,
    }));

    const { tropes, clearTropes } = useFile.useTropes((state) => ({
        tropes: state.tropes,
        clearTropes: state.clearTropes,
    }));

    const { library, setLibrary } = useFile.useLibrary((state) => ({
        library: state.library,
        setLibrary: state.setLibrary,
    }));

    const { author, setAuthor } = useFile.useAuthor((state) => ({
        author: state.author,
        setAuthor: state.setAuthor,
    }));

    const { fileColor, setFileColor } = useFile.useFileColor((state) => ({
        fileColor: state.fileColor,
        setFileColor: state.setFileColor,
    }));

    const { notes, clearNotes } = useFile.useNotes((state) => ({
        notes: state.notes,
        clearNotes: state.clearNotes,
    }));

    const { imageUri, setImageUri } = useFile.useImage((state) => ({
        imageUri: state.imageUri,
        setImageUri: state.setImageUri,
    }));

    const { series, setSeries } = useFile.useSeries((state) => ({
        series: state.series,
        setSeries: state.setSeries,
    }));

    if (type == "info") {
        const [info, setInfo] = useState([]);
        const refreshKey = useRefreshInfo().refresh;
        useEffect(() => {
        const newImageUri = imageUri == "" ? "" : `${FileSystem.documentDirectory}Images/${imageUri.split("/ImagePicker/")[1]}`
        const bookData = {
            name: title,
            author: author,
            genres: genres,
            tropes: tropes,
            library: library,
            notes: notes,
            imageUri: newImageUri,
            fileColor: fileColor,
            series: series,
        };  
        setInfo(bookData);
        }, [refreshKey])

        return info
    } else {
        const clearValues = () => {
            setTitle("");
            setAuthor("");
            setFileColor("");
            setImageUri("");
            setLibrary("");
            setSeries("");
            clearGenres();
            clearTropes();
            clearNotes();
        }

        return clearValues;
    }
};