import Link from 'next/link';
import config, { telUrl } from '@/site.config';
import Ficha from '@/components/Ficha';
import Reveal from '@/components/Reveal';
import WAButton from '@/components/WAButton';
import CallCard from '@/components/CallCard';
import DemoCard from '@/components/DemoCard';
import FAQ from '@/components/FAQ';
import Calculadora from '@/components/Calculadora';

const { wa, brand, preciosSofia } = config;

export const metadata = {
  title: 'Sofía RX — El agente de voz con IA que contesta el teléfono de tu farmacia',
  description:
    'Sofía RX atiende llamadas 24/7 en español e inglés, toma refills y alerta a tu equipo por WhatsApp. Llama al número de demo y escúchala ahora.',
  alternates: { canonical: '/sofia-rx' },
  openGraph: { title: 'Tu farmacia deja de perder llamadas. Llama y escucha a Sofía ahora mismo.' },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Sofía RX',
  serviceType: 'Agente de voz con inteligencia artificial para farmacias',
  description:
    'Agente de voz que contesta el teléfono de la farmacia 24/7, toma refills, clasifica intenciones y escala al farmacéutico.',
  provider: { '@type': 'Organization', name: brand.legalEntity, url: brand.domain },
  areaServed: { '@type': 'AdministrativeArea', name: 'Puerto Rico' },
  availableLanguage: ['es', 'en'],
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    price: '500',
    description: 'Instalación $500 más $300 mensuales por localidad',
  },
};

const FAQS = [
  { q: '¿Tengo que cambiar mi sistema de farmacia?', a: 'No. Sofía trabaja sobre tu línea telefónica y tu flujo actual. Si tu sistema permite integración directa, la conecto; si no, el equipo recibe la información por WhatsApp y por el panel.' },
  { q: '¿Esto reemplaza a mi personal?', a: 'No, y no lo vendo así. Sofía se come las llamadas repetitivas — refills, horario, estatus — para que tu técnico atienda al que está frente al mostrador. Toda consulta clínica se transfiere al farmacéutico.' },
  { q: '¿Habla español de Puerto Rico?', a: 'Sí. Está afinada con el vocabulario que se usa aquí, y contesta en inglés cuando el paciente empieza en inglés.' },
  { q: '¿Y si mis pacientes son mayores?', a: 'Por eso el flujo es conversacional y no un menú de "marque 1, marque 2". El paciente habla normal y Sofía entiende. Es precisamente la población mayor la que más se frustra con los menús de teclado.' },
  { q: '¿Qué pasa con la información del paciente?', a: 'Solo se captura lo mínimo para procesar el refill, viaja cifrado y se maneja bajo acuerdo de confidencialidad. En la reunión repasamos contigo qué se guarda, dónde y por cuánto tiempo, para que tu política interna esté cubierta. Este sitio web no recibe ni almacena información de pacientes.' },
  { q: '¿Y si el paciente se da cuenta de que es una IA?', a: 'Sofía se identifica cuando se le pregunta. La experiencia se diseña para ser útil, no para engañar — un paciente que resuelve su refill en 40 segundos no se molesta, y el que quiere hablar con una persona la consigue de inmediato.' },
  { q: '¿Cuánto tarda en estar funcionando?', a: 'De 48 a 72 horas desde que apruebas la demo. La demo con los datos de tu farmacia te la preparo antes, sin costo y sin compromiso.' },
  { q: '¿Y si quiero cancelar?', a: 'Cancelas cuando quieras. La mensualidad es mes a mes: si no te está dando resultado, no tiene sentido amarrarte.' },
];

