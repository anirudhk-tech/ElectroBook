// React
import { Dimensions, View, FlatList } from "react-native";
import { useState, useEffect, useCallback } from "react";

// Expo
import { Stack } from "expo-router";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useFileFunctions } from "../../hooks/useFileFunctions";

// Components
import { ElectroNotesPost } from "../../components/Notes Screen/notesPost";
import { ElectroAddMenuBar } from "../../components/DropDown/dropDownMenuAddBar";

export default function notesDropDown() {
  const [primaryColor, secondaryColor] = useColor();
  const [notes, addNote] = useFileFunctions("note");
  const [flatListData, setFlatListData] = useState([]);
  const windowHeight = Dimensions.get("window").height;

  const handleAddNote = (note) => {
    addNote(note);
  };

  const insertAddBar = (array) => {
    array.push({
      item: <ElectroAddMenuBar onSubmit={handleAddNote} />,
      key: array.length + 1,
    });
  };

  useEffect(() => {
    const rawData = [];
    for (let x = 0; x < notes.length; x++) {
      rawData.push({
        item: <ElectroNotesPost note={notes[x]} />,
        key: x,
      });
    }
    insertAddBar(rawData);
    setFlatListData(rawData);
  }, [notes]);

  return (
    <View
      style={[styles.notesScreenMainView, { backgroundColor: secondaryColor }]}
    >
      <Stack.Screen
        options={{
          headerStyle: { backgroundColor: primaryColor },
          headerTitleAlign: "center",
          headerTitleStyle: [
            styles.headerTitleStyle,
            { color: secondaryColor },
          ],
          headerTitle: "Notes",
          headerShown: true,
          headerTintColor: secondaryColor,
        }}
      />
      <FlatList
        data={flatListData}
        style={{ height: windowHeight, width: "100%" }}
        contentContainerStyle={[
          styles.notesScreenFlatList,
          { height: windowHeight },
        ]}
        renderItem={({ item }) => item.item}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
