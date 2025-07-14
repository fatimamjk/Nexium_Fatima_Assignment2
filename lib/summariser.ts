export function generateStaticSummary(text: string): string {
  const sentences = text.split('.').filter(Boolean);
  return sentences.slice(0, 2).join('. ') + '.';
}
