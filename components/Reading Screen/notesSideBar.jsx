// React
import { View, Text, ScrollView, Dimensions } from "react-native";
import { useCallback, useEffect, useState } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Node Modules
import * as Animatable from "react-native-animatable";

// Components
import { ElectroIcon } from "../General/icon";
import { ElectroNotesList } from "../Book Screen/notesList";
import { ElectroAddNotesBar } from "./notesAddBar";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useBookInfo } from "../../hooks/useBookInfo";
import { useBookUpdate } from "../../hooks/useBookUpdate";
import { useEditRefresh } from "../../hooks/useEdit";

export const NotesSideBar = (props) => {
  const {primaryColor, secondaryColor} = useColor();
  const [info, setInfo] = useState([]);
  const [notes, setNotes] = useState([null]);
  const {setEditRefresh} = useEditRefresh();
  const windowHeight = Dimensions.get("window").height;

  const handleNotesClose = useCallback(() => {
    props.handleNotesClose();
  }, []);

  const splitNote = (notes) => {
    if (notes != undefined) {
      const splitNotes = notes.split(",");
      setNotes(splitNotes);
    };
  };

  const handleAddNote = (newNote) => {
    const editedNewNote = newNote.replaceAll('"', "'").replaceAll(",", ";");
    if (notes.includes(editedNewNote) != true) {
      setNotes([...notes, editedNewNote]);
      setEditRefresh();
    };
  };

  useEffect(() => {
    useBookInfo(props.bookName).then(data => setInfo(data));
  }, [props.visible]);

  useEffect(() => {
    if (info.notes != undefined && info != null) {
      splitNote(info.notes);
    };
  }, [info]);

  useEffect(() => {
    if (notes.includes(null) != true) {
      useBookUpdate("note", props.bookName, notes);
    };
  }, [notes]);

    if (props.visible == true) {
      return (
          <Animatable.View
            animation={"slideInRight"}
            useNativeDriver={true}
            style={[styles.notesSideBarView, { backgroundColor: secondaryColor, alignItems: 'center'}]}
          >
            <View style={styles.notesSideBarTitleView}>
              <Text style={[styles.notesSideBarTitleText, { color: primaryColor }]}>Notes</Text>
              <ElectroIcon 
              name="close"
              size={30}
              color={primaryColor}
              handlePress={handleNotesClose}
              />
            </View>
            <ScrollView
            contentContainerStyle={{height: notes.length * 600}}
            showsVerticalScrollIndicator={false}
            >
              <ElectroNotesList bookName={props.bookName} notesSideBar={true}/>
              <ElectroAddNotesBar onSubmit={handleAddNote}/>
            </ScrollView>
          </Animatable.View>
      );
    };
  };

