import React from 'react';

function Header({ cartCount, onCartClick, currentView, onViewChange }) {
  return (
    <header className="store-header">
      <div className="header-logo" onClick={() => onViewChange('shop')} style={{ cursor: 'pointer' }}>
        <h1>Rasin <span>Sellers</span></h1>
      </div>
      <nav className="header-nav">
        <a 
          href="#shop" 
          className={currentView === 'shop' ? 'active' : ''} 
          onClick={(e) => { e.preventDefault(); onViewChange('shop'); }}
        >
          Shop
        </a>
        <a 
          href="#orders" 
          className={currentView === 'orders' ? 'active' : ''} 
          onClick={(e) => { e.preventDefault(); onViewChange('orders'); }}
        >
          Orders
        </a>
        <div className="cart-widget" onClick={onCartClick}>
          <span className="cart-icon">🛒</span>
          <span className="cart-badge">{cartCount}</span>
        </div>
      </nav>
    </header>
  );
}

export default Header;