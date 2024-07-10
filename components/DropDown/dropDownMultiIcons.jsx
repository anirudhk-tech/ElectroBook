// React
import { View } from 'react-native';
import { useContext } from 'react';

// Components
import { ElectroIcon } from '../icon';

// Backend
import { styles } from '../../constants/stylers';
import { ThemeContext } from '../../constants/context';

export const ElectroMultiIcons = (props) => {
    const colorContext = useContext(ThemeContext);
    const secondaryColor = colorContext.secondaryColor;

    return (
        <View style={styles.dropDownMultiIconsMainView}>
            {
                props.icons.map((icon) =>{ 
                    return (<ElectroIcon 
                                key={props.icons.indexOf(icon)}
                                name={icon.name}
                                size={30}
                                color={secondaryColor}
                                handlePress={() => icon.handlePress()}/>
                            )
                        })
            }
        </View>
    )
}