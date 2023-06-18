import { Dimensions, StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    activityButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 10
    },
    activityText: {
        fontSize: 15
    },
    requestHeader: {
        marginHorizontal: 15,
        fontSize: 20,
        fontWeight: 'bold',
        borderBottomWidth: 1,
    },
    currentRequestContainer: {
        marginTop: 15,
        marginHorizontal: 15,
        alignItems: 'center'
    },
    iconStyle: {
        height: 75,
        width: 75,
        borderRadius: 50,
        backgroundColor: 'white',
        padding: 20
    },
    buttonsMainContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 20
    },
    buttonContainer: {
        backgroundColor: 'grey',
        elevation: 2,
        paddingHorizontal: 50,
        paddingVertical: 20,
        borderRadius: 20
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold'
    },
    nameText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 5
    },
    numberText: {
        fontSize: 18,
        fontWeight: '900',
        marginBottom: 5
    },
    noRequestTextContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 200
    },
    requestAcceptedText: {
        margin: 20,
        textAlign: 'center'
    },
    generateBillStyle: {
        backgroundColor: '#0241d8',
        marginHorizontal: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        padding: 20
    },
    amountTextHeader: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom:10
    },
    amountInput: {
        backgroundColor: '#f2f2f2',
        borderRadius: 10,
        padding: 10
    },
    endJobStyle:{
        borderColor:'white',
        borderWidth:1,
        elevation:2,
        marginTop:10
    },
    helperText:{
        color:'white',
        marginTop:5
    },
    payInCashTextContainer:{
        alignItems:'center',
        marginTop:15
    },
    payInCashText:{
        color:'#0645AD',
        borderBottomColor:'#0645AD',
        borderBottomWidth:1
    }
})
export default styles