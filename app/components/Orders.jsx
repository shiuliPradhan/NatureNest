import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { db } from '../../configs/FirebaseConfig';
import { useCart } from './CartContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { userUid } = useCart();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (userUid) {
          const q = query(collection(db, 'orders'), where('uid', '==', userUid));
          const querySnapshot = await getDocs(q);
          const ordersData = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));

          // Reverse the orders array so the latest order is first
          setOrders(ordersData.reverse());
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userUid]);

  const formatDate = (timestamp) => {
    const date = timestamp.toDate(); // Convert Firestore timestamp to JavaScript Date
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are 0-based, so we add 1
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 24hr format to 12hr format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${month}/${day}/${year} ${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <Text style={styles.orderDate}>
        Placed On: {item.createdAt ? formatDate(item.createdAt) : 'Unknown'}
      </Text>
      <Text style={styles.paymentMethod}>Payment Method: {item.paymentMethod}</Text>
      <FlatList
        data={item.items}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image source={{ uri: item.image.uri }} style={styles.image} />
            <View>
              <Text>Name: {item.name}</Text>
              <Text>Price: {item.price}</Text>
              <Text>Quantity: {item.quantity}</Text>
            </View>
          </View>
        )}
      />
      <Text style={styles.orderTotal}>Order Total: {item.totalPrice}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
        <View>
            <Ionicons name='arrow-back-outline' size={24} />
      <Text style={styles.heading}>Previous Orders</Text>
      </View>
      {orders.length === 0 ? (
        <Text style={styles.noOrdersText}>No Orders Found</Text>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={item => item.id}
          renderItem={renderOrder}
        />
      )}
    </View>
  );
};

export default Orders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#004721',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: "#fff"
  },
  orderCard: {
    backgroundColor: '#fff',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  orderDate: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  orderTotal: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 5,
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
    borderRadius: 5,
  },
  noOrdersText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: '#999',
  },
  paymentMethod: {
    fontWeight: 'bold',
  },
});
