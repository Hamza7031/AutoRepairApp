import React, { useState, useRef, useEffect } from 'react'
import { View, Text, ImageBackground, TextInput, TouchableOpacity, Image, Alert, Keyboard } from 'react-native'
import { HelperText } from 'react-native-paper'
import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/routers'
import axios from 'axios'
import ProgressLoader from 'rn-progress-loader'
import EncryptedStorage from 'react-native-encrypted-storage'
import Feather from 'react-native-vector-icons/Feather'
import RoundButton from '../../../components/round-button/index'
import styles from './styles'


const Login = (props) => {
    const phoneRegex = /[\+]\d{12}/
    const [mobileNumber, setMobileNumber] = useState(null)
    const [password, setPassword] = useState('')
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false)
    const [isPasswordValid, setIsPasswordValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const placeholderColor = '#f0f8ff'
    const mobileNumberRef = useRef()
    const passwordRef = useRef()
    const checkIfPhoneNumberIsValid = () => {
        if (phoneRegex.test(mobileNumber)) {
            setIsPhoneNumberValid(true)
        }
        else {
            setIsPhoneNumberValid(false)
        }
    }
    const checkIfPasswordIsValid = () => {
        if (password.length >= 8) {
            setIsPasswordValid(true)
        }
        else {
            setIsPasswordValid(false)
        }
    }
    const onForgetPasswordPress = () => {
        props.navigation.push('Forgot Password Phone Number')
    }
    const onLoginButtonPress = async () => {
        setIsLoading(true)
        if (isPhoneNumberValid == false) {
            setIsLoading(false)
            alert('Check mobile number')
        }
        else if (isPasswordValid == false) {
            setIsLoading(false)
            alert('Check password.\nPassword must be at least 8 characters')
        }
        else {
            await axios.post('http://192.168.0.109:3000/find-user-for-login', {
                mobileNumber: mobileNumber,
                password: password
            }).then(async (response) => {
                await EncryptedStorage.setItem('user_session',
                    JSON.stringify(response.data))
                props.setUser(response.data)
                props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'Drawer Navigation'
                            }
                        ]
                    })
                )
                setIsLoading(false)
            }).catch(error => {
                if (error.response.status == 404) {
                    setIsLoading(false)
                    alert('User not found')
                }
                else if (error.response.status == 401) {
                    setIsLoading(false)
                    alert('Wrong password, please check your password.')
                }
                else {
                    setIsLoading(false)
                    alert(error)
                }
            })

        }
    }
    const onSignUpButtonPress = () => {
        props.navigation.push('Enter Mobile Number Screen')
    }
    useEffect(() => {
        checkIfPhoneNumberIsValid()
        checkIfPasswordIsValid()
    })
    return (
        <View style={styles.mainView} >
            <ImageBackground style={styles.backgroundImage} source={require('../../../assets/images/main-background.jpg')} >
                <View>
                    <Image source={require('../../../assets/images/logo.jpg')} style={styles.logo} />
                </View>
                <View style={styles.inputArea} >
                    <View style={styles.textView}>
                        <Feather name="phone" size={15} color="white" />
                        <TextInput style={styles.inputText}
                            ref={mobileNumberRef}
                            selectTextOnFocus={true}
                            keyboardType="phone-pad"
                            placeholder="+92 300 000 0000"
                            value={mobileNumber}
                            placeholderTextColor={placeholderColor}
                            editable={true}
                            onChangeText={(num) => setMobileNumber(num)}
                            blurOnSubmit={false}
                            onSubmitEditing={() => {
                                passwordRef.current.focus()
                            }}
                        />
                    </View>
                    <HelperText style={styles.helperTextStyles} type="error" visible={!isPhoneNumberValid} >
                        * Check your mobile number format
                    </HelperText>
                    <View style={styles.textView}>
                        <Feather name="lock" size={15} color="white" />
                        <TextInput style={styles.inputText}
                            ref={passwordRef}
                            selectTextOnFocus={true}
                            secureTextEntry={true}
                            textContentType="password"
                            placeholder="Password"
                            placeholderTextColor={placeholderColor}
                            editable={true}
                            value={password}
                            onChangeText={(pass) => setPassword(pass)}
                            onSubmitEditing={() => {
                                Keyboard.dismiss()
                                onLoginButtonPress()
                            }}
                        />
                    </View>
                    <HelperText style={styles.helperTextStyles} type="error" visible={!isPasswordValid} >
                        * Password must be at least 8 characters
                    </HelperText>
                </View>
                <View style={styles.textView}>
                    <TouchableOpacity onPress={onForgetPasswordPress}>
                        <Text style={styles.SignInText} >
                            Forgot Password?
                        </Text>
                    </TouchableOpacity>
                </View>
                <RoundButton onPress={onLoginButtonPress} textToDisplay="Login" />
                <View style={styles.horizontalLineContainer}>
                    <View style={styles.lineDraw} />
                    <View>
                        <Text style={styles.horizontalLineText}>Or</Text>
                    </View>
                    <View style={styles.lineDraw} />
                </View>
                <View style={styles.textView}>
                    <View>
                        <Text style={styles.text}>
                            Don't have an account?
                        </Text>
                    </View>
                    <TouchableOpacity onPress={onSignUpButtonPress} >
                        <Text style={styles.SignInText} >
                            {" "}Sign up
                        </Text>
                    </TouchableOpacity>
                </View>
                <ProgressLoader
                    visible={isLoading}
                    isModal={true}
                    isHUD={true}
                    color="#0241d8" />
            </ImageBackground>
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser: (user) => dispatch({
            type: 'SET_USER_IN_REDUX',
            payload: user
        })
    }
}

export default connect(null, mapDispatchToProps)(Login)