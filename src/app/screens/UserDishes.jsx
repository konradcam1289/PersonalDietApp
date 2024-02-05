import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { FIRESTORE_DB, FIREBASE_AUTH } from '../Config/FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

const UserDishes = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserDishes = async () => {
      try {
        const userId = FIREBASE_AUTH.currentUser?.uid;
        if (!userId) {
          throw new Error("Nie jesteś zalogowany");
        }

        const q = query(collection(FIRESTORE_DB, 'userDishes'), where('userId', '==', userId));
        const querySnapshot = await getDocs(q);
        const dishesList = querySnapshot.docs.map(doc => doc.data());
        
        setDishes(dishesList);
      } catch (error) {
        console.error("Error fetching user dishes: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDishes();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const handleSelectDish = (item) => {
    navigation.navigate('DishDetails', { dish: item });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={dishes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.item} 
            onPress={() => handleSelectDish(item)}
          >
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
    backgroundColor: '#F0F0F0',
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.1,
  },
  title: {
    fontSize: 18,
    color: '#4C9A70',
    fontWeight: 'bold',
  },
});


export default UserDishes;
