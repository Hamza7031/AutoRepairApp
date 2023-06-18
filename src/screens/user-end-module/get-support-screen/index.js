import React from 'react'
import { View, Text, InputText, ImageBackground } from 'react-native'
import RoundButton from '../../../components/round-button/index'
import styles from './styles'

const GetSupportScreen = () => {
    return (
        <ImageBackground style={styles.bgImg} source={require('../../../assets/images/login_bg.jpg')} >
            <View style={styles.mainView}>
                <View style={styles.upperView} >
                    <RoundButton textToDisplay="I've a complaint" />
                </View>
                <View style={styles.horizontalLine} >
                    <RoundButton textToDisplay="I've a suggesstion" />
                </View>
                <View style={styles.horizontalLine} >
                    <RoundButton textToDisplay="I need help" />
                </View>
            </View>
        </ImageBackground>
    )
}
export default GetSupportScreen