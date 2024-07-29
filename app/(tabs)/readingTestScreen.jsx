// React
import { View } from "react-native";
import { useState, useRef, useCallback } from "react";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroButton } from "../../components/General/button";
import { ElectroReadingTestPDF } from "../../components/Reading Screen/readingTestPdf";

// Node Modules
import * as Animatable from "react-native-animatable";

// Expo
import { router } from "expo-router";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useSpeed } from "../../hooks/useSpeed";
import { useCheckSetters } from "../../hooks/useCheckUser";

export default function readingTestScreen() {
  const { primaryColor, secondaryColor } = useColor();
  const { setSpeed } = useSpeed();
  const { setSettingsCheck } = useCheckSetters();
  const time = useRef(0);
  const interval = useRef();
  const [testBegin, setTestBegin] = useState(false);

  const increaseTime = () => {
    time.current += 1
  };

  const handleStartPress = () => {
    interval.current = setInterval(increaseTime, 1000);
    setTestBegin(true);
    setSettingsCheck(true);
  };

  const handleCancelPress = useCallback(() => {
    router.push("./libraryScreen");
    setSettingsCheck(true);
  }, []);

  const handleSinglePress = () => {
    clearInterval(interval.current);
    setSpeed((337/time.current) * 60);
    router.push("./libraryScreen");
  };

  if (testBegin == true) {
    return (
      <View style={{flex: 1}}>
        <ElectroReadingTestPDF
          handleSinglePress={handleSinglePress}
        />
      </View>
    );
  } else {
    return (
      <View
        style={[styles.readingTestScreenMainView, {backgroundColor: secondaryColor}]}
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
