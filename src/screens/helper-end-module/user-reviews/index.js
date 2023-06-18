import React, { useEffect, useState, useCallback } from 'react'
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import Entypo from 'react-native-vector-icons/Entypo'
import styles from './styles'

const UserReviewScreen = (props) => {
    const [refreshing, setRefreshing] = useState(false)
    const [userReviewsData, setUserReviewsData] = useState([])
    const getUserReviews = async () => {
        await axios.post('http://192.168.0.109:3000/get-helper-reviews', {
            helperMobileNumber: props.user.mobileNumber
        }).then(response => {
            setUserReviewsData(response.data)
        }).catch(error => {
            alert(error)
        })
    }
    useEffect(() => {
        getUserReviews()
    }, [])
    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await getUserReviews()
        setRefreshing(false)
    }, [])
    return (
        <View style={styles.mainView}>
            {
                userReviewsData.length > 0 ? (
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        data={userReviewsData}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => (
                            <TouchableOpacity>
                                <View style={[styles.flexDir, styles.spaceBetDateTimePrice]}>
                                    <View >
                                        <Text style={styles.title} >
                                            {item.userName}
                                        </Text>
                                    </View>
                                    <View style={styles.timeContainer} >
                                        <Text style={styles.title}>
                                            {item.reviewDate.split('T')[0]}
                                        </Text>
                                    </View>
                                </View>
                                <View style={[styles.flexDir, styles.spaceBetDateTimePrice]} >
                                    <Text style={[styles.details, styles.detailsContainer]} numberOfLines={1} >
                                        {item.reviewDetails}
                                    </Text>
                                    <View style={styles.reviewContainer} >
                                        <Entypo name="star" size={20} color="#ffd700" />
                                        <Text style={styles.details} >
                                            {item.reviewStar}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    <View style={styles.noReviewsContainer} >
                        <Text style={styles.noReviewsText} >
                            Oops, no reviews yet
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

export default connect(mapStateToProps)(UserReviewScreen)
