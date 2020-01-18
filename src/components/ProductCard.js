import React from 'react';
import 'rbx/index.css';
import { Card, Image, Title, Column, Button } from 'rbx';

const ProductCard = ({ product, setCartOpen, addToCart }) => {
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
            {`$${product.price}`}
          </p>
          <Button.Group>
            <Button onClick={() => {
              addToCart(product, 'S');
              setCartOpen(true)
            }}>
              S
            </Button>
            <Button onClick={() => {
              addToCart(product, 'M');
              setCartOpen(true)
            }}>
              M
            </Button>
            <Button onClick={() => {
              addToCart(product, 'L');
              setCartOpen(true)
            }}>
              L
            </Button>
            <Button onClick={() => {
              addToCart(product, 'XL');
              setCartOpen(true)
            }}>
              XL
            </Button>
          </Button.Group>
        </Card.Content>
      </Card>
    </Column>
  );
};

export default ProductCard;
