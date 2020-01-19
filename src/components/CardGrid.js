import React from 'react';
import 'rbx/index.css';
import { Container, Column } from 'rbx';
import ProductCard from './ProductCard';

const CardGrid = ({ products, setCartOpen, addToCart, inventory }) => {
  return (
    <Container id="card-grid">
      <Column.Group vcentered multiline>
        {products.map(product =>
          <ProductCard
            key={product.sku}
            product={product}
            addToCart={addToCart}
            setCartOpen={setCartOpen}
            inventory={inventory}
          />)}
      </Column.Group>
    </Container>
  );
};

export default CardGrid;
