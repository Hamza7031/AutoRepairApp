import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import {
    HomeScreen,
    ProfileViewScreen,
    AppSettingScreen,
    GetSupportScreen,
    UsageHistoryScreen,
    PartsPriceScreen
} from '../../screens/user-end-module/index'
import MaintenanceTopTabBar from '../top-tab-navigation/maintenanceTopTab'
import CustomDrawerContent from '../../components/custom-drawer/index'

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

const DrawerNavigation = () => {
    return (
        <Drawer.Navigator
            screenOptions={screenOptions}
            drawerContent={(props) => { return (<CustomDrawerContent {...props} />) }} initialRouteName={HomeScreen} >
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Profile" component={ProfileViewScreen} />
            <Drawer.Screen name="Maintenance" component={MaintenanceTopTabBar} />
            <Drawer.Screen name="Parts" component={PartsPriceScreen} />
            <Drawer.Screen name="Settings" component={AppSettingScreen} />
            <Drawer.Screen name="Support" component={GetSupportScreen} />
            <Drawer.Screen name="History" component={UsageHistoryScreen} />
        </Drawer.Navigator >
    )
}
export default DrawerNavigation