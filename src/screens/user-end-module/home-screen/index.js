import React, { useState, useEffect, } from 'react'
import { View, Text, TouchableOpacity, PermissionsAndroid, Image, Linking, Alert, TextInput, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import Geolocation from 'react-native-geolocation-service'
import axios from 'axios'
import Modal from 'react-native-modal'
import AntDesign from 'react-native-vector-icons/AntDesign'
import StarRating from 'react-native-star-rating'
import MapViewComp from '../../../components/map-view'
import styles from './styles'

const HomeScreen = (props) => {
    const [isAssistanceTypeModalVisible, setIsAssistanceTypeModalVisibl] = useState(false)
    const [isEndJobModalVisible, setIsEndJobModalVisible] = useState(false)
    const [currentLocation, setCurrentLocation] = useState()
    const [requestAccepted, setRequestAccepted] = useState(true)
    const [requestData, setRequestData] = useState(null)
    const [userWouldLikeToRateMechanic, setUserWouldLikeToRateMechanic] = useState(false)
    const [reviewSubmitted, setReviewSubmitted] = useState(false)
    const [starCount, setStarCount] = useState(0)
    const [userReviewDetails, setUserReviewDetails] = useState('')
    const onMechanicSelect = () => {
        props.setUserRequestType('Mechanic')
        setIsAssistanceTypeModalVisibl(false)
    }
    const onFuelDeliverySelect = () => {
        props.setUserRequestType('Fuel Delivery')
        setIsAssistanceTypeModalVisibl(false)
    }
    const onTowingServiceSelect = () => {
        props.setUserRequestType('Tower')
        setIsAssistanceTypeModalVisibl(false)
    }
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
                setCurrentLocation(position)
                axios.post('http://192.168.0.109:3000/update-user-location', {
                    mobileNumber: props.user.mobileNumber,
                    location: position
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
    }
    const checkIfThereIsJobInDb = () => {
        axios.post('http://192.168.0.109:3000/get-current-job', {
            mobileNumber: props.user.mobileNumber
        }).then(response => {
            if (response.data) {
                setRequestData(response.data)
                setRequestAccepted(true)
            } else {
                setRequestAccepted(false)
                setRequestData(null)
            }
        }).catch(error => {
            alert(error)
        })
        setTimeout(checkIfThereIsJobInDb, 5000);
    }
    const onCallPress = () => {
        Linking.openURL(`tel:${requestData.helperDetails.mobileNumber}`)
    }
    const onEndJobPress = () => {
        setIsEndJobModalVisible(true)
    }
    const onPayWithWalletPress = () => {
        axios.post('http://192.168.0.109:3000/pay-with-wallet', {
            mobileNumber: props.user.mobileNumber,
            bill: requestData.costOfService,
            helperDetails: requestData.helperDetails
        }).then(response => {
            if (response.data) {
                Alert.alert(
                    'Payment successful',
                    'The job is done, money for job has been deducted from your wallet.\nThank you for using our services.',
                    ['OK']
                )
            }
            setIsEndJobModalVisible(false)
        }).catch(error => {
            setIsEndJobModalVisible(false)
            if (error.response.status == 405) {
                Alert.alert(
                    'Payment unsuccessful',
                    'You do not have enough balance in your wallet.\nPlease pay in cash.',
                    ['OK']
                )
            } else {
                alert(error)
            }

        })
    }
    const onPayWithCashPress = () => {
        Alert.alert(
            'How to pay with cash?',
            'Please inform the service provider that you will pay in cash, he will enter the amount in the app and the job will end automatically. The extra amount paid will be added to your wallet.\nThank you!',
            ['OK']
        )
        setIsEndJobModalVisible(false)
    }
    const onWantToRatePress = () => {
        setUserWouldLikeToRateMechanic(true)
    }
    const onUserRatingBackPress = () => {
        setUserWouldLikeToRateMechanic(false)
    }
    const onSubmitReviewButtonPress = () => {
        if (reviewSubmitted) {
            alert('You have already submitted a review. Thank you.')
        } else {
            axios.post('http://192.168.0.109:3000/add-user-review-to-helper', {
                helperMobileNumber: requestData.helperDetails.mobileNumber,
                userName: props.user.name,
                reviewDetails: userReviewDetails,
                reviewDate: new Date(),
                reviewStar: starCount,
                userRole: requestData.helperDetails.typeOfService
            }).then(response => {
                if (response.data) {
                    setReviewSubmitted(true)
                    onUserRatingBackPress()
                    setStarCount(0)
                    setUserReviewDetails('')
                    ToastAndroid.show('Review Submitted. Thank you.', ToastAndroid.LONG)
                }
            }).catch(error => {
                alert(error)
            })
        }

    }
    useEffect(() => {
        getCurrentLocation()
        checkIfThereIsJobInDb()
    }, [])

    return (
        <View style={styles.mainView}>
            <View style={styles.mapView}>
                <MapViewComp initialRegion={currentLocation} />
            </View>
            {
                !requestAccepted && (
                    <View style={styles.selectionContainer} >
                        <Text>
                            Select Service
                        </Text>
                        <TouchableOpacity style={styles.selectIconContainer} onPress={() => setIsAssistanceTypeModalVisibl(true)} >
                            {/* <AntDesign name="select1" size={25} /> */}

                            <Image source={require('../../../assets/images/select.png')} style={{width:20,height:20}} />
                             

                        </TouchableOpacity>
                    </View>
                )
            }
            <Modal
                isVisible={isAssistanceTypeModalVisible}
                onBackButtonPress={() => setIsAssistanceTypeModalVisibl(false)}
                onBackdropPress={() => setIsAssistanceTypeModalVisibl(false)}
                backdropColor="white"
            >
                <View>
                    <TouchableOpacity style={styles.subCategoryContainers} onPress={onMechanicSelect} >
                        <Image source={require('../../../assets/images/mechanicIcon.jpg')} style={styles.subCategoryIcon} resizeMode="contain" />
                        <Text>
                            Mechanic
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subCategoryContainers} onPress={onFuelDeliverySelect} >
                        <Image source={require('../../../assets/images/fuelIcon.jpg')} style={styles.subCategoryIcon} resizeMode="contain" />
                        <Text>
                            Fuel
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.subCategoryContainers} onPress={onTowingServiceSelect} >
                        <Image source={require('../../../assets/images/towerIcon.jpg')} style={styles.subCategoryIcon} resizeMode="contain" />
                        <Text>
                            Towing Service
                        </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            {
                requestData != null && (
                    <View style={styles.requestAcceptedView} >
                        <Image
                            style={styles.assistanceImage}
                            source={require('../../../assets/images/assistant_image.png')}
                        />
                        <Text style={styles.assistantNameText} >
                            {requestData.helperDetails.fullName}
                        </Text>
                        <Text>
                            Current Bill: {requestData.costOfService == null ? 0 : requestData.costOfService}
                        </Text>
                        <View style={styles.callMessageMainContainer} >
                            <TouchableOpacity style={styles.callButtonContainer} onPress={onCallPress} >
                                <Text style={styles.callButtonText} >
                                    Call
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.messageButtonContainer} onPress={onEndJobPress} >
                                <Text style={styles.messageButtonText} >
                                    End Job
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.noteText} >
                            Note: End job only if job is complete and you're sattisfied with the bill otherwise ask the provider to generate another bill.
                        </Text>
                    </View>
                )
            }
            <Modal
                isVisible={isEndJobModalVisible}
                backdropColor="white"
                onBackButtonPress={() => setIsEndJobModalVisible(false)}
                onBackdropPress={() => setIsEndJobModalVisible(false)}
            >
                <View>
                    <Text>
                        Select payment option:
                    </Text>
                    <View style={styles.paymentOptionContainer} >
                        <TouchableOpacity style={styles.payWithWalletButtonContainer} onPress={onPayWithWalletPress} >
                            <Text style={styles.callButtonText} >
                                Pay with wallet
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.payWithCashButtonContainer} onPress={onPayWithCashPress} >
                            <Text style={styles.messageButtonText} >
                                Pay with cash
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ratingQuestionTextContainer} onPress={onWantToRatePress} >
                            <Text>
                                Would you like to rate the job?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
            <Modal
                isVisible={userWouldLikeToRateMechanic}
                onBackButtonPress={onUserRatingBackPress}
            >
                <View style={styles.reviewModalInsideContainer} >
                    <View>
                        <StarRating
                            disabled={false}
                            maxStars={5}
                            rating={starCount}
                            selectedStar={(rating) => setStarCount(rating)}
                            fullStarColor="#ffd700"
                        />
                    </View>
                    <TextInput
                        placeholder="Enter Review Details"
                        style={styles.reviewInput}
                        value={userReviewDetails}
                        onChangeText={value => setUserReviewDetails(value)}
                        numberOfLines={3}
                    />
                    <TouchableOpacity style={styles.payWithWalletButtonContainer} onPress={onSubmitReviewButtonPress} >
                        <Text style={styles.callButtonText} >
                            Submit Review
                        </Text>
                    </TouchableOpacity>
                </View>

            </Modal>
        </View >
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userProfileStateReducer,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setUserRequestType: (requestType) => dispatch({
            type: 'SET_USER_REQUEST_TYPE',
            payload: requestType
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)