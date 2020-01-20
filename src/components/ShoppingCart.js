import React from 'react';
import 'rbx/index.css';
import { List, Button, Title } from 'rbx';
import CartCard from './CartCard';

const CheckOutButton = ({ user, emptyCart }) => {
  if (user) {
    return (
      <Button.Group align="centered">
        <Button onClick={emptyCart}>
          Check out
        </Button>
      </Button.Group>
    )
  } else {
    return (
      <React.Fragment />
    )
  }
};

const ShoppingCart = ({ cartItems, setCartOpen, removeFromCart, emptyCart, user }) => {
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
      <CheckOutButton user={user} emptyCart={emptyCart} />
    </React.Fragment>
  );
}

export default ShoppingCart;
