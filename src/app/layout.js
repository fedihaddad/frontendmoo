import { ThemeProvider } from '@/context/ThemeContext';
import { CartProvider } from '@/context/CartContext';
import "./globals.css";

export const metadata = {
  title: 'find.tn | Premium E-commerce',
  description: 'Experience luxury and technology combined. Shop the latest in high-end gadgets in Tunisia.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
