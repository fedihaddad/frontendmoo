'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar/Navbar';
import ProductCard from '@/components/ProductCard/ProductCard';
import styles from './page.module.css';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/products';
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <main className={styles.main}>
      <Navbar />

      <section className={styles.hero}>
        <div className="container">
          <h1 className={`${styles.title} animate-fade-in`}>
            FIND<span>.TN</span>
          </h1>
          <p className={`${styles.subtitle} animate-fade-in`}>
            Discover our curated collection of premium gadgets designed for the modern individual in Tunisia.
          </p>
        </div>
      </section>

      <section className={styles.productsSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Featured Collection</h2>
            <p>Our top picks for you</p>
          </div>
          <div className={styles.productGrid}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <p>&copy; 2025 FIND.TN. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
