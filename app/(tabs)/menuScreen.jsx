// React
import { View, ScrollView, Dimensions } from 'react-native';
import { useContext, useCallback } from 'react';

// Backend
import { ThemeContext } from '../../constants/context';
import { styles } from '../../constants/stylers';

// Expo
import { Stack, router } from 'expo-router';

// Components
import { ElectroIcon } from '../../components/icon';
import { ElectroMenuTab } from '../../components/menuTab';

export default function menuScreen () {
    const colorContext = useContext(ThemeContext);
    const [primaryColor, secondaryColor] = [colorContext.primaryColor, colorContext.secondaryColor];
    const windowHeight = Dimensions.get("window").height;

    const handleLibraryPress = useCallback(() => {
        router.push('./libraryScreen');
    });

    const handleMenuTabPress = (screen) => {
        router.push(`../menuDropScreen/${screen}`)
    };

    return(
        <View style={[styles.menuScreenMainView, {backgroundColor: secondaryColor}]}>
            <Stack.Screen options={{
                headerStyle: {backgroundColor: primaryColor},
                headerTitleStyle: [styles.headerTitleStyle, {color: secondaryColor}],
                headerTitle: "Index",
                headerRight: (() => <ElectroIcon 
                                            name="library-outline" 
                                            size={30} 
                                            style={styles.libraryMenuIcon}
                                            color={secondaryColor} 
                                            handlePress={handleLibraryPress}/>),
                headerShown: true}}/>
            <ScrollView contentContainerStyle={[styles.menuScreenTabView, {height: windowHeight}]}>
                <ElectroMenuTab text="Books" handlePress={handleMenuTabPress}/>
                <ElectroMenuTab text="Libraries" handlePress={handleMenuTabPress}/>
                <ElectroMenuTab text="Authors" handlePress={handleMenuTabPress}/>
                <ElectroMenuTab text="Genres" handlePress={handleMenuTabPress}/>
                <ElectroMenuTab text="Tropes" handlePress={handleMenuTabPress}/>
                <ElectroMenuTab text="Series" handlePress={handleMenuTabPress}/>
                <ElectroMenuTab text="Completed" handlePress={handleMenuTabPress}/>
            </ScrollView>
            
        </View>
    )
};