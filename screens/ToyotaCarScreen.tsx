import { useFocusEffect, useRoute, RouteProp } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Button, Modal, StyleSheet } from 'react-native';
import { RootStackParamList } from '../type';
import axios from 'axios';
import { apiUrl } from '../constant';

interface Car {
  color: string,
  id: number,
  idType: string,
  maxPrice: number,
  minPrice: number,
  name: string,
  phanKhuc: string,
  price: string,
  version: string,
  year: string,
}
type ToyotaCarScreenRouteProp = RouteProp<RootStackParamList, 'ToyotaCarScreen'>;


const ToyotaCarScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  const [car, setCar] = useState<Car[]>([]);
  const [color, setColor] = useState<string>('')
  const fetchData = async () => {

    const response = await axios.get(apiUrl + '/api/Product/get-car/toyota')
    console.log(response.data);
    setCar(response.data)
    console.log(car, "car");
  }
  
  const handleSearch = async () => {
    let model = {
      color: color,
      id: '',
      idType: '',
      maxPrice: 0,
      minPrice: 0,
      name: searchText,
      phanKhuc: '',
      price: 0,
      version: '',
      year: '',
    }
    const response = await axios.post(apiUrl + '/api/Product/search', {
      ...model
    })
    console.log(response.data);
    setCar(response.data)
  }
  useEffect(() => {
    fetchData();

  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Text>Tên xe</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm..."
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />

      </View>
      <View style={styles.searchContainer}>
        <Text>Màu xe</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm..."
          onChangeText={(text) => setColor(text)}
          value={color}
        />
      </View>
      <TouchableOpacity onPress={handleSearch}> 
        <Text>Search</Text>
      </TouchableOpacity>
      <View> 
        {car.map(s => (
          <View>
            <Text>{s.name} - {s.color}</Text>
          </View>
        ))}
      </View>



    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: '#3498db',
    borderWidth: 1,
    flex: 1,
    borderRadius: 5,
    paddingLeft: 10,
  },
  clearButton: {
    padding: 10,
  },
  clearButtonText: {
    color: '#3498db',
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  filterButtonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
  modalContainer: {
    padding: 20,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2c3e50',
  },
  filterItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#3498db',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  result: {
    marginTop: 20,
    fontSize: 16,
    color: '#2c3e50',
  },
  carItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#bdc3c7',
    paddingVertical: 10,
  },
  resetButton: {
    backgroundColor: '#e74c3c',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  resetButtonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default ToyotaCarScreen;
