import React from 'react';
import 'rbx/index.css';
import { List, Button, Title } from 'rbx';
import CartCard from './CartCard';

const ShoppingCart = ({ cartItems, setCartOpen, removeFromCart }) => {
  const priceReducer = (total, item) => total + (item.product.price * item.qty);
  const totalPrice = cartItems.reduce(priceReducer, 0).toFixed(2);
  return (
    <React.Fragment>
      <Button onClick={() => setCartOpen(false)}>
        Hide cart
      </Button>
      <List>
        {cartItems.map(item =>
          <CartCard 
            key={`${item.product.sku}_${item.size}`}
            product={item.product}
            qty={item.qty}
            itemSize={item.size}
            removeFromCart={removeFromCart}
          />)
        }
      </List>
      <Title className="centered">
        Total price: {`$${totalPrice}`}
      </Title>
    </React.Fragment>
  );
}

export default ShoppingCart;
