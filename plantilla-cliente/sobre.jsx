/* Página "Sobre" para sitios de CLIENTE.
   El generador la copia sobre app/sobre/page.jsx. */

import Link from 'next/link';
import config from '@/site.config';
import Ficha from '@/components/Ficha';
import Reveal from '@/components/Reveal';
import WAButton from '@/components/WAButton';
import Portrait from '@/components/Portrait';

const { brand, contact, wa, cliente } = config;

export const metadata = {
  title: 'Sobre',
  description: `Conoce a ${brand.name}, ${brand.role} en ${contact.city}.`,
  alternates: { canonical: '/sobre' },
};

export default function Sobre() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <Ficha>Sobre</Ficha>
            <h1>{cliente.sobreTitulo}</h1>
            <p className="lead">{cliente.sobreLead}</p>
            <div className="btn-row">
              <WAButton msg={wa.cita}>Pedir una cita</WAButton>
              <Link className="btn btn-ghost" href="/contacto">Contacto</Link>
            </div>
          </div>
          <Portrait
            alt={`${brand.name}, ${brand.role}`}
            capLeft={brand.role}
            capRight={brand.suffix}
          />
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <Reveal className="grid-2" style={{ alignItems: 'start', gap: 'clamp(34px,5vw,64px)' }}>
            <div>
              <Ficha>Ficha profesional</Ficha>
              <ul className="fields">
                {cliente.ficha.map((f) => (
                  <li key={f.k}><b>{f.k}</b><span>{f.v}</span></li>
                ))}
              </ul>
            </div>
            <div className="prose">
              <Ficha>La práctica</Ficha>
              {cliente.sobreParrafos.map((p, i) => (
                i === 0 ? <p className="lead" key={i}>{p}</p> : <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap narrow">
          <Reveal className="cta-band">
            <Ficha center>Agenda</Ficha>
            <h2>{cliente.ctaTitulo}</h2>
            <p className="lead">{cliente.ctaTexto}</p>
            <div className="btn-row">
              <WAButton msg={wa.cita}>Escribir por WhatsApp</WAButton>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
