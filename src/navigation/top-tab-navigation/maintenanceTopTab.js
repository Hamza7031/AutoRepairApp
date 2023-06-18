import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { AddNewRecordScreen } from '../../screens/user-end-module/index'
import { MaintenanceHistoryScreen } from '../../screens/user-end-module/index'

const Tab = createMaterialTopTabNavigator()

const MaintenanceTopTabBar = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Add New Record" component={AddNewRecordScreen} />
            <Tab.Screen name="Record History" component={MaintenanceHistoryScreen} />
        </Tab.Navigator>
    )
}

export default MaintenanceTopTabBar