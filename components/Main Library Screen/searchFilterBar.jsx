// React
import { TextInput, View, Keyboard } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useSearchActive, useSearchValue } from "../../hooks/useSearch";

export const ElectroSearchFilterBar = () => {
    const { primaryColor } = useColor();
    const { searchActive, setSearchActive } = useSearchActive();
    const { searchValue, setSearchValue } = useSearchValue();

    const handleBlur = () => {
        try {
          textInputField.blur()
        } catch {
          return
        };
      };

    Keyboard.addListener(
    'keyboardDidHide', 
    handleBlur
    );

    if (searchActive) {
      return (
          <View style={styles.searchFilterBarMainView}>
              <Animatable.View 
              animation={"bounceIn"}
              useNativeDriver={true}
              style={styles.searchFilterBarTextSearchView}>
                  <TextInput
                  style={[styles.searchFilterBarTextInput, { borderColor: primaryColor, color: primaryColor }]}
                  onChangeText={(e) => setSearchValue(e)}
                  autoFocus={searchActive}
                  autoCorrect={true}
                  onBlur={() => {
                    handleBlur
                    if (searchValue == "") {
                      setSearchActive();
                    };
                  }}
                  defaultValue={searchValue}
                  ref={input => {textInputField = input}}
                  />
              </Animatable.View>
          </View>
      );
  };
};