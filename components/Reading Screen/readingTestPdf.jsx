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
            <Text style={[styles.readingTestScreenTexts, {fontSize: height/55, color: primaryColor}]}>
            {`\t\t\t`}The mysterious, black box beckoned me towards it, promising unlimited wealth. My eyes traveled its length as I examined the golden plating on its edges, running my hand over its smooth surface. The words Trent Williams gleamed on it, reflecting the dim sunlight that filtered through the cracks in the hull. My father. 
 
            </Text>
            <Text style={[styles.readingTestScreenTexts, {fontSize: height/55, color: primaryColor}]}>
            {`\t\t\t`}I cracked it open, holding my breath. A rolled up paper stared back at me, its edges yellow with age. I cautiously unfurled it, my eyes scanning the message. 
            </Text>
            <Text style={[styles.readingTestScreenTexts, {fontSize: height/55, color: primaryColor}]}>
            {`\t\t\t`}48.882768, -15.245560.
            </Text>
            <Text style={[styles.readingTestScreenTexts, {fontSize: height/55, color: primaryColor}]}>
            {`\t\t\t`}This could change our lives. 
            </Text>
            <Text style={[styles.readingTestScreenTexts, {fontSize: height/55, color: primaryColor}]}>
            {`\t\t\t`}I swiped the box off the table, making my way up to the deck. The English channel sparkled in the evening sun, and some lone boats floated around in the current. The breeze carried the smell of the river to my nostrils. I vaulted over the railing of the Pegasus, landing below softly. 
            </Text>
            <Text style={[styles.readingTestScreenTexts, {fontSize: height/55, color: primaryColor}]}>
            {`\t\t\t`}I took one last look at my father’s ship, assessing its withered form. Her white paint had started to peel a long time ago, revealing the damaged hull underneath. My father had just abandoned it, leaving it in our care while he went off on his journey.
            </Text>
            <Text style={[styles.readingTestScreenTexts, {fontSize: height/55, color: primaryColor}]}>
            {`\t\t\t`}He never came back. 
            </Text>
            <Text style={[styles.readingTestScreenTexts, {fontSize: height/55, color: primaryColor}]}>
            {`\t\t\t`}I kicked up dust as I strode towards our house purposefully, clutching the box in my hand tightly. 
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