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
import { useEditRefresh } from "../../hooks/useEdit";

export const ElectroBookNotesPost = (props) => {
  const { primaryColor, secondaryColor } = useColor();
  const { setEditRefreshNotes } = useEditRefresh();

  const [editing, setEditing] = useState(false);
  const [editNoteText, setEditNoteText] = useState("");

  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  const handleNotePress = () => {
    setEditing(!editing);
  };

  const handleDeletePress = () => {
    props.handleDeletePress(props.note);
  };

  const handleEditPress = () => {
    const editedEditNoteText = editNoteText.replaceAll('"', "'").replaceAll(",", ";");
    if (editedEditNoteText != "") {
      props.handleEditPress(props.note, editedEditNoteText);
      setEditRefreshNotes();
    };
    setEditing(!editing);
  };

  const handleBlur = () => {
    try {
      textInputField.blur()
    } catch {
      return
    }
  };

  Keyboard.addListener(
    'keyboardDidHide', 
    handleBlur
  );

  if (editing == false) {
    return (
      <Animatable.View
        animation={"flipInX"}
        useNativeDriver={true}
        style={[
          styles.notesPostMainView,
          { borderColor: primaryColor, width: windowWidth/1.5, height: 'auto' },
        ]}
      >
        <TouchableOpacity
          style={[styles.notesPostTextTouchable, {height: 'auto'}]}
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
          onPress={handleDeletePress}
        >
          <ElectroIcon
            name="close"
            size={40}
            color={secondaryColor}
            handlePress={handleDeletePress}
          />
        </TouchableOpacity>
      </Animatable.View>
    );
  } else {
    return (
      <View
        style={[
          styles.notesPostMainView,
          { borderColor: primaryColor, width: windowWidth/1.5 },
        ]}
      >
        <TextInput
          style={[
            styles.notesPostTextTouchable,
            { color: primaryColor, padding: windowHeight * 0.01 },
          ]}
          onChangeText={(e) => setEditNoteText(e)}
          autoFocus={true}
          onBlur={handleEditPress}
          defaultValue={props.note}
          multiline={true}
          ref={input => {textInputField = input}}
        />
        <TouchableOpacity
          style={[
            styles.notesPostDeleteTouchable,
            { borderColor: primaryColor, backgroundColor: primaryColor },
          ]}
          onPress={handleEditPress}
        >
          <ElectroIcon
            name="pencil"
            size={40}
            color={secondaryColor}
            handlePress={handleEditPress}
          />
        </TouchableOpacity>
      </View>
    );
  };
};