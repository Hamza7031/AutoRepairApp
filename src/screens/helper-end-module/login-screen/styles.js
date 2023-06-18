import { StyleSheet, Dimensions } from 'react-native'
const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        height: windowHeight,
        width: windowWidth,
        justifyContent:'center',
    },
    numberSpecial: {
        width: '60%',
        height: 50,
        fontSize: 15,
        borderBottomColor: '#f0f8ff',
        borderBottomWidth: 2,
        color: 'white',
    },
    countryCode: {
        width: '10%',
        height: 50,
        fontSize: 15,
        borderBottomColor: '#f0f8ff',
        borderBottomWidth: 2,
        color: 'grey',
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
    },
    text: {
        color: '#dcdcdc',
    },
    SignInText: {
        color: 'white',
    },
    logo: {
        alignSelf: 'center',
        height: 200,
        width: 200
    },
    horizontalLineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        alignSelf: 'center'
    },
    lineDraw: {
        height: 1,
        backgroundColor: 'white',
        width: '35%'
    },
    horizontalLineText: {
        width: 50,
        textAlign: 'center',
        color: 'white'
    },
    helperTextStyles: {
        alignSelf: 'flex-end',
        marginRight: 30,
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
    },
    buttonGroupMainContainer:{
        width:'80%'
    },
    buttonGroupContainer:{
        height:35
    }
})
export default styles