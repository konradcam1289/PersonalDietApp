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
    padding: 10,
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  title: {
    fontSize: 18,
    color: 'black',
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
});

export default UserDishes;
