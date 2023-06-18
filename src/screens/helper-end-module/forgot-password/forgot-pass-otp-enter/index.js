import React from 'react'
import { View, Text, ImageBackground, Image, TextInput, ScrollView } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { StackActions } from '@react-navigation/native'
import firebaseSetup from '../../../../firebase/setup'
import RoundButton from '../../../../components/round-button'
import styles from './styles'

const HelperForgotPasswordOtpVerify = ({ navigation, route }) => {
    const { auth } = firebaseSetup()
    const { mobileNumber, confirm, userRole } = route.params
    const [otp, setOtp] = useState('')
    const [authenticated, setAuthenticated] = useState(false)
    const placeholderColor = '#f0f8ff'
    const otpVerify = async () => {
        try {
            const verification = await confirm.confirm(otp)
            if (verification) {
                auth().onAuthStateChanged((user) => {
                    if (user) {
                        setAuthenticated(true)
                    }
                })
            } else {
                alert('Authentication failed.\nPlease try again.')
            }
        } catch (error) {
            alert(error)
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
                    setAuthenticated(true)
                }
            })
        } catch (error) {
            alert(error)
        }
    })
    useEffect(() => {
        if (authenticated) {
            navigation.dispatch(
                StackActions.replace('Helper Forgot Pass Enter New Pass Screen', {
                    mobileNumber: mobileNumber,
                    userRole: userRole
                })
            )
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
                            Enter Your Mobile Number
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
                                editable={true}
                                value={otp}
                                onChangeText={value => setOtp(value)}
                            />
                        </View>
                    </View>
                    <RoundButton onPress={onVerifyCodeButtonPress} textToDisplay="Next" />
                </ScrollView>
            </ImageBackground>
        </View>
    )
}
export default HelperForgotPasswordOtpVerify