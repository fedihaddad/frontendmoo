const express = require('express');
const cors = require('cors');
const fs = require('fs-extra');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;
const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');

const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:5000',
    'https://find.tn.netlify.app',
    /https:\/\/.*--find-tn.netlify.app/ // Allow Netlify previews
];

app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(bodyParser.json());
app.use(express.static('public'));

// Ensure products file exists
if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.outputJsonSync(PRODUCTS_FILE, []);
}

// Get all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await fs.readJson(PRODUCTS_FILE);
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to read products' });
    }
});

// Add a product
app.post('/api/products', async (req, res) => {
    try {
        const newProduct = req.body;
        const products = await fs.readJson(PRODUCTS_FILE);

        if (!newProduct.id) {
            newProduct.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
        }

        products.push(newProduct);
        await fs.writeJson(PRODUCTS_FILE, products, { spaces: 2 });
        res.json({ success: true, product: newProduct });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save product' });
    }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        let products = await fs.readJson(PRODUCTS_FILE);
        products = products.filter(p => p.id !== id);
        await fs.writeJson(PRODUCTS_FILE, products, { spaces: 2 });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});
