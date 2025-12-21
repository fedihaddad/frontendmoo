'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar/Navbar';
import CheckoutModal from '@/components/CheckoutModal/CheckoutModal';
import { useCart } from '@/context/CartContext';
import styles from './cart.module.css';

const CartPage = () => {
    const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    return (
        <main className={styles.main}>
            <Navbar />

            <div className="container">
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <h1>Your Shopping <span>Cart</span></h1>
                        <p>{cart.length} item(s) in your basket</p>
                    </div>

                    {cart.length === 0 ? (
                        <div className={styles.empty}>
                            <div className={styles.emptyIcon}>🛍️</div>
                            <h2>Your cart is empty</h2>
                            <p>Looks like you haven't added anything yet.</p>
                            <Link href="/" className={styles.btnPrimary}>Continue Shopping</Link>
                        </div>
                    ) : (
                        <div className={styles.grid}>
                            <div className={styles.itemsList}>
                                {cart.map((item) => (
                                    <div key={item.id} className={`${styles.item} glass`}>
                                        <img src={item.images[0]} alt={item.name} className={styles.itemImage} />
                                        <div className={styles.itemInfo}>
                                            <h3>{item.name}</h3>
                                            <p className={styles.itemCategory}>{item.category}</p>
                                            <div className={styles.itemPrice}>{item.price} DT</div>
                                        </div>
                                        <div className={styles.itemActions}>
                                            <div className={styles.quantity}>
                                                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                                                <span>{item.quantity}</span>
                                                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                            </div>
                                            <button onClick={() => removeFromCart(item.id)} className={styles.removeBtn}>
                                                🗑️
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className={`${styles.summary} glass`}>
                                <h2>Order Summary</h2>
                                <div className={styles.summaryRow}>
                                    <span>Subtotal</span>
                                    <span>{cartTotal.toFixed(2)} DT</span>
                                </div>
                                <div className={styles.summaryRow}>
                                    <span>Shipping</span>
                                    <span className={styles.free}>FREE</span>
                                </div>
                                <div className={`${styles.summaryRow} ${styles.total}`}>
                                    <span>Total</span>
                                    <span>{cartTotal.toFixed(2)} DT</span>
                                </div>
                                <button onClick={() => setIsCheckoutOpen(true)} className={styles.btnCheckout}>
                                    Proceed to Checkout
                                </button>
                                <Link href="/" className={styles.continueLink}>
                                    or Continue Shopping
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
        </main>
    );
};

export default CartPage;
