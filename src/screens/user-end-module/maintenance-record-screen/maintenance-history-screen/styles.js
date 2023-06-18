import { StyleSheet, Dimensions } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    serviceMainContainer: {
        width: '92%',
        elevation: 3,
        backgroundColor: 'white',
        borderRadius: 15,
        justifyContent: 'center',
        alignSelf: 'center',
        margin: 15,
        padding: 15
    },
    dataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        fontWeight: '900',
    }
});

export default styles