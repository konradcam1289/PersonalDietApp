import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, ImageBackground, StyleSheet, Button } from 'react-native';
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

  const navigateToUserDishes = () => {
    navigation.navigate('UserDishes');
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={navigateToAddDish} style={styles.addButton}>
        <Text style={styles.addButtonText}>Dodaj Potrawę</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={navigateToUserDishes} style={styles.userDishesButton}>
        <Text style={styles.addButtonText}>Dania użytkownika</Text>
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
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#A8D5BA',
    backgroundColor: '#FFFFFF',
    width: '90%',
    marginVertical: 8,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4C9A70',
  },
  addButton: {
    backgroundColor: '#4C9A70',
    padding: 15,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
  },
  userDishesButton: {
    backgroundColor: '#A8D5BA',
    padding: 15,
    borderRadius: 20,
    alignSelf: 'center',
    marginVertical: 10,
    width: '90%',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default Dishes;
