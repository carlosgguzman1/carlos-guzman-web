import Link from 'next/link';
import config from '@/site.config';
import Ficha from '@/components/Ficha';
import Reveal from '@/components/Reveal';
import WAButton from '@/components/WAButton';

const { wa, brand } = config;

export const metadata = {
  title: 'Protocolos de compounding para médicos',
  description:
    'Protocolos clínicos con evidencia, dosificación y formularios de orden para péptidos, terapia hormonal, GLP-1, NAD+ e IV. Preparados por un farmacéutico de compounding 503A.',
  alternates: { canonical: '/protocolos' },
  openGraph: {
    title: 'Protocolos de compounding con respaldo farmacéutico real, para médicos y clínicas.',
  },
};

const proSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: brand.legalEntity,
  description:
    'Consultoría en protocolos clínicos de compounding para médicos y clínicas en Puerto Rico.',
  founder: { '@type': 'Person', name: brand.name, honorificSuffix: brand.suffix },
  areaServed: 'Puerto Rico',
  url: `${brand.domain}/protocolos`,
};

const COMPONENTES = [
  { n: '01', t: 'Fundamento clínico', d: 'Mecanismo, indicaciones, evidencia disponible y sus límites, con referencias citadas para que puedas verificar cada afirmación.' },
  { n: '02', t: 'Dosificación y formulación', d: 'Rangos de dosis, vías de administración, formas farmacéuticas disponibles en compounding, estabilidad y consideraciones de preparación.' },
  { n: '03', t: 'Selección y monitoreo del paciente', d: 'Criterios de elegibilidad, contraindicaciones, laboratorios de base y de seguimiento, señales de alerta y cuándo suspender.' },
  { n: '04', t: 'Formulario de orden médica', d: 'El documento que tu práctica usa para ordenar la preparación, con los campos correctos para que no haya idas y vueltas con la farmacia.' },
  { n: '05', t: 'Material de apoyo', d: 'Explicación para el paciente, hoja de consentimiento informado sugerida y guion para que tu equipo conteste las preguntas frecuentes.' },
  { n: '06', t: 'Consideraciones regulatorias', d: 'Qué se puede y qué no se puede preparar bajo 503A, límites de la práctica y dónde está la línea que no conviene cruzar.' },
];

const AREAS = [
  { t: 'Péptidos', d: 'Selección, dosificación, estabilidad y administración. Qué está respaldado, qué es preliminar y qué sencillamente no se sostiene.' },
  { t: 'Terapia hormonal bioidéntica', d: 'Protocolos de reemplazo hormonal en hombres y mujeres: formas, vías, titulación y monitoreo de laboratorio.' },
  { t: 'GLP-1 y manejo de peso', d: 'Escalamiento de dosis, manejo de efectos adversos, adherencia y qué esperar realistamente en cada fase del tratamiento.' },
  { t: 'NAD+ y terapias IV', d: 'Formulación, compatibilidad, velocidad de infusión, consideraciones de esterilidad y protocolos de administración.' },
  { t: 'Formulación estéril y no estéril', d: 'Qué es viable preparar, en qué forma farmacéutica, con qué estabilidad y bajo qué condiciones de calidad.' },
  { t: 'Educación a tu equipo', d: 'Sesiones para que tu personal clínico y administrativo entienda la terapia, sepa contestar al paciente y detecte señales de alerta.' },
];

const MODALIDADES = [
  { t: 'Protocolo individual', sub: 'Un área terapéutica', amt: 'Cotización', then: 'Según alcance',
    li: ['Documento clínico completo', 'Formulario de orden médica', 'Material para el paciente', 'Una sesión de revisión'], hi: false },
  { t: 'Suite de protocolos', sub: 'Varias áreas para tu práctica', amt: 'Cotización', then: 'Paquete completo',
    li: ['Múltiples áreas terapéuticas', 'Formularios de orden unificados', 'Adiestramiento al equipo', 'Material de apoyo al paciente', 'Revisiones incluidas'], hi: true },
  { t: 'Retainer clínico', sub: 'Consultoría continua', amt: 'Mensual', then: 'Cotización según volumen',
    li: ['Actualización de protocolos', 'Consultas clínicas del equipo', 'Revisión de casos complejos', 'Educación continua'], hi: false },
];

