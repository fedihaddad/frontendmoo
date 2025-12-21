'use client';

import React from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import styles from './ProductCard.module.css';
import CheckoutModal from '@/components/CheckoutModal/CheckoutModal';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();
    const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);
    const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
    const [intervalId, setIntervalId] = React.useState(null);

    const { id, name, price, oldPrice, images, description } = product;
    const reduction = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : null;

    const handleMouseEnter = () => {
        if (images.length > 1) {
            const id = setInterval(() => {
                setCurrentImageIndex((prev) => (prev + 1) % images.length);
            }, 1000); // Change image every 1 second
            setIntervalId(id);
        }
    };

    const handleMouseLeave = () => {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
        setCurrentImageIndex(0); // Reset to first image
    };

    const handleBuyNow = () => {
        addToCart(product);
        setIsCheckoutOpen(true);
    };

    return (
        <>
            <div
                className={`${styles.card} animate-fade-in`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                <div className={styles.imageContainer}>
                    {reduction && <span className={styles.badge}>-{reduction}%</span>}
                    <Image
                        src={images[currentImageIndex]}
                        alt={name}
                        width={300}
                        height={300}
                        className={styles.image}
                        unoptimized
                    />
                    {images.length > 1 && (
                        <div className={styles.dots}>
                            {images.map((_, idx) => (
                                <span
                                    key={idx}
                                    className={`${styles.dot} ${idx === currentImageIndex ? styles.activeDot : ''}`}
                                ></span>
                            ))}
                        </div>
                    )}
                </div>
                <div className={styles.content}>
                    <h3 className={styles.name}>{name}</h3>
                    <p className={styles.description}>{description}</p>
                    <div className={styles.priceSection}>
                        <span className={styles.price}>{price} DT</span>
                        {oldPrice && <span className={styles.oldPrice}>{oldPrice} DT</span>}
                    </div>
                    <div className={styles.buttons}>
                        <button onClick={() => addToCart(product)} className={styles.btnSecondary}>
                            Add to Cart
                        </button>
                        <button onClick={handleBuyNow} className={styles.btnPrimary}>
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>
            <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} />
        </>
    );
};

export default ProductCard;
