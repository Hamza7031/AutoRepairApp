import { StyleSheet, Dimensions } from "react-native"
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    itemContainer: {
        backgroundColor: 'white',
        width: '95%',
        alignSelf: 'center',
        marginVertical: 10,
        padding: 10,
        borderRadius: 15
    },
    titleHeaderText: {
        fontWeight: 'bold',
        fontSize: 20
    },
    carDetailHeaderText: {
        fontWeight: '900',
        fontSize: 18
    },
    detailHeaderText: {
        fontWeight: '900',
        fontSize: 15,
        width: '50%',
    },
    noReviewsContainer: {
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noReviewsText: {
        fontSize: 18,
        fontWeight: '900'
    }
});
export default styles