import config from '@/site.config';

export default function sitemap() {
  const base = config.brand.domain;
  const now = new Date();
  return [
    { url: `${base}/`, lastModified: now, changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/sofia-rx`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/paginas-web`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/protocolos`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/sobre`, lastModified: now, changeFrequency: 'yearly', priority: 0.7 },
    { url: `${base}/contacto`, lastModified: now, changeFrequency: 'yearly', priority: 0.8 },
  ];
}
