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

    notesSideBarView: {
        width: '80%',
        height: '100%',
        marginLeft: '20%',
        position: 'absolute',
        alignItems: 'flex-start',
        paddingTop: 20,
        gap: 30,
    },

    notesSideBarTitleView: {
        gap: 150,
        flexDirection: 'row',
        alignItems: 'center',
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

    // Components - Reading Progress Bar
    readingProgressBarMainView: {
        marginTop: '10%',
        width: '80%', 
        height: "5%", 
        alignItems: 'center'
    },
    
    readingProgressBarText: {
        fontSize: 15,
        fontWeight: 'bold',
    },

    readingProgressBarView: {
        height: '50%',
        width: '80%',
        borderRadius: 20,
        borderWidth: 2,
        alignItems: 'flex-start',
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
            alignSelf: 'center',
        },

        dropDownBarMainView: {
            alignItems: 'center',
            paddingHorizontal: '5%',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
            alignSelf: 'center',
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
            paddingHorizontal: 10,
            justifyContent: 'flex-end'
        }, 

        dropDownBarColorCode: {
            height: '100%',
            width: 30,
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderTopWidth: 0,
            borderBottomWidth: 0,
        },

        dropDownBarText: {
            flex: 9,
            fontSize: 20,
            fontWeight: 'bold',
            textAlignVertical: 'center',
            paddingHorizontal: 10
        },

        dropDownBarMenuTextTouchable: {
            flex: 10,
            flexDirection: 'row',
            gap: 5,
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
            gap: 10,
        },

        // Drop Down Multi Icons
        dropDownMultiIconsMainView: {
            flexDirection: 'row',
            alignSelf: 'flex-end',
            gap: 20,
        },

        // Drop Down Menu Bar
        dropDownMenuBarColorCode: {
            height: '100%',
            flex: 0.8,
            borderTopWidth: 0,
            borderBottomWidth: 0,
            borderLeftWidth: 0,
            borderTopRightRadius: 4,
            borderBottomRightRadius: 4,
            borderBottomLeftRadius: 7,
            borderTopLeftRadius: 7,
            borderRightWidth: 2,
        },

        dropDownMenuBarDeleteTouchable: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            borderTopRightRadius: 5,
            borderBottomRightRadius: 5,
            borderTopLeftRadius: 1,
            borderBottomLeftRadius: 1,
            borderRightWidth: 1
        },

        // Drop Down Menu Text Bar 
        dropDownMenuTextEditIconTouchable: {
            alignItems: 'center',
            justifyContent: 'center',
            flex: 2,
            borderTopRightRadius: 1,
            borderBottomRightRadius: 1,
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

    // Components - Image Bar  --> NotesBarTouchable used for ImageBarTouchable
    imageBarText: {
        fontSize: 30,
        fontWeight: 'bold',
        width: 'auto',
        height: '100%',
        textAlignVertical: 'center',
        textAlign: 'left',
        paddingLeft: '2%'
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
        padding: 5
    },

    // Components - Notes Pad
    notesPostMainView: {
        width: '90%',
        borderWidth: 2,
        borderRadius: 5,
        flexDirection: 'row',
        alignSelf: 'center',
        minHeight: 30,
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
        borderRadius: 1,
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
        width: '35%',
        height: '50%',
        alignSelf: 'flex-end',
        justifyContent: 'center',
        gap: 20,
    },

    // Components - Library Scroll
        // Library Scroll
            libraryScrollFlatListMainView: {
                alignItems: 'center',
                alignSelf: 'center', 
                paddingHorizontal: 30,
                gap: 40
            },
        // Library Card
            libraryCardRowMainTouchable: {
                borderWidth: 3,
                borderRadius: 20,
                aspectRatio: 1/2,
            },

            libraryCardRowText: {
                flex: 3,
                textAlign: 'center',
                textAlignVertical: 'center',
                fontSize: 40,
                fontWeight: 'bold',
            },

            libraryCardRowHeaderView: {
                flexDirection: 'row',
                flex: 0.5,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                padding: 10,
                justifyContent: 'space-between',
                alignItems: 'flex-start',
            },

            libraryCardBookCountText: {
                fontSize: 30,
                fontWeight: 'bold',
                textAlign: 'center',
            },

    // Components - Books Scroll
        // Book Card
        bookCardRowPageText: {
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
        },

        bookCardRowText: {
            flex: 2,
            textAlign: 'center',
            textAlignVertical: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            borderBottomRightRadius: 20,
            borderBottomLeftRadius: 20,
            padding: 3
        },

        bookCardRowHeaderView: {
            flexDirection: 'row',
            flex: 1,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 10,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
    
    // Components - Author Library Page Box
    authorLibraryPageBoxMainView: {
        gap: 5,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        marginLeft: '10%',
        marginBottom: '10%',
    },

    authorLibraryPageBoxSubView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 5,
    },

    authorLibraryPageBoxDetailsView: {
        flexDirection: 'row', 
        gap: 5, 
        alignItems: 'center',
        width: '100%',
    },

    authorLibraryPageBoxPrompt: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlignVertical: 'center',
    },

    authorLibraryPageBoxText: {
        fontWeight: 'bold',
        fontSize: 20,
        borderRadius: 4,
        padding: 5,
        textAlignVertical: 'center',
    },

    // Components - Genres List
    booksScreenListMainView: {
        height: 'auto',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        rowGap: 10,
        marginBottom: '10%'
    },


    // Components - List Badge
    booksScreenListBadgeMainView: {
        height: 'auto',
        width: 'auto',
        flexDirection: 'row',
        alignItems: 'center',
    },

    booksScreenListBadgeText: {
        fontSize: 15,
        fontWeight: 'bold',
        width: 'auto',
        height: 'auto',
        padding: 5,
        borderRadius: 4,
    },

    booksScreenListBadgeLine: {
        height: 1,
        width: 20,
        borderWidth: 1,
    },

    // Components - Notes List
    booksScreenNotesList: {
        height: 'auto',
        justifyContent: 'space-around',
    },

    booksScreenNotesListLine: {
        height: 1,
        borderWidth: 1,
    },

    booksScreenNotesListText: {
        fontSize: 30, 
        fontWeight: 'bold'
    },

    // Components - Read Button
    booksScreenReadButton: {
        width: 'auto',
        height: 'auto',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        borderWidth: 2,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'flex-end'
    },

    // Components - Upload Alert
    uploadAlertText: {
        fontSize: 20,
        fontWeight: 'bold',
        height: 'auto',
        width: 'auto',
        alignSelf: 'center',
    },

    // Components - Series Header
    booksScreenSeriesHeaderText: {
        fontSize: 30,
        fontWeight: 'bold',
    },

    booksScreenSeriesHeaderImageText: {
        fontSize: 15,
        fontWeight: 'bold',
        borderRadius: 10,
        borderWidth: 2,
        padding: 10,
        textAlign: 'center',
        textAlignVertical: 'center'
    },

    booksScreenSeriesHeaderImageTouchable: {
        height: 'auto', 
        width: 'auto', 
    },


    // Components - Complete Button
    booksScreenCompleteTouchable: {
        height: 50,
        width: 'auto',
        padding: 10,
        borderRadius: 30,
        borderWidth: 2,
    },

    booksScreenCompleteText: {
        fontSize: 15,
        fontWeight: 'bold',
    },

    // Components - Reading Header
    readingScreenReaderHeaderMainView: {
        flexDirection: 'row',
    },

    // Components - Upload Screen Complete Alert
    uploadScreenCompleteAlert: {
        position: "absolute", 
        margin: '25%', 
        width: 100, height: 100, 
        borderColor: "blue", 
        borderWidth: 5
    },

    // Components - Reading Test Screen Text Box and Button
    readingTestScreenTextMainView: {
        flex: 2, 
        justifyContent: 'flex-start',
        padding: 20,
        gap: 10,
    },
    
    readingTestScreenTitleText: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
        flex: 2,
        width: '100%',
    },

    readingTestScreenTexts: {
        textAlignVertical: 'center',
        lineHeight: 20
    },

    readingTestScreenIconSentenceView: {
        flexDirection: 'row',
        flex: 1,
    },

    readingTestScreenTouchable: {
        width: '25%',
        borderRadius: 10,
        alignSelf: 'center',
    },

    readingTestScreenTouchableText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    // Components - Settings Side Bar
    settingsSideBarButtonView: {
        flex: 9, 
        gap: 40,
        width: '100%'
    },

    settingsSideBarButton: {
        borderRadius: 50,
        borderWidth: 3,
        height: '20%',
        width: '90%',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold', 
    },

    settingsSideBarInputText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
    },


    // Component - Search Filter Bar
    searchFilterBarMainView: {
        height: "100%", 
        flex: 1, 
    },

    searchFilterBarTextSearchView: {
        padding: 10,
        width: '100%', 
        height: '100%',
    },

    searchFilterBarTextInput: {
        borderRadius: 10,
        borderWidth: 2,
        width: '90%',
        height: '100%',
        alignSelf: 'center',
        padding: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontWeight: 'bold',
        fontSize: 20,
    },

    // Component - Search Bar and Search FlatList
    searchBarFlatList: {
        justifyContent: 'flex-start',
        alignItems: 'center'
    },

    searchBarColorCode: {
        height: '100%',
        width: '20%',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },

    searchBarMainView: {
        flexDirection: 'row',
        width: '100%',
        borderWidth: 2,
        alignItems: 'center',
        paddingRight: 10,
        padding: 5
    },

    searchBarText: {
        fontSize: 20,
        fontWeight: 'bold',
        padding: 10,
        textAlignVertical: 'center',
        width: '65%'
    },

    // Componenets - Settings Library Name Button

    settingsLibraryNameInput: {
        borderRadius: 50,
        borderWidth: 3,
        width: '70%',
        height: '50%',
        fontSize: 20, 
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'center',
    },

