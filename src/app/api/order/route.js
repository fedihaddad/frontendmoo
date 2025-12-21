import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const orderData = await request.json();
        const { orderId, user, items, total } = orderData;

        const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

        if (!DISCORD_WEBHOOK_URL) {
            console.log("Discord Webhook URL not configured. Order details:", orderData);
            return NextResponse.json({
                success: true,
                message: "Order processed (Discord simulation - please set DISCORD_WEBHOOK_URL in .env.local to receive notifications)",
                orderId
            });
        }

        const itemDetails = items.map(item => `- [${item.name}](https://find.tn/products/${item.id}) x${item.quantity} (${item.price} DT each)`).join('\n');

        const discordPayload = {
            embeds: [{
                title: `🆕 New Order: #${orderId} | find.tn`,
                color: 0x6366f1,
                fields: [
                    { name: "👤 Customer", value: `**Name:** ${user.name}\n**Email:** ${user.email}\n**Phone:** ${user.phone}\n**Address:** ${user.address}`, inline: false },
                    { name: "🛍️ Items", value: itemDetails || "No items", inline: false },
                    { name: "💰 Total", value: `**${total.toFixed(2)} DT**`, inline: true },
                    { name: "🚚 Delivery Method", value: "Standard Delivery", inline: true }
                ],
                timestamp: new Date().toISOString()
            }]
        };

        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(discordPayload)
        });

        if (!response.ok) {
            throw new Error('Failed to send to Discord');
        }

        return NextResponse.json({ success: true, orderId });
    } catch (error) {
        console.error("Order processing error:", error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
