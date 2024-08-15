// React
import { Dimensions, View, Text } from "react-native";
import { useCallback, useEffect, useMemo } from "react";

// Components
import { ElectroBookNotesPost } from "./bookNotesPost";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useBookInfo } from "../../hooks/useBookInfo";
import { useColor } from "../../hooks/useTheme";
import { useEditNotes, useEditRefresh } from "../../hooks/useEdit";
import { useBookUpdate } from "../../hooks/useBookUpdate";
import { useBookName } from "../../hooks/useBookName";


export const ElectroNotesList = (props) => {
    const { data, setData } = useEditNotes();
    const { primaryColor } = useColor();
    const { editRefreshNotes, setEditRefreshNotes } = useEditRefresh();
    const { bookName } = useBookName();

    const windowWidth = Dimensions.get("window").width;

    const notesSplit = (notesArray) => {
        const notes = notesArray.split(",");
        setData(notes);
    };

    const fetchNotes = async () => {
        await useBookInfo(bookName).then(response => {
            if (response) {
                notesSplit(response.notes)
            };
        });
    };

    const updateNotes = () => {
        useBookUpdate("note", bookName, data);
    };

    const handleDeletePress = (note) => {
        setData(data.filter(x => x != note));
    };

    const handleEditPress = (oldNote, newNote) => {
        if (newNote.trim() == "") {
            return
        };
        
        const index = data.indexOf(oldNote);
        const newNotes = data;
        newNotes[index] = newNote;
        setData([...newNotes]);
      };

    useEffect(() => {
        fetchNotes();
    }, [editRefreshNotes]);

    useEffect(() => {
        if (data.includes(null) != true) {
            updateNotes();
        } else {
            setEditRefreshNotes();
        }
    }, [data]);

    return (
        <View style={{gap: 10, alignItems: 'center'}}>
            {
                data.map((note) => {
                    if (note != "" && note != null) {
                        if (props.bookScreen) {
                            if (data.indexOf(note) > 3) {
                                return
                            };
                        };

                        return (
                            <ElectroBookNotesPost 
                                key={data.indexOf(note)} note={note}
                                handleDeletePress={handleDeletePress}
                                handleEditPress={handleEditPress}/>
                        );
                    } else {
                        return (
                            <View key={data.indexOf(note)}
                            style={[styles.booksScreenNotesListLine, {borderColor: primaryColor, width: windowWidth}]}></View>
                        )
                    }
                })
            }
            <Text style={[styles.booksScreenNotesListText, {color: primaryColor, display: data.length > 4 ? "flex" : "none"}]}>. . .</Text>
        </View>
    );
};