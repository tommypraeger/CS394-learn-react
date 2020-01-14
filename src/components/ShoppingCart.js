import React from 'react';
import 'rbx/index.css';
import { List, Button, Title } from 'rbx';
import CartCard from './CartCard';

const testData = [
  {
    product: {
      "sku": 12064273040195392,
      "title": "Cat Tee Black T-Shirt",
      "description": "4 MSL",
      "style": "Black with custom print",
      "price": 10.9,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },
    qty: 2,
    size: 'M'
  },
  {
    product: {
      "sku": 51498472915966370,
      "title": "Dark Thug Blue-Navy T-Shirt",
      "description": "",
      "style": "Front print and paisley print",
      "price": 29.45,
      "currencyId": "USD",
      "currencyFormat": "$",
      "isFreeShipping": true
    },
    qty: 1,
    size: 'S'
  }
];

const ShoppingCart = ({ cartItems, setCartOpen, setCartItems }) => {
  cartItems = testData;
  const priceReducer = (total, item) => total + (item.product.price * item.qty);
  const totalPrice = cartItems.reduce(priceReducer, 0);
  console.log(totalPrice);
  return (
    <React.Fragment>
      <Button className="float-right">
        Hide cart
      </Button>
      <List>
        {cartItems.map(item => <CartCard key={`${item.product.sku}_${item.size}`}
          product={item.product}
          qty={item.qty}
          itemSize={item.size} />)
        }
      </List>
      <Title>
        Total price: {`$${totalPrice}`}
      </Title>
    </React.Fragment>
  );
}

export default ShoppingCart;
