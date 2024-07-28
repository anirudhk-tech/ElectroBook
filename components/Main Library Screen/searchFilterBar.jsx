// React
import { Dimensions, TextInput, View, Keyboard } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useSearchActive, useSearchValue } from "../../hooks/useSearch";
import { useEffect } from "react";

export const ElectroSearchFilterBar = () => {
    const windowHeight = Dimensions.get("window").height;
    const { primaryColor } = useColor();
    const { searchActive } = useSearchActive();
    const { searchValue, setSearchValue } = useSearchValue();

    const handleBlur = () => {
        try {
          textInputField.blur()
        } catch {
          return
        }
      };

    Keyboard.addListener(
    'keyboardDidHide', 
    handleBlur
    );

    if (searchActive) {
      return (
          <View style={[styles.searchFilterBarMainView, { height: windowHeight / 10 }]}>
              <Animatable.View 
              animation={"bounceIn"}
              useNativeDriver={true}
              style={[styles.searchFilterBarTextSearchView, { width: '100%', height: '100%'}]}>
                  <TextInput
                  style={[styles.searchFilterBarTextInput, { borderColor: primaryColor, color: primaryColor }]}
                  onChangeText={(e) => setSearchValue(e)}
                  autoFocus={searchActive}
                  autoCorrect={true}
                  defaultValue={searchValue}
                  ref={input => {textInputField = input}}
                  />
              </Animatable.View>
          </View>
      );
  };
};