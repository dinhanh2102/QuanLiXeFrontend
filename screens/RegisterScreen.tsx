import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React,{useState} from 'react'
import axios from 'axios';
import { apiUrl } from '../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({navigation}) => {
  const [userName, setUserName] = useState("");
  const [password, setpassword] = useState("");
  const [hoTen, sethoTen] = useState("");
  const [email, setemail] = useState("");
  const [rePassword, setrePassword] = useState("");
  const handlePress = async () => {
    try {
      if (password !== rePassword) {
        return;
      }
      const data = {
        userName,
        password,
        hoTen,
        email,
        rePassword
      }
      const response = await axios.post(apiUrl + "/api/User/register",{
        ...data
      });
      if (response.data.success) {
        await AsyncStorage.setItem('accessToken',response.data.data.accessToken);
        console.log(response.data);
        return navigation.navigate('HomePage');
      }
    } catch (error) {
      console.log(error);
      
    }
  }
  
  return (
    <ScrollView style = {styles.container}>
      <View style = {styles.content}>
        <Text style = {styles.mainText}>Email</Text>
        <TextInput style = {styles.input} value={email} onChangeText={setemail}></TextInput>
        
        <Text style = {styles.mainText}>Tên Tài Khoản : </Text>
        <TextInput style = {styles.input} value={userName} onChangeText={setUserName}></TextInput>

        <Text style = {styles.mainText}> Họ Tên : </Text>
        <TextInput style = {styles.input} value={hoTen} onChangeText={sethoTen}></TextInput>
        
        <Text style = {styles.mainText}>Mật Khẩu : </Text>
        <TextInput style = {styles.input} value={password} onChangeText={setpassword}></TextInput>
        
        <Text style = {styles.mainText}>Nhập Lại Mật Khẩu : </Text>
        <TextInput style = {styles.input} value={rePassword} onChangeText={setrePassword}></TextInput>
        
      </View>
      <View>
      <View>
            <TouchableOpacity onPress={handlePress}>
                <Text style = {styles.button} >Đăng Ký</Text>
            </TouchableOpacity>
        </View>
      </View>
      <View style = {styles.haveAnacccount}>
        <Text style = {styles.text}>Đã có tài khoản ? </Text>
        <TouchableOpacity  onPress={() => navigation.navigate('LoginScreen',)}>
                <Text style = {styles.loginNow}> Đăng Nhập ngay </Text>
            </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 20
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
content: {
      alignItems: "flex-start",
      width: "100%"
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
haveAnacccount :{
      flexDirection: "row",
      margin: 10,
},
loginNow : {
      textDecorationLine: "underline",
      fontSize: 25,
      fontWeight: "900"
},
text : {
      marginRight: 10,
      fontSize: 25,
      fontWeight: "900"
},



})