// Components
import { ElectroIcon } from "../General/icon";

// Hooks
import { useColor } from "../../hooks/useTheme";

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

export const ElectroBookNotesPost = (props) => {
  const {primaryColor, secondaryColor} = useColor();

  const [editing, setEditing] = useState(false);
  const [editNoteText, setEditNoteText] = useState("");

  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;

  const handleNotePress = () => {
    setEditing(!editing);
};

  if (editing == false) {
    return (
      <View
        style={[
          styles.notesPostMainView,
          { borderColor: primaryColor, height: windowHeight / 10, width: windowWidth - 20 },
        ]}
      >
        <TouchableOpacity
          style={styles.notesPostTextTouchable}
          onPress={handleNotePress}
        >
          <Text
            style={[styles.notesPostText, { color: primaryColor }]}
            numberOfLines={3}
          >
            {props.note}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.notesPostDeleteTouchable,
            { borderColor: primaryColor, backgroundColor: primaryColor },
          ]}
          onPress={() => props.handleDeletePress(props.note)}
        >
          <ElectroIcon
            name="close"
            size={40}
            color={secondaryColor}
            handlePress={() => props.handleDeletePress(props.note)}
          />
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View
        style={[
          styles.notesPostMainView,
          { borderColor: primaryColor, height: windowHeight / 8 },
        ]}
      >
        <TextInput
          style={[
            styles.notesPostTextTouchable,
            { color: primaryColor, padding: windowHeight * 0.01 },
          ]}
          onChangeText={(e) => setEditNoteText(e)}
          autoFocus={true}
          onBlur={() => {
            props.handleEditPress(props.note, editNoteText)
            setEditing(!editing)
        }}
          defaultValue={props.note}
        />
        <TouchableOpacity
          style={[
            styles.notesPostDeleteTouchable,
            { borderColor: primaryColor, backgroundColor: primaryColor },
          ]}
          onPress={() => {
            props.handleEditPress(props.note, editNoteText)
            setEditing(!editing)
          }}
        >
          <ElectroIcon
            name="pencil"
            size={40}
            color={secondaryColor}
            handlePress={() => {
                props.handleEditPress(props.note, editNoteText)
                setEditing(!editing)
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
};