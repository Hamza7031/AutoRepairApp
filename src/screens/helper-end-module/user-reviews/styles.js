import { Dimensions, StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        paddingTop: 30
    },
    flexDir: {
        flexDirection: 'row',
        paddingLeft: 20
    },
    dateContainer: {
        width: '30%'
    },
    timeContainer: {
        marginLeft: -45
    },
    amountContainer: {
        width: '50%',
        alignItems: 'flex-end',
        paddingRight: 20
    },
    locationIconContainer: {
        justifyContent: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20
    },
    details: {
        fontSize: 20
    },
    horizontalLineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        alignSelf: 'center'
    },
    lineContainer: {
        flex: 1,
        height: 1,
        backgroundColor: 'black'
    },
    rideIdContainer: {
        width: 50,
        textAlign: 'center'
    },
    spaceBetDateTimePrice: {
        justifyContent: 'space-between',
        marginRight:20
    },
    reviewContainer:{
        flexDirection:'row',
        alignItems:'center'
    },
    detailsContainer:{
        width:'30%'
    },
    noReviewsContainer:{
        flex:1,
        width:Dimensions.get('screen').width,
        height:Dimensions.get('screen').height,
        justifyContent:'center',
        alignItems:'center'
    },
    noReviewsText:{
        fontSize:18,
        fontWeight:'900'
    }
})
export default styles