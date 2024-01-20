// import React, { useState, useEffect } from 'react';
// import { View, Text, Button, FlatList } from 'react-native';

// const DishSelector = ({ route, navigation }) => {
//   const { selectedDate } = route.params;
//   const [dishes, setDishes] = useState([]);

//   useEffect(() => {
//     // Pobierz listę dań z Firestore
//   }, []);

//   const addDishToDay = async (dishId) => {
//     // Logika dodawania dania do wybranego dnia w Firestore
//   };

//   return (
//     <View>
//       <FlatList
//         data={dishes}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <Button
//             title={item.name}
//             onPress={() => addDishToDay(item.id)}
//             />
//             )}
//             />
//             </View>
//             );
//             };

import React from 'react';
import { View, Text } from 'react-native';

const DishSelector = () => {
  return (
    <View>
      <Text>Dish Selector Screen</Text>
    </View>
  );
};

export default DishSelector;
