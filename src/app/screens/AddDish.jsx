import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Image, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { FIRESTORE_DB } from '../Config/FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

const AddDish = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [dishName, setDishName] = useState('');
  const [calories, setCalories] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [imageUri, setImageUri] = useState(null);
  const [cameraVisible, setCameraVisible] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleAddDish = async () => {
    if (!dishName.trim() || !calories.trim() || !ingredients.trim()) {
      Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola!');
      return;
    }

    try {
      const dishData = {
        name: dishName,
        calories: parseInt(calories, 10),
        ingredients: ingredients.split(',').map(ingredient => ingredient.trim()),
        image: imageUri,
      };

      await addDoc(collection(FIRESTORE_DB, 'dishes'), dishData);
      Alert.alert('Sukces', 'Potrawa dodana!');
      setDishName('');
      setCalories('');
      setIngredients('');
      setImageUri(null);
    } catch (error) {
      console.error('Error adding dish: ', error);
    }
  };

  const takePhoto = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImageUri(photo.uri);
      setCameraVisible(false); // Hide camera after taking photo
    }
  };

  const renderCamera = () => {
    return (
      <View style={styles.cameraContainer}>
        <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef} />
        <Button title="Zrób Zdjęcie" onPress={takePhoto} />
      </View>
    );
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      {cameraVisible ? (
        renderCamera()
      ) : (
        <>
          <Button title="Otwórz Aparat" onPress={() => setCameraVisible(true)} />
          {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
          <TextInput
            style={styles.input}
            value={dishName}
            onChangeText={setDishName}
            placeholder="Nazwa Potrawy"
          />
          <TextInput
            style={styles.input}
            value={calories}
            onChangeText={setCalories}
            placeholder="Kalorie"
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            value={ingredients}
            onChangeText={setIngredients}
            placeholder="Składniki (oddziel przecinkami)"
            multiline
          />
          <Button title="Dodaj Potrawę" onPress={handleAddDish} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cameraContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: 300,
  },
  input: {
    borderWidth: 1,
    borderColor: '#cccccc',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  // ... (inne style)
});

export default AddDish;
