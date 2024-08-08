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
import { useCompletedCount } from "../../hooks/useCompleted";
import { useSpeed } from "../../hooks/useSpeed";

export default function statsScreen() {
  const { primaryColor, secondaryColor } = useColor();
  const { speed } = useSpeed();
  const [totalBooksCount, setTotalBooksCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [completedRatio, setCompletedRatio] = useState(0);
  
  useEffect(() => {
    useData("book").then(data => setTotalBooksCount(data.length));
    useCompletedCount().then(count => setCompletedCount(count));
  }, []);

  useEffect(() => {
    if (completedCount != undefined && totalBooksCount != undefined) {
      if (totalBooksCount != 0) {
        try {
          setCompletedRatio(completedCount/totalBooksCount);
        } catch {
          return
        };
      };
    };
  }, [completedCount]);

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
          {completedCount}
        </Text>
        <View style={styles.statsScreenProgressBarView}>
          <ElectroProgressBar bookRatio={completedRatio} />
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
          {totalBooksCount}
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
          {speed == undefined ? "N/A" : `${Math.round(speed)} WPM`}
        </Text>
      </View>
    </View>
  );
}