// Components End

// ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------//

// Screens Begin


    // Book Screen 
    libraryBooksScreenMainScrollView: {
        alignItems: 'center',
    },

    libraryBooksScreenListTouchable: {
        height: 'auto',
        width: '100%',
        alignSelf: 'flex-start',
        alignItems: 'flex-start',
    },

    libraryBooksScreenListMainView: {
        gap: 10,
        height: 'auto',
        width: '100%',
        alignItems: 'flex-start',
    },

    libraryBooksScreenBackgroundView: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'space-between',
    },

    libraryBooksScreenImageAndBoxView: {
        flexDirection: 'row',
        gap: 10,
    },

    libraryBooksScreenTitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginLeft: '10%',
    },

    libraryBooksScreenTitleView: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    libraryBooksScreenTouchable: {
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },

    // Library Screen
    libraryBooksScreenMainView: {
        flex: 1,
    },

    // DropDown Screen
    dropDownScreenMainView: {
        height: '100%'
    },

    dropDownScreenFlatList: {
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    dropDownScreenNoOptionsText: {
        alignSelf: 'center',
        marginTop: '10%',
        fontWeight: 'bold',
        fontSize: 30,
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
        fontSize: 35,
        fontWeight: 'bold',
    },

    registerScreenInput: {
        borderRadius: 10,
        borderWidth: 3,
        fontSize: 25,
        fontWeight: 'bold',
        width: '70%',
        height: '50%',
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
        height: '50%',
        justifyContent: 'center',
    },

    settingsScreenButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },

    // Main Libraries Screen
    libraryScreenMainView: {
        height: '100%',
    },

    libraryScreenSearchScrollView: {
        flexDirection: 'row', 
        alignItems: 'center',
    },

    // Reading Test Screen
    readingTestScreenMainView: {
        flex: 1,
        padding: 50,
    },

    readingTestScreenMainScrollView: {
        padding: 5, 
        gap: 20
    },

    readingTestScreenButton: {
        borderRadius: 50,
        borderWidth: 3,
        flex: 1,
        height: '20%',
        justifyContent: 'center', 
    },

    readingTestScreenButtonView: {
        gap: 10,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },

    readingTestScreenTextView: {
        flex: 2,
    },

    readingTestScreenTitle: {
        flex: 2,
        fontSize: 28,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
    },

    readingTestScreenText: {
        flex: 1,
        fontSize: 20,
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlign: 'center',
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
        paddingVertical: 30,
    },

    uploadScreenSubView: {
        flex: 1,
    },

    uploadScreenAdvancedTouchable: {
        flex: 3/4,
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

    uploadScreenButtonTouchable: {
        borderWidth: 3,
        borderRadius: 10,
        width: '30%',
        justifyContent: 'center',
        alignSelf: 'flex-end',
        marginRight: '5%',
        height: '100%',
    },

    uploadScreenButtonText: {
        fontWeight: 'bold',
        alignSelf: 'center',
        textAlignVertical: 'center',
        textAlign: 'center',
    },

    uploadScreenButtonView: {
        flexDirection: 'row', 
        flex: 1, 
        width: '70%', 
        marginBottom: '3%', 
        height: '100%'
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
        padding: '10%',
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