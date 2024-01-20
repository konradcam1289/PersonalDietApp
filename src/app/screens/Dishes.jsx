import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, 
    StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { FIRESTORE_DB } from '../Config/FirebaseConfig'; // Zaimportuj konfigurację Firestore
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
    return <ActivityIndicator />;
  }
  const handleSelectDish = (dish) => {
    navigation.navigate('DishDetails', { dish: dish });
};

  
const backgroundImage = require('../Image/obraz1.png')
  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage}>
      <View style={styles.container}>
        <FlatList
          data={dishes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectDish(item)}>
              <Text style={styles.title}>{item.name}</Text>

          </TouchableOpacity>

          )}
        />
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
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  title: {
    fontSize: 30,
    marginLeft: 10,
    fontWeight: '700',
    color: 'black',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
},
});

export default Dishes;
