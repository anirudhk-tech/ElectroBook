// React
import { View, Text } from "react-native";
import { useEffect, useState } from "react";

// Expo
import { Stack } from "expo-router";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroProgressBar } from "../../components/Stats Screen/progressBar";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useData } from "../../hooks/useData";

export default function statsScreen() {
  const {primaryColor, secondaryColor} = useColor();
  const [totalBooks, setTotalBooks] = useState([]);
  const [totalBooksLabel, setTotalBooksLabel] = useState("");
  
  useEffect(() => {
    useData("book").then(data => setTotalBooks(data));
  }, []);

  useEffect(() => {
    if (totalBooks.length == 1) {
      setTotalBooksLabel("Book");
    } else {
      setTotalBooksLabel("Books");
    };
  }, [totalBooks])

  return (
    <View
      style={[styles.statsScreenMainView, { backgroundColor: secondaryColor }]}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: primaryColor },
          headerTitleStyle: [
            styles.headerTitleStyle,
            { color: secondaryColor },
          ],
          headerTitle: "Stats",
          headerShown: true,
        }}
      />
      <View style={styles.statsScreenSubView}>
        <Animatable.View 
        animation={"slideInRight"}
        useNativeDriver={true}
        style={styles.statsScreenTitleContainer}>
          <Text style={[styles.statsScreenTitle, { color: primaryColor }]}>
            Completed
          </Text>
          <View
            style={[styles.statsScreenDivider, { borderColor: primaryColor }]}
          ></View>
        </Animatable.View>
        <Text style={[styles.statsScreenText, { color: primaryColor }]}>
          10 Books
        </Text>
        <View style={styles.statsScreenProgressBarView}>
          <ElectroProgressBar bookRatio={1 / 2} />
        </View>
      </View>
      <View style={styles.statsScreenSubView}>
        <Animatable.View 
        animation={"slideInRight"}
        useNativeDriver={true}
        style={styles.statsScreenTitleContainer}>
          <Text style={[styles.statsScreenTitle, { color: primaryColor }]}>
            Books
          </Text>
          <View
            style={[styles.statsScreenDivider, { borderColor: primaryColor }]}
          ></View>
        </Animatable.View>
        <Text style={[styles.statsScreenText, { color: primaryColor }]}>
          {totalBooks.length} {totalBooksLabel}
        </Text>
      </View>
      <View style={styles.statsScreenSubView}>
        <Animatable.View 
        animation={"slideInRight"}
        useNativeDriver={true}
        style={styles.statsScreenTitleContainer}>
          <Text style={[styles.statsScreenTitle, { color: primaryColor }]}>
            Speed
          </Text>
          <View
            style={[styles.statsScreenDivider, { borderColor: primaryColor }]}
          ></View>
        </Animatable.View>
        <Text style={[styles.statsScreenText, { color: primaryColor }]}>
          25 WPM
        </Text>
      </View>
    </View>
  );
}
