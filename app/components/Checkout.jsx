import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, Alert } from 'react-native';
import { useCart } from './CartContext';
import { db } from '../../configs/FirebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';


export default function Checkout({ route, navigation }) {
  const { clearCart, userUid } = useCart();
  const { cartItems = [] } = route.params || {}; // Fallback to empty array if undefined
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Utility function to calculate total price
  const calculateTotalPrice = (items) => {
    return items.reduce((total, item) => {
      const itemPrice = parseFloat(item.price.replace('₹', '')) || 0; // Default to 0 if parsing fails
      return total + itemPrice * item.quantity;
    }, 0).toFixed(2);
  };

  const totalPrice = calculateTotalPrice(cartItems);

  const handlePayment = async () => {
    if (selectedPayment) {
      try {
        // Store the cart items in the Firestore database
        const orderData = {
          uid: userUid,
          items: cartItems,
          totalPrice,
          paymentMethod: selectedPayment,
          createdAt: Timestamp.now(),
        };

        await addDoc(collection(db, 'orders'), orderData);

        // Navigate to PaymentSuccess screen and clear the cart
        navigation.navigate('PaymentSuccess');
        clearCart();
      } catch (error) {
        console.error('Error storing order data: ', error);
        Alert.alert('Error', 'Failed to process your order. Please try again.');
      }
    } else {
      Alert.alert('Payment Method Required', 'Please select a payment method to proceed.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Review Items</Text>
      <FlatList
        data={cartItems}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <Image source={item.image} style={styles.cartImage} />
            <View style={styles.cartDetails}>
              <Text style={styles.cartName}>{item.name}</Text>
              <Text style={styles.cartPrice}>
                ₹{(parseFloat(item.price.replace('₹', '')) * item.quantity).toFixed(2)}
              </Text>
              <Text style={styles.cartQuantity}>Quantity: {item.quantity}</Text>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.name}
      />
<View style={styles.paymentOptions}>
  <Text style={styles.paymentTitle}>Select Payment Method</Text>
  {[
    { method: 'Credit Card', emoji: '💳' },
    { method: 'Debit Card', emoji: '💳' },
    { method: 'UPI', emoji: '📱' },
    { method: 'Cash On Delivery', emoji: '💵' },
  ].map(({ method, emoji }) => (
    <TouchableOpacity
      key={method}
      style={[
        styles.paymentButton,
        selectedPayment === method && styles.selectedPaymentButton,
      ]}
      onPress={() => setSelectedPayment(method)}
    >
      <Text style={styles.paymentButtonText}>
        {emoji} {method}
      </Text>
    </TouchableOpacity>
  ))}
</View>

      <View style={styles.footer}>
        <Text style={styles.totalPrice}>Total: ₹{totalPrice}</Text>
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={handlePayment}
          accessibilityLabel="Proceed to Payment"
        >
          <Text style={styles.checkoutButtonText}>Pay Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderRadius: 5,
  },
  cartImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  cartDetails: {
    marginLeft: 10,
    flex: 1,
  },
  cartName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cartPrice: {
    fontSize: 16,
    color: '#666',
  },
  cartQuantity: {
    fontSize: 16,
    color: '#666',
  },
  paymentOptions: {
    marginTop: 20,
    marginBottom: 20,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  paymentButton: {
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginTop: 10,
  },
  selectedPaymentButton: {
    backgroundColor: '#b2d8b2',
  },
  paymentButtonText: {
    fontSize: 16,
  },
  footer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    paddingTop: 10,
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  checkoutButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
