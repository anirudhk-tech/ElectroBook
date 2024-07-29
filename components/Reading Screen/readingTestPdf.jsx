// React
import { View, Text, TouchableOpacity } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

export const ElectroReadingTestPDF = (props) => {
    const handleSinglePress = () => {
        props.handleSinglePress()
    };

    return (
        <TouchableOpacity onPress={handleSinglePress}>
            <View style={[styles.electroPdfMainView, {padding: 15, gap: 10}]}>
                <Text style={{flex: 1.4}}>
                This doc contains a series of words designed to assess your reading speed. Please read through each word carefully and as quickly as you can while still maintaining comprehension. There are some features that are available at your disposal while you read. Unfortunately, they are disabled for now for the purpose of the test and calculating your read time.
                </Text>
                <Text style={{flex: 1.2}}>
                Usually while reading PDFs, you can tap the screen once to activate/deactivate the header, where all the features are located. The notes icon is where all your notes are located, you can add or remove notes here. The settings icon is where all your commands are located. These are the commands available:
                </Text>
                <Text style={{flex: 1/2}}>
                Single Page: Toggle whether or not you see only one page at a time
                </Text>
                <Text style={{flex: 1/2}}>
                Background Color: Set the background color of the screen behind the PDF
                </Text>
                <Text style={{flex: 0.3}}>
                To Page: Go to a specific page in the PDF
                </Text>
                <Text style={{flex: 0.8}}>
                Once out of the reading screen, you will also see the edit icon, which serves as the control center of your app. Here, you can edit all your data and information, as well as color code your genres, tropes, etc.
                </Text>
                <Text style={{flex: 0.7}}>
                The library icon when pressed, will take you back to your parent library. When uploading files, it is required that you have a library selected. All other information is optional.
                </Text>
                <Text style={{flex: 1}}>
                To upload multiple files to a library, long press a file until a tick mark appears next to it. You can then select all your files. All the information you entered, except the title--to prevent duplicates, will be applied to every one of the files. 
                </Text>
                <Text style={{flex: 0.6}}>
                There is also a search functionality that also serves as a filter. Type a genre, trope, series, author, or title in there to get all the correlating books.
                </Text>
                <Text style={{flex: 1}}>
                After completing the reading, you will be directed to the library. You can view your reading test results in the “Stats” section. Your reading speed will be calculated based on the time taken to read these words. We are now at the end of the test.
                </Text>
            </View>
        </TouchableOpacity>
    );
};