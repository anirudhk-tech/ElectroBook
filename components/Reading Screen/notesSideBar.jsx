// React
import { View, Text } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Node Modules
import * as Animatable from "react-native-animatable";

// Components
import { ElectroIcon } from "../General/icon";
import { ElectroNotesSideBarNotes } from "./notesSideBarNotes";

// Hooks
import { useBookUpdate } from "../../hooks/useBookUpdate";
import { useColor } from "../../hooks/useTheme";
import { useBookName } from "../../hooks/useBookName";
import { useEditNotes, useEditRefresh } from "../../hooks/useEdit";
import { useOrientationSignal } from "../../hooks/useOrientation";
import { useEffect, useState } from "react";

export const ElectroNotesSideBar = (props) => {
  const { primaryColor, secondaryColor } = useColor();
  const { setEditRefreshNotes } = useEditRefresh();
  const { orientSignal } = useOrientationSignal();
  const { bookName } = useBookName();
  const { data } = useEditNotes();
  const [render, setRender] = useState(true);

  const handleNotesClose = () => {
    props.handleNotesClose();
    useBookUpdate("note", bookName, data);
    setEditRefreshNotes();
  };

  useEffect(() => {
    setTimeout(() => setRender(!render), 200);
  }, [orientSignal]);

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
              color={ primaryColor }
              handlePress={handleNotesClose}
              />
            </View>
            <ElectroNotesSideBarNotes/>
          </Animatable.View>
      );
    };
  };

