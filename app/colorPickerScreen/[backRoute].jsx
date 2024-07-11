// Node Modules
import ColorPicker, { Panel1, Preview, OpacitySlider, HueSlider } from 'reanimated-color-picker';

// Backend
import { styles } from '../../constants/stylers';
import { ThemeContext } from '../../constants/context';

// React
import { View } from 'react-native';
import { useContext, useState } from 'react';

// Expo
import { Stack, useLocalSearchParams, router } from 'expo-router';

// Components
import { ElectroButton } from '../../components/button';



export default function colorPicker () {
    const context = useContext(ThemeContext);
    const [primaryColor, secondaryColor] = [context.primaryColor, context.secondaryColor];

    const [hex, setHex] = useState("");
    const { backRoute } = useLocalSearchParams();
    
    // Implement where inital color is already selected color - Get from SQL

    const onCompleteColor = ({hex}) => {
        setHex(hex);
    };

    const handlePress = () => {
        if (backRoute.includes("Primary")) {
            context.changePrimary(hex);

        } else if (backRoute.includes("Secondary")) {
            context.changeSecondary(hex);

        } else {
            router.navigate(`../(tabs)/${backRoute}Screen`);
        };
    };

    return (
        <View style={[styles.colorPickerScreenMainView, {backgroundColor: secondaryColor}]}>
            <Stack.Screen options={{
                    headerStyle: {backgroundColor: primaryColor},
                    headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                    headerTitleAlign: 'center',
                    headerTitle: "Color",
                    headerShown: true}}/>

                <ColorPicker style={styles.colorPicker} value = "red" onComplete={onCompleteColor}>
                    <Preview hideInitialColor={true}/>
                    <Panel1 />
                    <HueSlider />
                    <OpacitySlider />
                </ColorPicker>

                <ElectroButton 
                    text="Pick Color" 
                    touchableStyles={[styles.colorPickerTouchable, {borderColor: primaryColor}]} 
                    textStyles={[styles.buttonText, {color: primaryColor}]}
                    action={handlePress}
                    />
        </View>
    );
};