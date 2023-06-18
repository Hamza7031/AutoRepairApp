import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, SafeAreaView, RefreshControl, FlatList } from 'react-native';
import { connect } from 'react-redux';
import axios from 'axios';
import styles from './styles';

const MaintenanceHistoryScreen = (props) => {
  const [maintenanceRecord, setMaintenanceRecord] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getMaintenanceData = useCallback(async () => {
    try {
      const response = await axios.post('http://192.168.0.109:3000/get-service-record', {
        mobileNumber: props.user.mobileNumber
      });
      setMaintenanceRecord(response.data);
    } catch (error) {
      alert(error);
    }
  }, [props.user.mobileNumber]);

  useEffect(() => {
    getMaintenanceData();
  }, [getMaintenanceData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await getMaintenanceData();
    setRefreshing(false);
  }, [getMaintenanceData]);

  return (
    <SafeAreaView>
      {maintenanceRecord.length > 0 ? (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={maintenanceRecord}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View key={item.serviceId} style={styles.serviceMainContainer}>
              <View style={styles.dataContainer}>
                <Text> Date of Service: </Text>
                <Text> {item.serviceDate.split('T')[0]} </Text>
              </View>
              <View style={styles.dataContainer}>
                <Text> Next Service Date: </Text>
                <Text> {item.nextServiceDate.split('T')[0]} </Text>
              </View>
              <View style={styles.dataContainer}>
                <Text> Service Type: </Text>
                <Text> {item.serviceType} </Text>
              </View>
              <View style={styles.dataContainer}>
                <Text> Service Cost: </Text>
                <Text> {item.costOfService + ' Rs'} </Text>
              </View>
              <View style={styles.dataContainer}>
                <Text> Service Mileage: </Text>
                <Text> {item.currentMileage} </Text>
              </View>
            </View>
          )}
        />
      ) : (
        <View style={styles.noReviewsContainer}>
          <Text style={styles.noReviewsText}>No record found.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.userProfileStateReducer
  };
};

export default connect(mapStateToProps)(MaintenanceHistoryScreen);
