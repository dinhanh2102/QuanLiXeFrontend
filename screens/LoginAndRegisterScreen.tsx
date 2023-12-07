import { StyleSheet, Text, View, TouchableOpacity, Button, Image } from 'react-native'
import React from 'react'



const LoginAndRegisterScreen = ({navigation}) => {
    return (
        <View style = {styles.container}>
          
            <TouchableOpacity onPress={() => navigation.navigate('LoginScreen', )}>
                <Text style = {styles.login} >Đăng Nhập</Text>
            </TouchableOpacity>
                
            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen', )}>
                <Text style = {styles.register}>Đăng Ký</Text>
            </TouchableOpacity>
         
        </View>
      );
    };
    
    export default LoginAndRegisterScreen;
    
    const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
        padding: 20
      },
    login :{
        borderWidth: 1,
        borderColor: "#000",
        padding: 15,
        borderRadius: 5,
        backgroundColor: "yellow",
        width: "45%",
        alignItems: "center",
        marginBottom: 30 ,
        fontSize : 40
      },
      register :{
        
        borderWidth: 1,
        borderColor: "#000",
        padding: 15,
        borderRadius: 5,
        backgroundColor: "yellow",
        width: "45%",
        alignItems: "center",    
        fontSize : 40
      },
      image:{
        width:'100%',
        height:'100%',
      },
    })