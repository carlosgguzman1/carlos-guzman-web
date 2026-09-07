import Link from 'next/link';
import config from '@/site.config';
import Ficha from '@/components/Ficha';
import Reveal from '@/components/Reveal';
import WAButton from '@/components/WAButton';
import Portrait from '@/components/Portrait';
import DemoCard from '@/components/DemoCard';
import Calculadora from '@/components/Calculadora';

const { wa, strip, servicios, proceso } = config;

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <Ficha>San Juan, Puerto Rico · PharmD</Ficha>
            <h1>
              La farmacia del futuro necesita <em className="hl">criterio farmacéutico</em>,
              no solo tecnología.
            </h1>
            <p className="lead">
              Soy Carlos Guzmán, PharmD. Combino compounding, operación real de farmacia e
              inteligencia artificial para ayudar a farmacias, médicos y clínicas de Puerto Rico
              a crear protocolos, automatizar procesos y construir mejores experiencias para
              sus pacientes.
            </p>
            <div className="btn-row">
              <WAButton msg={wa.auditoria}>Solicitar una auditoría</WAButton>
              <Link className="btn btn-ghost" href="/sofia-rx">Conocer a Sofía RX</Link>
            </div>
            <p className="hero-note">
              Farmacéutico de compounding 503A en ejercicio · Consultoría e implementación
            </p>
          </div>

          <Portrait
            alt="Carlos Guzmán, PharmD, farmacéutico de compounding en San Juan, Puerto Rico"
            capLeft="PharmD · Compounding 503A"
            capRight="San Juan, PR"
          />
        </div>
      </section>

      {/* ── FRANJA ── */}
      <section className="strip">
        <div className="wrap" style={{ paddingInline: 0 }}>
          <div className="strip-in">
            {strip.map((s) => (
              <div className="strip-cell" key={s.k}>
                <div className="strip-k">{s.k}</div>
                <div className="strip-v">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DOS PILARES ── */}
      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Ficha 01 — Las dos disciplinas</Ficha>
            <h2>Dos áreas que casi nadie combina. Yo trabajo en las dos todos los días.</h2>
            <p className="lead">
              Una me da el criterio clínico. La otra me da las herramientas. Juntas son la razón
              por la que puedo construir algo que una farmacia de verdad usa.
            </p>
          </Reveal>

          <Reveal className="pillars">
            <article className="pillar">
              <div className="card-n">Disciplina A</div>
              <h3>Compounding y práctica clínica</h3>
              <p>Formulación, evidencia y cumplimiento. El trabajo que hago detrás del mostrador y con los médicos que refieren.</p>
              <ul>
                <li>Protocolos clínicos para médicos y clínicas</li>
                <li>Formulación estéril y no estéril</li>
                <li>Péptidos, hormonas y terapias personalizadas</li>
                <li>Calidad, evidencia y cumplimiento regulatorio</li>
                <li>Educación profesional a colegas</li>
              </ul>
              <Link className="arrow" href="/protocolos">Ver protocolos para médicos →</Link>
            </article>

            <article className="pillar">
              <div className="card-n">Disciplina B</div>
              <h3>Inteligencia artificial y sistemas</h3>
              <p>La parte técnica: agentes de voz, páginas web y automatización que quitan trabajo repetitivo del equipo.</p>
              <ul>
                <li>Auditoría de flujo con IA</li>
                <li>Sofía RX — recepción telefónica inteligente</li>
                <li>Páginas web para profesionales de la salud</li>
                <li>Automatización de refills y citas</li>
                <li>Dashboards e integraciones a la medida</li>
              </ul>
              <Link className="arrow" href="/sofia-rx">Conocer Sofía RX →</Link>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ── PROBLEMA ── */}
      <section className="sec sec-alt">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Ficha 02 — El problema real</Ficha>
            <h2>El teléfono de una farmacia no descansa. Tu equipo sí.</h2>
            <p className="lead">
              No hablo de teoría. Trabajo dentro de una farmacia de compounding todos los días,
              y estos son los tres puntos donde se pierde dinero sin que nadie lo note.
            </p>
          </Reveal>
          <Reveal className="facts">
            <div className="fact">
              <h3>Llamadas sin contestar</h3>
              <p>Hora pico, dos técnicos, cinco líneas. La llamada que nadie coge casi siempre era un refill — y ese paciente llama a la farmacia de al lado.</p>
            </div>
            <div className="fact">
              <h3>Refills que nunca vuelven</h3>
              <p>Nadie llama al paciente cuando se le acaba el medicamento. Se pierde la adherencia, se pierde la receta y se pierde la relación.</p>
            </div>
            <div className="fact">
              <h3>Personal atrapado en el teléfono</h3>
              <p>Un técnico que pasa dos horas al día contestando lo mismo es un técnico que no está dispensando, ni cobrando, ni atendiendo el mostrador.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CALCULADORA ── */}
      <section className="sec" id="calculadora">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Ficha 03 — Haz la cuenta</Ficha>
            <h2>¿Cuánto te cuesta el teléfono que nadie contesta?</h2>
            <p className="lead">
              Mueve los controles con los números de tu farmacia. En cinco segundos vas a saber
              si esto te conviene o si estoy exagerando.
            </p>
          </Reveal>
          <Reveal>
            <Calculadora />
          </Reveal>
        </div>
      </section>

      {/* ── SERVICIOS ── */}
      <section className="sec sec-alt" id="servicios">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Ficha 04 — Servicios</Ficha>
            <h2>Cinco formas de trabajar conmigo.</h2>
            <p className="lead">
              Empaquetados, con alcance claro. Si no sabes por dónde empezar, empieza por la
              auditoría: es gratis y te dice exactamente dónde estás perdiendo dinero.
            </p>
          </Reveal>

          <Reveal className="grid-3">
            {servicios.map((s) => (
              <article className="card" key={s.t}>
                <div className="card-n">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
                <ul>{s.li.map((l) => <li key={l}>{l}</li>)}</ul>
                {s.href ? (
                  <Link className="arrow" href={s.href}>{s.cta} →</Link>
                ) : (
                  <WAButton msg={wa[s.waKey]} className="arrow" icon={false}>
                    {s.cta} →
                  </WAButton>
                )}
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── DEMO ── */}
      <section className="sec" id="demo">
        <div className="wrap">
          <Reveal><DemoCard /></Reveal>
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section className="sec sec-dark">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha pale>Ficha 05 — Cómo trabajamos</Ficha>
            <h2>De la primera llamada a producción, en una semana.</h2>
          </Reveal>
          <Reveal className="steps">
            {proceso.map((p) => (
              <div className="step" key={p.n}>
                <div className="step-n">{p.n}</div>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── PARA QUIÉN ── */}
      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Ficha 06 — Para quién trabajo</Ficha>
            <h2>Farmacias primero. Después, salud en general.</h2>
          </Reveal>
          <Reveal className="grid-3">
            <div className="card-plain">
              <h3>Farmacias independientes</h3>
              <p>Comunidad, compounding o especialidad. Es mi terreno: hablo tu idioma, conozco tu flujo y sé qué pregunta el paciente antes de que lo diga.</p>
            </div>
            <div className="card-plain">
              <h3>Médicos y clínicas</h3>
              <p>Protocolos para prescribir con respaldo, páginas que traen pacientes y automatización de citas. Menos recepción atada al teléfono.</p>
            </div>
            <div className="card-plain">
              <h3>Estéticas y bienestar</h3>
              <p>Med spas, clínicas de peso, wellness. Presencia digital, intake administrativo y sistemas de cita que llenan la agenda.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sec sec-alt">
        <div className="wrap narrow">
          <Reveal className="cta-band">
            <Ficha center>Empecemos</Ficha>
            <h2>La auditoría es gratis. Lo que descubras, no tiene precio.</h2>
            <p className="lead">
              Escríbeme por WhatsApp con el nombre de tu práctica y coordinamos 20 minutos
              esta semana. Te contesto yo.
            </p>
            <div className="btn-row">
              <WAButton msg={wa.auditoria}>Escribirme por WhatsApp</WAButton>
              <Link className="btn btn-ghost" href="/contacto">Ver formas de contacto</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
