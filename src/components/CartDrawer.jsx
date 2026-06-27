import React, { useState, useEffect } from 'react';

function CartDrawer({ isOpen, onClose, cart, updateQuantity, removeFromCart, checkout }) {
  const [step, setStep] = useState('cart'); // 'cart' | 'checkout'
  
  // Checkout Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('Kathmandu');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('eSewa');

  // Reset to cart view when drawer is closed
  useEffect(() => {
    if (!isOpen) {
      setStep('cart');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const subtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handleSubmitCheckout = (e) => {
    e.preventDefault();
    if (!name || !phone || !address) {
      alert("Please fill in all the details.");
      return;
    }
    checkout({ name, phone, city, address, paymentMethod });
  };

  return (
    <div className="cart-overlay" onClick={onClose}>
      <div className="cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="cart-drawer-header">
          <h2>{step === 'cart' ? 'Your Bag' : 'Private Checkout'}</h2>
          <button className="close-drawer-btn" onClick={onClose}>&times;</button>
        </div>

        {step === 'cart' ? (
          cart.length === 0 ? (
            <div className="empty-cart-message">
              <p>Your shopping bag is empty.</p>
              <button className="continue-shopping-btn" onClick={onClose}>Continue Shopping</button>
            </div>
          ) : (
            <>
              <div className="cart-items-list">
                {cart.map((item) => (
                  <div key={item.product.id} className="cart-item">
                    <img src={`${import.meta.env.BASE_URL}${item.product.image}`} alt={item.product.name} className="cart-item-image" />
                    <div className="cart-item-details">
                      <h4>{item.product.name}</h4>
                      <p className="cart-item-price">NPR {item.product.price.toLocaleString()}</p>
                      <div className="cart-item-quantity-control">
                        <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                    <button className="remove-item-btn" onClick={() => removeFromCart(item.product.id)}>&times;</button>
                  </div>
                ))}
              </div>

              <div className="cart-drawer-footer">
                <div className="cart-subtotal">
                  <span>Subtotal</span>
                  <span>NPR {subtotal.toLocaleString()}</span>
                </div>
                <p className="luxury-note">Complimentary global white-glove shipping included.</p>
                <button className="checkout-btn" onClick={() => setStep('checkout')}>
                  Proceed to Checkout
                </button>
              </div>
            </>
          )
        ) : (
          /* Step === 'checkout' */
          <form className="checkout-form" onSubmit={handleSubmitCheckout}>
            <div className="form-section-title">Delivery Details</div>
            
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                placeholder="Rasin Maharjan" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label>Phone Number</label>
              <input 
                type="tel" 
                placeholder="98XXXXXXXX" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label>City</label>
              <select value={city} onChange={(e) => setCity(e.target.value)}>
                <option value="Kathmandu">Kathmandu</option>
                <option value="Lalitpur">Lalitpur</option>
                <option value="Bhaktapur">Bhaktapur</option>
                <option value="Pokhara">Pokhara</option>
                <option value="Lumbini">Lumbini</option>
                <option value="Biratnagar">Biratnagar</option>
              </select>
            </div>

            <div className="form-group">
              <label>Street Address</label>
              <input 
                type="text" 
                placeholder="Ex. Jhamsikhel, Ward 3" 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
                required 
              />
            </div>

            <div className="form-section-title">Payment Method</div>
            <div className="payment-options">
              <label className={`payment-option-card ${paymentMethod === 'eSewa' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="eSewa" 
                  checked={paymentMethod === 'eSewa'} 
                  onChange={() => setPaymentMethod('eSewa')} 
                />
                <span className="payment-icon">🟢</span>
                <span className="payment-label">eSewa Wallet</span>
              </label>

              <label className={`payment-option-card ${paymentMethod === 'Khalti' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="Khalti" 
                  checked={paymentMethod === 'Khalti'} 
                  onChange={() => setPaymentMethod('Khalti')} 
                />
                <span className="payment-icon">🟣</span>
                <span className="payment-label">Khalti Wallet</span>
              </label>

              <label className={`payment-option-card ${paymentMethod === 'Direct Wire' ? 'active' : ''}`}>
                <input 
                  type="radio" 
                  name="payment" 
                  value="Direct Wire" 
                  checked={paymentMethod === 'Direct Wire'} 
                  onChange={() => setPaymentMethod('Direct Wire')} 
                />
                <span className="payment-icon">🏦</span>
                <span className="payment-label">Direct Bank Wire</span>
              </label>
            </div>

            <div className="checkout-drawer-footer">
              <div className="checkout-summary-row">
                <span>Total Amount:</span>
                <span>NPR {subtotal.toLocaleString()}</span>
              </div>
              
              <div className="checkout-button-group">
                <button type="button" className="back-btn" onClick={() => setStep('cart')}>
                  Back to Bag
                </button>
                <button type="submit" className="complete-btn">
                  Complete Order
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default CartDrawer;
