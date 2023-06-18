import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
    HelperProfileViewScreen,
    UserReviewScreen,
    HelperHomeScreen,
    MechanicCallTowerScreen
} from '../../screens/helper-end-module/index'
import MechanicNotesTopTabBar from '../top-tab-navigation/mechanicNotesTopTab'
import HelperCustomDrawer from '../../components/helper-custom-drawer'

const Drawer = createDrawerNavigator()

const screenOptions = {
    headerShown: true,
    headerStyle: {
        backgroundColor: '#0241d8',
    },
    headerTitleStyle: {
        color: 'white'
    },
    headerTintColor: 'white'
}

const HelperDrawerNavigator = () => {
    return (
        <Drawer.Navigator
            screenOptions={screenOptions}
            drawerContent={(props) => { return (<HelperCustomDrawer {...props} />) }} initialRouteName={HelperHomeScreen} >
            <Drawer.Screen name="Helper Home" component={HelperHomeScreen} options={{ title: 'Home' }} />
            <Drawer.Screen name="Helper Profile" component={HelperProfileViewScreen} options={{ title: 'Profile' }} />
            <Drawer.Screen name="User Review Screen" component={UserReviewScreen} options={{ title: 'Reviews' }} />
            <Drawer.Screen name="Mechanic Notes" component={MechanicNotesTopTabBar} options={{ title: 'Notes' }} />
            <Drawer.Screen name="Mechanic Call Tower Screen" component={MechanicCallTowerScreen} options={{ title: 'Call Tower' }} />
        </Drawer.Navigator >
    )
}
export default HelperDrawerNavigator