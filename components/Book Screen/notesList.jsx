// React
import { View } from "react-native";
import { useEffect, useState } from "react";

// Components
import { ElectroNotesPost } from "../Notes Screen/notesPost";

// Hooks
import { useBookInfo } from "../../hooks/useBookInfo";


export const ElectroNotesList = (props) => {
    const [bookInfo, setBookInfo] = useState([]);
    const [notes, setNotes] = useState([]);

    const notesSplit = () => {
        const notes = bookInfo.notes.split(",");
        setNotes(notes)
    };

    useEffect(() => {
        useBookInfo(props.bookName).then(data => setBookInfo(data));
    }, []);

    useEffect(() => {
        if (bookInfo.notes != undefined) {
            notesSplit();
        };
    }, [bookInfo]);

    return (
        <View>
            {
                notes.map((note) => {
                    return (
                        <ElectroNotesPost key={notes.indexOf(note)}note={note}/>
                    )
                })
            }
        </View>
    );
};