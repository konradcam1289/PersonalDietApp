// import React, { useState, useEffect } from 'react';
// import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
// import firestore from '@react-native-firebase/firestore';

// const ShoppingListScreen = ({ userId }) => {
//   const [product, setProduct] = useState('');
//   const [products, setProducts] = useState([]);
//   const [editProductKey, setEditProductKey] = useState(null);

//   // Ładowanie listy zakupów z Firestore przy montowaniu komponentu
//   useEffect(() => {
//     const unsubscribe = firestore()
//       .collection('shoppingLists')
//       .doc(userId)
//       .onSnapshot(documentSnapshot => {
//         if (documentSnapshot.exists) {
//           setProducts(documentSnapshot.data().products);
//         }
//       });

//     return () => unsubscribe(); // Odpinamy nasłuchiwanie
//   }, [userId]);

//   // Funkcja do zapisywania listy zakupów w Firestore
//   const saveProductsToDatabase = async (updatedProducts) => {
//     await firestore().collection('shoppingLists').doc(userId).set({ products: updatedProducts });
//   };

//   const addProduct = () => {
//     if (product) {
//       const newProducts = [...products, { key: Math.random().toString(), name: product, purchased: false }];
//       setProducts(newProducts);
//       setProduct('');
//       saveProductsToDatabase(newProducts);
//     }
//   };

//   const deleteProduct = (key) => {
//     const newProducts = products.filter(product => product.key !== key);
//     setProducts(newProducts);
//     saveProductsToDatabase(newProducts);
//   };

//   const startEditing = (key) => {
//     setEditProductKey(key);
//     const productToEdit = products.find(product => product.key === key);
//     if (productToEdit) {
//       setProduct(productToEdit.name);
//     }
//   };

//   const saveEdit = () => {
//     const newProducts = products.map(product => {
//       if (product.key === editProductKey) {
//         return { ...product, name: product };
//       }
//       return product;
//     });
//     setProducts(newProducts);
//     setEditProductKey(null);
//     setProduct('');
//     saveProductsToDatabase(newProducts);
//   };

//   const togglePurchased = (key) => {
//     const newProducts = products.map(product => {
//       if (product.key === key) {
//         return { ...product, purchased: !product.purchased };
//       }
//       return product;
//     });
//     setProducts(newProducts);
//     saveProductsToDatabase(newProducts);
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.input}
//         placeholder="Add or edit a product..."
//         onChangeText={setProduct}
//         value={product}
//       />
//       {editProductKey ? (
//         <Button title="Save Edit" onPress={saveEdit} />
//       ) : (
//         <Button title="Add" onPress={addProduct} />
//       )}
//       <FlatList
//         data={products}
//         renderItem={({ item }) => (
//           <View style={styles.listItem}>
//             <TouchableOpacity onPress={() => togglePurchased(item.key)} style={styles.productContainer}>
//               <Text style={item.purchased ? styles.itemPurchased : styles.item}>{item.name}</Text>
//             </TouchableOpacity>
//             <View style={styles.buttonsContainer}>
//               <Button title="Edit" onPress={() => startEditing(item.key)} />
//               <Button title="Delete" onPress={() => deleteProduct(item.key)} />
//             </View>
//           </View>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginTop: 20,
//   },
//   input: {
//     padding: 10,
//     margin: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//   },
//   listItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     marginTop: 5,
//   },
//   productContainer: {
//     flex: 3,
//     flexDirection: 'row',
//     alignItems: 'center',
// },
// buttonsContainer: {
// flex: 2,
// flexDirection: 'row',
// justifyContent: 'space-around',
// },
// item: {
// padding: 10,
// borderColor: '#ccc',
// borderWidth: 1,
// },
// itemPurchased: {
// padding: 10,
// borderColor: '#ccc',
// borderWidth: 1,
// textDecorationLine: 'line-through',
// },
// });

// export default ShoppingListScreen;





import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

const ShoppingListScreen = () => {
  const [product, setProduct] = useState('');
  const [products, setProducts] = useState([]);
  const [editProductKey, setEditProductKey] = useState(null);

  const addProduct = () => {
    if (product) {
      setProducts([...products, { key: Math.random().toString(), name: product, purchased: false }]);
      setProduct('');
    }
  };

  const deleteProduct = (key) => {
    setProducts(products.filter(product => product.key !== key));
  };

  const startEditing = (key) => {
    setEditProductKey(key);
    const productToEdit = products.find(product => product.key === key);
    setProduct(productToEdit.name);
  };

  const saveEdit = () => {
    setProducts(products.map(product => {
      if (product.key === editProductKey) {
        return { ...product, name: product.name };
      }
      return product;
    }));
    setEditProductKey(null);
    setProduct('');
  };
  

  const togglePurchased = (key) => {
    setProducts(products.map(product => {
      if (product.key === key) {
        return { ...product, purchased: !product.purchased };
      }
      return product;
    }));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Add or edit a product..."
        onChangeText={setProduct}
        value={product}
      />
      {editProductKey ? (
        <Button title="Save Edit" onPress={saveEdit} />
      ) : (
        <Button title="Add" onPress={addProduct} />
      )}
      <FlatList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity onPress={() => togglePurchased(item.key)} style={styles.productContainer}>
              <Text style={item.purchased ? styles.itemPurchased : styles.item}>{item.name}</Text>
            </TouchableOpacity>
            <View style={styles.buttonsContainer}>
              <Button title="Edit" onPress={() => startEditing(item.key)} />
              <Button title="Delete" onPress={() => deleteProduct(item.key)} />
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  input: {
    padding: 10,
    margin: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  productContainer: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonsContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  item: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
  },
  itemPurchased: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    textDecorationLine: 'line-through',
  },
});

export default ShoppingListScreen;
