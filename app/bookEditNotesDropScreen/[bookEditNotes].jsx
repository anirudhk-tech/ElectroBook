// React
import { Dimensions, View, FlatList } from "react-native";
import { useState, useEffect } from "react";

// Expo
import { Stack, useLocalSearchParams } from "expo-router";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroBookNotesPost } from "../../components/Book Screen/bookNotesPost";
import { ElectroAddMenuBar } from "../../components/DropDown/dropDownMenuAddBar";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useEditRefresh } from "../../hooks/useEdit";
import { useBookInfo } from "../../hooks/useBookInfo";
import { useBookUpdate } from "../../hooks/useBookUpdate";

export default function notesDropDown() {
  const { bookEditNotes } = useLocalSearchParams();  
  const {primaryColor, secondaryColor} = useColor();
  const {setEditRefresh} = useEditRefresh();

  const [flatListData, setFlatListData] = useState([]);
  const [bookInfo, setBookInfo] = useState([]);
  const [notes, setNotes] = useState([]);
  const windowHeight = Dimensions.get("window").height;

  const notesSplit = () => {
    const notes = bookInfo.notes.split(",");
    setNotes(notes);
  };

  const handleDeletePress = (note) => {
    setNotes(notes.filter(x => x != note));
    setEditRefresh();
  };
  
  const handleEditPress = (oldNote, newNote) => {
    const newNotes = notes;
    const index = notes.indexOf(oldNote);
    newNotes[index] = newNote;
    setNotes([...newNotes]);
    setEditRefresh();
  };

  const handleAddNote = (note) => {
    setNotes([...notes, note]);
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
      if (notes[x] != "") {
        rawData.push({
          item: <ElectroBookNotesPost 
                  note={notes[x]} 
                  handleDeletePress={handleDeletePress}
                  handleEditPress={handleEditPress}/>,
          key: x,
        });
      };
    };

    insertAddBar(rawData);
    setFlatListData(rawData);

    if (notes.length != 0) {
      useBookUpdate("note", bookEditNotes, notes);
      setEditRefresh();
    };
  }, [notes]);

  useEffect(() => {
    useBookInfo(bookEditNotes).then(data => setBookInfo(data));
  }, []);

  useEffect(() => {
    if (bookInfo.notes != undefined || bookInfo.notes != null) {
        notesSplit();
    };
  }, [bookInfo]);

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
          headerTitle: "Edit Notes",
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
};