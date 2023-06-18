import React, { useState, useEffect } from 'react'
import { View, ImageBackground, TextInput, Image, ToastAndroid } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import RoundButton from '../../../../components/round-button/index'
import { StackActions } from '@react-navigation/native'
import axios from 'axios'
import styles from './styles'


const HelperForgotPasswordNewPassword = ({ navigation, route }) => {
    const { mobileNumber, userRole } = route.params
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false)
    const checkIfPasswordIsValid = () => {
        if (password.length >= 8) {
            setIsPasswordValid(true)
        }
        else {
            setIsPasswordValid(false)
        }
    }
    const checkIfPasswordsMatch = () => {
        if (password == confirmPassword) {
            setIsConfirmPasswordValid(true)
        }
        else {
            setIsConfirmPasswordValid(false)
        }
    }
    const onChangePasswordButtonPress = () => {
        if (isPasswordValid) {
            if (isConfirmPasswordValid) {
                axios.post('http://192.168.0.109:3000/update-helper-password', {
                    mobileNumber: mobileNumber,
                    password: password,
                    userRole: userRole
                }).then(response => {
                    if (response.data) {
                        navigation.dispatch(StackActions.popToTop())
                        ToastAndroid.show('Password Successfully Changed', ToastAndroid.SHORT)
                    }
                }).catch(error => {
                    alert(error)
                })
            } else {
                alert('Password do not match.')
            }
        } else {
            alert('Password must be at least 8 characters.')
        }
    }
    useEffect(() => {
        checkIfPasswordIsValid()
        checkIfPasswordsMatch()
    }, [password, confirmPassword])
    return (
        <View style={styles.mainView} >
            <ImageBackground style={styles.backgroundImage} source={require('../../../../assets/images/helperLoginBackground_2.jpg')} >
                <View>
                    <Image source={require('../../../../assets/images/logo.jpg')} style={styles.logo} />
                </View>
                <View style={styles.inputArea} >
                    <View style={styles.textView}>
                        <Feather name="lock" size={15} color="white" />
                        <TextInput
                            style={styles.inputText}
                            secureTextEntry={true}
                            textContentType="password"
                            placeholder="Password"
                            placeholderTextColor="grey"
                            editable={true}
                            value={password}
                            onChangeText={value => setPassword(value)} />
                    </View>
                    <View style={styles.textView}>
                        <Feather name="lock" size={15} color="white" />
                        <TextInput
                            style={styles.inputText}
                            secureTextEntry={true}
                            textContentType="password"
                            placeholder="Confirm Password"
                            placeholderTextColor="grey"
                            editable={true}
                            value={confirmPassword}
                            onChangeText={value => setconfirmPassword(value)} />
                    </View>
                </View>
                <RoundButton onPress={onChangePasswordButtonPress} textToDisplay="Change Password" />
            </ImageBackground>
        </View>
    )
}
export default HelperForgotPasswordNewPassword