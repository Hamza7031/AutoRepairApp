import React, { useState } from 'react'
import { View, Text, TextInput, Button, ScrollView, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import axios from 'axios'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import styles from './styles'


const AddMechanicNotesScreen = (props) => {
    const [note, setNote] = useState({
        noteTitle: '',
        carDetail: '',
        noteContent: '',
        noteDate: new Date().toISOString()
    })
    const onAddNotePress = () => {
        if (note.noteTitle != '') {
            if (note.carDetail != '') {
                if (note.noteContent != '') {
                    axios.post('http://192.168.0.109:3000/add-mechanic-note', {
                        ...note,
                        helperMobileNumber: props.user.mobileNumber,
                        userRole: props.user.userRole
                    }).then(response => {
                        ToastAndroid.show('Note has been successfully added, refresh the list to view', ToastAndroid.SHORT)
                        setNote({
                            ...note,
                            noteTitle: '',
                            carDetail: '',
                            noteContent: ''
                        })
                    }).catch(error => {
                        alert(error)
                    })
                }
                else {
                    alert('Enter some details')
                }
            }
            else {
                alert('Enter Car Model/Details for which this note is')
            }
        }
        else {
            alert('Enter Title')
        }
    }
    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <View style={styles.headerContainer}>
                        <MaterialIcons name="title" size={25} style={styles.headerIcon} />
                        <Text style={styles.headerText} >Title</Text>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Title"
                        value={note.noteTitle}
                        onChangeText={value => setNote({ ...note, noteTitle: value })}
                    />
                </View>
                <View>
                    <View style={styles.headerContainer}>
                        <MaterialIcons name="miscellaneous-services" size={25} style={styles.headerIcon} />
                        <Text style={styles.headerText} >Car Model/Detail</Text>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        placeholder="e.g Honda Civic 2004"
                        value={note.carDetail}
                        onChangeText={value => setNote({ ...note, carDetail: value })}
                    />
                </View>
                <View>
                    <View style={styles.headerContainer}>
                        <MaterialCommunityIcons name="account-details" size={25} style={styles.headerIcon} />
                        <Text style={styles.headerText} >Details</Text>
                    </View>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Details"
                        value={note.noteContent}
                        onChangeText={value => setNote({ ...note, noteContent: value })}
                        multiline={true}
                        numberOfLines={3}
                    />
                </View>
                <View style={styles.buttonStyles} >
                    <Button title="Submit" onPress={onAddNotePress} />
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
export default connect(mapStateToProps)(AddMechanicNotesScreen)
