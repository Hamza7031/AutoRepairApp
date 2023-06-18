import React from 'react'
import { View, Text, ScrollView, } from 'react-native'
import styles from './styles'
const NoteDetailScreen = ({ route }) => {
    const { note } = route.params
    return (
        <View style={styles.container}>
            <ScrollView>
                <Text style={styles.titleHeader}>
                    {note.noteTitle}
                </Text>
                <View style={styles.horizontalLine} ></View>
                <Text style={styles.carDetail} >
                    {note.carDetail}
                </Text>
                <View style={styles.horizontalLine}></View>
                <Text>
                    {note.noteContent}
                </Text>
            </ScrollView>
            <View style={styles.dateDisplay} >
                <Text>
                    {note.noteDate.split('T')[0]}
                </Text>
            </View>
        </View>
    )
}
export default NoteDetailScreen