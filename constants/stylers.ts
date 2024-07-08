// React
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    // General Components
    invisible: {
        opacity: 0,
        display: 'none',
    },

    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
    },


    // Starting Screen
    startingScreenMainView: {
        width: '100%',
        height: '100%',
        justifyContent: 'center', 
        alignItems: 'center',
    },

    startingScreenLogo: {
        height: '50%',
        width: '70%',
    },

    // Register Screen
    registerScreenMainView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flex: 1
    },

    registerScreenLogo: {
        width: '100%',
        resizeMode: 'contain',
        flex: 1,
    },

    registerScreenInputView: {
        flex: 2,
        width: '100%',
        alignItems: 'center',
        borderColor: 'blue',
        borderWidth: 1
    },

    registerScreenInputPrompt: {

    },

    registerScreenInput: {

    },
})