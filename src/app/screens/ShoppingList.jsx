import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { FIRESTORE_DB } from '../Config/FirebaseConfig';
import { collection, query, where, onSnapshot, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const ShoppingList = () => {
  const [newItem, setNewItem] = useState('');
  const [items, setItems] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [editedText, setEditedText] = useState('');
  const auth = getAuth();
  const user = auth.currentUser;
  const shoppingListRef = collection(FIRESTORE_DB, 'shoppingList');

  useEffect(() => {
    if (user) {
      const q = query(shoppingListRef, where("userId", "==", user.uid));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const itemsFromFirestore = [];
        querySnapshot.forEach((doc) => {
          itemsFromFirestore.push({ ...doc.data(), id: doc.id });
        });
        setItems(itemsFromFirestore);
      });
      return () => unsubscribe(); // Detach listener on unmount
    }
  }, [user]);

  const addItemToFirestore = async () => {
    if (newItem.trim() !== '') {
      await addDoc(shoppingListRef, { name: newItem, purchased: false, userId: user.uid });
      setNewItem('');
    }
  };

  const toggleItemInFirestore = async (item) => {
    const itemRef = doc(FIRESTORE_DB, 'shoppingList', item.id);
    await updateDoc(itemRef, { purchased: !item.purchased });
  };

  const removeItemFromFirestore = async (id) => {
    const itemRef = doc(FIRESTORE_DB, 'shoppingList', id);
    await deleteDoc(itemRef);
  };

  const updateItemInFirestore = async (item) => {
    const itemRef = doc(FIRESTORE_DB, 'shoppingList', item.id);
    await updateDoc(itemRef, { name: editedText });
    setEditItem(null);
    setEditedText('');
  };

  const renderItem = ({ item }) => {
    if (editItem === item.id) {
      return (
        <View style={styles.item}>
          <TextInput
            style={styles.input}
            onChangeText={setEditedText}
            value={editedText}
          />
          <TouchableOpacity style={styles.button} onPress={handleEditItem}>
            <Text style={styles.buttonText}>Zapisz</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <TouchableOpacity style={styles.item} onPress={() => toggleItem(item.id)}>
        <Text style={item.purchased ? styles.purchasedItem : styles.itemText}>{item.name}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={styles.button} onPress={() => startEditItem(item)}>
            <Text style={styles.buttonText}>Edytuj</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => removeItem(item.id)}>
            <Text style={styles.buttonText}>Usuń</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={setNewItem}
        value={newItem}
        placeholder="Dodaj produkt..."
        placeholderTextColor="#333"
      />
      <TouchableOpacity style={styles.addButton} onPress={addItemToFirestore}>
        <Text style={styles.buttonText}>Dodaj</Text>
      </TouchableOpacity>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: '#f5f5f5', // Jasny kolor tła
  },
  input: {
    width: '80%',
    borderColor: '#333',
    borderWidth: 1,
    padding: 10,
    marginVertical: 10,
    color: '#333',
    alignSelf: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#e1e1e1', // Kolor tła dla elementów listy
    borderRadius: 5,
    marginHorizontal: 20,
  },
  itemText: {
    color: '#333', // Kolor tekstu
  },
  purchasedItem: {
    textDecorationLine: 'line-through',
    color: '#777', // Kolor przekreślonego tekstu
  },
  buttons: {
    flexDirection: 'row',
  },
  button: {
    backgroundColor: '#4c669f', // Kolor tła przycisków
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff', // Kolor tekstu przycisków
  },
  addButton: {
    backgroundColor: '#4c669f',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
});

export default ShoppingList;
