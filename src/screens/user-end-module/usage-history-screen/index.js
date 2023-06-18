import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import axios from 'axios'
import Icon from 'react-native-vector-icons/EvilIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import styles from './styles'
import { connect } from 'react-redux'

const UsageHistoryScreen = (props) => {
    const [usageData, setUsageData] = useState([])
    const [refreshing, setRefreshing] = useState(false)
    const getUsageHistory = async () => {
        await axios.post('http://192.168.0.109:3000/get-user-usage-history', {
            mobileNumber: props.user.mobileNumber
        }).then(response => {
            setUsageData(response.data)
        }).catch(error => {
            alert(error)
        })
    }
    useEffect(() => {
        getUsageHistory()
    }, [])
    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await getUsageHistory()
        setRefreshing(false)
    }, [])
    return (
        <View style={styles.mainView} >
            {
                usageData.length > 0 ? (
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        data={usageData}
                        keyExtractor={item => item._id}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity>
                                <View style={styles.horizontalLineContainer}>
                                    <View style={styles.lineContainer} />
                                    <View>
                                        <Text style={styles.rideIdContainer}>{usageData.length - index}</Text>
                                    </View>
                                    <View style={styles.lineContainer} />
                                </View>
                                <View style={[styles.flexDir, styles.spaceBetDateTimePrice]}>
                                    <View >
                                        <Text style={styles.title} >
                                            {item.usageDate.split('T')[0]}
                                        </Text>
                                    </View>
                                    <View style={styles.timeContainer} >
                                        <Text style={styles.title}>
                                            {item.usageDate.split('T')[1].slice(0, 5)}
                                        </Text>
                                    </View>
                                    <View>
                                        <Text style={styles.title}>
                                            Rs {item.costOfService}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.flexDir} >
                                    <View style={styles.locationIconContainer}>
                                        <Icon color="green" name="location" size={20} />
                                    </View>
                                    <View>
                                        <Text style={styles.details} >
                                            {item.userLocation.latitude} , {item.userLocation.longitude}
                                        </Text>
                                    </View>
                                </View>
                                <View style={styles.flexDir} >
                                    <View style={styles.locationIconContainer} >
                                        <Entypo color="red" name="location-pin" size={20} />
                                    </View>
                                    <View>
                                        <Text style={styles.details} >
                                            {item.helperLocation.latitude} , {item.helperLocation.longitude}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    <View style={styles.noReviewsContainer} >
                        <Text style={styles.noReviewsText} >
                            No record found.
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
export default connect(mapStateToProps)(UsageHistoryScreen)