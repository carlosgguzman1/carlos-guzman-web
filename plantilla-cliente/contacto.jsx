/* Página de contacto para sitios de CLIENTE. */

import config, { waUrl } from '@/site.config';
import Ficha from '@/components/Ficha';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import FAQ from '@/components/FAQ';

const { wa, contact, cliente } = config;

export const metadata = {
  title: 'Citas y contacto',
  description: `Coordina tu cita por WhatsApp. ${contact.city}.`,
  alternates: { canonical: '/contacto' },
};

export default function Contacto() {
  return (
    <>
      <section className="hero-slim">
        <div className="wrap">
          <Ficha>Citas y contacto</Ficha>
          <h1>Coordina tu cita en un mensaje.</h1>
          <p className="lead">
            Escríbenos por WhatsApp o llena el formulario. Te contestamos el mismo día.
          </p>
        </div>
      </section>

      <section className="sec sec-dark" style={{ marginTop: 'clamp(30px,5vw,52px)' }}>
        <div className="wrap contact-grid">
          <Reveal>
            <Ficha pale>Contacto directo</Ficha>
            <h2>Como te sea más fácil.</h2>
            <p className="lead" style={{ marginTop: 18 }}>
              El formulario abre tu WhatsApp con el mensaje ya escrito. Si prefieres,
              escríbenos directo.
            </p>
            <div className="direct-list">
              <div className="direct">
                <span className="direct-k">WhatsApp</span>
                <a className="direct-v" href={waUrl(wa.cita)} target="_blank" rel="noopener noreferrer">
                  {contact.whatsappDisplay}
                </a>
              </div>
              <div className="direct">
                <span className="direct-k">Ubicación</span>
                <span className="direct-v">{contact.city}</span>
              </div>
              <div className="direct">
                <span className="direct-k">Idiomas</span>
                <span className="direct-v">Español e inglés</span>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <ContactForm />
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Qué pasa después</Ficha>
            <h2>Sin vueltas.</h2>
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

      <section className="sec sec-alt">
        <div className="wrap">
          <Reveal className="sec-head center narrow">
            <Ficha center>Preguntas</Ficha>
            <h2>Antes de escribirnos</h2>
          </Reveal>
          <Reveal><FAQ items={cliente.faq} /></Reveal>
        </div>
      </section>
    </>
  );
}
