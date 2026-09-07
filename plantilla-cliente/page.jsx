/* Portada para sitios de CLIENTE.
   El generador copia este archivo sobre app/page.jsx.
   Todo el contenido sale de site.config.js → bloque `cliente`. */

import Link from 'next/link';
import config from '@/site.config';
import Ficha from '@/components/Ficha';
import Reveal from '@/components/Reveal';
import WAButton from '@/components/WAButton';
import Portrait from '@/components/Portrait';
import FAQ from '@/components/FAQ';

const { brand, contact, wa, cliente } = config;

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <Ficha>{contact.city}</Ficha>
            <h1>{cliente.titulo}</h1>
            <p className="lead">{cliente.subtitulo}</p>
            <div className="btn-row">
              <WAButton msg={wa.cita}>Pedir una cita</WAButton>
              <Link className="btn btn-ghost" href="#servicios">Ver tratamientos</Link>
            </div>
            <p className="hero-note">
              {brand.name}, {brand.suffix} · {brand.role}
            </p>
          </div>

          <Portrait
            alt={`${brand.name}, ${brand.role} en ${contact.city}`}
            capLeft={brand.role}
            capRight={contact.city.split(',')[0]}
          />
        </div>
      </section>

      {/* ── FRANJA ── */}
      <section className="strip">
        <div className="wrap" style={{ paddingInline: 0 }}>
          <div className="strip-in">
            {config.strip.map((s) => (
              <div className="strip-cell" key={s.k}>
                <div className="strip-k">{s.k}</div>
                <div className="strip-v">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section className="sec" id="servicios">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Tratamientos</Ficha>
            <h2>{cliente.serviciosTitulo}</h2>
            <p className="lead">{cliente.serviciosTexto}</p>
          </Reveal>
          <Reveal className="grid-3">
            {cliente.tratamientos.map((t) => (
              <article className="card" key={t.t}>
                <h3>{t.t}</h3>
                <p>{t.d}</p>
                <WAButton msg={`Hola, me interesa información sobre ${t.t}.`} className="arrow" icon={false}>
                  Preguntar →
                </WAButton>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── POR QUÉ ── */}
      <section className="sec sec-alt">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Por qué con nosotros</Ficha>
            <h2>{cliente.porqueTitulo}</h2>
          </Reveal>
          <Reveal className="facts">
            {cliente.porque.map((p) => (
              <div className="fact" key={p.t}>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── CÓMO PEDIR CITA ── */}
      <section className="sec sec-dark">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha pale>Cómo pedir cita</Ficha>
            <h2>Tres pasos y estás agendado.</h2>
          </Reveal>
          <Reveal className="steps tri">
            {cliente.pasos.map((p) => (
              <div className="step" key={p.n}>
                <div className="step-n">{p.n}</div>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head center narrow">
            <Ficha center>Preguntas</Ficha>
            <h2>Lo que más nos preguntan</h2>
          </Reveal>
          <Reveal><FAQ items={cliente.faq} /></Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sec sec-alt">
        <div className="wrap narrow">
          <Reveal className="cta-band">
            <Ficha center>Agenda</Ficha>
            <h2>{cliente.ctaTitulo}</h2>
            <p className="lead">{cliente.ctaTexto}</p>
            <div className="btn-row">
              <WAButton msg={wa.cita}>Escribir por WhatsApp</WAButton>
              <Link className="btn btn-ghost" href="/contacto">Ver contacto</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
