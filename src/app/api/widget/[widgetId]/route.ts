import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(
  request: Request,
  { params }: { params: { widgetId: string } }
) {
  try {
    const widgetId = params.widgetId;
    const origin = request.headers.get('x-vouchsync-origin') || request.headers.get('origin') || '';

    // In Next.js App Router on Cloudflare Pages, bindings are via process.env
    const D1_DB = process.env.DB as any;

    if (!D1_DB) {
      // Local dev mock
      return NextResponse.json({
        isPro: false,
        testimonials: [
          {
            clientName: "Jane Doe",
            clientCompany: "TechFlow Inc",
            processedContent: "Before VouchSync, our processes were slow.\nNow, we are 10x faster.",
            metricsExtracted: JSON.stringify({ timeSaved: "20 hrs", roi: "300%" })
          }
        ]
      }, {
        headers: { 'Access-Control-Allow-Origin': '*' }
      });
    }

    // 1. Fetch Widget Configuration and User Tier
    const widgetQuery = `
      SELECT w.allowed_domain, u.subscription_tier, u.id as user_id 
      FROM widgets w 
      JOIN users u ON w.user_id = u.id 
      WHERE w.id = ?
    `;
    const widgetData = await D1_DB.prepare(widgetQuery).bind(widgetId).first();

    if (!widgetData) {
      return NextResponse.json({ error: 'Widget not found' }, { status: 404 });
    }

    // 2. Strict CORS / Origin Verification
    // We only check if an allowed_domain is set. If not, it means the user hasn't configured it yet (allow all for setup)
    if (widgetData.allowed_domain && widgetData.allowed_domain !== '*') {
      const allowedHost = new URL(widgetData.allowed_domain).hostname;
      const requestHost = origin ? new URL(origin).hostname : '';
      
      // Allow localhost for testing by the customer, otherwise enforce match
      if (requestHost !== allowedHost && requestHost !== 'localhost' && requestHost !== '127.0.0.1') {
        return NextResponse.json({ error: 'Unauthorized domain' }, { status: 403 });
      }
    }

    // 3. Fetch Testimonials for this user
    // In a real app, you might filter by specific tags or let the user choose which ones to show.
    const testimonialsQuery = `
      SELECT client_name, client_company, processed_content, metrics_extracted 
      FROM testimonials 
      WHERE user_id = ? AND status = 'ready' 
      ORDER BY created_at DESC 
      LIMIT 10
    `;
    const { results: testimonials } = await D1_DB.prepare(testimonialsQuery).bind(widgetData.user_id).all();

    const isPro = widgetData.subscription_tier === 'pro';

    // 4. Return data with proper CORS headers
    return NextResponse.json({
      isPro,
      testimonials
    }, {
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'x-vouchsync-origin'
      }
    });

  } catch (error) {
    console.error('Widget API error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function OPTIONS(request: Request) {
  const origin = request.headers.get('origin') || '*';
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'x-vouchsync-origin, Content-Type',
      'Access-Control-Max-Age': '86400',
    },
  });
}
