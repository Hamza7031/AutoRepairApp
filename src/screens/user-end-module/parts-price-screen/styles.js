import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    serviceMainContainer: {
        width: '92%',
        elevation: 3,
        backgroundColor: 'white',
        borderRadius: 15,
        alignSelf: 'center',
        margin: 15,
        padding: 15,
        flexDirection:'row',
        alignItems:'center'
    },
    dataContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageStyles:{
        resizeMode:'contain',
        width:100,
        height:100,
        borderRadius:500,
    },
    imageContainer:{
        borderRadius:100,
        borderColor:'black',
        borderWidth:0.5
    },
    detailsContainer:{
        marginLeft:'5%'
    },
    partNameText:{
        fontSize:18,
        fontWeight:'bold',
        marginVertical:5
    },
    partPriceText:{
        fontSize:15,
        fontWeight:'900',
    }
});

export default styles