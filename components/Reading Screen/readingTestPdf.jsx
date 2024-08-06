// React
import { View, Text, TouchableOpacity, Dimensions } from "react-native";

// Backend
import { styles } from "../../constants/stylers";

export const ElectroReadingTestPDF = (props) => {
    const handleSinglePress = () => {
        props.handleSinglePress()
    };

    const height = Dimensions.get("window").height;

    return (
        <TouchableOpacity onPress={handleSinglePress}>
            <View style={[styles.electroPdfMainView, {padding: 5, paddingTop: 30, gap: 5, justifyContent: 'flex-end'}]}>
                <Text style={{flex: 1, fontSize: height/55, textAlignVertical: 'center'}}>
                Please read through each word carefully and as quickly as you can while still maintaining comprehension. There are some features that are available at your disposal while you read. Unfortunately, they are disabled for now.
                </Text>
                <Text style={{flex: 0.7, fontSize: height/55, textAlignVertical: 'center'}}>
                Usually while reading PDFs, you can tap the screen once to activate/deactivate the header, where all the features are located. These are the commands available:
                </Text>
                <Text style={{flex: 1/2, fontSize: height/55, textAlignVertical: 'center'}}>
                Single Page: Toggle whether or not you see only one page at a time
                </Text>
                <Text style={{flex: 1/2, fontSize: height/55, textAlignVertical: 'center'}}>
                Background Color: Set the background color of the screen behind the PDF
                </Text>
                <Text style={{flex: 0.3, fontSize: height/55, textAlignVertical: 'center'}}>
                To Page: Go to a specific page in the PDF
                </Text>
                <Text style={{flex: 0.8, fontSize: height/55, textAlignVertical: 'center'}}>
                Once out of the reading screen, you will also see the hammer icon. Here, you can edit all your data and information.
                </Text>
                <Text style={{flex: 0.7, fontSize: height/55, textAlignVertical: 'center'}}>
                If you delete a library, all files in the library will be deleted as well. Be careful!
                </Text>
                <Text style={{flex: 1, fontSize: height/55, textAlignVertical: 'center'}}>
                To upload multiple files to a library, long press a file. All the information you entered, except the title--to prevent duplicates, will be applied to every one of the files. 
                </Text>
                <Text style={{flex: 0.6, fontSize: height/55, textAlignVertical: 'center'}}>
                There is also a search functionality that also serves as a filter. Type a genre, trope, series, author, or title in there.
                </Text>
                <Text style={{flex: 1, fontSize: height/55, textAlignVertical: 'center'}}>
                After completing the reading, you will be directed to the library. You can view your reading test results in the “Stats” section. The test is now over.
                </Text>
            </View>
        </TouchableOpacity>
    );
};