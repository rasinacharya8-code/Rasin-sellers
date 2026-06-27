import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [currentView, setCurrentView] = useState('shop'); // 'shop' | 'orders'
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderRef, setOrderRef] = useState('');

  // Simulating an API Fetch to load store merchandise items 
  useEffect(() => {
    // In later modules, this array pulls directly from your backend API service
    const mockProducts = [
      { id: "p1", name: "Luxe Stride Gold-Thread Sneakers", price: 125000, image: "shoes.png", rating: 4.9 },
      { id: "p2", name: "Aether Chronograph Obsidian Watch", price: 285000, image: "watch.png", rating: 4.8 },
      { id: "p3", name: "AeroSound Elite Gold-Leaf Headphones", price: 195000, image: "headphones.png", rating: 4.9 },
      { id: "p4", name: "Atelier Silk-Cashmere Oversized Hoodie", price: 98000, image: "hoodie.png", rating: 4.7 }
    ];
    setProducts(mockProducts);
  }, []);

  function handleAddToCart(product) {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product.id === product.id);
      if (existing) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    // Auto open cart when adding an item to show interactive feedback
    setIsCartOpen(true);
  }

  function handleUpdateQuantity(productId, newQty) {
    if (newQty <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQty }
          : item
      )
    );
  }

  function handleRemoveFromCart(productId) {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  }

  function handleCheckout(shippingDetails) {
    const randomRef = 'RS-' + Math.floor(100000 + Math.random() * 900000);
    const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    const newOrder = {
      id: randomRef,
      date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }),
      items: [...cart],
      subtotal,
      shipping: shippingDetails,
      status: 'Awaiting Curator Verification'
    };

    setOrders(prevOrders => [newOrder, ...prevOrders]);
    setOrderRef(randomRef);
    setOrderPlaced(true);
    setIsCartOpen(false);
  }

  function handleCloseConfirmation() {
    setOrderPlaced(false);
    setCart([]);
    setCurrentView('orders'); // Auto navigate to orders view to see progress
  }

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="ecommerce-app">
      <Header 
        cartCount={cartCount} 
        onCartClick={() => setIsCartOpen(true)} 
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      {currentView === 'shop' ? (
        <main className="products-container">
          <h2>The Curated Collection</h2>
          <div className="products-grid">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={handleAddToCart} 
              />
            ))}
          </div>
        </main>
      ) : (
        <main className="orders-container">
          <h2>Your Private Orders</h2>
          {orders.length === 0 ? (
            <div className="empty-orders">
              <p>You have not placed any orders yet.</p>
              <button className="browse-shop-btn" onClick={() => setCurrentView('shop')}>
                Browse Collection
              </button>
            </div>
          ) : (
            <div className="orders-list">
              {orders.map(order => (
                <div key={order.id} className="order-card">
                  <div className="order-header">
                    <div>
                      <span className="order-label">Order Ref:</span>
                      <span className="order-id"> {order.id}</span>
                    </div>
                    <span className="order-date">{order.date}</span>
                  </div>
                  <div className="order-body">
                    <div className="order-items">
                      {order.items.map(item => (
                        <div key={item.product.id} className="order-item-row">
                          <span className="order-item-name">{item.product.name} (x{item.quantity})</span>
                          <span className="order-item-price">NPR {(item.product.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                    <div className="order-footer">
                      <div className="order-shipping-info">
                        <strong>Delivery:</strong> {order.shipping.name}, {order.shipping.address}, {order.shipping.city} (Tel: {order.shipping.phone})
                        <br />
                        <strong>Method:</strong> {order.shipping.paymentMethod}
                      </div>
                      <div className="order-summary-block">
                        <div className="order-status-badge">{order.status}</div>
                        <div className="order-total">Total: NPR {order.subtotal.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      )}

      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateQuantity={handleUpdateQuantity}
        removeFromCart={handleRemoveFromCart}
        checkout={handleCheckout}
      />

      {orderPlaced && (
        <div className="order-modal-overlay">
          <div className="order-modal">
            <h3>Order Placed Successfully</h3>
            <div className="order-ref">Reference: {orderRef}</div>
            <p>Thank you for shopping with Rasin Sellers.</p>
            <p className="order-details-note">
              Your private curator will contact you shortly to coordinate the delivery of your items and arrange secure payment options.
            </p>
            <button className="confirm-close-btn" onClick={handleCloseConfirmation}>
              Go to Your Orders
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;