// React
import { View, Text } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Node Modules
import * as Animatable from "react-native-animatable";

// Components
import { ElectroIcon } from "../General/icon";
import { ElectroButton } from "../General/button";
import { ElectroPageInputButton } from "./settingsSideBarPageInput";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { usePdf } from "../../hooks/usePdf";

export const ElectroSettingsSideBar = (props) => {
  const {primaryColor, secondaryColor} = useColor();
  const { setHeadToPage, setSinglePage } = usePdf();

  const handleSettingsClose = () => {
    props.handleSettingsClose();
  };

  const handleBgColor = () => {
    props.handleColorPress();
  };

  const handleSinglePage = () => {
    props.handleSinglePage();
    setSinglePage(true);
  };

  // Main styles the same as notes side bar

    if (props.visible == true) {
      return (
          <Animatable.View
            animation={"slideInRight"}
            useNativeDriver={true}
            style={[styles.notesSideBarView, { backgroundColor: secondaryColor, alignItems: 'center', flex: 1}]}
          >
            <View style={[styles.notesSideBarTitleView, {flex: 1}]}>
              <Text style={[styles.notesSideBarTitleText, { color: primaryColor }]}>Settings</Text>
              <ElectroIcon 
              name="close"
              size={30}
              color={primaryColor}
              handlePress={handleSettingsClose}
              />
            </View>
            <Animatable.View 
                animation={"bounceIn"}
                delay={500}
                useNativeDriver={true}
                style={styles.settingsSideBarButtonView}
            >
                <ElectroButton
                    text="Background Color"
                    touchableStyles={[styles.settingsSideBarButton, { borderColor: primaryColor }]}
                    textStyles={[styles.buttonText, { color: primaryColor }]}
                    action={handleBgColor}
                />
                <ElectroButton
                    text="Single Page"
                    touchableStyles={[styles.settingsSideBarButton, { borderColor: primaryColor }]}
                    textStyles={[styles.buttonText, { color: primaryColor }]}
                    action={handleSinglePage}
                />
                <ElectroPageInputButton
                    handleHeadToPage={handleSettingsClose}
                />
            </Animatable.View>
          </Animatable.View>
      );
    };
  };

