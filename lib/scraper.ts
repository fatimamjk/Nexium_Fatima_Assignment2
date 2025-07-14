import axios from 'axios';
import * as cheerio from 'cheerio';

export async function scrapeBlogText(url: string): Promise<string> {
  try {
    const { data } = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept':
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
      },
    });

    const $ = cheerio.load(data);
    const text = $('body').text();
    return text.replace(/\s+/g, ' ').trim().slice(0, 2000);
  } catch (err) {
    console.error('Failed to scrape blog content:', err);
    throw new Error('Unable to fetch blog. It may be blocking requests.');
  }
}
