// Backend
import { styles } from "../constants/stylers";
import { ThemeContext } from "../constants/context";

// React
import { View, Text } from "react-native";
import { useContext } from "react";

// Components
import { ElectroDrop } from "./DropDown/dropDown";
import { ElectroIcon } from "./icon";


export const ElectroPromptDropdown = (props) => {
    const colorContext = useContext(ThemeContext);
    const primaryColor = colorContext.primaryColor;

    return (
        <View style={styles.uploadScreenSubView}>
            <View style={styles.promptDropDownTextIconView}>
                <ElectroIcon
                    name={props.icon}
                    size={40}
                    color={primaryColor}
                    handlePress={() => {}}
                />
                <Text style={[styles.uploadScreenTitle, {color: primaryColor}]}>{props.options[0]}</Text>
            </View>
            <ElectroDrop options={props.options}/>
        </View>
    );
};