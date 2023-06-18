import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, ImageBackground, Image, TextInput, ScrollView, PermissionsAndroid } from 'react-native'
import { CommonActions } from '@react-navigation/native'
import EncryptedStorage from 'react-native-encrypted-storage'
import axios from 'axios'
import ProgressLoader from 'rn-progress-loader'
import Modal from 'react-native-modal'
import Geolocation from 'react-native-geolocation-service'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
import AntDesign from 'react-native-vector-icons/AntDesign'
import RoundButton from '../../../../components/round-button/index'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import styles from './styles'
import { connect } from 'react-redux'

const HelperDataEntryScreen = (props) => {
    const { mobileNumber, password } = props.route.params
    const [user, setUser] = useState({
        cnic: '',
        fullName: '',
        mobileNumber: mobileNumber,
        experience: '',
        gender: '',
        dateOfBirth: '',
        password: password,
        userRole: '',
        lastLocation: {
            longitude: '',
            latitude: ''
        },
    })
    let helperSkills = []
    const [isCnicValid, setIsCnicValid] = useState(false)
    const [isFullNameValid, setIsFullNameValid] = useState(false)
    const [isExperienceValid, setIsExperienceValid] = useState(false)
    const [isDateOfBirthValid, setIsDateOfBirthValid] = useState(false)
    const [isGenderValid, setIsGenderValid] = useState(false)
    const [isDatePickerVisible, setIsDatePickerVisible] = useState(false)
    const [showGenderModal, setShowGenderModal] = useState(false)
    const [showRoleModal, setShowRoleModal] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const placeholderColor = '#f0f8ff'
    const cnicRegex = /\d{5}[\-]\d{7}[\-]\d{1}/
    const sendDataToDb = () => {
        setIsLoading(true)
        axios.post('http://192.168.0.109:3000/insert-helper', {
            ...user,
            skills: helperSkills
        })
            .then(async response => {
                if (response.data) {
                    props.setUserData(response.data)
                    await EncryptedStorage.setItem(
                        'user_session',
                        JSON.stringify(response.data)
                    )
                }
            }).then(() => {
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
            })
            .catch(error => {
                alert(error)
                setIsLoading(false)
            })
    }
    const onSignUpButtonPress = () => {
        if (isCnicValid) {
            if (isFullNameValid) {
                if (isExperienceValid) {
                    if (isDateOfBirthValid) {
                        if (isGenderValid) {
                            if (user.userRole == 'Mechanic') {
                                if (helperSkills.length > 0) {
                                    sendDataToDb()
                                } else {
                                    alert('Please specify your skillset.')
                                }
                            } else {
                                sendDataToDb()
                            }
                        }
                        else {
                            alert('Specify your gender')
                        }
                    }
                    else {
                        alert('Select your date of birth, you must be at least 18 years old')
                    }
                }
                else {
                    alert('Enter your experience')
                }
            }
            else {
                alert('Enter your full name')
            }
        }
        else {
            alert('Enter valid CNIC with dashes(-)')
        }
    }
    const getUserAge = () => {
        const today = new Date()
        const birthDate = new Date(user.dateOfBirth.toString())
        let age = today.getFullYear() - birthDate.getFullYear()
        const m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age
    }
    const checkIfCnicIsValid = () => {
        if (cnicRegex.test(user.cnic)) {
            setIsCnicValid(true)
        }
        else {
            setIsCnicValid(false)
        }
    }
    const checkIfFullNameValid = () => {
        if (user.fullName.length > 0) {
            setIsFullNameValid(true)
        }
        else {
            setIsFullNameValid(false)
        }
    }
    const checkIfExperienceIsValid = () => {
        if (user.experience.length > 0) {
            setIsExperienceValid(true)
        }
        else {
            setIsExperienceValid(false)
        }
    }
    const checkIfDateOfBirthIsValid = () => {
        if (getUserAge() >= 18) {
            setIsDateOfBirthValid(true)
        }
        else {
            setIsDateOfBirthValid(false)
        }
    }
    const checkIfGenderIsValid = () => {
        if (user.gender != '') {
            setIsGenderValid(true)
        }
        else {
            setIsGenderValid(false)
        }
    }
    const onDobPress = () => {
        setIsDatePickerVisible(true)
    }
    const onConfirmDatePress = (date) => {
        setUser({ ...user, dateOfBirth: date.toISOString().split('T')[0] })
        setIsDatePickerVisible(false)
    }
    const onCancelDatePress = () => {
        setIsDatePickerVisible(false)
    }
    const onGenderPress = () => {
        setShowGenderModal(true)
    }
    const onRolePress = () => {
        setShowRoleModal(true)
    }
    useEffect(() => {
        checkIfCnicIsValid()
        checkIfFullNameValid()
        checkIfExperienceIsValid()
        checkIfDateOfBirthIsValid()
        checkIfGenderIsValid()
    })
    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true
            } else {
                return false
            }
        } catch (error) {
            alert(error)
        }
    }
    const getCurrentLocation = () => {
        if (requestLocationPermission()) {
            Geolocation.getCurrentPosition(position => {
                setUser({
                    ...user,
                    lastLocation: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    }
                })
            }, error => {
                alert(error)
            },
                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 10000
                })
        }
    }
    const filterSkills = (bool, skill) => {
        if (bool == true) {
            helperSkills.push(skill)
        } else {
            if (helperSkills.includes(skill)) {
                const updatedSkills = helperSkills.filter(item => {
                    if (item != skill) {
                        return item
                    }
                })
                helperSkills = updatedSkills
            }
        }
        console.log(helperSkills)
    }
    useEffect(() => {
        getCurrentLocation()
    }, [])
    return (

        <View style={styles.mainView} >
            <ImageBackground style={styles.backgroundImage} resizeMode="cover" source={require('../../../../assets/images/helperLoginBackground_2.jpg')} >
                <ScrollView>
                    <View>
                        <Image source={require('../../../../assets/images/logo.jpg')} style={styles.logo} />
                    </View>
                    <View>
                        <Text style={styles.screenHeader} >
                            Enter Details
                        </Text>
                    </View>
                    <View style={styles.inputArea} >
                        <View style={styles.textView}>
                            <AntDesign name="idcard" size={15} color="white" />
                            <TextInput
                                style={styles.inputText}
                                textContentType="telephoneNumber"
                                keyboardType="number-pad"
                                placeholder="Enter CNIC"
                                placeholderTextColor={placeholderColor}
                                editable={true}
                                value={user.cnic}
                                onChangeText={value => { setUser({ ...user, cnic: value }) }}
                            />
                        </View>
                        <View style={styles.textView}>
                            <SimpleLineIcons name="user" size={15} color="white" />
                            <TextInput
                                style={styles.inputText}
                                textContentType="name"
                                placeholder="Enter Full Name"
                                placeholderTextColor={placeholderColor}
                                editable={true}
                                value={user.fullName}
                                onChangeText={value => { setUser({ ...user, fullName: value }) }}
                            />
                        </View>
                        <View style={styles.textView}>
                            <Entypo name="back-in-time" size={15} color="white" />
                            <TextInput
                                style={styles.inputText}
                                keyboardType="number-pad"
                                textContentType="name"
                                placeholder="Experience"
                                placeholderTextColor={placeholderColor}
                                editable={true}
                                value={user.experience}
                                onChangeText={value => { setUser({ ...user, experience: value }) }}
                            />
                        </View>
                        <TouchableOpacity style={styles.textView} onPress={onDobPress} >
                            <FontAwesome name="calendar" size={15} color="white" />
                            <TextInput
                                style={styles.inputText}
                                placeholder="Date of birth"
                                placeholderTextColor={placeholderColor}
                                editable={false}
                                value={user.dateOfBirth}
                            />
                        </TouchableOpacity>
                        <DateTimePickerModal
                            isVisible={isDatePickerVisible}
                            mode="date"
                            onConfirm={onConfirmDatePress}
                            onCancel={onCancelDatePress}
                            maximumDate={new Date()}
                        />
                        <TouchableOpacity style={styles.textView} onPress={onGenderPress} >
                            <Fontisto name="genderless" size={15} color="white" />
                            <TextInput
                                style={styles.inputText}
                                placeholder="Gender"
                                placeholderTextColor={placeholderColor}
                                editable={false}
                                value={user.gender}
                            />
                        </TouchableOpacity>
                        <Modal
                            isVisible={showGenderModal}
                            onBackButtonPress={() => setShowGenderModal(false)}
                            onBackdropPress={() => setShowGenderModal(false)}
                        >
                            <View>
                                <TouchableOpacity style={styles.modalTouchableContainer} onPress={() => {
                                    setUser({ ...user, gender: 'Male' })
                                    setShowGenderModal(false)
                                }}  >
                                    <Text style={styles.modalTextStyles} >
                                        Male
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalTouchableContainer} onPress={() => {
                                    setUser({ ...user, gender: 'Female' })
                                    setShowGenderModal(false)
                                }} >
                                    <Text style={styles.modalTextStyles} >
                                        Female
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                        <TouchableOpacity style={styles.textView} onPress={onRolePress} >
                            <FontAwesome5 name="user-cog" size={15} color="white" />
                            <TextInput
                                style={styles.inputText}
                                placeholder="Type of service"
                                placeholderTextColor={placeholderColor}
                                editable={false}
                                value={user.userRole}
                            />
                        </TouchableOpacity>
                        <Modal
                            isVisible={showRoleModal}
                            onBackButtonPress={() => setShowRoleModal(false)}
                            onBackdropPress={() => setShowRoleModal(false)}
                        >
                            <View>
                                <TouchableOpacity style={styles.modalTouchableContainer} onPress={() => {
                                    setUser({ ...user, userRole: 'Mechanic' })
                                    setShowRoleModal(false)
                                }}  >
                                    <Text style={styles.modalTextStyles} >
                                        Mechanic
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalTouchableContainer} onPress={() => {
                                    setUser({ ...user, userRole: 'Tower' })
                                    setShowRoleModal(false)
                                }} >
                                    <Text style={styles.modalTextStyles} >
                                        Tower
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalTouchableContainer} onPress={() => {
                                    setUser({ ...user, userRole: 'Fuel Deliverer' })
                                    setShowRoleModal(false)
                                }} >
                                    <Text style={styles.modalTextStyles} >
                                        Fuel Deliverer
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                        {
                            user.userRole == 'Mechanic' && (
                                <View style={styles.textView}>
                                    <AntDesign name="car" size={15} color="white" />
                                    <View style={styles.skillsCheckBoxContainer} >
                                        <View style={styles.skillsRowContainer} >
                                            <BouncyCheckbox
                                                text="LTV"
                                                fillColor='#5a7050'
                                                onPress={value => filterSkills(value, 'LTV')}
                                                textStyle={styles.checkboxTextStyle}
                                            />
                                            <BouncyCheckbox
                                                text="HTV"
                                                fillColor='#5a7050'
                                                onPress={value => filterSkills(value, 'HTV')}
                                                textStyle={styles.checkboxTextStyle}
                                            />
                                            <BouncyCheckbox
                                                text="CVT"
                                                fillColor='#5a7050'
                                                onPress={value => filterSkills(value, 'CVT')}
                                                textStyle={styles.checkboxTextStyle}
                                            />

                                        </View>
                                        <View style={styles.skillsRowContainer} >
                                            <BouncyCheckbox
                                                text="Manual"
                                                fillColor='#5a7050'
                                                onPress={value => filterSkills(value, 'Manual')}
                                                textStyle={styles.checkboxTextStyle}
                                            />
                                            <BouncyCheckbox
                                                text="Automatic"
                                                fillColor='#5a7050'
                                                onPress={value => filterSkills(value, 'Automatic')}
                                                textStyle={styles.checkboxTextStyle}
                                            />
                                            <BouncyCheckbox
                                                text="Hybrid"
                                                fillColor='#5a7050'
                                                onPress={value => filterSkills(value, 'Hybrid')}
                                                textStyle={styles.checkboxTextStyle}
                                            />
                                        </View>
                                    </View>
                                </View>
                            )
                        }
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

export default connect(null, mapDispatchToProps)(HelperDataEntryScreen)