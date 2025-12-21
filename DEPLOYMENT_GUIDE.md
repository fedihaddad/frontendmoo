# Deployment Guide for find.tn

Follow these exact steps to deploy your architecture.

## 1. Deploy the Backend (to Render)
Your backend contains the API and the Database.

1.  **Push your code to GitHub**:
    *   Initialize a git repo in `mootaz` if not already done.
    *   Push everything to GitHub.
2.  **Create a Web Service on Render**:
    *   Go to **dashboard.render.com** -> New **Web Service**.
    *   Connect your GitHub repo.
    *   **Root Directory**: `admin-backend` (Important: Only deploy this folder).
    *   **Build Command**: `npm install`
    *   **Start Command**: `node server.js`
    *   Click **Deploy**.
3.  **Copy your Render URL**: It will look like `https://find-tn-backend.onrender.com`.

## 2. Deploy the Storefront (to Netlify)
Your storefront displays the products.

1.  **Go to Netlify**:
    *   New Site from Git -> Select the same repo.
    *   **Base Directory**: `.` (Root) or leave empty.
    *   **Build Command**: `npm run build`
    *   **Publish Directory**: `.next` (Next.js default).
2.  **Add Environment Variable**:
    *   Go to **Site Settings > Environment Variables**.
    *   Key: `NEXT_PUBLIC_API_URL`
    *   Value: `https://find-tn-backend.onrender.com/api/products` (Use your Render URL from step 1).
3.  **Deploy**.

## 3. Connect your Local Admin
Your admin panel stays on your computer but manages the live site.

1.  Double-click `start-admin.bat`.
2.  It opens `http://localhost:5000`.
3.  You will see a new **Backend URL** box at the top.
4.  Paste your **Render URL** (e.g., `https://find-tn-backend.onrender.com`) and click **Save & Connect**.
5.  Now, when you add a product, it saves to Render and appears on your Netlify site instantly!

## Notes
*   **Images**: When adding products, use direct image links (copy from browser/unsplash).
*   **Data Safety**: On Render (Free Tier), the `products.json` file might reset if the server restarts. For a real production app, consider using a database like MongoDB Atlas, but for this setup, it's a simple start.
