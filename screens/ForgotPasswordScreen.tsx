import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'

const ForgotPasswordScreen = ({navigation}) => {
  return (
    <View style = {styles.container}>
      <View style = {styles.content}>
      <Text style = {styles.mainText}>Email</Text>
      <TextInput style = {styles.input}></TextInput>
      <Text style = {styles.mainText}>Tên Tài Khoản</Text>
      <TextInput style = {styles.input}></TextInput>
      </View>
      
      <View>
            <TouchableOpacity onPress={() => navigation.navigate('GivePasswordScreen', )}>
                <Text style = {styles.button} >Lấy lại mật khẩu</Text>
            </TouchableOpacity>
        </View>
            <View style = {styles.rememberPassword}>
                <Text style = {styles.text1}>Đã nhớ mật khẩu ?</Text>
                <TouchableOpacity  onPress={() => navigation.navigate('LoginScreen',)}>
                    <Text style = {styles.text2}> Đăng nhập ngay </Text>
                </TouchableOpacity>
        </View>
    </View>
    
  )
}

export default ForgotPasswordScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "space-evenly",
        padding: 20
  },
  content: {
    alignItems: "flex-start",
    width: "100%",
  },
  button :{
    borderWidth: 1,
    borderColor: "#000",
    padding: 15,
    borderRadius: 5,
    backgroundColor: "yellow",
    marginTop: 30,
    marginBottom: 30 ,
    fontSize : 40,
    alignItems: "flex-start",
    width: "100%"
  },
  mainText: {
    marginTop: 20,
    fontSize: 25,
    fontWeight: "900",
    padding: 20
},  
input: {
    borderWidth: 1,
    borderColor: "#bbb",
    padding: 20,
    borderRadius: 5,
    width: "100%",
},
rememberPassword:{
    flexDirection: "row",
    margin: 10,
},
text1 :{
    marginRight: 10,
    fontSize: 25,
    fontWeight: "900"
},
text2 :{
    textDecorationLine: "underline",
    fontSize: 25,
    fontWeight: "900"
},
})