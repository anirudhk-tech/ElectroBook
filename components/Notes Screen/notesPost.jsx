// Components
import { ElectroIcon } from "../General/icon";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useFileFunctions } from "../../hooks/useFileFunctions";

// React
import { useState } from "react";
import {
  TextInput,
  TouchableOpacity,
  View,
  Text,
  Dimensions,
} from "react-native";

// Backend
import { styles } from "../../constants/stylers";

export const ElectroNotesPost = (props) => {
  const {primaryColor, secondaryColor} = useColor();
  const {notes, removeNote, editNote} = useFileFunctions("note");
  const [editing, setEditing] = useState(false);
  const [editNoteText, setEditNoteText] = useState("");
  const windowHeight = Dimensions.get("window").height;

  const handleNotePress = () => {
    setEditing(!editing);
  };

  const handleDeletePress = (note) => {
    removeNote(note);
  };

  const handleEditFinish = (newNote) => {
    if (newNote.trim() == "") {
      setEditing(false);
      return;
    }
    const pos = notes.indexOf(props.note);
    const prevNotes = notes.slice(0, pos);
    const afterNotes = notes.slice(pos);
    editNote(prevNotes, props.note, newNote, afterNotes);
    setEditing(false);
  };

  if (editing == false) {
    return (
      <View
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
      </View>
    );
  } else {
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
            { color: primaryColor, padding: windowHeight * 0.01 },
          ]}
          onChangeText={(e) => setEditNoteText(e)}
          autoFocus={true}
          onBlur={() => handleEditFinish(editNoteText)}
          defaultValue={props.note}
          multiline={true}
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
