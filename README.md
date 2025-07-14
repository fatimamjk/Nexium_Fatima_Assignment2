# Blog Summariser – Assignment 2

This is a Blog Summariser web application developed for Assignment 2. It is built using Next.js and TypeScript. The app allows users to input a blog URL, scrapes the blog content, generates a static summary, translates it into Urdu using translation APIs, and stores the data in MongoDB and Supabase.

## Features

- Accepts a blog URL from the user
- Scrapes blog content from the given URL using Cheerio
- Generates a static summary using basic text slicing
- Translates the summary into Urdu using:
  - [LibreTranslate API](https://libretranslate.com/)
  - [MyMemory API](https://mymemory.translated.net/) as a fallback
- Saves:
  - Full blog text and summaries in **MongoDB**
  - English + Urdu summaries in **Supabase**

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: API Routes in Next.js
- **Databases**: MongoDB Atlas, Supabase (PostgreSQL)
- **Scraping**: Cheerio
- **Translation**: LibreTranslate, MyMemory
- **Deployment**: Vercel

## Setup Instructions

1. Clone the repository:

   ```bash
   git clone https://github.com/fatimamjk/Nexium_Fatima_Assignment21.git
   cd blog-summariser

   ```

2. Install dependencies:

   ```bash
   npm install

   ```

3. Create a .env.local file and add the following:

   ```bash
   MONGODB_URI=your_mongodb_uri
   SUPABASE_URL=your_supabase_url
   SUPABASE_ANON_KEY=your_supabase_key

   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
