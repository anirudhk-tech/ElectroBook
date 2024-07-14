// Components
import { ElectroIcon } from './icon';
import { ElectroDrop } from './DropDown/dropDown';

// Backend
import { styles } from '../constants/stylers';

// React
import { View } from 'react-native';

// Hooks
import { useColor } from '../hooks/useTheme';

export const ElectroLibraryHeader = (props) => {
    const [primaryColor, secondaryColor] = useColor();

    return (
        <View style={styles.libraryHeaderMainView}>
            <ElectroIcon 
                name="folder-open" 
                size={30} 
                style={styles.libraryMenuIcon}
                color={secondaryColor} 
                handlePress={props.folderPress}/>
            <ElectroIcon 
                name="albums-outline" 
                size={30} 
                style={styles.libraryMenuIcon}
                color={secondaryColor} 
                handlePress={props.albumPress}/>
        </View>
    )};