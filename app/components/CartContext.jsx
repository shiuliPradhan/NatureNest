import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth } from '../../configs/FirebaseConfig';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [userUid, setUserUid] = useState("");

  useEffect(() => {
    const fetchUserUid = () => {
      const user = auth.currentUser;
      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid("");
      }
    };

    fetchUserUid();

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserUid(user.uid);
      } else {
        setUserUid("");
      }
    });

    return () => unsubscribe();
  }, []);

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.name === item.name);
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (itemName) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i.name === itemName);
      if (existingItemIndex > -1) {
        const item = prevItems[existingItemIndex];
        if (item.quantity > 1) {
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex].quantity -= 1;
          return updatedItems;
        } else {
          return prevItems.filter((i) => i.name !== itemName);
        }
      }
      return prevItems;
    });
  };

  const getCartQuantity = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        getCartQuantity,
        clearCart,
        userUid,
        setUserUid,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}


export const useCart = () => useContext(CartContext);
