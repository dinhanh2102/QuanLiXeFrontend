import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiUrl } from '../constant';

const LoginScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLoginPress = async () => {
    try {
      setLoading(true);
      setError('');

      const data = {
        userName,
        password,
      };

      const response = await axios.post(apiUrl + '/api/User/login', { ...data });

      if (response.data.success) {
        await AsyncStorage.setItem('accessToken', response.data.data.accessToken);
        console.log('Saved accessToken');
        navigation.navigate('HomePage');
      } else {
        setError('Tài khoản hoặc mật khẩu không đúng.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Đã xảy ra lỗi, vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.mainText}>Tên Tài Khoản:</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <Text style={styles.mainText}>Mật Khẩu:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          autoCapitalize="none"
          autoCorrect={false}
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => !loading && handleLoginPress()}
        disabled={loading}
      >
        <Text style={styles.buttonText}>{loading ? 'Đang Đăng Nhập...' : 'Đăng Nhập'}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
        <Text style={styles.text3}>Quên mật khẩu?</Text>
      </TouchableOpacity>
      <View style={styles.addAccount}>
        <Text style={styles.text1}>Chưa có tài khoản?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.text2}> Đăng ký ngay </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    content: {
      alignItems: 'flex-start',
      width: '100%',
      marginBottom: 20,
    },
    mainText: {
      marginTop: 20,
      fontSize: 18,
      fontWeight: '500',
      marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#bbb',
    padding: 15,
    borderRadius: 5,
    width: '100%',
    marginBottom: 20,
  },
  button: {
    borderWidth: 1,
    borderColor: '#000',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#3498db',
    marginTop: 10,
    marginBottom: 20,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#fff',
  },
  addAccount: {
    flexDirection: 'row',
    margin: 10,
  },
  text1: {
    marginRight: 10,
    fontSize: 16,
    fontWeight: '500',
  },
  text2: {
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: '700',
  },
  text3: {
    textDecorationLine: 'underline',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginBottom: 10,
  },
});

export default LoginScreen;