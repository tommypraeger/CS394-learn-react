import React, { useEffect, useState } from 'react';
import Sidebar from "react-sidebar";
import CardGrid from './components/CardGrid';
import ShoppingCart from './components/ShoppingCart';
import 'rbx/index.css';
import { Button } from 'rbx';

const App = () => {
  const [data, setData] = useState({});
  const products = Object.values(data);

  const [cartOpen, setCartOpen] = useState(true);

  const [cartItems, setCartItems] = useState([]);

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
        sidebar={<ShoppingCart cartItems={cartItems} />}
        open={cartOpen}
        pullRight={true}
      >
        <Button className="float-right">
          Show cart
        </Button>
      </Sidebar>
      <CardGrid products={products} />
    </React.Fragment>
  );
};

export default App;
