import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const rawText = formData.get('testimonialText') as string;
    const userId = formData.get('userId') as string;
    const clientName = formData.get('clientName') as string;
    const clientCompany = formData.get('clientCompany') as string;

    if (!rawText || !userId) {
      return NextResponse.json({ error: 'Text and userId are required.' }, { status: 400 });
    }

    const fileId = crypto.randomUUID();
    const D1_DB = process.env.DB as any;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!D1_DB || !GEMINI_API_KEY) {
      console.error("Missing DB binding or GEMINI_API_KEY");
      return NextResponse.json({ error: 'Server Configuration Error' }, { status: 500 });
    }

    // 1. Process directly with Google Gemini synchronously
    const systemPrompt = `
      You are an expert B2B Marketing Copywriter. 
      Analyze the following raw customer text testimonial.
      
      Extract the following:
      1. The core problem they had before using our service.
      2. The exact metrics, numbers, or ROI they mention achieving (if any).
      
      Output a highly professional, high-converting Case Study in Markdown format using the Problem-Agitation-Solution (PAS) framework.
    `;

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const aiResponse = await fetch(geminiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: systemPrompt },
            { text: `Raw Testimonial from ${clientName} at ${clientCompany}:\n\n${rawText}` }
          ]
        }]
      })
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error('Gemini API Error:', errText);
      throw new Error('AI Processing Failed');
    }

    const aiData = await aiResponse.json();
    const generatedCaseStudy = aiData.candidates?.[0]?.content?.parts?.[0]?.text || "Unable to generate case study.";

    // Very simple mock metric extraction for the demo MVP
    const extractedMetrics = JSON.stringify({
      sentiment: "Positive",
      highlight: "Great service"
    });

    // 2. Insert directly into D1 Database (Status: ready)
    const dbQuery = `
      INSERT INTO testimonials (id, user_id, client_name, client_company, media_type, status, processed_content, metrics_extracted, created_at)
      VALUES (?, ?, ?, ?, 'text', 'ready', ?, ?, ?)
    `;
    const timestamp = Date.now();
    await D1_DB.prepare(dbQuery)
      .bind(fileId, userId, clientName || 'Anonymous', clientCompany || '', generatedCaseStudy, extractedMetrics, timestamp)
      .run();

    return NextResponse.json({ 
      success: true, 
      testimonialId: fileId,
      message: 'Testimonial successfully processed and saved.' 
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