export default function Protocolos() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(proSchema) }}
      />

      <section className="hero-slim">
        <div className="wrap">
          <Ficha>Para médicos y clínicas</Ficha>
          <h1>Protocolos de compounding con respaldo farmacéutico real.</h1>
          <p className="lead">
            Si prescribes terapias personalizadas — péptidos, hormonas, GLP-1, NAD+ o IV —
            necesitas un farmacéutico que entienda la formulación, la evidencia y el cumplimiento.
            Preparo el documento clínico completo para que tu práctica opere con criterio,
            no con improvisación.
          </p>
          <div className="btn-row">
            <WAButton msg={wa.protocolos}>Solicitar colaboración</WAButton>
            <Link className="btn btn-ghost" href="#areas">Ver áreas terapéuticas</Link>
          </div>
        </div>
      </section>

      <section className="strip" style={{ marginTop: 'clamp(30px,5vw,52px)' }}>
        <div className="wrap" style={{ paddingInline: 0 }}>
          <div className="strip-in">
            <div className="strip-cell"><div className="strip-k">Quién lo redacta</div><div className="strip-v">Farmacéutico de compounding 503A</div></div>
            <div className="strip-cell"><div className="strip-k">Base</div><div className="strip-v">Literatura al día y referenciada</div></div>
            <div className="strip-cell"><div className="strip-k">Entrega</div><div className="strip-v">Documento listo para tu práctica</div></div>
            <div className="strip-cell"><div className="strip-k">Marca</div><div className="strip-v">{brand.legalEntity}</div></div>
          </div>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Ficha 01 — Contenido</Ficha>
            <h2>Qué recibes en un protocolo.</h2>
            <p className="lead">
              No es un resumen genérico bajado de internet. Es un documento de trabajo que tu
              equipo puede usar el lunes por la mañana.
            </p>
          </Reveal>
          <Reveal className="grid-3">
            {COMPONENTES.map((c) => (
              <article className="card" key={c.n}>
                <div className="card-n">Componente {c.n}</div>
                <h3>{c.t}</h3>
                <p>{c.d}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="sec sec-alt" id="areas">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Ficha 02 — Áreas terapéuticas</Ficha>
            <h2>Dónde trabajo.</h2>
            <p className="lead">
              Estas son las áreas en las que preparo protocolos y en las que doy consultoría.
              Si necesitas algo fuera de esta lista, escríbeme y te digo con honestidad si es
              mi terreno o no.
            </p>
          </Reveal>
          <Reveal className="grid-2">
            {AREAS.map((a) => (
              <article className="card" key={a.t}>
                <h3>{a.t}</h3>
                <p>{a.d}</p>
              </article>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="sec sec-dark">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha pale>Ficha 03 — Colaboración</Ficha>
            <h2>Cómo trabajamos juntos.</h2>
          </Reveal>
          <Reveal className="steps tri">
            <div className="step">
              <div className="step-n">Paso 01</div>
              <h3>Conversación clínica</h3>
              <p>Me cuentas qué población atiendes, qué quieres ofrecer y qué dudas tienes. Sin costo y sin compromiso.</p>
            </div>
            <div className="step">
              <div className="step-n">Paso 02</div>
              <h3>Redacción del protocolo</h3>
              <p>Preparo el documento con evidencia, dosificación, monitoreo y formulario de orden. Te lo entrego para revisión.</p>
            </div>
            <div className="step">
              <div className="step-n">Paso 03</div>
              <h3>Implementación y soporte</h3>
              <p>Adiestro a tu equipo, ajustamos lo que haga falta y quedo disponible para las consultas que surjan en la práctica.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Ficha 04 — Modalidades</Ficha>
            <h2>Tres formas de trabajar conmigo.</h2>
          </Reveal>
          <Reveal className="price-grid">
            {MODALIDADES.map((m) => (
              <div className={`price ${m.hi ? 'hi' : ''}`} key={m.t}>
                <h3>{m.t}</h3>
                <p className="price-sub">{m.sub}</p>
                <div className="price-amt">{m.amt}</div>
                <div className="price-then">{m.then}</div>
                <ul>{m.li.map((l) => <li key={l}>{l}</li>)}</ul>
                <WAButton
                  msg={wa.protocolos}
                  className={`btn ${m.hi ? 'btn-wa' : 'btn-ghost'}`}
                  icon={m.hi}
                >
                  {m.hi ? 'Hablemos' : 'Cotizar'}
                </WAButton>
              </div>
            ))}
          </Reveal>
          <p className="note-mono">
            Cada práctica es distinta.
            <br />
            El alcance y el precio se definen en la primera conversación, sin costo.
          </p>
        </div>
      </section>

      <section className="sec-sm sec-alt">
        <div className="wrap narrow">
          <Reveal>
            <Ficha>Nota importante</Ficha>
            <h3 style={{ marginBottom: 14 }}>Lo que estos protocolos son y lo que no son.</h3>
            <p style={{ color: 'var(--slate)', fontSize: '.98rem' }}>
              Un protocolo es una herramienta de apoyo a la decisión clínica preparada por un
              farmacéutico para uso de un profesional licenciado. No sustituye tu juicio clínico,
              no establece una relación farmacéutico-paciente conmigo, y no autoriza ninguna
              terapia por sí solo. Toda preparación queda sujeta a orden médica válida y a los
              límites de la práctica bajo 503A. Si en la conversación concluyo que lo que buscas
              cae fuera de lo que puedo respaldar con evidencia o dentro de la ley, te lo voy a
              decir directamente.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap narrow">
          <Reveal className="cta-band">
            <Ficha center>Empecemos</Ficha>
            <h2>Conversemos como colegas.</h2>
            <p className="lead">
              Escríbeme con tu especialidad y qué quieres ofrecer en tu práctica.
              La primera conversación no tiene costo.
            </p>
            <div className="btn-row">
              <WAButton msg={wa.protocolos}>Escribirme por WhatsApp</WAButton>
              <Link className="btn btn-ghost" href="/contacto">Agendar una llamada</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
