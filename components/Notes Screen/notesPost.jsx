// Components
import { ElectroIcon } from "../General/icon";

// React
import { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
  Keyboard,
} from "react-native";

// Node Modules
import * as Animatable from "react-native-animatable";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useFileFunctions } from "../../hooks/useFileFunctions";

export const ElectroNotesPost = (props) => {
  const { primaryColor, secondaryColor } = useColor();
  const { notes, removeNote, editNote } = useFileFunctions("note");
  const [editing, setEditing] = useState(false);
  const [add, setAdd] = useState(0);
  const [editNoteText, setEditNoteText] = useState("");
  const windowHeight = Dimensions.get("window").height;

  const handleAdd = () => {
    setAdd(prev => prev + 20);
  };

  const handleNotePress = () => {
    setEditing(!editing);
  };

  const handleDeletePress = (note) => {
    removeNote(note);
  };

  const handleEditFinish = (newNote) => {
    const editedNewNote = newNote.replaceAll('"', "'").replaceAll(",", ";");
    if (editedNewNote.trim() == "") {
      setEditing(false);
      return;
    }
    const pos = notes.indexOf(props.note);
    const prevNotes = notes.slice(0, pos);
    const afterNotes = notes.slice(pos);
    editNote(prevNotes, props.note, editedNewNote, afterNotes);
    setEditing(false);
  };

  const handleBlur = () => {
    try {
      textInputField.blur()
    } catch {
      return
    };
  };

  if (editing == false) {
    return (
      <Animatable.View
        animation={"flipInX"}
        useNativeDriver={true}
        style={[
          styles.notesPostMainView,
          { borderColor: primaryColor },
        ]}
      >
        <TouchableOpacity
          style={styles.notesPostTextTouchable}
          onPress={handleNotePress}
        >
          <Text
            style={[styles.notesPostText, { color: primaryColor }]}
          >
            {props.note}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.notesPostDeleteTouchable,
            { borderColor: primaryColor, backgroundColor: primaryColor },
          ]}
          onPress={() => handleDeletePress(props.note)}
        >
          <ElectroIcon
            name="close"
            size={40}
            color={secondaryColor}
            handlePress={() => handleDeletePress(props.note)}
          />
        </TouchableOpacity>
      </Animatable.View>
    );
  } else {

    Keyboard.addListener(
      'keyboardDidHide', 
      handleBlur
    );

    return (
      <View
        style={[
          styles.notesPostMainView,
          { borderColor: primaryColor },
        ]}
      >
        <TextInput
          style={[
            styles.notesPostTextTouchable,
            { color: primaryColor, 
              padding: windowHeight * 0.01,
              height: windowHeight / 9 + add},
          ]}
          onChangeText={(e) => setEditNoteText(e)}
          autoFocus={true}
          onBlur={() => handleEditFinish(editNoteText)}
          defaultValue={props.note}
          multiline={true}
          onContentSizeChange={handleAdd}
          ref={input => {textInputField = input}}
        />
        <TouchableOpacity
          style={[
            styles.notesPostDeleteTouchable,
            { borderColor: primaryColor, backgroundColor: primaryColor },
          ]}
          onPress={() => handleEditFinish(editNoteText)}
        >
          <ElectroIcon
            name="pencil"
            size={40}
            color={secondaryColor}
            handlePress={() => handleEditFinish(editNoteText)}
          />
        </TouchableOpacity>
      </View>
    );
  }
};
