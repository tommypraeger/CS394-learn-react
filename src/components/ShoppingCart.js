import React from 'react';
import 'rbx/index.css';
import { List, Button, Title } from 'rbx';
import CartCard from './CartCard';

const ShoppingCart = ({ cartItems, setCartOpen }) => {
  const priceReducer = (total, item) => total + (item.product.price * item.qty);
  const totalPrice = cartItems.reduce(priceReducer, 0);
  return (
    <React.Fragment>
      <Button className="float-right" onClick={() => setCartOpen(false)}>
        Hide cart
      </Button>
      <List>
        {cartItems.map(item => <CartCard key={`${item.product.sku}_${item.size}`}
          product={item.product}
          qty={item.qty}
          itemSize={item.size} />)
        }
      </List>
      <Title className="centered">
        Total price: {`$${totalPrice}`}
      </Title>
    </React.Fragment>
  );
}

export default ShoppingCart;
