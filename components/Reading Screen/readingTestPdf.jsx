// React
import { ScrollView, Text, Dimensions } from "react-native";

// Components
import { ElectroButton } from "../General/button";

// Backend
import { styles } from "../../constants/stylers";

// Hooks
import { useColor } from "../../hooks/useTheme";

export const ElectroReadingTestPDF = (props) => {
    const handleSinglePress = () => {
        props.handleSinglePress()
    };

    const { primaryColor, secondaryColor } = useColor();
    const height = Dimensions.get("window").height;

    return (
        <ScrollView 
            contentContainerStyle={[styles.readingTestScreenMainScrollView, { height: height * 1.5, paddingTop: height/15, backgroundColor: secondaryColor}]}>
            <Text style={[styles.readingTestScreenTexts, {fontSize: height/55}]}>
            Please read through each word carefully and as quickly as you can while still maintaining comprehension. There are some features that are available at your disposal while you read. Unfortunately, they are disabled for now.
            </Text>
            <Text style={[styles.readingTestScreenTexts, {fontSize: height/55}]}>
            Usually while reading PDFs, you can tap the screen once to activate/deactivate the header, where all the features are located. These are the commands available:
            </Text>
            <Text style={[styles.readingTestScreenTexts, {fontSize: height/55}]}>
            Single Page: Toggle whether or not you see only one page at a time
            </Text>
            <Text style={[styles.readingTestScreenTexts, {fontSize: height/55}]}>
            Background Color: Set the background color of the screen behind the PDF
            </Text>
            <Text style={[styles.readingTestScreenTexts, {fontSize: height/55}]}>
            To Page: Go to a specific page in the PDF
            </Text>
            <Text style={[styles.readingTestScreenTexts, {fontSize: height/55}]}>
            Once out of the reading screen, you will also see the hammer icon. Here, you can edit all your data and information.
            </Text>
            <Text style={[styles.readingTestScreenTexts, {fontSize: height/55}]}>
            If you delete a library, all files in the library will be deleted as well. Be careful!
            </Text>
            <Text style={[styles.readingTestScreenTexts, {fontSize: height/55}]}>
            To upload multiple files to a library, long press a file. All the information you entered, except the title--to prevent duplicates, will be applied to every one of the files. 
            </Text>
            <Text style={[styles.readingTestScreenTexts, {fontSize: height/55}]}>
            There is also a search functionality that also serves as a filter. Type a genre, trope, series, author, or title in there.
            </Text>
            <Text style={[styles.readingTestScreenTexts, {fontSize: height/55}]}>
            After completing the reading, you will be directed to the library. You can view your reading test results in the “Stats” section. The test is now over.
            </Text>
            <ElectroButton
                action={handleSinglePress}
                text={"Finish"}
                touchableStyles={[styles.readingTestScreenTouchable, { backgroundColor: primaryColor, height: height/20 }]}
                textStyles={[styles.readingTestScreenTouchableText, { color: secondaryColor, paddingTop: (height/20) * 0.10 }]}
                ></ElectroButton>
        </ScrollView>

    );
};