import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image } from 'react-native'
import styles from './styles'
import MapViewCompMechanic from '../../../components/map-view-mechanic'
import { connect } from 'react-redux'
import axios from 'axios'
const MechanicCallTowerScreen = (props) => {
    const [requestAccepted, setRequestAccepted] = useState(true)
    const [requestData, setRequestData] = useState(null)
    const checkIfThereIsJobInDb = () => {
        axios.post('http://192.168.0.109:3000/get-mechanic-tower-job', {
            mobileNumber: props.user.mobileNumber,
            userRole: props.user.userRole
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
    useEffect(() => {
        checkIfThereIsJobInDb()
    }, [])
    return (
        <View style={styles.container}>
            <MapViewCompMechanic />
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
                            <TouchableOpacity style={styles.callButtonContainer} >
                                <Text style={styles.callButtonText} >
                                    Call
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.noteText} >
                            Note: To end the job, tell the tower and pay cash. {'\n'}Thank you!
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

export default connect(mapStateToProps)(MechanicCallTowerScreen)
