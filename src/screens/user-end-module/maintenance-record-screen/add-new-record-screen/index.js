import React, { useRef, useState } from 'react';
import { View, Text, TextInput, SafeAreaView, ScrollView, Button, TouchableOpacity, ToastAndroid } from 'react-native'
import axios from 'axios'
import { connect } from 'react-redux'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import FontAwsome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import styles from './styles'

const AddNewRecordScreen = (props) => {
    const [serviceRecord, setServiceRecord] = useState({
        serviceDate: '',
        serviceType: '',
        costOfService: '',
        currentMileage: '',
        serviceNotesDetails: '',
        nextServiceDate: ''
    })
    const [isServiceDatePickerVisible, setIsServiceDatePickerVisible] = useState(false)
    const [isNextServiceDatePickerVisible, setIsNextServiceDatePickerVisible] = useState(false)
    const serviceTypeRef = useRef()
    const costOfServiceRef = useRef()
    const currentMileageRef = useRef()
    const serviceNotesRef = useRef()
    const onServiceDatePress = () => {
        setIsServiceDatePickerVisible(!isServiceDatePickerVisible)
    }
    const onNextServiceDatePress = () => {
        setIsNextServiceDatePickerVisible(!isNextServiceDatePickerVisible)
    }
    const onDatePickerConfirmPress = (date) => {
        setServiceRecord({ ...serviceRecord, serviceDate: date.toISOString().split('T')[0] })
    }
    const onNextDatePickerConfirmPress = (date) => {
        setServiceRecord({ ...serviceRecord, nextServiceDate: date.toISOString().split('T')[0] })
    }
    const onAddNewRecordPress = () => {
        if (serviceRecord.serviceDate != '') {
            if (serviceRecord.serviceType != '') {
                if (serviceRecord.costOfService != '') {
                    if (serviceRecord.currentMileage != '') {
                        if (serviceRecord.nextServiceDate != '') {
                            axios.post('http://192.168.0.109:3000/add-service-record', {
                                ...serviceRecord,
                                mobileNumber: props.user.mobileNumber
                            }).then(response => {
                                ToastAndroid.show('Record added, please refresh the list', ToastAndroid.LONG)
                                setServiceRecord({
                                    ...serviceRecord,
                                    serviceDate: '',
                                    serviceType: '',
                                    costOfService: '',
                                    currentMileage: '',
                                    serviceNotesDetails: '',
                                    nextServiceDate: ''
                                })
                            }).catch(error => {
                                alert(error)
                            })
                        }
                        else {
                            alert('Mention next service date')
                        }
                    }
                    else {
                        alert('Specify current milleage')
                    }
                }
                else {
                    alert('Specify cost of servuce')
                }
            }
            else {
                alert('Mention the type of service done')
            }
        }
        else {
            alert('Mention service date')
        }
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.container}>
                    <View>
                        <View style={styles.headerContainer}>
                            <FontAwsome name="calendar" size={25} style={styles.headerIcon} />
                            <Text style={styles.headerText} >Servic Date</Text>
                        </View>
                        <TouchableOpacity onPress={onServiceDatePress}>
                            <TextInput
                                style={styles.textInput}
                                placeholder="dd/mm/yyyy"
                                value={serviceRecord.serviceDate}
                                editable={false}
                            />
                        </TouchableOpacity>
                    </View>
                    <DateTimePickerModal
                        isVisible={isServiceDatePickerVisible}
                        mode="date"
                        onConfirm={onDatePickerConfirmPress}
                        onCancel={() => setIsServiceDatePickerVisible(false)}
                    />
                    <View>
                        <View style={styles.headerContainer}>
                            <MaterialIcons name="miscellaneous-services" size={25} style={styles.headerIcon} />
                            <Text style={styles.headerText} >Servic Type</Text>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Define Service Type"
                            value={serviceRecord.serviceType}
                            onChangeText={value => setServiceRecord({ ...serviceRecord, serviceType: value })}
                        />
                    </View>
                    <View>
                        <View style={styles.headerContainer}>
                            <Entypo name="price-tag" size={25} style={styles.headerIcon} />
                            <Text style={styles.headerText} >Cost of Service</Text>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Cost(PKR)"
                            value={serviceRecord.costOfService}
                            onChangeText={value => setServiceRecord({ ...serviceRecord, costOfService: value })}
                            keyboardType="number-pad"
                        />
                    </View>
                    <View>
                        <View style={styles.headerContainer}>
                            <SimpleLineIcons name="speedometer" size={25} style={styles.headerIcon} />
                            <Text style={styles.headerText} >Current Mileage</Text>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter Current Mileage in KMs"
                            value={serviceRecord.currentMileage}
                            onChangeText={value => setServiceRecord({ ...serviceRecord, currentMileage: value })}
                            keyboardType="number-pad"
                        />
                    </View>
                    <View>
                        <View style={styles.headerContainer}>
                            <MaterialIcons name="notes" size={25} style={styles.headerIcon} />
                            <Text style={styles.headerText} >Service Notes/Details</Text>
                        </View>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Add Additional Service Notes"
                            value={serviceRecord.serviceNotesDetails}
                            onChangeText={value => setServiceRecord({ ...serviceRecord, serviceNotesDetails: value })}
                        />
                    </View>
                    <View>
                        <View style={styles.headerContainer}>
                            <FontAwsome name="calendar" size={25} style={styles.headerIcon} />
                            <Text style={styles.headerText} >Next Service Date</Text>
                        </View>
                        <TouchableOpacity onPress={onNextServiceDatePress} >
                            <TextInput
                                style={styles.textInput}
                                placeholder="dd/mm/yyyy"
                                value={serviceRecord.nextServiceDate} editable={false}
                            />
                        </TouchableOpacity>
                    </View>
                    <DateTimePickerModal
                        isVisible={isNextServiceDatePickerVisible}
                        mode="date"
                        onConfirm={onNextDatePickerConfirmPress}
                        onCancel={() => setIsNextServiceDatePickerVisible(false)}
                    />
                </View>
                <View style={styles.buttonStyles} >
                    <Button title="Submit" onPress={onAddNewRecordPress} />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => {
    return {
        user: state.userProfileStateReducer
    }
}


export default connect(mapStateToProps)(AddNewRecordScreen)
