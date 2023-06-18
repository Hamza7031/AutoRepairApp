import React from 'react'
import { TouchableOpacity, Text } from 'react-native'
import styles from './styles'

const RoundBorderButton = (props) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={[styles.button, props.style]}>
            <Text style={[styles.text, props.textStyle]} >
                {props.textToDisplay}
            </Text>
        </TouchableOpacity>
    )
}


export default RoundBorderButton