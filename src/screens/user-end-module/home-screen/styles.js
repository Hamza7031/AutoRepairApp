import { StyleSheet, Dimensions } from 'react-native'
const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        height: windowHeight,
        width: windowWidth
    },
    mapView: {
        justifyContent: 'center',
        alignItems: 'center',
        height: windowHeight
    },
    covidMessageView: {
        padding: '5%',
        backgroundColor: '#4169e1',
        borderTopRightRadius: 10,
        borderTopLeftRadius: 10,
        position: 'absolute',
        bottom: 0,
        width: '98%',
        paddingBottom: 100
    },
    textColor: {
        color: 'white'
    },
    horizontalView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    covidMessageHeader: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    learnMoreView: {
        flexDirection: 'row',
        alignSelf: 'baseline'
    },
    learnMoreText: {
        fontWeight: 'bold'
    },
    menuIconOverMap: {
        position: 'absolute',
        top: 20,
        left: 20,
        borderRadius: 50,
        padding: 7,
        backgroundColor: 'white'
    },
    selectCatText: {
        textAlign: 'center'
    },
    subCategoryContainers: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
        width: '40%',
        alignSelf: 'center',
        padding: 20,
        borderRadius: 20,
        backgroundColor: 'white',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    subCategoryIcon: {
        width: 50,
        height: 50,
        margin: 10
    },
    subCategoryRowView: {
        flexDirection: 'row'
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    selectionContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        alignItems: 'center'
    },
    selectIconContainer: {
        backgroundColor: 'white',
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 20,
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
    paymentOptionContainer: {
        marginTop: 20,
        alignItems: 'center'
    },
    payWithWalletButtonContainer: {
        backgroundColor: '#0241d8',
        width: Dimensions.get('screen').width - 50,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    payWithCashButtonContainer: {
        borderColor: '#0241d8',
        borderWidth: 1,
        width: Dimensions.get('screen').width - 50,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    ratingQuestionTextContainer: {
        marginTop: 10,
        borderBottomWidth: 1,
    },
    reviewInput: {
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        width: Dimensions.get('screen').width - 30,
        marginBottom: 10
    },
    reviewModalInsideContainer: {
        alignItems: 'center'
    },
})
export default styles