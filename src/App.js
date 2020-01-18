import React, { useEffect, useState } from 'react';
import Sidebar from "react-sidebar";
import CardGrid from './components/CardGrid';
import ShoppingCart from './components/ShoppingCart';
import 'rbx/index.css';
import { Button } from 'rbx';

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);

  const [cartOpen, setCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, size) => {
    const itemIndex = cartItems.findIndex(item => item.product === product && item.size === size);
    if (itemIndex >= 0) {
      const item = cartItems[itemIndex];
      setCartItems([
        ...cartItems.slice(0, itemIndex),
        {product, size, qty: item.qty + 1},
        ...cartItems.slice(itemIndex + 1)
      ]);
    } else {
      setCartItems([
        ...cartItems,
        {product, size, qty: 1}
      ]);
    }
  };

  const removeFromCart = (product, size) => {
    const itemIndex = cartItems.findIndex(item => item.product === product && item.size === size);
    const item = cartItems[itemIndex];
    if (item.qty === 1) {
      setCartItems([
        ...cartItems.slice(0, itemIndex),
        ...cartItems.slice(itemIndex + 1)
      ]);
    } else {
      setCartItems([
        ...cartItems.slice(0, itemIndex),
        {product, size, qty: item.qty - 1},
        ...cartItems.slice(itemIndex + 1)
      ]);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('./data/products.json');
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
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
          />
        }
        open={cartOpen}
        pullRight={true}
      >
        <Button className="float-right" onClick={()=>setCartOpen(true)}>
          Show cart
        </Button>
      </Sidebar>
      <CardGrid
        products={products}
        setCartOpen={setCartOpen}
        addToCart={addToCart}
      />
    </React.Fragment>
  );
};

export default App;
