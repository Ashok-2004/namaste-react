import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from './CartContext';

const Cart = ({ showFullCart = false }) => {
  const { cartItems, removeFromCart, clearCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  
  // Calculate total price
  const totalPrice = cartItems?.reduce(
    (total, item) => total + (item.price ? item.price/100 : item.defaultPrice/100) * item.quantity, 
    0
  ) || 0;

  // If showFullCart is true, show a full-page cart
  if (showFullCart) {
    return (
      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              Your Cart
            </h2>
          </div>
          
          {cartItems.length === 0 ? (
            <div className="p-6 text-center">
              <div className="mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-800">Your cart is empty</h3>
              <p className="mt-2 text-gray-500">Add items from the menu to place an order</p>
              <Link to="/" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded-lg">Browse Restaurants</Link>
            </div>
          ) : (
            <>
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-4 hover:bg-gray-50">
                    <div className="flex justify-between items-center">
                      {/* Item info */}
                      <div className="flex items-start">
                        {/* Veg/Non-veg indicator */}
                        <div className="mr-2 mt-1">
                          {item.isVeg ? (
                            <span className="h-4 w-4 rounded-sm border border-green-600 flex items-center justify-center">
                              <span className="h-2 w-2 rounded-sm bg-green-600"></span>
                            </span>
                          ) : (
                            <span className="h-4 w-4 rounded-sm border border-red-600 flex items-center justify-center">
                              <span className="h-2 w-2 rounded-sm bg-red-600"></span>
                            </span>
                          )}
                        </div>
                        
                        {/* Item name and price */}
                        <div>
                          <h4 className="font-medium text-gray-800">{item.name}</h4>
                          <p className="text-gray-600">
                            ₹ {item.price ? item.price/100 : item.defaultPrice/100}
                          </p>
                        </div>
                      </div>
                      
                      {/* Quantity control */}
                      <div className="flex items-center">
                        <div className="flex items-center border border-gray-300 rounded mr-3">
                          <button 
                            onClick={() => decreaseQuantity(item.id)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            -
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button 
                            onClick={() => increaseQuantity(item.id)}
                            className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                          >
                            +
                          </button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-600 hover:text-red-800"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div className="p-4 border-t border-gray-200">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-800">₹ {totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Delivery Fee</span>
                  <span className="text-gray-800">₹ 40.00</span>
                </div>
                <div className="flex justify-between items-center mb-4 font-medium text-lg">
                  <span className="text-gray-800">Total</span>
                  <span className="text-gray-800">₹ {(totalPrice + 40).toFixed(2)}</span>
                </div>
                <button className="w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
                  PLACE ORDER
                </button>
                <button 
                  onClick={clearCart}
                  className="w-full mt-2 border border-red-500 text-red-600 py-2 rounded-lg font-medium hover:bg-red-50 transition-colors"
                >
                  CLEAR CART
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }
  
  // If showFullCart is false, show a mini cart at the bottom of the page
  return (
    <div className={`fixed bottom-0 right-0 md:right-4 md:bottom-4 md:max-w-md w-full md:w-96 z-50 bg-white rounded-t-2xl md:rounded-xl shadow-xl ${!cartItems || cartItems.length === 0 ? 'hidden' : ''}`}>
      {cartItems && cartItems.length > 0 && (
        <>
          {/* Cart Header */}
          <div className="bg-green-600 text-white p-4 rounded-t-2xl md:rounded-t-xl flex justify-between items-center">
            <div>
              <h3 className="text-lg font-medium">{cartItems.length} Item{cartItems.length > 1 ? 's' : ''}</h3>
              <p className="text-sm text-green-100">from {cartItems[0]?.restaurantName || 'Restaurant'}</p>
            </div>
            <button 
              onClick={clearCart}
              className="text-xs border border-white text-white px-2 py-1 rounded hover:bg-white hover:text-green-600 transition-colors"
            >
              CLEAR
            </button>
          </div>
          
          {/* Cart Items */}
          <div className="py-2 px-4 max-h-72 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
            {cartItems.map((item) => (
              <div key={item.id} className="flex py-3 border-b border-gray-100">
                {/* Veg/Non-veg indicator */}
                <div className="mr-2 mt-1 flex-shrink-0">
                  {item.isVeg ? (
                    <span className="h-4 w-4 rounded-sm border border-green-600 flex items-center justify-center">
                      <span className="h-2 w-2 rounded-sm bg-green-600"></span>
                    </span>
                  ) : (
                    <span className="h-4 w-4 rounded-sm border border-red-600 flex items-center justify-center">
                      <span className="h-2 w-2 rounded-sm bg-red-600"></span>
                    </span>
                  )}
                </div>
                
                {/* Item name and price */}
                <div className="flex-grow mr-4">
                  <h4 className="text-sm font-medium text-gray-800">{item.name}</h4>
                  <p className="text-sm text-gray-600">
                    ₹ {item.price ? item.price/100 : item.defaultPrice/100}
                  </p>
                </div>
                
                {/* Quantity control */}
                <div className="flex items-center border border-gray-300 rounded">
                  <button 
                    onClick={() => decreaseQuantity(item.id)}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-2 py-1 text-sm">{item.quantity}</span>
                  <button 
                    onClick={() => increaseQuantity(item.id)}
                    className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Subtotal and Checkout */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-800 font-medium">Subtotal</span>
              <span className="text-gray-800 font-medium">₹ {totalPrice.toFixed(2)}</span>
            </div>
            <Link to="/cart" className="block w-full text-center bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors">
              CHECKOUT
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;