import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        marginBottom: 30
    },
    UploadDPPictureContainer: {
        alignSelf: 'center',
    },
    ImageStyles: {
        borderRadius: 150
    },
    DPPictureStyles: {
        alignSelf: 'center',
        height: 150,
        width: 150,
        marginTop: 35
    },
    MainEntryImageContainer: {
        justifyContent: 'flex-end',
        flex: 1
    },
    ImageViewContainer: {
        height: 50,
        width: 50,
        alignSelf: 'flex-end',
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50
    },
    imageIconStyles: {
        height: 20,
        width: 30,
        resizeMode: 'contain'
    },
    accountInfoHeader: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 25
    },
    inputText: {
        width: '87%',
        height: 50,
        fontSize: 15,
        color: 'black',
        marginLeft: 10
    },
    textView: {
        width: '80%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
    },
    inputArea: {
        alignItems: 'center',
    },
    modalTouchableContainer: {
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
        height: 50,
        justifyContent: 'center',
        paddingLeft: 12
    },
    modalTextStyles: {
        fontSize: 18
    },
    notesContainer: {
        alignItems: 'flex-end',
        marginRight: '10%',
        marginTop:10
    },
    notesText: {
        color: 'grey',
        fontSize: 12
    }
})
export default styles