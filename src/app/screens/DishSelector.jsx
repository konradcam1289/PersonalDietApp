import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../Config/FirebaseConfig';
import { collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { useRoute, useNavigation } from '@react-navigation/native';

const DishSelector = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);
  const route = useRoute();
  const selectedDay = route.params ? route.params.selectedDate : null;
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const userId = FIREBASE_AUTH.currentUser?.uid;
        if (!userId) {
          throw new Error("Nie jesteś zalogowany");
        }
  
        const publicDishesCollection = collection(FIRESTORE_DB, 'dishes');
        const publicDishesSnapshot = await getDocs(publicDishesCollection);
        const publicDishesList = publicDishesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), isUserDish: false }));
  
        const userDishesQuery = query(collection(FIRESTORE_DB, 'userDishes'), where('userId', '==', userId));
        const userDishesSnapshot = await getDocs(userDishesQuery);
        const userDishesList = userDishesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data(), isUserDish: true }));
  
        setDishes([...publicDishesList, ...userDishesList]);
      } catch (error) {
        console.error("Error getting dishes: ", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchDishes();
  }, []);

  const addDishToDay = async (dish) => {
    try {
      const userId = FIREBASE_AUTH.currentUser?.uid;
      if (!userId) {
        throw new Error("Nie jesteś zalogowany");
      }
  
      const selectedDishesRef = collection(FIRESTORE_DB, 'SelectedDishes');
      await addDoc(selectedDishesRef, {
        date: selectedDay,
        dishId: dish.id,
        dishName: dish.name,
        userId: userId,
        calories: dish.calories,
        ingredients: dish.ingredients,
      });
      navigation.navigate('MyDiet', { selectedDate: selectedDay });
      alert(`Dish added to ${selectedDay} successfully!`);
    } catch (error) {
      console.error('Error adding dish to day: ', error);
    }
  };
  

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.goToMyDietButton} 
        onPress={() => navigation.navigate('MyDiet', { selectedDate: selectedDay })}
      >
        <Text style={styles.goToMyDietButtonText}>Przejdź do Mojej Diety</Text>
      </TouchableOpacity>
      <FlatList
        data={dishes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.title}>
              {item.name} {item.isUserDish ? '(własne)' : ''}
            </Text>
            <TouchableOpacity 
              style={styles.addButton} 
              onPress={() => addDishToDay(item)}
            >
              <Text style={styles.addButtonText}>Dodaj</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    color: '#4C9A70',
    flex: 1,
    flexWrap: 'wrap',
  },
  addButton: {
    backgroundColor: '#A8D5BA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 2,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  goToMyDietButton: {
    backgroundColor: '#4C9A70',
    padding: 15,
    borderRadius: 20,
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  goToMyDietButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default DishSelector;
