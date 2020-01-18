import React from 'react';
import 'rbx/index.css';
import { Media, Image, Title, Content, Button } from 'rbx';

const CartCard = ({ product, qty, itemSize, removeFromCart }) => {
  return (
    <Media className="cart-card">
      <Media.Item as="figure" align="left">
        <Image.Container as="p" size={64}>
          <Image src={`data/products/${product.sku}_2.jpg`} />
        </Image.Container>
      </Media.Item>
      <Media.Item align="content">
        <Content>
          <Title size={6}>
            {product.title}
          </Title>
          <div>
            Price: {`$${product.price}`}
          </div>
          <div>
            Quantity: {qty}
          </div>
          <div>
            Size: {itemSize}
          </div>
          <div>
            Total price: {`$${product.price * qty}`}
          </div>
        </Content>
      </Media.Item>
      <Media.Item align="right">
        <Button onClick={() => removeFromCart(product, itemSize)}>
          -
        </Button>
      </Media.Item>
    </Media>
  );
}

export default CartCard;
