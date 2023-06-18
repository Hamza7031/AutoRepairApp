import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import {
    AddMechanicNotesScreen,
    ViewMechanicNotes
} from '../../screens/helper-end-module/index'

const Tab = createMaterialTopTabNavigator()

const MechanicNotesTopTabBar = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Add New Note" component={AddMechanicNotesScreen} />
            <Tab.Screen name="View All Notes" component={ViewMechanicNotes} />
        </Tab.Navigator>
    )
}

export default MechanicNotesTopTabBar