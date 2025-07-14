export async function translateToUrdu(text: string): Promise<string> {
   const tryTranslate = async (
    url: string,
    body: object,
    retries = 3,
    delay = 1000
  ): Promise<string | null> => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          const html = await res.text();
          console.error(` Attempt ${attempt} failed:`, html);
          if (attempt === retries) return null;
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }

        const data = await res.json();
        return data.translatedText || null;
      } catch (error) {
        console.error(`Attempt ${attempt} error:`, error);
        if (attempt === retries) return null;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
    return null;
  };

  try {
    if (!text) {
      console.warn('No text provided for translation');
      return '[No text to translate]';
    }

    console.log('Attempting Urdu translation with LibreTranslate...');
    // Try LibreTranslate first
    const libreResult = await tryTranslate('https://libretranslate.de/translate', {
      q: text,
      source: 'en',
      target: 'ur',
      format: 'text',
    });

    if (libreResult) {
      console.log('LibreTranslate successful');
      return libreResult;
    }

    console.warn('LibreTranslate failed, falling back to MyMemory...');
    // Fallback to MyMemory API
    const myMemoryResult = await tryTranslate(
      'https://api.mymemory.translated.net/get',
      {
        q: text,
        langpair: 'en|ur',
      }
    );

    if (myMemoryResult) {
      console.log('✅ MyMemory translation successful');
      return myMemoryResult;
    }

    console.warn(' All translation attempts failed');
    return text + ' [ Urdu translation failed]';
  } catch (error) {
    console.error(' Translation error:', error);
    return text + ' [ Urdu translation failed]';
  }
}