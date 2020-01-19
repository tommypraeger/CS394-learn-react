import React from 'react';
import 'rbx/index.css';
import { Card, Image, Title, Column, Button } from 'rbx';

const sizes = ['S', 'M', 'L', 'XL'];

const SizeButton = ({ product, size, inventory, addToCart, setCartOpen }) => {
  return (
    <Button
      disabled={inventory[product.sku][size] === 0}
      onClick={() => {
        addToCart(product, size);
        setCartOpen(true)}
      }
    >
      {size}
    </Button>
  )
};

const SizeButtons = ({ product, inventory, addToCart, setCartOpen }) => {
  if (Object.values(inventory).length 
      && Object.values(inventory[product.sku]).filter(num => num > 0).length > 0) {
    return (
      <Button.Group>
        {sizes.map(size => (
          <SizeButton
            key={size}
            size={size}
            product={product}
            inventory={inventory}
            addToCart={addToCart}
            setCartOpen={setCartOpen}
          />
        ))}
      </Button.Group>
    );
  }
  return (
    <p>Out of stock</p>
  );
};

const ProductCard = ({ product, setCartOpen, addToCart, inventory }) => {
  return (
    <Column size="one-quarter">
      <Card>
        <Card.Image>
          <Image.Container>
            <Image src={`data/products/${product.sku}_1.jpg`} />
          </Image.Container>
        </Card.Image>
        <Card.Content>
          <Title size={6}>
            {product.title}
          </Title>
          <p>
            {product.description}
          </p>
          <p>
            {`$${product.price.toFixed(2)}`}
          </p>
          <SizeButtons
            product={product}
            inventory={inventory}
            addToCart={addToCart}
            setCartOpen={setCartOpen}
          />
        </Card.Content>
      </Card>
    </Column>
  );
};

export default ProductCard;
