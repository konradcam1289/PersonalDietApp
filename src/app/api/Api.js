import { firestore } from '../Config/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const getDishes = async () => {
    try {
        const querySnapshot = await getDocs(collection(firestore, "dishes"));
        const dishes = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));

        console.log(dishes); // Sprawdź, czy dane są poprawnie pobierane
        return dishes;
    } catch (error) {
        console.error("Error getting dishes: ", error);
        return [];
    }
};

