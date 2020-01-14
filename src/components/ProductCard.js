import React from 'react';
import 'rbx/index.css';
import { Card, Image, Title, Column, Button } from 'rbx';

const ProductCard = ({ product }) => {
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
            <Button>
              S
              </Button>
            <Button>
              M
              </Button>
            <Button>
              L
              </Button>
            <Button>
              XL
              </Button>
          </Button.Group>
        </Card.Content>
      </Card>
    </Column>
  );
};

export default ProductCard;
