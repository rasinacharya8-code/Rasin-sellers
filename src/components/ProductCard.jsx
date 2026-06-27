import React from 'react';

function ProductCard({ product, onAddToCart }) {
  const { name, price, image, rating } = product;

  return (
    <div className="product-card">
      <div className="image-wrapper">
        <img src={`${import.meta.env.BASE_URL}${image}`} alt={name} className="product-image" />
      </div>
      <div className="product-info">
        <h3>{name}</h3>
        <p className="product-rating"><span>★</span> {rating} / 5.0</p>
        <p className="product-price">NPR {price.toLocaleString()}</p>
        <button className="add-to-cart-btn" onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;