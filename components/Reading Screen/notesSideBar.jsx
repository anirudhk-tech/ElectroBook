// React
import { View, Text } from "react-native";
import { useCallback } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Node Modules
import * as Animatable from "react-native-animatable";

// Components
import { ElectroIcon } from "../General/icon";
import { ElectroNotesSideBarNotes } from "./notesSideBarNotes";

// Hooks
import { useColor } from "../../hooks/useTheme";

export const ElectroNotesSideBar = (props) => {
  const {primaryColor, secondaryColor} = useColor();

  const handleNotesClose = () => {
    props.handleNotesClose();
  };

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
            <ElectroNotesSideBarNotes visible={props.visible}/>
          </Animatable.View>
      );
    };
  };

