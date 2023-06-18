import { StyleSheet } from "react-native"
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 10
    },
    titleHeader: {
        fontWeight: 'bold',
        fontSize: 25,
        maxWidth: '80%'
    },
    carDetail: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    rowStyle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    horizontalLine: {
        borderWidth: 1,
        marginVertical: 10,
        borderColor: 'grey'
    },
    dateDisplay:{
        position:'absolute',
        bottom:0,
        width:'100%',
        backgroundColor:'#f2f2f2',
        borderTopColor:'grey',
        borderTopWidth:3,
        height:30,
        alignSelf:'center'
    }
})
export default styles