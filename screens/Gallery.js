import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, Button, StyleSheet, Alert } from 'react-native';
import { getFavorites, saveFavorite } from '../utils/storage';
import flowerData from '../utils/flowerData';

const Gallery = ({ navigation }) => {
  const [favorites, setFavorites] = useState([]);
  const [flowerWithPrices, setFlowerWithPrices] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favs = await getFavorites();
      setFavorites(favs || []);
    };

    const addPrices = () => {
      const flowersWithPrices = flowerData.map(flower => ({
        ...flower,
        price: (Math.random() * (35 - 25) + 25).toFixed(2)
      }));
      setFlowerWithPrices(flowersWithPrices);
    };

    fetchFavorites();
    addPrices();
  }, []);

  const handleAddFavorite = async (flower) => {
    try {
      await saveFavorite(flower);
      setFavorites([...favorites, flower]);
      Alert.alert(`Added ${flower.name} to favorites`);
    } catch (error) {
      console.error('Error saving favorite:', error);
      Alert.alert('Failed to add flower to favorites. Please try again.');
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.itemText}>{item.name}</Text>
        <Text style={styles.priceText}>${item.price}</Text>
      </View>
      <Button title="Love it" onPress={() => handleAddFavorite(item)} />
      <Button title="Purchase" onPress={() => navigation.navigate('PurchaseScreen', { item })} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={flowerWithPrices}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  itemContainer: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  itemText: {
    fontSize: 20, // Increased font size to 20
    color: '#333',
  },
  priceText: {
    fontSize: 18, // Increased font size to 18
    color: '#888',
  },
});

export default Gallery;
