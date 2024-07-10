// Node Modules
import Pdf from "react-native-pdf";
import MultiTap from "react-native-multitap";

// React
import { View } from "react-native";
import { useContext, useState} from "react";

// Backend
import { styles } from "../constants/stylers";
import { ThemeContext } from "../constants/context";


export const ElectroPdf = (props) => {
    const colorContext = useContext(ThemeContext);
    const secondaryColor = colorContext.secondaryColor;
    const colors = ['black', secondaryColor, 'white'];

    const [bgColor, setBgColor] = useState('white');

    const changeBgColor = () => {
        let colorPosition = colors.indexOf(bgColor);
        if (colorPosition == 2) {
            colorPosition = 0;
        } else {
            colorPosition += 1;
        };
        setBgColor(colors[colorPosition])
    };

    return (
        <MultiTap
            onSingleTap={() => {props.singleTap()}}
            onDoubleTap={() => {props.doubleTap()}}
            onTripleTap={() => {changeBgColor()}}
            delay={650}
            style={styles.fullScreen}>
            <View style={styles.electroPdfMainView}>
                <Pdf 
                    trustAllCerts={false}
                    enableDoubleTapZoom={false}
                    minScale={1.0}
                    scale={1.0}
                    maxScale={10.0}
                    source={props.readingTest ? require('../assets/ElectroPdf.pdf') : {uri: props.source}}
                    style={[styles.electroPdf, {backgroundColor: bgColor}]}/>
                
            </View>
        </MultiTap>
    );
};