export default function SofiaRX() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ── HERO ── */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <Ficha>Producto insignia · Agente de voz con IA</Ficha>
            <h1>Sofía RX contesta el teléfono de tu farmacia. <em className="hl">Siempre.</em></h1>
            <p className="lead">
              Atiende en español boricua, entiende lo que pide el paciente y actúa: toma el refill,
              verifica el estatus, transfiere al farmacéutico cuando hace falta y deja el mensaje
              cuando cierras. Cada llamada llega a tu técnico por WhatsApp y queda registrada.
            </p>
            <div className="btn-row">
              <WAButton msg={wa.demo}>Pedir mi demo personalizada</WAButton>
              <a className="btn btn-ghost" href={telUrl}>Llamar y escucharla</a>
            </div>
            <p className="hero-note">
              Desarrollada por {brand.name}, {brand.suffix} · Implementada por {brand.legalEntity}
            </p>
          </div>
          <CallCard />
        </div>
      </section>

      {/* ── DEMO ── */}
      <section className="sec-sm" id="demo">
        <div className="wrap">
          <Reveal><DemoCard title="No me creas. Llámala ahora." /></Reveal>
        </div>
      </section>

      {/* ── ALCANCE ── */}
      <section className="sec sec-alt">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Ficha 01 — Alcance</Ficha>
            <h2>Lo que hace, y lo que deliberadamente no hace.</h2>
            <p className="lead">
              Un agente de voz en una farmacia tiene que tener límites claros. Estos son los míos,
              y los defiendo porque soy farmacéutico antes que vendedor de software.
            </p>
          </Reveal>

          <Reveal className="yesno">
            <div className="yn yes">
              <h3><span className="yn-tag">Sí hace</span></h3>
              <ul>
                <li>Contesta llamadas 24/7, en español e inglés</li>
                <li>Toma refills con nombre y número de receta</li>
                <li>Contesta preguntas administrativas autorizadas: horario, dirección, servicios, estatus</li>
                <li>Clasifica la intención de la llamada</li>
                <li>Escala al farmacéutico o al técnico cuando corresponde</li>
                <li>Alerta al equipo por WhatsApp al instante</li>
                <li>Registra métricas de cada llamada en un panel</li>
                <li>Toma mensajes fuera de horario y en feriados</li>
              </ul>
            </div>
            <div className="yn no">
              <h3><span className="yn-tag">No hace</span></h3>
              <ul>
                <li>No diagnostica ni interpreta síntomas</li>
                <li>No prescribe ni recomienda terapias</li>
                <li>No da consejería clínica — eso se transfiere al farmacéutico</li>
                <li>No sustituye al farmacéutico ni a tu personal</li>
                <li>No decide sobre cambios de terapia ni sustituciones</li>
                <li>No comparte información con terceros</li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CALCULADORA ── */}
      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Ficha 02 — Haz la cuenta</Ficha>
            <h2>Antes de hablar de precio, mira el costo de no hacer nada.</h2>
          </Reveal>
          <Reveal><Calculadora /></Reveal>
        </div>
      </section>

      {/* ── IMPLEMENTACIÓN ── */}
      <section className="sec sec-dark">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha pale>Ficha 03 — Implementación</Ficha>
            <h2>De la demo a producción en 48 a 72 horas.</h2>
          </Reveal>
          <Reveal className="steps">
            <div className="step">
              <div className="step-n">Paso 01</div>
              <h3>Me cuentas cómo opera</h3>
              <p>Nombre, horario, servicios, qué preguntan más tus pacientes y cómo quieres que suene. 20 minutos.</p>
            </div>
            <div className="step">
              <div className="step-n">Paso 02</div>
              <h3>Preparo tu demo</h3>
              <p>Configuro a Sofía con los datos de tu farmacia y te doy un número. La llamas tú mismo antes de pagar nada.</p>
            </div>
            <div className="step">
              <div className="step-n">Paso 03</div>
              <h3>Conecto y adiestro</h3>
              <p>Desvío las llamadas sin contestar hacia Sofía, ajusto los mensajes y adiestro a tu equipo. No hay que portar el número.</p>
            </div>
            <div className="step">
              <div className="step-n">Paso 04</div>
              <h3>Afinamos con datos reales</h3>
              <p>Reviso contigo llamadas reales cada semana el primer mes y ajusto respuestas. Incluido en la mensualidad.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── REQUISITOS ── */}
      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Ficha 04 — Requisitos</Ficha>
            <h2>Lo que necesitas de tu lado es menos de lo que crees.</h2>
          </Reveal>
          <Reveal className="grid-3">
            <div className="card-plain">
              <h3>No cambias de sistema</h3>
              <p>Sofía trabaja sobre tu línea telefónica y tu flujo actual. Si tu sistema permite integración directa, la conecto; si no, la información llega por WhatsApp y por el panel.</p>
            </div>
            <div className="card-plain">
              <h3>No necesitas equipo nuevo</h3>
              <p>No hay hardware que instalar. Todo corre en la nube y tu equipo lo ve desde el celular o la computadora que ya usan.</p>
            </div>
            <div className="card-plain">
              <h3>No necesitas personal técnico</h3>
              <p>Yo configuro, yo mantengo y yo ajusto. Tú me dices qué quieres cambiar y lo cambio.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── INVERSIÓN ── */}
      <section className="sec sec-alt" id="inversion">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Ficha 05 — Inversión</Ficha>
            <h2>Precio claro. Sin contratos de años.</h2>
            <p className="lead">
              Se paga una instalación y una mensualidad que cubre hospedaje, soporte y cambios.
              Cancelas cuando quieras.
            </p>
          </Reveal>

          <Reveal className="price-grid">
            {preciosSofia.map((p) => (
              <div className={`price ${p.hi ? 'hi' : ''}`} key={p.t}>
                <h3>{p.t}</h3>
                <p className="price-sub">{p.sub}</p>
                <div className="price-amt">
                  {p.amt}{p.amtSmall && <small> {p.amtSmall}</small>}
                </div>
                <div className="price-then">{p.then}</div>
                <ul>{p.li.map((l) => <li key={l}>{l}</li>)}</ul>
                <WAButton
                  msg={wa[p.waKey]}
                  className={`btn ${p.style === 'wa' ? 'btn-wa' : 'btn-ghost'}`}
                  icon={p.style === 'wa'}
                >
                  {p.cta}
                </WAButton>
              </div>
            ))}
          </Reveal>

          <p className="note-mono">
            Los precios aplican a una localidad.
            <br />
            La mensualidad incluye hospedaje, soporte, cambios y ajustes.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head center narrow">
            <Ficha center>Preguntas</Ficha>
            <h2>Lo que todo dueño de farmacia me pregunta</h2>
          </Reveal>
          <Reveal><FAQ items={FAQS} /></Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sec sec-alt">
        <div className="wrap narrow">
          <Reveal className="cta-band">
            <Ficha center>Siguiente paso</Ficha>
            <h2>Escúchala primero. Decide después.</h2>
            <p className="lead">
              Llama al número de demo ahora mismo, y si te gusta lo que oyes, escríbeme y te
              preparo la versión con el nombre de tu farmacia.
            </p>
            <div className="btn-row">
              <WAButton msg={wa.demo}>Pedir mi demo personalizada</WAButton>
              <a className="btn btn-ghost" href={telUrl}>Llamar a la demo</a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
