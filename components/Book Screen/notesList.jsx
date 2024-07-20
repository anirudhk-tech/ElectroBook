// React
import { Dimensions, View } from "react-native";
import { useEffect, useState } from "react";

// Components
import { ElectroBookNotesPost } from "./bookNotesPost";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useBookInfo } from "../../hooks/useBookInfo";
import { useColor } from "../../hooks/useTheme";
import { useEditRefresh } from "../../hooks/useEdit";
import { useBookUpdate } from "../../hooks/useBookUpdate";


export const ElectroNotesList = (props) => {
    const [bookInfo, setBookInfo] = useState([]);
    const [notes, setNotes] = useState([]);
    const {primaryColor} = useColor();
    const {editRefresh} = useEditRefresh();

    const windowWidth = Dimensions.get("window").width;

    const notesSplit = () => {
        const notes = bookInfo.notes.split(",");
        setNotes(notes);
    };

    const handleDeletePress = (note) => {
        setNotes(notes.filter(x => x != note));
    };

    const handleEditPress = (oldNote, newNote) => {
        const index = notes.indexOf(oldNote);
        const newNotes = notes;
        newNotes[index] = newNote;
        setNotes([...newNotes]);
      };

    useEffect(() => {
        useBookInfo(props.bookName).then(data => setBookInfo(data));
    }, [editRefresh]);

    useEffect(() => {
        if (bookInfo.notes != undefined) {
            notesSplit();
        };
    }, [bookInfo]);

    useEffect(() => {
        if (notes.length != 0) {
            useBookUpdate("note", props.bookName, notes);
        };
    }, [notes]);

    return (
        <View style={{gap: 10, alignItems: 'center'}}>
            {
                notes.map((note) => {
                    if (note != "") {
                        return (
                            <ElectroBookNotesPost 
                                key={notes.indexOf(note)} note={note}
                                handleDeletePress={handleDeletePress}
                                handleEditPress={handleEditPress}/>
                        );
                    } else {
                        return (
                            <View key={notes.indexOf(note)}
                            style={[styles.booksScreenNotesListLine, {borderColor: primaryColor, width: windowWidth/2}]}></View>
                        )
                    }
                })
            }
        </View>
    );
};