# Independent Admin & Backend Setup

We have separated the project into two parts:
1. **The Public Store** (Next.js App) - This is what you deploy to the internet.
2. **The Admin Backend** (Express App) - This runs LOCALLY on your machine to manage products.

## 1. How to run the Public Store
This contains the website that customers see.
```bash
# In the main folder
npm run dev
```
*   Access it at: `http://localhost:3000`
*   It fetches products from your local backend (`http://localhost:5000`).

## 2. How to run the Admin Backend
This contains the **Product Dashboard** and the **Database** (`products.json`).
*   **Double-click `start-admin.bat`** to start it.
*   OR run it manually:
    ```bash
    cd admin-backend
    node server.js
    ```
*   Access the Dashboard at: `http://localhost:5000`

## Workflow
1. Start both servers (`npm run dev` for store, `start-admin.bat` for admin).
2. Go to `http://localhost:5000` to add/edit products.
3. Refresh `http://localhost:3000` to see the changes instantly.
4. When you deploy, only deploy the main folder. You will need to configure `NEXT_PUBLIC_API_URL` to point to your live data source if you decide to host the backend later. For now, it works perfectly with your "admin local" request.
