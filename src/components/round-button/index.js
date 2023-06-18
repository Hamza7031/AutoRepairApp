import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './styles'

const RoundButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.button}>
            <Text style={styles.text} >
                {props.textToDisplay}
            </Text>
        </TouchableOpacity>
    )
}


export default RoundButton