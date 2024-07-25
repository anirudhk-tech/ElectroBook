// React
import { Dimensions, View } from "react-native";
import { useCallback, useEffect } from "react";

// Components
import { ElectroBookNotesPost } from "./bookNotesPost";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useBookInfo } from "../../hooks/useBookInfo";
import { useColor } from "../../hooks/useTheme";
import { useEditNotes, useEditRefresh } from "../../hooks/useEdit";
import { useBookUpdate } from "../../hooks/useBookUpdate";


export const ElectroNotesList = (props) => {
    const {data, setData} = useEditNotes();
    const {primaryColor} = useColor();
    const {editRefresh} = useEditRefresh();

    const windowWidth = Dimensions.get("window").width;

    const notesSplit = (notesArray) => {
        const notes = notesArray.split(",");
        setData(notes);
    };

    const updateNotes = useCallback(() => {
        useBookUpdate("note", props.bookName, data);
    }, [data]);

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
        useBookInfo(props.bookName).then(data => notesSplit(data.notes))
    }, [editRefresh]);

    useEffect(() => {
        if (data.includes(null) != true) {
            updateNotes();
        };
    }, [data]);

    return (
        <View style={{gap: 10, alignItems: 'center'}}>
            {
                data.map((note) => {
                    if (note != "") {
                        return (
                            <ElectroBookNotesPost 
                                key={data.indexOf(note)} note={note}
                                handleDeletePress={handleDeletePress}
                                handleEditPress={handleEditPress}/>
                        );
                    } else {
                        return (
                            <View key={data.indexOf(note)}
                            style={[styles.booksScreenNotesListLine, {borderColor: primaryColor, width: windowWidth/2}]}></View>
                        )
                    }
                })
            }
        </View>
    );
};