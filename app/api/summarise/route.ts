import { NextRequest, NextResponse } from 'next/server';
import { scrapeBlogText } from '@/lib/scraper';
import { generateStaticSummary } from '@/lib/summariser';
import { translateToUrdu } from '@/lib/translate';
import { connectDB, Blog } from '@/lib/mongodb';
import { supabase } from '@/lib/supabase';

export async function POST(req: NextRequest) {
  const { url } = await req.json();

  try {
    console.log(' Fetching blog content...');
    const fullText = await scrapeBlogText(url);
    console.log('Blog fetched. Length:', fullText.length);

    console.log('Generating summary...');
    const summary = generateStaticSummary(fullText);
    console.log('Summary:', summary);

    console.log('🌐 Translating to Urdu...');
    const urduSummary = await translateToUrdu(summary); // ✅ FIXED HERE
    console.log(' Urdu Summary:', urduSummary);

    console.log(' Connecting to MongoDB...');
    await connectDB();
    await Blog.create({ url, fullText, summary, urduSummary });
    console.log(' Saved to MongoDB');

    console.log('📤 Inserting into Supabase...');
    const { error } = await supabase
      .from('summaries')
      .insert([{ url, summary, urduSummary }]);

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }

    console.log('Saved to Supabase');

    return NextResponse.json({ summary, urduSummary });

  } catch (err) {
    console.error('Caught error:', err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
