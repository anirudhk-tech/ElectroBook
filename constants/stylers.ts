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
        flex: 0.8,
        width: '70%',
        justifyContent: 'flex-end',
        alignSelf: 'center',
        paddingBottom: 20,
    },

    alertIcon: {
        margin: '5%',
        width: '20%',
        aspectRatio: 1,
    },

    // Components - Pdf
    electroPdfMainView: {
        width: '100%',
        height: '100%',
    },

    electroPdf: {
        flex: 1,
        width: '100%',
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

    // Components - Progress Bar
    progressBarMainView: {
        height: '100%',
        width: '80%',
        borderRadius: 20,
        borderWidth: 2,
        alignItems: 'flex-start',
    },

    progressBarView: {
        height: '100%',
        borderRadius: 20,
    },

    // Components - Drop Down
        // Drop Down - Drop Down Bar and Drop Down Bar Add
        dropDownAddBarTouchable: {
            borderWidth: 2, 
            borderRadius: 15,
            marginLeft: '5%',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 30,
            fontWeight: 'bold',
            paddingHorizontal: 10,
            marginTop: '5%',
        },

        dropDownBarMainView: {
            alignItems: 'center',
            paddingHorizontal: '5%',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
        },

        dropDownBarSelectedCircle: {
            borderRadius: 1000,
            borderWidth: 2,
            height: '10%',
            flex: 0.1,
        },

        dropDownBarView: {
            height: '50%',
            borderRadius: 10,
            borderWidth: 2,
            flex: 9,
            flexDirection: 'row',
        }, 

        dropDownBarColorCode: {
            height: '100%',
            width: 30,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            borderWidth: 2,
        },

        dropDownBarText: {
            flex: 10,
            fontSize: 20,
            fontWeight: 'bold',
            textAlignVertical: 'center',
            textAlign: 'center',
        },

        // Drop Down
        dropDownMainView: {
            flex: 1,
            borderWidth: 2,
            borderRadius: 10,
            marginLeft: '5%',
            width: '90%',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 10,
            overflow: 'hidden',
            gap: 10
        },

        // Drop Down Multi Icons
        dropDownMultiIconsMainView: {
            flexDirection: 'row',
            alignSelf: 'flex-end',
            gap: 20
        },

        // Drop Down Menu Bar
        dropDownMenuBarColorCode: {
            height: '100%',
            flex: 0.8,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
            borderWidth: 2,
        },

        dropDownMenuBarDeleteTouchable: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            borderTopLeftRadius: 4,
            borderBottomLeftRadius: 4,
            borderWidth: 2,
        },
    
    // Components - Menu Tab
    menuTabTouchable: {
        borderRadius: 10, 
        borderWidth: 2,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    menuTabText: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    // Components - Notes Bar
    notesBarTouchable: {
        flex: 1/2,
        flexDirection: 'row',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    notesBarText: {
        fontSize: 30,
        fontWeight: 'bold',
        width: '28%',
        height: '100%',
        textAlignVertical: 'center',
        textAlign: 'center',
    },

    notesIcon: {
        height: '80%',
        width: '100%',
    },

    // Components - Prompt DropDown
    promptDropDownTextIconView: {
        flexDirection: 'row',
        marginLeft: '5%',
    },

    // Components - Color Code Bar
    colorCodeBarSubView: {
        flex: 0.3,
    },

    colorCodeBarTextCircleView: {
        flexDirection: 'row',
        marginLeft: '5%',
        gap: 5
    },

    colorCodeBarCircleView: {
        borderRadius: 1000,
        borderWidth: 2,
        flex: 1,
        marginRight: '5%',
    },

    // Components - Title Input
    titleInputInput: {
        borderRadius: 10,
        borderWidth: 2,
        width: '90%',
        flex: 1,
        textAlign: 'left',
        marginLeft: '5%',
        paddingHorizontal: '5%',
        fontSize: 20,
    },

    // Components - Selected Badge
    selectedBadgeText: {
        minWidth: '20%',
        maxWidth: '50%',
        height: '50%',
        borderRadius: 5,
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
    },

    // Components - Notes Pad
    notesPostMainView: {
        width: '90%',
        borderWidth: 2,
        borderRadius: 5,
        flexDirection: 'row',
        alignSelf: 'center'
    },
    
    notesPostTextTouchable: {
        flex: 8,
        textAlignVertical: 'top',
        fontSize: 20,
        fontWeight: 'bold',
    },

    notesPostText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlignVertical: 'top',
        padding: '5%',
    },

    notesPostDeleteTouchable: {
        flex: 2,
        borderTopLeftRadius: 1,
        borderTopRightRadius: 5,
        borderBottomLeftRadius: 1,
        borderBottomRightRadius: 5,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },

    notesPostTextInput: {
        flex: 8,
        fontWeight: 'bold',
        fontSize: 20,
    },

    // Components - Library Header
    libraryHeaderMainView: {
        flexDirection: 'row',
        width: 50,
        height: 50,
        alignSelf: 'flex-end',
        marginHorizontal: '10%',
        marginTop: '3%',
        gap: 10
    },

    // DropDown Screen
    dropDownScreenMainView: {
        height: '100%'
    },

    dropDownScreenFlatList: {
        justifyContent: 'flex-start',
    },

    // Notes Screen
    notesScreenMainView: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
    },

    notesScreenFlatList: {
        width: '100%', 
        alignItems: 'center', 
        gap: 20, 
        paddingTop: 20
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

    libraryMenuIcon: {
        marginRight: '5%',
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
    },

    // Stats Screen
    statsScreenMainView: {
        flex: 1,
    },

    statsScreenSubView: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        paddingLeft: '5%',
        marginTop: '10%'
    },

    statsScreenTitle: {
        fontSize: 30,
        minWidth: '10%',
    },

    statsScreenText: {
        fontSize: 40,
        flex: 1,
        marginTop: '-10%',
        marginLeft: '5%',
        fontWeight: 'bold',
        textAlignVertical: 'top',
    },

    statsScreenTitleContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        marginBottom: '10%',
        gap: 20
    },

    statsScreenDivider: {
        height: 1,
        borderWidth: 1,
        minWidth: '100%',
    },

    statsScreenProgressBarView: {
        flex: 0.4,
        width: '90%',
        marginLeft: '5%',
        justifyContent: 'flex-end',
    },

    // Upload Screen
    uploadScreenMainView: {
        paddingVertical: 20,
    },

    uploadScreenSubView: {
        flex: 1,
    },

    uploadScreenAdvancedTouchable: {
        flex: 1,
    },

    uploadScreenAdvancedDividerView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },

    uploadScreenTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        flex: 1,
        textAlignVertical: 'center',
        paddingLeft: '5%',
    },

    uploadScreenAdvancedDivider: {
        height: 1,
        borderWidth: 1,
        flex: 1
    },

    uploadScreenAdvancedText: {
        fontSize: 30,
        fontWeight: 'bold',
        flex: 2,
        textAlign: 'center',
        textAlignVertical: 'bottom',
    },

    uploadScreenAdvancedView: {
        flex: 19,
        gap: 40,
    },

    uploadScreenGeneralView: {
        flex: 1,
        gap: 40,
    },

    uploadScreenTitleInput: {
        flex: 1,
        borderWidth: 2,
        borderRadius: 10,
        marginLeft: '5%',
        width: '90%',
        paddingHorizontal: '5%',
        fontSize: 30,
        fontWeight: 'bold',
    },

    // Menu Screen
    menuScreenMainView: {
        flex: 1,
        paddingVertical: 50,
        alignItems: 'center',
    },

    menuScreenTabView: {
        gap: 50,
    },

    // Color Picker Screen
    colorPickerScreenMainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '10%'
    },

    colorPicker: {
        height: '60%',
        width: '90%',
    },

    colorPickerTouchable: {
        aspectRatio: 2,
        width: '50%',
        borderRadius: 50,
        borderWidth: 2,
        justifyContent: 'center',
    }

})