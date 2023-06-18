import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Image, TextInput, ScrollView } from 'react-native'
import EncryptedStorage from 'react-native-encrypted-storage'
import { CommonActions } from '@react-navigation/native'
import Modal from 'react-native-modal'
import axios from 'axios'
import { connect } from 'react-redux'
import ProgressLoader from 'rn-progress-loader'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import RoundButton from '../../../../components/round-button/index'
import styles from './styles'

const VehicleInformationEntryScreen = (props) => {
    const { user } = props.route.params
    const placeholderColor = '#f0f8ff'
    const [vehicleInformation, setVehicleInformation] = useState({
        make: '',
        model: '',
        year: '',
        engineCc: '',
        transmission: '',
        mileage: ''
    })
    const [isMakeValid, setIsMakeValid] = useState(false)
    const [isModelValid, setIsModelValid] = useState(false)
    const [isYearValid, setIsYearValid] = useState(false)
    const [isEngineCcValid, setIsEngineCcValid] = useState(false)
    const [isMilleageValid, setIsMilleageValid] = useState(false)
    const [isTransmissionValid, setIsTransmissionValid] = useState(false)
    const [showTransmissionModal, setShowTransmissionModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const onSignUpButtonPress = () => {
        setIsLoading(true)
        if (isMakeValid) {
            if (isModelValid) {
                if (isYearValid) {
                    if (isEngineCcValid) {
                        if (isMilleageValid) {
                            if (isTransmissionValid) {
                                const finalUser = {
                                    ...user,
                                    vehicleInformation: vehicleInformation
                                }
                                axios.post('http://192.168.0.109:3000/insert-user', finalUser)
                                    .then(async (response) => {
                                        props.setUserData(response.data)
                                        await EncryptedStorage.setItem('user_session',
                                            JSON.stringify(response.data))
                                    })
                                    .then(() => {
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
                                    })
                                    .catch(error => {
                                        alert(error)
                                        setIsLoading(false)
                                    })

                            }
                            else {
                                setIsLoading(false)
                                alert('Specify car transmission')
                            }
                        }
                        else {
                            setIsLoading(false)
                            alert('Specify car milliage')
                        }
                    }
                    else {
                        setIsLoading(false)
                        alert('Specify engine size')
                    }
                }
                else {
                    setIsLoading(false)
                    alert('Specify the built year of car')
                }
            }
            else {
                setIsLoading(false)
                alert('Specify model of car')
            }
        }
        else {
            setIsLoading(false)
            alert('Specify company of car')
        }
        // navigation.push('Drawer Navigation')
    }
    const checkIfMakeIsValid = () => {
        if (vehicleInformation.make.length > 0) {
            setIsMakeValid(true)
        }
        else {
            setIsMakeValid(false)
        }
    }
    const checkIfModelIsValid = () => {
        if (vehicleInformation.make.length > 0) {
            setIsModelValid(true)
        }
        else {
            setIsModelValid(false)
        }
    }
    const checkIfYearIsValid = () => {
        if (vehicleInformation.year.length > 0) {
            setIsYearValid(true)
        }
        else {
            setIsYearValid(false)
        }
    }
    const checkIfEngineCapacityIsValid = () => {
        if (vehicleInformation.engineCc.length > 0) {
            setIsEngineCcValid(true)
        }
        else {
            setIsEngineCcValid(false)
        }
    }
    const checkIfMilleageIsValid = () => {
        if (vehicleInformation.mileage.length > 0) {
            setIsMilleageValid(true)
        }
        else {
            setIsMilleageValid(false)
        }
    }
    const checkIfTransmissionIsValid = () => {
        if (vehicleInformation.transmission != '') {
            setIsTransmissionValid(true)
        }
        else {
            setIsTransmissionValid(false)
        }
    }
    const onTransimssionPress = () => {
        setShowTransmissionModal(true)
    }
    useEffect(() => {
        checkIfMakeIsValid()
        checkIfModelIsValid()
        checkIfYearIsValid()
        checkIfEngineCapacityIsValid()
        checkIfMilleageIsValid()
        checkIfTransmissionIsValid()
    })
    return (
        <View style={styles.mainView} >
            <ImageBackground style={styles.backgroundImage} resizeMode="cover" source={require('../../../../assets/images/main-background.jpg')} >
                <ScrollView>
                    <View>
                        <Image source={require('../../../../assets/images/logo.jpg')} style={styles.logo} />
                    </View>
                    <View style={{ marginTop: 30 }} >
                        <Text style={styles.screenHeader} >
                            Enter Vehicle Details
                        </Text>
                    </View>
                    <View style={styles.inputArea} >
                        <View style={styles.textView}>
                            <FontAwesome name="building-o" size={15} color="white" />
                            <TextInput
                                style={styles.inputText}
                                keyboardType="name-phone-pad"
                                placeholder="Enter Vehicle Make e.g Honda"
                                placeholderTextColor={placeholderColor}
                                editable={true}
                                value={vehicleInformation.make}
                                onChangeText={value => setVehicleInformation({ ...vehicleInformation, make: value })}
                            />
                        </View>
                        <View style={styles.textView}>
                            <FontAwesome name="car" size={15} color="white" />
                            <TextInput
                                style={styles.inputText}
                                textContentType="name"
                                placeholder="Enter Model e.g Civic"
                                placeholderTextColor={placeholderColor}
                                editable={true}
                                value={vehicleInformation.model}
                                onChangeText={value => setVehicleInformation({ ...vehicleInformation, model: value })}
                            />
                        </View>
                        <View style={styles.textView}>
                            <FontAwesome name="calendar" size={15} color="white" />
                            <TextInput
                                style={styles.inputText}
                                keyboardType="number-pad"
                                placeholder="Enter Year"
                                placeholderTextColor={placeholderColor}
                                editable={true}
                                value={vehicleInformation.year}
                                onChangeText={value => setVehicleInformation({ ...vehicleInformation, year: value })}
                            />
                        </View>
                        <View style={styles.textView}>
                            <MaterialCommunityIcons name="engine" size={15} color="white" />
                            <TextInput
                                style={styles.inputText}
                                placeholder="Engine size"
                                keyboardType="number-pad"
                                placeholderTextColor={placeholderColor}
                                value={vehicleInformation.engineCc}
                                onChangeText={value => setVehicleInformation({ ...vehicleInformation, engineCc: value })}
                            />
                        </View>
                        <View style={styles.textView}>
                            <SimpleLineIcons name="speedometer" size={15} color="white" />
                            <TextInput
                                style={styles.inputText}
                                placeholder="Enter Mileage"
                                placeholderTextColor={placeholderColor}
                                keyboardType="number-pad"
                                value={vehicleInformation.mileage}
                                onChangeText={value => setVehicleInformation({ ...vehicleInformation, mileage: value })}
                            />
                        </View>
                        <TouchableOpacity style={styles.textView} onPress={onTransimssionPress} >
                            <MaterialIcons name="miscellaneous-services" size={15} color="white" />
                            <TextInput
                                style={styles.inputText}
                                placeholder="Enter Transmission Type"
                                placeholderTextColor={placeholderColor}
                                editable={false}
                                value={vehicleInformation.transmission}
                            />
                        </TouchableOpacity>
                        <Modal
                            isVisible={showTransmissionModal}
                            onBackButtonPress={() => setShowTransmissionModal(false)}
                            onBackdropPress={() => setShowTransmissionModal(false)}
                        >
                            <View>
                                <TouchableOpacity style={styles.modalTouchableContainer} onPress={() => {
                                    setVehicleInformation({ ...vehicleInformation, transmission: 'Manual' })
                                    setShowTransmissionModal(false)
                                }}  >
                                    <Text style={styles.modalTextStyles} >
                                        Manual
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalTouchableContainer} onPress={() => {
                                    setVehicleInformation({ ...vehicleInformation, transmission: 'Automatic' })
                                    setShowTransmissionModal(false)
                                }} >
                                    <Text style={styles.modalTextStyles} >
                                        Automatic
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                    <RoundButton onPress={onSignUpButtonPress} textToDisplay="Sign up" />
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

const mapDispatchToProps = (dispatch) => {
    return {
        setUserData: (user) => dispatch({
            type: 'SET_USER_IN_REDUX',
            payload: user
        })
    }
}

export default connect(null, mapDispatchToProps)(VehicleInformationEntryScreen)