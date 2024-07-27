// React
import { Text } from 'react-native';

// Backend
import { styles } from '../../constants/stylers';

// Node Modules
import * as Animatable from "react-native-animatable";

// Hooks
import { useColor } from '../../hooks/useTheme';


export const ElectroUploadAlert = (props) => {
    const { primaryColor } = useColor();
    
    return (
        <Animatable.Text 
        animation={props.display == "none" ? "" : "tada"}
        useNativeDriver={true}
        style={[styles.uploadAlertText, {display: props.display, color: primaryColor}]}>{props.alert}</Animatable.Text>
    );
};