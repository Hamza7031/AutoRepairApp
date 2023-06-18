import { StyleSheet, Dimensions } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    requestAcceptedView: {
        position: 'absolute',
        bottom: 0,
        height: '30%',
        backgroundColor: '#ffff',
        width: Dimensions.get('screen').width,
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        paddingTop: 10,
        alignItems: 'center'
    },
    assistanceImage: {
        borderRadius: 50,
        height: 50,
        width: 50,
        borderColor: '#0241d8',
        borderWidth: 1,
    },
    assistantNameText: {
        fontWeight: '900',
        fontSize: 18
    },
    callMessageMainContainer: {
        width: Dimensions.get('screen').width - 20,
        alignItems: 'center'
    },
    callButtonContainer: {
        backgroundColor: '#0241d8',
        width: Dimensions.get('screen').width - 200,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    callButtonText: {
        color: 'white',
        fontWeight: '900'
    },
    messageButtonContainer: {
        borderColor: '#0241d8',
        borderWidth: 1,
        width: Dimensions.get('screen').width - 200,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    messageButtonText: {
        fontWeight: '900',
        color: 'black'
    },
    noteText: {
        marginHorizontal: 20,
        textAlign: 'center'
    },
})

export default styles