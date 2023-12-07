import { View, Text, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react'

const HomePage = ({ navigation }) => {
  const [searchColor, setSearchColor] = useState("");
  const handleSearch = () => {

  }
  return (
    <View style={styles.container}>
      <View style={styles.img}>
        <TouchableOpacity>
          <Image
            source={require("../assets/avataricon.png")}
          />
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>Xin chào!User</Text>
      <Text style={styles.nearheader}>
        Đây là nơi bạn có thể tìm kiếm chiếc xe bạn yêu thích!
        --------------------------------------------</Text>
      <Text style={styles.question}>Bạn muốn tìm loại xe nào ?</Text>
      <TextInput
        value={searchColor}
        onChange={() => setSearchColor(searchColor)}
        style={styles.input}
        placeholder="Tìm kiếm..."
      />
      <TouchableOpacity onPress={handleSearch}>
        <Text>Search</Text>
      </TouchableOpacity>
      <View style={{ width: 70, height: 50, top: 50, left: 70 }} >
        <TouchableOpacity onPress={() => navigation.navigate('ToyotaCarScreen', { id: 'toyota' })}>
          <Image
            source={require("../assets/toyotaicon.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={{ width: 70, height: 50, top: 10, left: 450 }} >
        <TouchableOpacity>
          <Image
            source={require("../assets/hyundaiicon.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={{ top: 120, left: 80 }} >
        <TouchableOpacity>
          <Image
            source={require("../assets/hondaicon.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={{ top: 50, left: 460 }} >
        <TouchableOpacity>
          <Image
            source={require("../assets/mericon.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={{ top: 140, left: 470 }}>
        <TouchableOpacity>
          <Image
            source={require("../assets/bwmicon.png")}
          />
        </TouchableOpacity>
      </View>
      <View style={{ width: 100, height: 100, top: 50, left: 45 }}>
        <TouchableOpacity>
          <Image
            source={require("../assets/mazdaicon.png")}
          />
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default HomePage;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    top: 0,
    left: 60,
    width: '80%',
    height: 80,
    borderWidth: 1, // Độ dày của đường viền
    borderColor: 'gray', // Màu sắc của đường viền
    borderRadius: 10, // Độ cong của góc (nếu muốn có góc bo tròn)
    padding: 10, // Khoảng cách từ nội dung đến viền
    margin: 10,
    fontSize: 20,
  },
  header: {
    top: 20,
    left: 45,
    fontSize: 40,
  },
  nearheader: {
    top: 20,
    left: 45,
    height: 100,
    width: 300,
    padding: 15,
    fontSize: 20,

  },
  question: {
    top: 0,
    left: 30,
    padding: 30,
    fontSize: 30,
  },

  img: {
    top: 20,
    left: 520,
    padding: 20,
    width: 30,
  },


})