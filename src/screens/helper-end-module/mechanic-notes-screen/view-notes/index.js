import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList, RefreshControl } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import styles from './styles'

const ViewMechanicNotes = (props) => {
    const [refreshing, setRefreshing] = useState(false)
    const [mechanicNotes, setMechanicNotes] = useState([])
    const getMechanicNotes = async () => {
        axios.post('http://192.168.0.109:3000/get-mechanic-notes', {
            helperMobileNumber: props.user.mobileNumber,
            userRole: props.user.userRole
        }).then(response => {
            setMechanicNotes(response.data)
        }).catch(error => {
            alert(error)
        })
    }
    useEffect(() => {
        getMechanicNotes()
    }, [])
    const onRefresh = useCallback(async () => {
        setRefreshing(true)
        await getMechanicNotes()
        setRefreshing(false)
    }, [])
    const onNotePress = (item) => {
        props.navigation.push('Note Detail Screen', {
            note: item
        })
    }
    return (
        <View style={styles.container}>
            {
                mechanicNotes.length > 0 ? (
                    <FlatList
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                        data={mechanicNotes}
                        keyExtractor={item => item._id}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => onNotePress(item)} >
                                <View style={styles.itemContainer} >
                                    <Text style={styles.titleHeaderText} >
                                        Title: {item.noteTitle}
                                    </Text>
                                    <Text style={styles.carDetailHeaderText} >
                                        Car: {item.carDetail}
                                    </Text>
                                    <Text style={styles.detailHeaderText} numberOfLines={1} >
                                        Detail: {item.noteContent}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    <View style={styles.noReviewsContainer} >
                        <Text style={styles.noReviewsText} >
                            No note found
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
export default connect(mapStateToProps)(ViewMechanicNotes)
