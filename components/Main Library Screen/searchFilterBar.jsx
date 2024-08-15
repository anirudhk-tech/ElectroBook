// React
import { TextInput, View, Keyboard } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useColor } from "../../hooks/useTheme";
import { useSearchActive, useSearchValue, useBookSearchActive } from "../../hooks/useSearch";

export const ElectroSearchFilterBar = (props) => {
    const { primaryColor } = useColor();
    const { searchActive, setSearchActive } = useSearchActive();
    const { searchValue, setSearchValue, bookSearchValue, setBookSearchValue } = useSearchValue();
    const bookSearchActive = useBookSearchActive().searchActive;
    const setBookSearchActive = useBookSearchActive().setSearchActive;

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

    const handleChange = (e) => {
      if (props.books) {
        setBookSearchValue(e);
      } else {
        setSearchValue(e);
      };
    };


    if (searchActive || bookSearchActive) {

      return (
          <View style={styles.searchFilterBarMainView}>
              <Animatable.View 
              animation={"bounceIn"}
              useNativeDriver={true}
              style={styles.searchFilterBarTextSearchView}>
                  <TextInput
                  style={[styles.searchFilterBarTextInput, { borderColor: primaryColor, color: primaryColor }]}
                  onChangeText={handleChange}
                  autoFocus={searchActive || bookSearchActive}
                  autoCorrect={true}
                  onBlur={() => {
                    handleBlur();
                    if (searchValue == "") {
                      setSearchActive(false);
                    };
                    if (bookSearchValue == "") {
                      setBookSearchActive(false);
                    };
                  }}
                  defaultValue={searchActive ? searchValue : bookSearchValue}
                  ref={input => {textInputField = input}}
                  />
              </Animatable.View>
          </View>
      );
  };
};