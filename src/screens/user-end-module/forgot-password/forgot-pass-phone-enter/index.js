import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, TextInput, ScrollView } from 'react-native'
import Feather from 'react-native-vector-icons/Feather'
import axios from 'axios'
import { StackActions } from '@react-navigation/native'
import firebaseSetup from '../../../../firebase/setup'
import RoundButton from '../../../../components/round-button/index'
import styles from './styles'

const ForgotPassPhoneNumberEntry = ({ navigation }) => {
    const { auth } = firebaseSetup()
    const placeholderColor = '#f0f8ff'
    let confirm = null
    const [mobileNumber, setMobileNumber] = useState('')
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true)
    const phoneRegex = /[\+]\d{12}/
    const sendOtpMessageToNumber = async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(mobileNumber)
            confirm = confirmation
            if (confirm != null) {
                navigation.dispatch(
                    StackActions.replace('Forgot Password Otp', {
                        mobileNumber: mobileNumber,
                        confirm: confirm
                    })
                )
            } else {
                alert('Authentication failed.\nTry again later.')
            }
        }
        catch (error) {
            alert(error)
        }
    }
    const checkIfPhoneNumberIsValid = () => {
        if (phoneRegex.test(mobileNumber)) {
            setIsPhoneNumberValid(true)
        }
        else {
            setIsPhoneNumberValid(false)
        }
    }
    useEffect(() => {
        checkIfPhoneNumberIsValid()
    }, [mobileNumber])
    useEffect(() => {
        if (auth().currentUser) {
            auth().signOut()
        }
    }, [])
    const onNextButtonPress = () => {
        if (isPhoneNumberValid) {
            axios.post('http://192.168.0.109:3000/check-user-for-forgot-password', {
                mobileNumber: mobileNumber
            }).then((response) => {
                if (response.data) {
                    sendOtpMessageToNumber()
                }
            }).catch(error => {
                if (error.response.status == 404) {
                    alert(error.response.data)
                } else {
                    alert(error)
                }
            })
        }
        else {
            alert('Please check your mobile number format.\nIt should be in following format: \n+92 300 0000 000')
        }
    }
    return (
        <View style={styles.mainView} >
            <ImageBackground style={styles.backgroundImage} resizeMode="cover" source={require('../../../../assets/images/main-background.jpg')} >
                <ScrollView>
                    <View>
                        <Image source={require('../../../../assets/images/logo.jpg')} style={styles.logo} />
                    </View>
                    <View>
                        <Text style={styles.screenHeader} >
                            Enter Your Mobile Number
                        </Text>
                    </View>
                    <View style={styles.inputArea} >
                        <View style={styles.textView}>
                            <Feather name="phone" size={15} color="white" />
                            <TextInput
                                style={styles.inputText}
                                keyboardType="number-pad"
                                textContentType="telephoneNumber"
                                placeholder="+92 300 000 0000"
                                placeholderTextColor={placeholderColor}
                                editable={true}
                                value={mobileNumber}
                                onChangeText={value => setMobileNumber(value)}
                            />
                        </View>
                    </View>
                    <RoundButton onPress={onNextButtonPress} textToDisplay="Next" />
                </ScrollView>
            </ImageBackground>
        </View>
    )
}
export default ForgotPassPhoneNumberEntry