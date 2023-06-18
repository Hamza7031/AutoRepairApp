import React, { useEffect, useState } from 'react'
import { View, Text, Image, TouchableOpacity, ImageBackground, TextInput, ScrollView, Button, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import Modal from 'react-native-modal'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Fontisto from 'react-native-vector-icons/Fontisto'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'

const ProfileViewScreen = (props) => {
    const [user, setUser] = useState({
        name: props.user.fullName,
        phone: props.user.mobileNumber,
        email: props.user.email,
        gender: props.user.gender,
        dateOfBirth: props.user.dateOfBirth.split('T')[0],
        walletMoney: ''
    })
    const [isGenderModalVisible, setIsGenderModalVisible] = useState(false)
    const onGenderPress = () => {
        setIsGenderModalVisible(!isGenderModalVisible)
    }
    const onMalePress = () => {
        setUser({
            ...user,
            gender: 'Male'
        })
        setIsGenderModalVisible(false)
    }
    const onFemalePress = () => {
        setUser({
            ...user,
            gender: 'Female'
        })
        setIsGenderModalVisible(false)
    }
    const onUpdateButtonPress = () => {
        axios.post('http://192.168.0.109:3000/update-user-profile', {
            fullName: user.name,
            gender: user.gender,
            email: user.email,
            mobileNumber: user.phone
        }).then(response => {
            ToastAndroid.show('Profile has been update, login again to see changes', ToastAndroid.LONG)
        }).catch(error => {
            alert(error)
        })
    }
    const getWalletValue = () => {
        axios.post('http://192.168.0.109:3000/get-user-wallet-value', {
            mobileNumber: user.phone
        }).then(response => {
            setUser({ ...user, walletMoney: response.data })
        }).catch(error => {
            alert(error)
        })
    }
    useEffect(() => {
        getWalletValue()
    }, [])
    return (
        <ScrollView>
            <View style={styles.mainView} >
                <View style={styles.UploadDPPictureContainer}>
                    <ImageBackground style={styles.DPPictureStyles} imageStyle={styles.ImageStyles} source={{ uri: 'https://i.pinimg.com/474x/20/62/69/20626905851e066e66764c3385fa4352.jpg' }} >
                        <View style={styles.MainEntryImageContainer}>
                            <TouchableOpacity style={styles.ImageViewContainer}>
                                <Image style={styles.imageIconStyles} resizeMode="contain" source={require('../../../assets/images/ImageEntry.jpg')} />
                            </TouchableOpacity>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.inputArea} >
                    <View>
                        <Text style={styles.accountInfoHeader} >
                            Account Info
                        </Text>
                    </View>
                    <View style={styles.textView}>
                        <FontAwesome name="user" size={25} color="#0D47A1" />
                        <TextInput style={styles.inputText}
                            keyboardType="name-phone-pad"
                            placeholder="Full Name"
                            placeholderTextColor="grey"
                            editable={true}
                            value={user.name}
                            onChangeText={text => setUser({
                                ...user,
                                name: text
                            })}
                        />
                    </View>
                    <TouchableOpacity style={styles.textView} onPress={onGenderPress} >
                        <Fontisto name="genderless" size={25} color="#0D47A1" />
                        <TextInput style={styles.inputText}
                            textContentType="fullStreetAddress"
                            placeholder="Gender"
                            placeholderTextColor="grey"
                            editable={false}
                            value={user.gender}
                        />
                    </TouchableOpacity>
                    <Modal
                        isVisible={isGenderModalVisible}
                        onBackButtonPress={() => setIsGenderModalVisible(false)}
                        onBackdropPress={() => setIsGenderModalVisible(false)}
                    >
                        <View>
                            <TouchableOpacity style={styles.modalTouchableContainer} onPress={onMalePress} >
                                <Text style={styles.modalTextStyles} >
                                    Male
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalTouchableContainer} onPress={onFemalePress} >
                                <Text style={styles.modalTextStyles} >
                                    Female
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <View style={styles.textView}>
                        <MaterialIcons name="email" size={25} color="#0D47A1" />
                        <TextInput style={styles.inputText}
                            keyboardType="email-address"
                            placeholder="Email"
                            placeholderTextColor="grey"
                            editable={true}
                            value={user.email}
                            onChangeText={value => {
                                setUser({
                                    ...user,
                                    email: value
                                })
                            }}
                        />
                    </View>
                    <View style={styles.textView}>
                        <FontAwesome name="phone" size={25} color="#0D47A1" />
                        <TextInput style={styles.inputText}
                            textContentType="telephoneNumber"
                            placeholder="Phone Number"
                            placeholderTextColor="grey"
                            editable={false}
                            value={user.phone}
                        />
                    </View>
                    <View style={styles.textView}>
                        <Fontisto name="wallet" size={25} color="#0D47A1" />
                        <TextInput style={styles.inputText}
                            placeholder="Wallet Money"
                            placeholderTextColor="grey"
                            editable={false}
                            value={user.walletMoney.toString()}
                        />
                    </View>
                    <View style={styles.textView}>
                        <FontAwesome5 name="calendar-alt" size={25} color="#0D47A1" />
                        <TextInput style={styles.inputText}
                            placeholder="Date of Birth"
                            placeholderTextColor="grey"
                            editable={false}
                            value={user.dateOfBirth}
                        />
                    </View>
                </View>
                <View style={styles.notesContainer} >
                    <Text style={styles.notesText}>
                        * Note: Only name, email and gender are editable
                    </Text>
                </View>
                <View style={{ marginTop: 20, marginHorizontal: 20 }} >
                    <Button title="Update" onPress={onUpdateButtonPress} />
                </View>
            </View>
        </ScrollView>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userProfileStateReducer
    }
}

export default connect(mapStateToProps)(ProfileViewScreen)