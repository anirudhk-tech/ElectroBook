// React
import { useEffect, useMemo, useState } from "react";
import { Dimensions, FlatList } from "react-native";

// Components
import { ElectroAddNotesBar } from "./notesAddBar";
import { ElectroBookNotesPost } from "../Book Screen/bookNotesPost";

// Hooks
import { useEditNotes } from "../../hooks/useEdit";
import { useBookInfo } from "../../hooks/useBookInfo";
import { useBookName } from "../../hooks/useBookName";

export const ElectroNotesSideBarNotes = () => {
    const { data, setData } = useEditNotes();
    const [flatListData, setFlatListData] = useState([]);
    const { bookName } = useBookName();

    const splitNotes = (notes) => {
        if (notes != undefined) {
          const splitNotes = notes.notes.split(",");
          setData(splitNotes);
        };
      };

    const handleAddNote = (newNote) => {
        const editedNewNote = newNote.replaceAll('"', "'").replaceAll(",", ";");
        if (data.includes(editedNewNote) != true) {
            setData([...data, editedNewNote]);
        };
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

    const dataCreation = (data) => {
        const dataOrganize = [];

        if (data.includes(null) != true) {
            for (let x in data) {
                if (data[x] != "") {
                    dataOrganize.push({
                        item: <ElectroBookNotesPost 
                                note={data[x]}
                                handleDeletePress={handleDeletePress}
                                handleEditPress={handleEditPress}
                            />,
                        key: x,
                        });
                    };
                };
            };

        return dataOrganize
    };

    const dataOrganize = useMemo(
        () => dataCreation(data),
        [data]
    );

    useEffect(() => {
        if (data.includes(null) != true) {
            setFlatListData(dataOrganize);
        };
      }, [data]);

    useEffect(() => {
        useBookInfo(bookName).then(data => splitNotes(data));
    }, []);

    return (
        <FlatList
        data={flatListData}
        contentContainerStyle={{
            gap: 20,
            paddingBottom: 20
        }}
        renderItem={({ item }) => item.item}
        keyExtractor={(item) => item.key}
        removeClippedSubviews={false}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
            <ElectroAddNotesBar
                onSubmit={handleAddNote}
                notes={true}
            />
        }
        />
    )
};