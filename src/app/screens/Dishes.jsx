import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { FIRESTORE_DB } from '../Config/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const Dishes = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const dishesCollection = collection(FIRESTORE_DB, 'dishes');
        const dishesSnapshot = await getDocs(dishesCollection);
        const dishesList = dishesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setDishes(dishesList);
      } catch (error) {
        console.error("Error getting dishes: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const handleSelectDish = (dish) => {
    navigation.navigate('DishDetails', { dish: dish });
  };

  const navigateToAddDish = () => {
    navigation.navigate('AddDish');
  };

  return (
    <ImageBackground source={require('../Image/obraz1.png')} style={styles.backgroundImage}>
      <View style={styles.overlay}>
      <View style={styles.container}>
        <TouchableOpacity onPress={navigateToAddDish} style={styles.addButton}>
            <Text style={styles.addButtonText}>Dodaj Potrawę</Text>
        </TouchableOpacity>
        <FlatList
          data={dishes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleSelectDish(item)} style={styles.item}>
              <Text style={styles.title}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },
  item: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#dddddd',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    elevation: 1
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
  }
});

export default Dishes;
