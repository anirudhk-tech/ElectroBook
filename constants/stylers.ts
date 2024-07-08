// React
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    // General Components
    invisible: {
        opacity: 0,
        display: 'none',
    },

    tabBarStyle: {
        borderTopWidth: 0
    },

    headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 20,
    },

    buttonText: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: 'bold',
    },

    // Components - Alert
    alertView: {
        borderRadius: 10,
        borderWidth: 2,
        position: 'absolute',
        width: '70%',
        height: '60%',
        gap: 20,
        marginTop: '25%',
        flex: 1
    },

    alertTitleImageView: {
        flexDirection: 'row',
        flex: 1
    },

    alertTitleText: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        marginLeft: '5%',
        flex: 1,
        width: '80%'
    },

    alertTitleTextNoMessage: {
        fontSize: 30,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
    },

    alertMessageText: {
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center',
        flex: 1
    },

    alertElectroZap: {
        width: '20%',
        height: '50%',
        marginTop: '2%'
    },

    alertButtonView: {
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        alignItems: 'center',
        flex: 2,
        gap: 15,
        paddingHorizontal: 10
    },

    alertScreenTouchable: {
        borderRadius: 50,
        borderWidth: 3,
        flex: 1,
        height: '30%',
        justifyContent: 'center',
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
        flex: 2,
    },

    registerScreenInputView: {
        flex: 1,
        width: '100%',
        gap: 10,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    registerScreenInputPrompt: {
        fontSize: 25,
        fontWeight: 'bold',
    },

    registerScreenInput: {
        borderRadius: 10,
        borderWidth: 3,
        width: '70%',
        height: '35%',
        textAlign: 'center',
    },

    registerScreenTouchable: {
        borderRadius: 50,
        borderWidth: 3,
        width: '40%',
        height: '30%',
        justifyContent: 'center', 
    },

    registerScreenButtonContainer: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },

    // Settings Screen
    settingsScreenMainView: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        flex: 1,
    },

    settingsScreenTouchable: {
        borderRadius: 50,
        borderWidth: 3,
        width: '70%',
        height: '30%',
        justifyContent: 'center',
    },

    settingsScreenButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },

    // Library Screen
    libraryScreenMainView: {
        width: '100%',
        height: '100%',
        flex: 1,
    }

})