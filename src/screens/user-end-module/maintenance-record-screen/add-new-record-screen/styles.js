import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        alignContent: 'center',
        alignItems: 'center',
        marginLeft: '5%',
        marginTop: 20
    },
    headerIcon:{
        color:'#808080',
    },
    headerText:{
        marginLeft:5,
        fontSize:18,
        color:'#696969',
        fontWeight:'900'
    },
    textInput:{
        width:'90%',
        borderBottomColor:'grey',
        borderBottomWidth:0.5,
        alignSelf:'center'
    },
    buttonStyles:{
        margin:10
    }
});

export default styles