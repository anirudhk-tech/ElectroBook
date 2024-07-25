// React
import { Dimensions, View, FlatList } from "react-native";
import { useState, useEffect, useMemo } from "react";

// Expo
import { Stack, useLocalSearchParams } from "expo-router";

// Backend
import { styles } from "../../constants/stylers";

// Components
import { ElectroBookNotesPost } from "../../components/Book Screen/bookNotesPost";
import { ElectroAddMenuBar } from "../../components/DropDown/dropDownMenuAddBar";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useEditNotes, useEditRefresh } from "../../hooks/useEdit";
import { useBookInfo } from "../../hooks/useBookInfo";
import { useBookUpdate } from "../../hooks/useBookUpdate";

export default function notesDropDown() {
  const { bookEditNotes } = useLocalSearchParams();  
  const {primaryColor, secondaryColor} = useColor();
  const {setEditRefresh} = useEditRefresh();

  const [flatListData, setFlatListData] = useState([]);
  const [bookInfo, setBookInfo] = useState([]);
  const {data, setData} = useEditNotes();
  const windowHeight = Dimensions.get("window").height;

  const notesSplit = () => {
    const notes = bookInfo.notes.split(",");
    setData(notes);
  };

  const handleDeletePress = (note) => {
    setData(data.filter(x => x != note));
  };
  
  const handleEditPress = (oldNote, newNote) => {
    const newNotes = data;
    const index = data.indexOf(oldNote);
    newNotes[index] = newNote;
    setData([...newNotes]);  
  };

  const handleAddNote = (note) => {
    const editedNote = note.replaceAll('"', "'").replaceAll(",", ";");
    if (data.includes(editedNote) != true) {
      setData([...data, editedNote]);
    } else if (data == null) {
      setData([editedNote]);
    };
  };

  const insertAddBar = (array) => {
    array.push({
      item: <ElectroAddMenuBar onSubmit={handleAddNote} />,
      key: array.length + 1,
    });
  };

  const dataCreation = (data) => {
    if (data != null) {
      const dataOrganize = [];
      for (let x = 0; x < data.length; x++) {
        if (data[x] != "") {
          dataOrganize.push({
            item: <ElectroBookNotesPost 
                    note={data[x]} 
                    handleDeletePress={handleDeletePress}
                    handleEditPress={handleEditPress}/>,
            key: x,
          });
        };
      };
  
      insertAddBar(dataOrganize);
      return dataOrganize; 
    };
  };

  const dataOrganize = useMemo(
    () => dataCreation(data), 
    [data]
  );

  useEffect(() => {
    if (data != undefined) {
      setFlatListData(dataOrganize);
      useBookUpdate("note", bookEditNotes, data);
    };
  }, [data]);

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
          { height: flatListData.length * 500 },
        ]}
        renderItem={({ item }) => item.item}
        keyExtractor={(item) => item.key}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
      />
    </View>
  );
};