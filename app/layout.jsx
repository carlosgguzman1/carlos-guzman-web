import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import config, { T } from '@/site.config';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import FloatWA from '@/components/FloatWA';
import './globals.css';

const display = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-display',
  display: 'swap',
});

const body = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
});

const mono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
});

const { brand, contact } = config;

export const metadata = {
  metadataBase: new URL(brand.domain),
  title: {
    default: config.seo.titulo,
    template: `%s — ${brand.name}, ${brand.suffix}`,
  },
  description: config.seo.descripcion,
  authors: [{ name: `${brand.name}, ${brand.suffix}` }],
  robots: { index: true, follow: true, 'max-image-preview': 'large' },
  openGraph: {
    type: 'website',
    locale: brand.locale,
    siteName: `${brand.name}, ${brand.suffix}`,
    url: brand.domain,
    images: ['/portada.jpg'],
  },
  twitter: { card: 'summary_large_image', images: ['/portada.jpg'] },
};

export const viewport = {
  themeColor: T.paper,
};

const cssVars = {
  '--paper': T.paper,
  '--paper2': T.paper2,
  '--white': T.white,
  '--ink': T.ink,
  '--slate': T.slate,
  '--line': T.line,
  '--primary': T.primary,
  '--primary-deep': T.primaryDeep,
  '--soft': T.soft,
  '--bright': T.bright,
  '--accent': T.accent,
};

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: brand.name,
  honorificSuffix: brand.suffix,
  jobTitle: brand.role,
  description: config.seo.descripcion,
  url: brand.domain,
  telephone: `+${contact.whatsapp}`,
  knowsLanguage: ['es', 'en'],
  address: {
    '@type': 'PostalAddress',
    addressLocality: contact.city.split(',')[0],
    addressRegion: contact.region,
    addressCountry: 'US',
  },
  worksFor: {
    '@type': 'Organization',
    name: brand.legalEntity,
    url: brand.domain,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang={brand.lang} className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body style={cssVars}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
        <a className="skip" href="#main">Saltar al contenido</a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <FloatWA />
      </body>
    </html>
  );
}
