import { StyleSheet } from 'react-native'
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 20,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    caption:{
        fontSize:14,
        lineHeight:14,
        color:'black'
    },
    row:{
        marginTop:20,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:20
    },
    section:{
        flexDirection:'row',
        marginRight:15,
        alignItems:'center'
    },
    paragraph:{
        fontWeight:'bold',
        marginRight:3
    },
    drawerSection:{
        marginTop:15
    },
    bottomDrawerSection:{
        marginBottom:5,
        borderTopColor:'#f4f4f4',
    },
    preferance:{
        flexDirection:'row',
        justifyContent:'space-between',
        paddingVertical:12,
        paddingHorizontal:16
    },
    dpDetails:{
        flexDirection:'row',
        alignItems:'center'
    },
    captionTitle:{
        paddingLeft:10,
    }
})
export default styles