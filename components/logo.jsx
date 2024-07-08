import { Image } from 'react-native';

export const Logo = (props) => {
    return (
        <Image style={props.styles} source={require('../assets/images/logo_EB.png')}/>
    )
};