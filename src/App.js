import React, { useEffect, useState } from 'react';
import Sidebar from "react-sidebar";
import CardGrid from './components/CardGrid';
import ShoppingCart from './components/ShoppingCart';
import 'rbx/index.css';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import { NavBar } from './FirebaseAuth';
import { db } from './FirebaseConfig';

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);

  const [cartOpen, setCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const [inventory, setInventory] = useState({});

  const [user, setUser] = useState(undefined);

  const addToCart = (product, size) => {
    const itemIndex = cartItems.findIndex(item => item.product.sku === product.sku && item.size === size);
    let updatedCartItems;
    if (itemIndex >= 0) {
      const item = cartItems[itemIndex];
      updatedCartItems = [
        ...cartItems.slice(0, itemIndex),
        {product, size, qty: item.qty + 1},
        ...cartItems.slice(itemIndex + 1)
      ];
    } else {
      updatedCartItems = [
        ...cartItems,
        {product, size, qty: 1}
      ];
    }
    setCartItems(updatedCartItems);
    if (user) {
      db.child('carts').child(user.uid).set(updatedCartItems)
      .catch(error => alert(error));
    }
    updateInventory(product, size, '-');
  };

  const removeFromCart = (product, size) => {
    const itemIndex = cartItems.findIndex(item => item.product === product && item.size === size);
    const item = cartItems[itemIndex];
    let updatedCartItems;
    if (item.qty === 1) {
      updatedCartItems = [
        ...cartItems.slice(0, itemIndex),
        ...cartItems.slice(itemIndex + 1)
      ];
    } else {
      updatedCartItems = [
        ...cartItems.slice(0, itemIndex),
        {product, size, qty: item.qty - 1},
        ...cartItems.slice(itemIndex + 1)
      ];
    }
    setCartItems(updatedCartItems);
    if (user) {
      db.child('carts').child(user.uid).set(updatedCartItems)
      .catch(error => alert(error));
    }
    updateInventory(product, size, '+');
  };

  const updateInventory = (product, size, action) => {
    const newInventory = Object.assign({}, inventory);
    if (action === '+') {
      newInventory[product.sku][size] = inventory[product.sku][size] + 1;
    } else {
      newInventory[product.sku][size] = inventory[product.sku][size] - 1;
    }
    db.child('inventory').set(newInventory).catch(error => alert(error));
    setInventory(newInventory);
  };

  const emptyCart = () => {
    setCartItems([]);
    db.child('carts').child(user.uid).set([])
      .catch(error => alert(error));
  };

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) {
        const data = snap.val();
        setInventory(data.inventory);
        if (user && data.carts[user.uid]) {
          setCartItems(data.carts[user.uid]);
        }
      };
    };
    db.on('value', handleData, error => alert(error));
    return () => { db.off('value', handleData); };
  }, [user]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);

  return (
    <React.Fragment>
      <Sidebar
        styles={{sidebar: { backgroundColor: "white" }}}
        sidebar={
          <ShoppingCart
            cartItems={cartItems}
            setCartOpen={setCartOpen}
            removeFromCart={removeFromCart}
            emptyCart={emptyCart}
            user={user}
          />
        }
        open={cartOpen}
        pullRight={true}
      >
        <NavBar user={user} setCartOpen={setCartOpen} />
        <CardGrid
          products={products}
          setCartOpen={setCartOpen}
          addToCart={addToCart}
          inventory={inventory}
        />
      </Sidebar>
    </React.Fragment>
  );
};

export default App;
