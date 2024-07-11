// React
import { View, Text, TouchableOpacity } from "react-native";
import { useState, useContext } from "react";

// Backend
import { styles } from "../constants/stylers";
import { ThemeContext } from "../constants/context";

// Components
import { ElectroIcon } from "./icon";

export const ElectroColorCodeBar = (props) => {
    const colorContext = useContext(ThemeContext);
    const primaryColor = colorContext.primaryColor;


    return (
        <TouchableOpacity style={styles.colorCodeBarSubView} onPress={() => props.handlePress()}>
            <View style={styles.colorCodeBarTextCircleView}>
                <ElectroIcon
                    name="color-palette-outline"
                    size={40}
                    color={primaryColor}
                />
                <Text style={[styles.uploadScreenTitle, {color: primaryColor}]}>Color Code</Text>
                <View style={[styles.colorCodeBarCircleView, {borderColor: 'green', backgroundColor: 'green'}]}></View>
            </View>
        </TouchableOpacity>
    )
};