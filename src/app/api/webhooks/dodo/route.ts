import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const runtime = 'edge';

// Helper to verify Dodo Payments Webhook Signatures
async function verifyDodoSignature(payload: string, signature: string, secret: string) {
  // In a Node environment we use crypto.createHmac.
  // In Edge runtimes (Cloudflare), we use Web Crypto API.
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['verify']
  );
  
  // Dodo signatures might be hex encoded
  const signatureBytes = new Uint8Array(
    signature.match(/.{1,2}/g)?.map(byte => parseInt(byte, 16)) || []
  );

  return await crypto.subtle.verify(
    'HMAC',
    key,
    signatureBytes,
    encoder.encode(payload)
  );
}

export async function POST(request: Request) {
  try {
    const payload = await request.text();
    const signature = request.headers.get('dodo-signature');
    const secret = process.env.DODO_WEBHOOK_SECRET;
    const D1_DB = process.env.DB as any;

    if (!signature || !secret || !D1_DB) {
      return NextResponse.json({ error: 'Missing configuration' }, { status: 400 });
    }

    // 1. Verify the cryptographic signature to ensure this request actually came from Dodo Payments
    // Uncomment when pushing to production (requires actual secret)
    /*
    const isValid = await verifyDodoSignature(payload, signature, secret);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
    }
    */

    const event = JSON.parse(payload);
    
    console.log(`Received Dodo Webhook Event: ${event.type}`);

    // 2. Handle the specific subscription events
    if (event.type === 'subscription.created' || event.type === 'subscription.renewed') {
      const customerEmail = event.data.customer.email;
      
      // Upgrade user to Pro tier
      await D1_DB.prepare(`UPDATE users SET subscription_tier = 'pro' WHERE email = ?`)
        .bind(customerEmail)
        .run();
        
      console.log(`Upgraded user ${customerEmail} to Pro.`);
    } 
    else if (event.type === 'subscription.canceled' || event.type === 'subscription.past_due') {
      const customerEmail = event.data.customer.email;
      
      // Downgrade user to Free tier
      await D1_DB.prepare(`UPDATE users SET subscription_tier = 'free' WHERE email = ?`)
        .bind(customerEmail)
        .run();
        
      console.log(`Downgraded user ${customerEmail} to Free.`);
    }

    // Acknowledge receipt of the webhook to Dodo
    return NextResponse.json({ received: true });

  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Webhook handler failed' }, { status: 500 });
  }
}
