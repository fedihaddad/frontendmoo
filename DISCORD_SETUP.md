# How to set up Discord for find.tn

Follow these steps to receive order notifications directly in your Discord:

### 1. Create a Discord Server
1. Open Discord and click the **"+"** (Add a Server) button on the left sidebar.
2. Choose **"Create My Own"** and give it a name like `find.tn Orders`.

### 2. Create a Webhook
1. In your new server, click on the **Settings Cog (⚙️)** next to a text channel (e.g., `#general` or create a new `#orders` channel).
2. Go to **Integrations** on the left menu.
3. Click **Webhooks** and then **New Webhook**.
4. Name it `find.tn Bot` and click **Copy Webhook URL**.

### 3. Link it to your Site
1. Open the project folder on your computer.
2. Find or create a file named `.env.local`.
3. Paste your URL like this:
   ```env
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/your_id_here/your_token_here
   ```
4. Restart your development server (`npm run dev`).

Now, every time someone passes a command, you will receive a beautiful notification with:
* Customer Name, Phone, and Address
* List of items with links to your site
* Total price in DT
* Unique Order ID
