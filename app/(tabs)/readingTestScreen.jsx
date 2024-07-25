// React
import { View, Text } from "react-native";
import { useState } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroPdf } from "../../components/Reading Screen/pdf";
import { NotesSideBar } from "../../components/Reading Screen/notesSideBar";
import { ElectroButton } from "../../components/General/button";

// Node Modules
import * as Animatable from "react-native-animatable";

// Expo
import { router } from "expo-router";

// Hooks
import { useColor } from "../../hooks/useTheme";

export default function readingTestScreen() {
  const {primaryColor, secondaryColor} = useColor();
  const [testBegin, setTestBegin] = useState(false);
  const colors = ["black", secondaryColor, "white"];

  const handleStartPress = () => {
    setTestBegin(true);
  };

  const handleCancelPress = () => {
    router.push("./libraryScreen")
  };

  const handleSinglePress = () => {
    router.push("./libraryScreen");
  };

  if (testBegin == true) {
    return (
      <View style={{flex: 1}}>
        <ElectroPdf 
          readingTest={true}
          onSingleTap={handleSinglePress}/>
      </View>
    );
  } else {
    return (
      <View
        style={styles.readingTestScreenMainView}
      >
        <View style={styles.readingTestScreenTextView}>
          <Animatable.Text 
            animation={"fadeIn"}
            useNativeDriver={true}
            style={[styles.readingTestScreenTitle, {color: primaryColor}]}>Take the reading test to get approximate read times!</Animatable.Text>
          <Animatable.Text 
            animation={"fadeIn"}
            useNativeDriver={true}
            style={[styles.readingTestScreenText, {color: primaryColor}]}>You will be prompted to read a short paragraph in the next page</Animatable.Text>
          <Animatable.Text 
            animation={"fadeIn"}
            useNativeDriver={true}
            style={[styles.readingTestScreenText, {color: primaryColor}]}>Once you're done, your score will appear in the "Stats" screen.</Animatable.Text>
          <Animatable.Text 
            animation={"fadeIn"}
            useNativeDriver={true}
            style={[styles.readingTestScreenText, {color: primaryColor}]}>Tap the pdf once to end the test</Animatable.Text>
        </View>
        <Animatable.View
          animation={"bounceIn"}
          useNativeDriver={true}
          style={styles.readingTestScreenButtonView}
        >
          <ElectroButton
            text="Cancel"
            touchableStyles={[
              styles.readingTestScreenButton,
              { borderColor: primaryColor },
            ]}
            textStyles={[styles.buttonText, { color: primaryColor }]}
            action={handleCancelPress}
          />
          <ElectroButton
            text="Start"
            touchableStyles={[
              styles.readingTestScreenButton,
              { borderColor: primaryColor },
            ]}
            textStyles={[styles.buttonText, { color: primaryColor }]}
            action={handleStartPress}
          />
        </Animatable.View>
      </View>
    );
  }
}
