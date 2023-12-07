import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, ActivityIndicator, FlatList } from 'react-native';
import  { useState } from 'react'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';



import LoginAndRegisterScreen from './screens/LoginAndRegisterScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import HomePage from './screens/HomePage';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import GivePasswordScreen from './screens/GivePasswordScreen';
import ToyotaCarScreen from './screens/ToyotaCarScreen';
import CarScreen from './screens/CarScreen'
const StackNavigator = createStackNavigator({
  
  LoginAndRegisterScreen: {screen: LoginAndRegisterScreen},
  LoginScreen : {screen: LoginScreen},
  RegisterScreen : {screen: RegisterScreen},
  HomePage : {screen : HomePage},
  ForgotPasswordScreen : {screen : ForgotPasswordScreen},
  GivePasswordScreen : {screen: GivePasswordScreen},
  ToyotaCarScreen : {screen: ToyotaCarScreen},
  CarScreen : {screen: CarScreen}
}, { 
  initialRouteName: "LoginScreen"
})

 
export default createAppContainer(StackNavigator)