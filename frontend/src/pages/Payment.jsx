import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { createRazorpayOrder, verifyPayment } from '../services/payment';

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderData, total } = location.state || {};
  const [loading, setLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setLoading(true);
    
    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert('Failed to load payment gateway. Please try again.');
        setLoading(false);
        return;
      }

      // Create order on backend
      const { data } = await createRazorpayOrder(total);
      
      const options = {
        key: 'rzp_test_YOUR_TEST_KEY', // Replace with your Razorpay key
        amount: data.amount,
        currency: data.currency,
        name: 'DRGCommerce',
        description: 'Order Payment',
        order_id: data.id,
        handler: async (response) => {
          // Verify payment on backend
          const verification = await verifyPayment({
            orderId: data.id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature
          });

          if (verification.data.success) {
            // Create order in database
            navigate('/order-confirmation', {
              state: {
                orderId: verification.data.orderId,
                total: total
              }
            });
          } else {
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: orderData?.address?.fullName || 'Customer',
          email: orderData?.email || '',
          contact: orderData?.address?.phone || ''
        },
        theme: {
          color: '#EAB308'
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!orderData) {
    navigate('/checkout');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-4">Complete Payment</h1>
          
          <div className="mb-6">
            <p className="text-gray-600">Order Summary</p>
            <p className="text-3xl font-bold mt-2">₹{total}</p>
          </div>

          <button
            onClick={handlePayment}
            disabled={loading}
            className="w-full bg-yellow-500 text-gray-900 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Pay Now'}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Secure payment powered by Razorpay
          </p>
        </div>
      </div>
    </div>
  );
};

export default Payment;