import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
    LoginScreen,
    PasswordEntryScreen,
    DataEntryScreen,
    VehicleInformationEntryScreen,
    ForgotPassPhoneNumberEntry,
    ForgotPasswordOtpVerify,
    ForgotPasswordNewPassword,
    MobileNumberEntryScreen,
    OtpEntryScreen
} from '../screens/user-end-module/index'
import DrawerNavigation from './drawer-navigation/userDrawerNavigation'

import MainAppScreen from '../screens/main-app-screen/index'

import {
    HelperLoginScreen,
    HelperMobileNumberEntryScreen,
    HelperOtpEntryScreen,
    HelperPasswordEntryScreen,
    HelperDataEntryScreen,
    HelperForgotPassPhoneNumberEntry,
    HelperForgotPasswordOtpVerify,
    HelperForgotPasswordNewPassword,
    NoteDetailScreen
} from '../screens/helper-end-module/index'
import HelperDrawerNavigator from './drawer-navigation/helperDrawerNavigation'

const Stack = createStackNavigator()

const headerShown = {
    headerShown: false
}
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

const StackNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={screenOptions} >
                <Stack.Screen component={MainAppScreen} name="Main Screen" options={headerShown} />

                <Stack.Screen component={MobileNumberEntryScreen} name="Enter Mobile Number Screen" options={headerShown} />
                <Stack.Screen component={OtpEntryScreen} name="Enter OTP Screen" options={headerShown} />
                <Stack.Screen component={PasswordEntryScreen} name="Enter Password Screen" options={headerShown} />
                <Stack.Screen component={DataEntryScreen} name="Enter Data Screen" options={headerShown} />
                <Stack.Screen component={VehicleInformationEntryScreen} name="Vehicle Information Entry Screen" options={headerShown} />
                <Stack.Screen component={ForgotPassPhoneNumberEntry} name="Forgot Password Phone Number" options={headerShown} />
                <Stack.Screen component={ForgotPasswordOtpVerify} name="Forgot Password Otp" options={headerShown} />
                <Stack.Screen component={ForgotPasswordNewPassword} name="Forgot Password New Password" options={headerShown} />
                <Stack.Screen component={LoginScreen} name="Login Screen" options={headerShown} />
                <Stack.Screen component={DrawerNavigation} name="Drawer Navigation" options={headerShown} />

                <Stack.Screen component={HelperLoginScreen} name="Helper Login Screen" options={headerShown} />
                <Stack.Screen component={HelperDrawerNavigator} name="Helper Drawer Navigation" options={headerShown} />
                <Stack.Screen component={HelperMobileNumberEntryScreen} name="Helper Mobile Number Screen" options={headerShown} />
                <Stack.Screen component={HelperOtpEntryScreen} name="Helper Otp Screen" options={headerShown} />
                <Stack.Screen component={HelperPasswordEntryScreen} name="Helper Password Screen" options={headerShown} />
                <Stack.Screen component={HelperDataEntryScreen} name="Helper Data Entry Screen" options={headerShown} />
                <Stack.Screen component={HelperForgotPassPhoneNumberEntry} name="Helper Forgot Pass Number Entry Screen" options={headerShown} />
                <Stack.Screen component={HelperForgotPasswordOtpVerify} name="Helper Forgot Pass Otp Screen" options={headerShown} />
                <Stack.Screen component={HelperForgotPasswordNewPassword} name="Helper Forgot Pass Enter New Pass Screen" options={headerShown} />
                <Stack.Screen component={NoteDetailScreen} name="Note Detail Screen" options={({ route }) => ({ title: route.params.note.noteTitle })} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default StackNavigation