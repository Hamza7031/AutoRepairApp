import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    mainView: {
        flex: 1
    },
    profileRowView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 25,
    },
    iconsContainer: {
        width: '20%',
        alignItems: 'center',
    },
    textContainer: {
        width: '60%',
        justifyContent:'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    details: {
        fontSize: 18
    },
    sectionHeader:{
        paddingLeft:10,
        marginTop:20
    },
    sectionHeaderText:{
        fontWeight:'900',
        fontSize:14        
    },
    sectionView:{
        borderBottomColor:'grey',
        borderBottomWidth:1,
        paddingBottom:20
    }
})
export default styles