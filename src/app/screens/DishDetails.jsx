import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const DishDetails = ({ route }) => {
  const { dish } = route.params;

  return (
    <ScrollView style={styles.container}>
      {dish ? (
        <>
          {dish.image && <Image source={{ uri: dish.image }} style={styles.image} />}
          <Text style={styles.title}>{dish.name}</Text>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Kalorie:</Text>
            <Text style={styles.detailsText}>{dish.calories}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.detailsTitle}>Składniki:</Text>
            {dish.ingredients && dish.ingredients.map((ingredient, index) => (
              <Text key={index} style={styles.ingredientText}>{ingredient}</Text>
            ))}
          </View>
        </>
      ) : (
        <Text style={styles.notFoundText}>Nie znaleziono potrawy.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  detailsContainer: {
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 5,
  },
  detailsText: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  ingredientText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 3,
  },
  notFoundText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});

export default DishDetails;
