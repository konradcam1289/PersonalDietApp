// import React, { useState, useEffect } from 'react';
// import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
// import { FIRESTORE_DB } from '../Config/FirebaseConfig';
// import { doc, getDoc } from 'firebase/firestore';

// const DishDetails = ({ route }) => {
//   const { dishId } = route.params;
//   const [dishDetails, setDishDetails] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchDishDetails = async () => {
//       try {
//         const dishRef = doc(FIRESTORE_DB, 'dishes', dishId);
//         const dishSnap = await getDoc(dishRef);

//         if (dishSnap.exists()) {
//           setDishDetails(dishSnap.data());
//         } else {
//           console.log('No such dish!');
//         }
//       } catch (error) {
//         console.error('Error getting dish details: ', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDishDetails();
//   }, [dishId]);

//   if (loading) {
//     return <ActivityIndicator />;
//   }

//   return (
//     <View style={styles.container}>
//       {dishDetails ? (
//         <>
//           {/* <Text style={styles.title}>{dishDetails.name}</Text> */}
//           {/* Wyświetl inne szczegóły potrawy */}
//           <Text style={styles.title}>{dishDetails.name}</Text>
//         <Text>Calories: {dishDetails.calories}</Text>
//         <Text>Ingredients:</Text>
//         <Text>
//         <ul>
//           {dishDetails.ingredients.map((ingredient, index) => (
//             <li key={index}>{ingredient}</li>
//           ))}
//         </ul>
//         </Text>
        
        
//         </>
//       ) : (
//         <Text>Nie znaleziono potrawy.</Text>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   // Dodaj inne style, jak potrzebujesz
// });

// export default DishDetails;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DishDetails = ({ route }) => {
  const { dish } = route.params;

  return (
    <View style={styles.container}>
      {dish ? (
        <>
          <Text style={styles.title}>{dish.name}</Text>
          <Text>Calories: {dish.calories}</Text>
          <Text>Ingredients:</Text>
          {dish.ingredients && dish.ingredients.map((ingredient, index) => (
            <Text key={index}>{ingredient}</Text>
          ))}
        </>
      ) : (
        <Text>Nie znaleziono potrawy.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Dodaj inne style, jak potrzebujesz
});

export default DishDetails;
