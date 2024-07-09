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

    fullScreen: {
        flex: 1,
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
        flex: 1,
        alignSelf: 'center',
        paddingHorizontal: 5,
    },

    alertTitleImageView: {
        flexDirection: 'row',
        flex: 1
    },

    alertTitleText: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        flex: 1,
        width: '80%'
    },

    alertTitleTextNoMessage: {
        fontSize: 30,
        fontWeight: 'bold',
        width: '100%',
        textAlign: 'center',
        flex: 1,
        marginTop: '10%'
    },

    alertMessageText: {
        fontSize: 20,
        textAlign: 'center',
        alignSelf: 'center',
        maxHeight: 1000
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

    alertScreenSingleButtonView: {
        flex: 0.2,
        width: '70%',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        paddingBottom: 20,
    },

    // Components - ElectroPdf
    electroPdfMainView: {
        width: '100%',
        height: '100%',
    },

    electroPdf: {
        flex: 1,
        width: '100%'
    },

    // Components - Notes Side Bar
    notesSideBarMainViewMultiTap: {
        position: 'absolute',
        marginLeft: '20%',
        width: '80%',
        height: '100%'
    },

    notesSideBarView: {
        width: '100%',
        height: '100%',
        alignItems: 'flex-start',
        paddingHorizontal: 30,
        paddingTop: 20,
    },

    notesSideBarTitleText: {
        fontSize: 25,
        fontWeight: 'bold',
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
    },

    // Reading Test Screen
    readingScreenAlertView: {
        width: '100%',
        height: '100%',
    },

    readingScreenMainView: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
    }

})