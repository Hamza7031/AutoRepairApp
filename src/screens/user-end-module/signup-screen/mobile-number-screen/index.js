import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, TextInput, ScrollView, BackHandler, Alert } from 'react-native'
import { StackActions } from '@react-navigation/native'
import { HelperText } from 'react-native-paper'
import Feather from 'react-native-vector-icons/Feather'
import ProgressLoader from 'rn-progress-loader'
import axios from 'axios'
import RoundButton from '../../../../components/round-button/index'
import firebaseSetup from '../../../../firebase/setup'
import styles from './styles'

const MobileNumberEntryScreen = ({ navigation }) => {
    const { auth } = firebaseSetup()
    let confirm = null
    const [mobileNumber, setMobileNumber] = useState('')
    const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const phoneRegex = /[\+]\d{12}/
    const placeholderColor = '#f0f8ff'
    const sendOtpMessageToNumber = async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(mobileNumber)
            confirm = confirmation
            if (confirm != null) {
                navigation.dispatch(
                    StackActions.replace('Enter OTP Screen', {
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
    const onNextButtonPress = () => {
        setIsLoading(true)
        if (isPhoneNumberValid) {
            axios.post('http://192.168.0.109:3000/check-for-user-in-database', {
                mobileNumber: mobileNumber
            }).then((response) => {
                if (response.data) {
                    sendOtpMessageToNumber()
                    setIsLoading(false)
                }
            }).catch(error => {
                setIsLoading(false)
                if (error.response.status == 405) {
                    alert(error.response.data)
                } else {
                    alert(error)
                }
            })
        }
        else {
            setIsLoading(false)
            alert('Please check your mobile number format.\nIt should be in following format: \n+92 300 0000 000')
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
                                keyboardType="phone-pad"
                                textContentType="telephoneNumber"
                                placeholder="+92 300 000 0000"
                                value={mobileNumber}
                                onChangeText={value => setMobileNumber(value)}
                                placeholderTextColor={placeholderColor}
                                editable={true} />
                        </View>
                        <HelperText style={styles.helperTextStyles} type="error" visible={!isPhoneNumberValid} >
                            * Check your mobile number format
                        </HelperText>
                    </View>
                    <RoundButton onPress={onNextButtonPress} textToDisplay="Next" />
                </ScrollView>
                <ProgressLoader
                    visible={isLoading}
                    isModal={true}
                    isHUD={true}
                    color="#0241d8" />
            </ImageBackground>
        </View>
    )
}
export default MobileNumberEntryScreen