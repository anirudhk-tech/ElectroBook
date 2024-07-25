// React
import { Dimensions } from "react-native";

// Node Modules
import * as Animatable from 'react-native-animatable';

// Hooks
import { useColor } from "../../hooks/useTheme";

export const ElectroReadingHeader = (props) => {
    const { primaryColor, secondaryColor } = useColor();
    const screenHeight = Dimensions.get("screen").height;
    const screenWidth = Dimensions.get("screen").width;

    return (
        <Animatable.View 
        animation={props.headerVisible ? "slideInDown" : "slideOutUp"}
        delay={1000}
        style={[{backgroundColor: primaryColor, width: screenWidth, height: screenHeight/12}]}>

        </Animatable.View>
    );
};