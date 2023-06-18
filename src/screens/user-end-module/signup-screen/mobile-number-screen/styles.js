import { StyleSheet, Dimensions } from 'react-native'
const windowWidth = Dimensions.get('screen').width
const windowHeight = Dimensions.get('screen').height
const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    backgroundImage: {
        flex: 1,
        width: windowWidth,
        height: windowHeight,
    },
    inputText: {
        width: '65%',
        height: 50,
        fontSize: 15,
        borderBottomColor: '#f0f8ff',
        borderBottomWidth: 2,
        color: 'white',
        marginLeft: 10
    },
    textView: {
        width: '100%',
        marginTop: 10,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    inputArea: {
        alignItems: 'center',
        marginVertical: 20
    },
    logo: {
        alignSelf: 'center',
        height: 200,
        width: 200,
        marginTop: '20%'
    },
    screenHeader: {
        color: 'white',
        fontSize: 25,
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 30
    },
    helperTextStyles: {
        alignSelf: 'flex-end',
        marginRight: 30,
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    }
})
export default styles