// React
import { View, Text, TouchableOpacity, Dimensions } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Expo
import { router } from "expo-router";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useEditData, useEditRefresh, useEditType } from "../../hooks/useEdit";
import { useBookUpdate } from "../../hooks/useBookUpdate";
import { useBookName } from "../../hooks/useBookName";

export const ElectroEditDropBar = (props) => {
  const { primaryColor } = useColor();
  const { data, setData } = useEditData();
  const { 
    setEditRefreshLibrary,
    setEditRefreshGenres,
    setEditRefreshTropes,
    setEditRefreshAuthor,
    setEditRefreshSeries,
  } = useEditRefresh();
  const {type, setType} = useEditType();
  const { bookName } = useBookName();

  const windowHeight = Dimensions.get("window").height;
  const multi = ["genre", "trope"];
  
  const refresh = () => {
    if (type == "library") {
      setEditRefreshLibrary();
    } else if (type == "genre") {
      setEditRefreshGenres();
    } else if (type == "trope") {
      setEditRefreshTropes();
    } else if (type == "series") {
      setEditRefreshSeries();
    } else if (type == "author") {
      setEditRefreshAuthor();
    };
  };

  const handlePress = () => {
    if (multi.includes(type)) {
      if (data.includes(props.option)) {
        setData(data.filter(x => x != props.option));
      } else {
        setData([...data, props.option]);
      };
    } else {
      useBookUpdate(type, bookName, props.option)
      refresh();
      setType(null);
      router.dismiss();
    };
  };

  return (
    <TouchableOpacity
      style={[styles.dropDownBarMainView, { height: windowHeight / 10 }]}
      onPress={() => {
        handlePress();
      }}
    >
      <View
        style={[
          styles.dropDownBarSelectedCircle,
          {
            borderColor: primaryColor,
            display: data.includes(props.option) ? multi.includes(type) ? "flex" : "none" : "none",
            backgroundColor: primaryColor,
          },
        ]}
      ></View>
      <Animatable.View 
        animation={"bounceIn"}
        useNativeDriver={true}
        style={[styles.dropDownBarView, { borderColor: primaryColor }]}>
        <Text 
          style={[styles.dropDownBarText, { color: primaryColor }]}
          numberOfLines={1}
        >
          {props.option}
        </Text>
        <View
          style={[styles.dropDownBarColorCode, { backgroundColor: props.color, borderColor: primaryColor, display: props.color == undefined || props.color == "" ? "none" : "flex" }]}
        ></View>
      </Animatable.View>
    </TouchableOpacity>
  );
};
