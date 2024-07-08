// React
import { View, Text, Image } from 'react-native';
import { useCallback, useContext } from 'react';

// Backend
import { styles } from '../constants/stylers';
import { ThemeContext } from '../constants/context';
import { ElectroButton } from './button';

export const ElectroAlert = (props) => {
    const colorContext = useContext(ThemeContext);
    const [primaryColor, secondaryColor] = [colorContext.primaryColor, colorContext.secondaryColor];


    if (props.message) { 
        return(
            <View style={[styles.alertView, {backgroundColor: secondaryColor, justifyContent: 'flex-start', display: props.display, borderColor: primaryColor}]}>
                <View style={styles.alertTitleImageView}>
                    <Text style={[styles.alertTitleText, {color: primaryColor}]}>{props.title ? props.title : null}</Text>
                    <Image style={styles.alertElectroZap} source={require("../assets/images/electroZap.png")}/>
                </View>
                {
                    props.message.map((msg) => {
                        return (
                            <Text style={[styles.alertMessageText, {color: primaryColor}]} key={props.message.indexOf(msg)}>{msg}</Text>
                        )})
                }
                <View style={styles.alertButtonView}>
                    <ElectroButton
                        text={props.negativeButton}
                        touchableStyles={[styles.alertScreenTouchable, {borderColor: primaryColor}]}
                        textStyles={[styles.buttonText, {color: primaryColor}]}
                        action={props.negativePress}
                    />
                    <ElectroButton
                        text={props.positiveButton}
                        touchableStyles={[styles.alertScreenTouchable, {borderColor: primaryColor}]}
                        textStyles={[styles.buttonText, {color: primaryColor}]}
                        action={props.positivePress}
                    />
                </View>
            </View>
        );
    } else {
        return(
            <View style={[styles.alertView, {backgroundColor: secondaryColor, justifyContent: 'center', display: props.display, borderColor: primaryColor}]}>
                <Text style={[styles.alertTitleTextNoMessage, {color: primaryColor}]}>{props.title ? props.title : null}</Text>                
            </View>
        );
    };
};