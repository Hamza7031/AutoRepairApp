import React, { useState, useEffect } from 'react'
import { View, Switch, Text, Image, TouchableOpacity, TextInput, Linking, Alert, ToastAndroid, PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service'
import Modal from 'react-native-modal'
import axios from 'axios'
import styles from './styles'
import { connect } from 'react-redux'

const HelperHomeScreen = (props) => {
    const [isActive, setIsActive] = useState(true)
    const [viewSelectionButtons, setViewSelectionButtons] = useState(true)
    const [currentLocation, setCurrentLocation] = useState(null)
    const [showBillGenerationModal, setShowBillGenerationModal] = useState(false)
    const [isPayInCashModalVisible, setIsPayInCashModalVisible] = useState(false)
    const [userRequest, setUserRequest] = useState(null)
    const [billAmount, setBillAmount] = useState('')
    const [cashPaid, setCashPaid] = useState('')
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
                setCurrentLocation(position.coords)
                axios.post('http://192.168.0.109:3000/update-helper-location', {
                    mobileNumber: props.user.mobileNumber,
                    userRole: props.user.userRole,
                    location: position.coords
                }).then(response => {
                    // do nothing
                }).catch(error => {
                    alert(error)
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
        // setTimeout(getCurrentLocation, 5000)
    }
    const toggleActiveStatus = () => {
        if (isActive == false) {
            setIsActive(true)
            axios.post('http://192.168.0.109:3000/update-helper-active-status', {
                mobileNumber: props.user.mobileNumber,
                userRole: props.user.userRole,
                isActive: true
            }).then(response => {
                //do nothing
            }).catch(error => {
                alert(error)
            })
        } else {
            setIsActive(false)
            axios.post('http://192.168.0.109:3000/update-helper-active-status', {
                mobileNumber: props.user.mobileNumber,
                userRole: props.user.userRole,
                isActive: false
            }).then(response => {
                //do nothing
            }).catch(error => {
                alert(error)
            })
        }

    }
    const checkForRequestsInDb = () => {
        axios.post('http://192.168.0.109:3000/get-user-request', {
            helperMobileNumber: props.user.mobileNumber,
            userRole: props.user.userRole
        }).then(response => {
            if (response.data) {
                setUserRequest(response.data)
                if (response.data.reqestAcceptanceStatus) {
                    setViewSelectionButtons(false)
                } else {
                    setViewSelectionButtons(true)
                }
            }
            else {
                setUserRequest(null)
            }
        }).catch(error => {
            alert(error)
        })
        setTimeout(checkForRequestsInDb, 5000)
    }
    const onAcceptPress = () => {
        axios.post('http://192.168.0.109:3000/accept-user-request', {
            sender: userRequest.requestSender,
            receiver: props.user,
            receiverLocation: currentLocation
        }).then(response => {
            //do nothing
            setViewSelectionButtons(false)
        }).catch(error => {
            alert(error)
        })
    }
    const onRejectPress = () => {
        axios.post('http://192.168.0.109:3000/decline-user-request', {
            user: userRequest.requestSender,
            receiver: props.user
        }).then(response => {
            setUserRequest(null)
        }).catch(error => {
            alert(error)
        })
    }
    const toggleBillModal = () => {
        setBillAmount('')
        setShowBillGenerationModal(!showBillGenerationModal)
    }
    const togglePayInCashModal = () => {
        setCashPaid('')
        setIsPayInCashModalVisible(!isPayInCashModalVisible)
    }
    const onUpdateBillPress = () => {
        axios.post('http://192.168.0.109:3000/update-cost-of-service', {
            mobileNumber: userRequest.requestSender.mobileNumber,
            costOfService: billAmount,
            userRole: userRequest.requestSender.userRole
        }).then(response => {
            //do nothing
        }).catch(error => {
            alert(error)
        })
        toggleBillModal()
    }
    const onMobileNumberPress = () => {
        Linking.openURL(`tel:${userRequest.requestSender.mobileNumber}`)
    }
    const onLocationPress = (location) => {
        Linking.openURL(`google.navigation:q=${location.latitude}+${location.longitude}`)
    }
    const onEndJobPress = () => {
        axios.post('http://192.168.0.109:3000/pay-with-cash', {
            userDetails: userRequest.requestSender,
            helperDetails: props.user,
            cashPaid: cashPaid
        }).then(response => {
            togglePayInCashModal()
            ToastAndroid.show('Job Ended Successfully', ToastAndroid.LONG)
        }).catch(error => {
            if (error.response.status == 405) {
                Alert.alert(
                    'Payment unsuccessful',
                    error.response.data,
                    ['OK']
                )
            } else {
                alert(error)
            }
        })
    }
    useEffect(() => {
        getCurrentLocation()
        checkForRequestsInDb()
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.activityButtonContainer} >
                <Text style={styles.activityText} >
                    Active Status
                </Text>
                <Switch
                    onValueChange={toggleActiveStatus}
                    value={isActive}
                />
            </View>
            <View>
                <Text style={styles.requestHeader} >
                    Current Request
                </Text>
            </View>
            {
                userRequest != null ? (
                    <View>
                        <View style={styles.currentRequestContainer} >
                            <Image
                                source={require('../../../assets/images/male_icon.png')}
                                style={styles.iconStyle}
                            />
                            <Text style={styles.nameText} >
                                {userRequest.requestSender.name}
                            </Text>
                            <TouchableOpacity onPress={onMobileNumberPress} >
                                <Text style={styles.numberText} >
                                    {userRequest.requestSender.mobileNumber}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { onLocationPress(userRequest.requestSender.lastLocation) }} >
                                <Text>
                                    Location
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View>
                            {
                                viewSelectionButtons ? (
                                    <View style={styles.buttonsMainContainer} >
                                        <TouchableOpacity style={styles.buttonContainer} onPress={onAcceptPress} >
                                            <Text style={styles.buttonText} >
                                                Accept
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.buttonContainer} onPress={onRejectPress} >
                                            <Text style={styles.buttonText} >
                                                Reject
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <Text style={styles.requestAcceptedText} >
                                        The request has been accepted by you, press on number to call or on location to open maps.
                                    </Text>
                                )
                            }
                        </View>
                        <View>
                            {
                                !viewSelectionButtons && (
                                    <View>
                                        <TouchableOpacity style={styles.generateBillStyle} onPress={toggleBillModal} >
                                            <Text style={styles.buttonText} >
                                                Generate Bill
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.payInCashTextContainer} onPress={togglePayInCashModal} >
                                            <Text style={styles.payInCashText} >
                                                User wants to pay in cash?
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                )
                            }
                        </View>
                        <Modal
                            isVisible={isPayInCashModalVisible}
                            onBackButtonPress={togglePayInCashModal}
                            onBackdropPress={togglePayInCashModal}
                        >
                            <View>
                                <Text style={styles.amountTextHeader} >
                                    Cash paid:
                                </Text>
                                <TextInput
                                    placeholder="Enter cash paid"
                                    keyboardType="number-pad"
                                    style={styles.amountInput}
                                    value={cashPaid}
                                    onChangeText={value => setCashPaid(value)}
                                />
                                <Text style={styles.helperText} >
                                    Before ending the job, make sure you've generated the bill first.
                                </Text>
                                <TouchableOpacity style={[styles.generateBillStyle, styles.endJobStyle]} onPress={onEndJobPress} >
                                    <Text style={styles.buttonText} >
                                        End Job
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </Modal>
                        <Modal
                            isVisible={showBillGenerationModal}
                            onBackButtonPress={toggleBillModal}
                            onBackdropPress={toggleBillModal}
                        >
                            <View>
                                <Text style={styles.amountTextHeader} >
                                    Amount(Other than check cost):
                                </Text>
                                <TextInput
                                    placeholder="Enter amount"
                                    keyboardType="number-pad"
                                    style={styles.amountInput}
                                    value={billAmount}
                                    onChangeText={value => setBillAmount(value)}
                                />
                                <Text style={styles.helperText} >
                                    Before ending the job, make sure the customer accepts the amount otherwise it can result in cancelation.
                                </Text>
                                <TouchableOpacity style={[styles.generateBillStyle, styles.endJobStyle]} onPress={onUpdateBillPress} >
                                    <Text style={styles.buttonText} >
                                        Update Bill
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Modal>
                    </View>
                ) : (
                    <View style={styles.noRequestTextContainer} >
                        <Text>
                            No Current Request
                        </Text>
                    </View>
                )
            }
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userProfileStateReducer
    }
}

export default connect(mapStateToProps)(HelperHomeScreen)
