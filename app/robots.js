import config from '@/site.config';

export default function robots() {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      // Rastreadores de IA — permitidos a propósito, para ser citado
      // por ChatGPT, Perplexity y Google AI Overviews.
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'OAI-SearchBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
      { userAgent: 'Google-Extended', allow: '/' },
    ],
    sitemap: `${config.brand.domain}/sitemap.xml`,
  };
}
