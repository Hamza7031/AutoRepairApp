import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    numberSpecial: {
        width: '60%',
        height: 50,
        fontSize: 15,
        borderBottomColor: '#f0f8ff',
        borderBottomWidth: 2,
        color: 'white',
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
        width: 200,
    }
})
export default styles