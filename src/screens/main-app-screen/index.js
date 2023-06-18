import React, { useEffect } from 'react'
import { View, ImageBackground, SafeAreaView, StatusBar } from 'react-native'
import { connect } from 'react-redux'
import { StackActions } from '@react-navigation/native'
import EncryptedStorage from 'react-native-encrypted-storage'
import * as Animatable from 'react-native-animatable'
import RoundBorderButton from '../../components/round-border-button'
import styles from './styles'

const MainAppScreen = (props) => {
    const onLoginAsUserPress = () => {
        props.navigation.push('Login Screen')
    }
    const onLoginAsHelperPress = () => {
        props.navigation.push('Helper Login Screen')
    }
    useEffect(async () => {
        try {
            const session = await EncryptedStorage.getItem("user_session")
            if (session != undefined) {
                const user = JSON.parse(session)
                if (user.userRole == 'user') {
                    props.setUserData(user)
                    props.navigation.dispatch(
                        StackActions.replace('Drawer Navigation')
                    )
                }
                else {
                    props.setUserData(user)
                    props.navigation.dispatch(
                        StackActions.replace('Helper Drawer Navigation')
                    )
                }
            }
        } catch (error) {
            alert(error)
        }
    }, [])
    return (
        <SafeAreaView>
            <StatusBar translucent={true} backgroundColor="#899ca5" animated={true} />
            <View style={styles.container}>
                <ImageBackground
                    style={styles.backgroundImageStyles}
                    source={require('../../assets/images/mainScreenBackground.jpg')} >
                    <View style={styles.textContainer}>
                        <Animatable.Text animation="fadeInLeftBig" style={styles.assistanceHeader} >
                            Need assistance?
                        </Animatable.Text>
                        <Animatable.Text animation="fadeInLeftBig" style={styles.assistanceSubs} >
                            We've got you covered
                        </Animatable.Text>
                    </View>
                    <Animatable.View animation="fadeInUpBig" style={styles.buttonsContainer} >
                        <RoundBorderButton textToDisplay="Login as user" onPress={onLoginAsUserPress} />
                        <RoundBorderButton textToDisplay="Login as helper" style={styles.helperButton} onPress={onLoginAsHelperPress} />
                    </Animatable.View>
                </ImageBackground>
            </View>
        </SafeAreaView>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUserData: (user) => dispatch({
            type: 'SET_USER_IN_REDUX',
            payload: user
        })
    }
}

export default connect(null, mapDispatchToProps)(MainAppScreen)
