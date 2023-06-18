import { StyleSheet, Dimensions } from "react-native"
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImageStyles: {
        width: windowWidth,
        height: windowHeight
    },
    assistanceHeader: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 25,
    },
    assistanceSubs: {
        color: 'white',
        fontWeight: '900',
        fontSize: 15
    },
    helperButton: {
        backgroundColor: 'transparent',
    },
    buttonsContainer: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center'
    },
    textContainer: {
        alignItems: 'center',
        position: 'absolute',
        right: 20,
        top: '50%'
    }
});

export default styles