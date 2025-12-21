'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import styles from './CheckoutModal.module.css';

const CheckoutModal = ({ isOpen, onClose }) => {
    const { cart, cartTotal, clearCart } = useCart();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        address: ''
    });
    const [status, setStatus] = useState('idle'); // idle, loading, success, error
    const [orderId, setOrderId] = useState('');

    if (!isOpen) return null;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');

        const generatedOrderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();

        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderId: generatedOrderId,
                    user: formData,
                    items: cart,
                    total: cartTotal
                })
            });

            if (response.ok) {
                setOrderId(generatedOrderId);
                setStatus('success');
                clearCart();
            } else {
                throw new Error('Failed to process order');
            }
        } catch (error) {
            console.error(error);
            setStatus('error');
        }
    };

    return (
        <div className={styles.overlay}>
            <div className={`${styles.modal} glass`}>
                {status === 'success' ? (
                    <div className={styles.successView}>
                        <div className={styles.icon}>🎉</div>
                        <h2>Order Confirmed!</h2>
                        <p>Thank you for your purchase. Your order ID is:</p>
                        <div className={styles.orderId}>{orderId}</div>
                        <p className={styles.muted}>We've sent a confirmation to your email.</p>
                        <button onClick={onClose} className={styles.btnPrimary}>Close</button>
                    </div>
                ) : (
                    <>
                        <div className={styles.header}>
                            <h2>Checkout Details</h2>
                            <button onClick={onClose} className={styles.closeBtn}>×</button>
                        </div>
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label>Full Name</label>
                                <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="John Doe" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Email Address</label>
                                <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="john@example.com" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Phone Number</label>
                                <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+1 234 567 890" />
                            </div>
                            <div className={styles.inputGroup}>
                                <label>Delivery Address</label>
                                <textarea name="address" required value={formData.address} onChange={handleChange} placeholder="123 Luxury St, Beverly Hills, CA" rows="3" />
                            </div>

                            <div className={styles.summary}>
                                <span>Total Amount:</span>
                                <strong>{cartTotal.toFixed(2)} DT</strong>
                            </div>

                            <button type="submit" disabled={status === 'loading'} className={styles.btnPrimary}>
                                {status === 'loading' ? 'Processing...' : 'Complete Order'}
                            </button>
                        </form>
                    </>
                )}
            </div>
        </div>
    );
};

export default CheckoutModal;
