// React
import { View, Text } from 'react-native';

// Node Modules
import MultiTap from 'react-native-multitap';

// Backend
import { styles } from '../constants/stylers';

// Hooks
import { useColor } from '../hooks/useTheme';


export const NotesSideBar = (props) => {
    const [primaryColor, secondaryColor] = useColor();

    if (props.visible == true) {
        return (
            <MultiTap
                onTripleTap={() => props.tripleTap()}
                onDoubleTap={() => props.doubleTap()}
                onSingleTap={() => props.singleTap()}
                delay={650}
                style={styles.notesSideBarMainViewMultiTap}>
                <View style={[styles.notesSideBarView, {backgroundColor: secondaryColor}]}>
                    <Text style={[styles.notesSideBarTitleText, {color: primaryColor}]}>Notes</Text>
                </View>
            </MultiTap>
        );
    };
}; 