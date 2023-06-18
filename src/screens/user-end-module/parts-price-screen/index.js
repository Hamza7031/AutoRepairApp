import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import axios from 'axios'
import styles from './styles';


const PartsPriceScreen = () => {
    const [pricingData, setPricingData] = useState([])
    const getPricingData = () => {
        axios.get('http://192.168.0.109:3000/prediction')
            .then(response => {
                setPricingData(response.data)
                console.log(response.data)
            }).catch(error => {
                alert(error)
            })
    }
    const getImage = (itemName) => {
        if (itemName == 'Oil Filter') {
            return require('../../../assets/images/oil_filter.jpg')
        } else if (itemName == 'Air Filter') {
            return require('../../../assets/images/air_filter.jpg')
        } else if (itemName == 'Bolt') {
            return require('../../../assets/images/bolt.jpg')
        } else if (itemName == 'Fuse') {
            return require('../../../assets/images/fuse.jpg')
        } else if (itemName == 'Tyre') {
            return require('../../../assets/images/tyre.jpg')
        } else if (itemName == 'Spark Plug') {
            return require('../../../assets/images/spark_plug.jpg')
        } else if (itemName == 'Break Pad') {
            return require('../../../assets/images/break_pad.jpg')
        } else if (itemName == 'Tie Rod Ends') {
            return require('../../../assets/images/tie_rod_end.jpg')
        } else if (itemName == 'Control Arm') {
            return require('../../../assets/images/control_arm.png')
        }
    }
    useEffect(() => {
        getPricingData()
    }, [])
    return (
        <View style={styles.container} >
            {
                pricingData.length > 0 ? (
                    <FlatList
                        data={pricingData}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <View style={styles.serviceMainContainer} >
                                <View style={styles.imageContainer} >
                                    <Image source={getImage(item.name)} style={styles.imageStyles} />
                                </View>
                                <View style={styles.detailsContainer} >
                                    <Text style={styles.partNameText} >{item.name}</Text>
                                    <Text style={styles.partPriceText}>{item.price}</Text>
                                </View>
                            </View>
                        )}
                    />
                ) : (
                    <View>
                        <Text>
                            No pricing information found.
                        </Text>
                    </View>
                )
            }
            {/* <ScrollView>
                <View style={styles.container}>
                    {
                        dummyData.map((item) => {
                            return (
                                <View key={item.partId} style={styles.serviceMainContainer} >
                                    <View style={styles.imageContainer} >
                                        <Image source={item.partImage} style={styles.imageStyles} />
                                    </View>
                                    <View style={styles.detailsContainer} >
                                        <Text style={styles.partNameText} >{item.partName}</Text>
                                        <Text style={styles.partPriceText}>{item.partPrice}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
            </ScrollView> */}
        </View>
    );
};
export default PartsPriceScreen;
