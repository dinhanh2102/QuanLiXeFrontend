import { useFocusEffect, useRoute,RouteProp  } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Button, Modal, StyleSheet } from 'react-native';
import { RootStackParamList } from '../type';

interface Car {
  brand: string;
  model: string;
}
type ToyotaCarScreenRouteProp = RouteProp<RootStackParamList, 'ToyotaCarScreen'>;


const CarScreen =({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isFilterModalVisible, setIsFilterModalVisible] = useState(false);

  const cars: Car[] = [
    { brand: 'Toyota', model: 'Camry' },
    { brand: 'Toyota', model: 'Corolla' },
    { brand: 'Honda', model: 'Civic' },
    { brand: 'Honda', model: 'Accord' },
    { brand: 'Ford', model: 'Fusion' },
    { brand: 'Ford', model: 'Escape' },
  ];
  useEffect(() => {
    // Lọc danh sách xe dựa trên tiêu chí bộ lọc
    let filteredList = cars;
    if (selectedBrand) {
      filteredList = filteredList.filter((car) => car.brand === selectedBrand);
    }
    if (selectedModel) {
      filteredList = filteredList.filter((car) => car.model === selectedModel);
    }
    if (searchText) {
      const searchTerm = searchText.toLowerCase();
      filteredList = filteredList.filter(
        (car) =>
          car.brand.toLowerCase().includes(searchTerm) || car.model.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredCars(filteredList);
  }, [selectedBrand, selectedModel, searchText]);
  const handleBrandChange = (brand: string) => {
    if (selectedBrand === brand) {
      // Nếu đã chọn hãng đang được chọn, hủy bỏ
      setSelectedBrand(null);
    } else {
      // Nếu chưa chọn hoặc chọn hãng khác, thêm vào danh sách bộ lọc
      setSelectedBrand(brand);
      setSelectedModel(null); // Reset đời xe khi thay đổi hãng xe
    }
  };

  const handleModelChange = (model: string) => {
    if (activeFilters.includes(model)) {
      // Nếu đã chọn, hủy bỏ
      setActiveFilters(activeFilters.filter((filter) => filter !== model));
      setSelectedModel(null);
    } else {
      // Nếu chưa chọn, thêm vào danh sách bộ lọc
      setActiveFilters([...activeFilters, model]);
      setSelectedModel(model);
    }
  };

  const handleSearch = () => {
    setShowResults(true);
    setIsFilterModalVisible(false); // Ẩn modal khi bắt đầu tìm kiếm
  };

  const handleResetFilters = () => {
    setActiveFilters([]);
    setSelectedBrand(null);
    setSelectedModel(null);
    setShowResults(false);
    setSearchText('');
    setIsFilterModalVisible(false); // Ẩn modal khi reset bộ lọc
  };
  const route = useRoute<ToyotaCarScreenRouteProp>();
  const { id } = route.params;

  const fetchData = () => {
    getCar()
  }

  useFocusEffect(
    React.useCallback(() => {
      // Thực hiện các hành động khi màn hình A được focus lại (ví dụ: fetch dữ liệu mới)
      fetchData();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm kiếm..."
          onChangeText={(text) => setSearchText(text)}
          value={searchText}
        />
        {searchText.length > 0 && (
          <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearButton}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => setIsFilterModalVisible(true)}
      >
        <Text style={styles.filterButtonText}>Bộ lọc</Text>
      </TouchableOpacity>

      <Button title="Tìm kiếm" onPress={handleSearch} />

      <Modal
        animationType="slide"
        transparent={false}
        visible={isFilterModalVisible}
        onRequestClose={() => setIsFilterModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.label}>Hãng xe:</Text>
          <FlatList
            data={cars}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.filterItem,
                  {
                    backgroundColor: selectedBrand === item.brand ? '#3498db' : '#ecf0f1',
                  },
                ]}
                onPress={() => handleBrandChange(item.brand)}
              >
                <Text style={{ color: selectedBrand === item.brand ? '#ffffff' : '#2c3e50' }}>
                  {item.brand}
                </Text>
              </TouchableOpacity>
            )}
          />

          {selectedBrand && (
            <>
              <Text style={styles.label}>Đời xe:</Text>
              <FlatList
                data={cars.filter((car) => car.brand === selectedBrand)}
                keyExtractor={(item, index) => index.toString()}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={[
                      styles.filterItem,
                      {
                        backgroundColor: activeFilters.includes(item.model) ? '#3498db' : '#ecf0f1',
                      },
                    ]}
                    onPress={() => handleModelChange(item.model)}
                  >
                    <Text style={{ color: activeFilters.includes(item.model) ? '#ffffff' : '#2c3e50' }}>
                      {item.model}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </>
          )}

          <View style={styles.modalButtons}>
            <Button title="Áp dụng" onPress={handleSearch} />
            <Button title="Hủy bỏ" onPress={() => setIsFilterModalVisible(false)} />
          </View>
        </View>
      </Modal>

      {showResults && (
        <>
          <Text style={styles.result}>
            {filteredCars.length > 0
              ? 'Danh sách xe đã lọc:'
              : 'Không có kết quả nào phù hợp.'}
          </Text>

          <FlatList
            data={filteredCars}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.carItem}>
                <Text>{`${item.brand} - ${item.model}`}</Text>
              </View>
            )}
          />
        </>
      )}

      {activeFilters.length > 0 && (
        <TouchableOpacity style={styles.resetButton} onPress={handleResetFilters}>
          <Text style={styles.resetButtonText}>Hủy bộ lọc</Text>
        </TouchableOpacity>
      )}
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

export default CarScreen;
