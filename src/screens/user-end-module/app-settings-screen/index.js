import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import styles from './styles'

const AppSettingScreen = () => {
    const language = 'English'
    return (
        <View style={styles.mainView}>
            <View style={styles.sectionHeader} >
                <Text style={styles.sectionHeaderText} >
                    General
                </Text>
            </View>
            <View style={styles.sectionView} >
                <View style={styles.profileRowView} >
                    <View style={styles.iconsContainer}>
                        <View>
                            <Icon style={styles.iconAlign} name="language" size={20} />
                        </View>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title} >
                            Language
                    </Text>
                        <Text style={styles.details}>
                            {language}
                        </Text>
                    </View>
                    <View style={styles.iconsContainer}>
                        <TouchableOpacity>
                            <FontAwesome5 name="edit" size={20} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.profileRowView} >
                    <View style={styles.iconsContainer}>
                        <View>
                            <MaterialIcons style={styles.iconAlign} name="star-border" size={25} />
                        </View>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title} >
                            Rate the App
                    </Text>
                    </View>
                </View>
                <View style={styles.profileRowView} >
                    <View style={styles.iconsContainer}>
                        <View>
                            <SimpleLineIcons style={styles.iconAlign} name="logout" size={20} />
                        </View>
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.title} >
                            Sign-out
                    </Text>
                    </View>
                </View>
            </View>
        </View>
    )
}
export default AppSettingScreen