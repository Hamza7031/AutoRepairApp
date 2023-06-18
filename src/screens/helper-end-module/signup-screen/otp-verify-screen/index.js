import React, { useState, useEffect } from 'react'
import { View, Text, ImageBackground, Image, TextInput, ScrollView } from 'react-native'
import { StackActions } from '@react-navigation/native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import RoundButton from '../../../../components/round-button/index'
import ProgressLoader from 'rn-progress-loader'
import firebaseSetup from '../../../../firebase/setup'
import styles from './styles'

const HelperOtpEntryScreen = ({ navigation, route }) => {
    const { auth } = firebaseSetup()
    const { mobileNumber, confirm } = route.params
    const placeholderColor = '#f0f8ff'
    const [otp, setOtp] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    const otpVerify = async () => {
        setIsLoading(true)
        try {
            const verification = await confirm.confirm(otp)
            if (verification) {
                auth().onAuthStateChanged((user) => {
                    if (user) {
                        setAuthenticated(true)
                    }
                    setIsLoading(false)
                })
            } else {
                alert('Authentication failed.\nPlease try again.')
                setIsLoading(false)
            }
        } catch (error) {
            alert(error)
            setIsLoading(false)
        }
    }
    const onVerifyCodeButtonPress = () => {
        if (otp.length > 5 && otp.length < 7) {
            otpVerify()
        }
        else {
            alert('Enter the 6-digit code you received')
        }
    }
    useEffect(() => {
        try {
            auth().onAuthStateChanged(user => {
                if (user) {
                    navigation.dispatch(
                        StackActions.replace('Helper Password Screen', {
                            mobileNumber: mobileNumber
                        })
                    )
                    setAuthenticated(true)
                }
            })
        } catch (error) {
            alert(error)
        }
    })
    useEffect(() => {
        if (authenticated) {
            setIsLoading(true)
            navigation.dispatch(
                StackActions.replace('Helper Password Screen', {
                    mobileNumber: mobileNumber
                })
            )
            setIsLoading(false)
        }
    }, [authenticated])
    return (
        <View style={styles.mainView} >
            <ImageBackground style={styles.backgroundImage} resizeMode="cover" source={require('../../../../assets/images/helperLoginBackground_2.jpg')} >
                <ScrollView>
                    <View>
                        <Image source={require('../../../../assets/images/logo.jpg')} style={styles.logo} />
                    </View>
                    <View>
                        <Text style={styles.screenHeader} >
                            Enter OTP
                        </Text>
                    </View>
                    <View style={styles.inputArea} >
                        <View style={styles.textView}>
                            <MaterialCommunityIcons name="barcode" size={15} color="white" />
                            <TextInput
                                style={styles.inputText}
                                keyboardType="number-pad"
                                textContentType="telephoneNumber"
                                placeholder="Enter the 6 digit code"
                                placeholderTextColor={placeholderColor}
                                value={otp}
                                onChangeText={value => setOtp(value)}
                                editable={true} />
                        </View>
                    </View>
                    <RoundButton onPress={onVerifyCodeButtonPress} textToDisplay="Next" />
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
export default HelperOtpEntryScreen