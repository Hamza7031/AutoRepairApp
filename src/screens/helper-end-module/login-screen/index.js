import React, { useState, useRef, useEffect } from 'react'
import { View, Text, ImageBackground, TextInput, TouchableOpacity, Image, Keyboard } from 'react-native'
import { ButtonGroup } from 'react-native-elements'
import { connect } from 'react-redux'
import { CommonActions } from '@react-navigation/native'
import axios from 'axios'
import ProgressLoader from 'rn-progress-loader'
import EncryptedStorage from 'react-native-encrypted-storage'
import Feather from 'react-native-vector-icons/Feather'
import RoundButton from '../../../components/round-button/index'
import styles from './styles'


const HelperLogin = (props) => {
    const phoneRegex = /[\+]\d{12}/
    const [mobileNumber, setMobileNumber] = useState('')
    const [password, setPassword] = useState('')
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const buttons = ['Mechanic', 'Tower', 'Fuel Delivery']
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
    const onForgetPasswordPress = () => {
        props.navigation.push('Helper Forgot Pass Number Entry Screen')
    }
    const onLoginButtonPress = async () => {
        setIsLoading(true)
        if (isPhoneNumberValid == false) {
            alert('Check mobile number')
            setIsLoading(false)
        }
        else {
            await axios.post('http://192.168.0.109:3000/find-helper-for-login', {
                mobileNumber: mobileNumber,
                password: password,
                userRole: buttons[selectedIndex]
            }).then(async (response) => {
                await EncryptedStorage.setItem('user_session', JSON.stringify(response.data))
                props.setUser(response.data)
                props.navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes: [
                            {
                                name: 'Helper Drawer Navigation'
                            }
                        ]
                    })
                )
                setIsLoading(false)
            }).catch(error => {
                if (error.response.status == 404) {
                    alert('User not found')
                    setIsLoading(false)
                }
                else if (error.response.status == 401) {
                    alert('Wrong password, please check your password.')
                    setIsLoading(false)
                }
                else {
                    alert(error)
                    setIsLoading(false)
                }
            })
        }
    }
    const onSignUpButtonPress = () => {
        props.navigation.push('Helper Mobile Number Screen')
    }
    useEffect(() => {
        checkIfPhoneNumberIsValid()
    })
    return (
        <View style={styles.mainView} >
            <ImageBackground style={styles.backgroundImage} source={require('../../../assets/images/helperLoginBackground_2.jpg')} >
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
                    <View style={styles.buttonGroupMainContainer} >
                        <ButtonGroup
                            buttons={buttons}
                            onPress={item => setSelectedIndex(item)}
                            selectedButtonStyle={{ backgroundColor: 'grey' }}
                            selectedIndex={selectedIndex}
                            containerStyle={styles.buttonGroupContainer}
                        />
                    </View>
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

export default connect(null, mapDispatchToProps)(HelperLogin)