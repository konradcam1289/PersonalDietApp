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
    backgroundColor: '#F0F0F0',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4C9A70',
    textAlign: 'center',
  },
  detailsContainer: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4C9A70',
    marginBottom: 5,
  },
  detailsText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  ingredientText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  notFoundText: {
    fontSize: 18,
    color: '#4C9A70',
    textAlign: 'center',
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
});


export default DishDetails;
