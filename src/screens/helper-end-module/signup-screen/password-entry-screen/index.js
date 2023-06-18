import React, { useEffect, useState, useRef } from 'react'
import { View, ImageBackground, TextInput, Image, Text, ScrollView } from 'react-native'
import { StackActions } from '@react-navigation/native'
import { HelperText } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather'
import RoundButton from '../../../../components/round-button/index'

import styles from './styles'


const HelperPasswordEntryScreen = ({ navigation, route }) => {
    const { mobileNumber } = route.params
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(false)
    const confirmPasswordRef = useRef()
    const placeholderColor = '#f0f8ff'
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
    const onSetPassword = () => {
        if (isPasswordValid && isConfirmPasswordValid) {
            navigation.dispatch(
                StackActions.replace('Helper Data Entry Screen', {
                    mobileNumber: mobileNumber,
                    password: password
                })
            )
        }
        else {
            alert('Check your passwords')
        }
    }
    useEffect(() => {
        checkIfPasswordIsValid()
        checkIfPasswordsMatch()
    }, [password, confirmPassword])
    return (
        <View style={styles.mainView} >
            <ImageBackground style={styles.backgroundImage} source={require('../../../../assets/images/helperLoginBackground_2.jpg')} >
                <ScrollView>
                    <View >
                        <View>
                            <Image source={require('../../../../assets/images/logo.jpg')} style={styles.logo} />
                        </View>
                        <View>
                            <Text style={styles.screenHeader} >
                                Enter Password
                            </Text>
                        </View>
                        <View style={styles.inputArea} >
                            <View style={styles.textView}>
                                <Feather name="lock" size={15} color="white" />
                                <TextInput
                                    style={styles.inputText}
                                    secureTextEntry={true}
                                    textContentType="password"
                                    placeholder="Password"
                                    placeholderTextColor={placeholderColor}
                                    editable={true}
                                    value={password}
                                    onChangeText={value => setPassword(value)}
                                    onSubmitEditing={() => confirmPasswordRef.current.focus()}
                                />
                            </View>
                            <HelperText style={styles.helperTextStyles} type="error" visible={!isPasswordValid} >
                                * Password should be at least 8 characters
                            </HelperText>
                            <View style={styles.textView}>
                                <Feather name="lock" size={15} color="white" />
                                <TextInput
                                    ref={confirmPasswordRef}
                                    style={styles.inputText}
                                    secureTextEntry={true}
                                    textContentType="password"
                                    placeholder="Confirm Password"
                                    placeholderTextColor={placeholderColor}
                                    editable={true}
                                    value={confirmPassword}
                                    onChangeText={value => setconfirmPassword(value)}
                                    onSubmitEditing={onSetPassword}
                                />
                            </View>
                            <HelperText style={styles.helperTextStyles} type="error" visible={!isConfirmPasswordValid} >
                                * Passwords do not match
                            </HelperText>
                        </View>
                        <RoundButton onPress={onSetPassword} textToDisplay="Next" />
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    )
}
export default HelperPasswordEntryScreen