'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import styles from './Navbar.module.css';

const Navbar = () => {
    const { cartCount } = useCart();
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className={`${styles.navbar} glass`}>
            <div className={`${styles.container} container`}>
                <Link href="/" className={styles.logo}>
                    FIND<span>.TN</span>
                </Link>
                <div className={styles.actions}>
                    <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Theme">
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    <Link href="/cart" className={styles.cartLink}>
                        <span className={styles.cartIcon}>🛒</span>
                        {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
