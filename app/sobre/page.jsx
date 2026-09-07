import Link from 'next/link';
import config from '@/site.config';
import Ficha from '@/components/Ficha';
import Reveal from '@/components/Reveal';
import WAButton from '@/components/WAButton';
import Portrait from '@/components/Portrait';

const { wa, brand, contact } = config;

export const metadata = {
  title: 'Sobre mí — Farmacéutico de compounding y desarrollador',
  description:
    'Doctor en Farmacia egresado del Recinto de Ciencias Médicas de la UPR, farmacéutico de compounding 503A en San Juan y constructor de sistemas de IA para farmacias. Práctica clínica y código el mismo día.',
  alternates: { canonical: '/sobre' },
  openGraph: { title: 'El farmacéutico que también escribe el código.' },
};

export default function Sobre() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <Ficha>Sobre mí</Ficha>
            <h1>Soy el farmacéutico que también <em className="hl">escribe el código.</em></h1>
            <p className="lead">
              Casi todo el que le vende tecnología a una farmacia nunca ha despachado una receta.
              Yo estoy detrás del mostrador y frente a la computadora el mismo día — y eso cambia
              por completo lo que termino construyendo.
            </p>
            <div className="btn-row">
              <WAButton msg={wa.general}>Conversemos</WAButton>
              <Link className="btn btn-ghost" href="/sofia-rx">Ver lo que he construido</Link>
            </div>
          </div>
          <Portrait
            alt="Carlos Guzmán, PharmD, farmacéutico de compounding en San Juan, Puerto Rico"
            capLeft={contact.city}
            capRight="PharmD"
          />
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <Reveal className="grid-2" style={{ alignItems: 'start', gap: 'clamp(34px,5vw,64px)' }}>
            <div>
              <Ficha>Ficha profesional</Ficha>
              <ul className="fields">
                <li><b>Formación</b><span>Doctor en Farmacia (PharmD) — Recinto de Ciencias Médicas, Universidad de Puerto Rico</span></li>
                <li><b>Licencia</b><span>Farmacéutico licenciado en Puerto Rico</span></li>
                <li><b>Práctica</b><span>Compounding 503A, estéril y no estéril</span></li>
                <li><b>Base</b><span>{contact.city} · servicio a toda la isla</span></li>
                <li><b>Clínico</b><span>Péptidos, terapia hormonal, GLP-1, NAD+ e IV</span></li>
                <li><b>Técnico</b><span>Agentes de voz con IA, automatización y desarrollo de software</span></li>
                <li><b>Consultoría</b><span>{brand.legalEntity} — tecnología y protocolos clínicos</span></li>
                <li><b>Idiomas</b><span>Español e inglés</span></li>
              </ul>
            </div>

            <div className="prose">
              <Ficha>La historia corta</Ficha>
              <p className="lead">
                Me formé como farmacéutico en el Recinto de Ciencias Médicas de la Universidad
                de Puerto Rico, y empecé a programar porque necesitaba resolver un problema que
                tenía enfrente y nadie me estaba vendiendo la solución correcta.
              </p>
              <p>
                Trabajando en compounding me di cuenta de algo simple: las herramientas que le
                venden a las farmacias las diseña gente que nunca vio la operación por dentro.
                Pantallas que piden datos que nadie tiene a mano. Flujos que asumen que hay tres
                personas libres. Software traducido del inglés por alguien que nunca oyó cómo
                pide un refill una señora en San Juan.
              </p>
              <p>
                Así que empecé a construir lo que me hacía falta. Primero para mi propia operación:
                un sistema de despacho, rutas de entrega, seguimiento de refills. Después vino el
                agente de voz, porque el teléfono era el punto donde más se perdía. Y cuando otros
                farmacéuticos y médicos empezaron a preguntarme cómo lo hice, se convirtió en un negocio.
              </p>
              <p>
                En paralelo nunca solté la parte clínica. Los protocolos que preparo para médicos
                salen del mismo lugar: de tener que contestar preguntas reales, de un prescriptor
                real, sobre un paciente real que va a recibir esa preparación.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Por qué esto importa</Ficha>
            <h2>La diferencia entre un vendedor de software y un colega.</h2>
          </Reveal>
          <Reveal className="facts">
            <div className="fact">
              <h3>Sé cómo suena la llamada</h3>
              <p>Sé cómo habla el paciente que llama a las 6:40 PM, qué palabras usa y qué no sabe explicar. Eso no se aprende leyendo un manual de producto.</p>
            </div>
            <div className="fact">
              <h3>Sé qué dato hace falta</h3>
              <p>Sé exactamente qué campo hay que capturar para que un refill sirva y cuál es relleno. Eso es la diferencia entre una herramienta que ahorra tiempo y una que lo consume.</p>
            </div>
            <div className="fact">
              <h3>Sé qué le molesta al técnico</h3>
              <p>Un sistema que el personal odia es un sistema que no se usa. Diseño pensando en la persona que va a tener que convivir con esto ocho horas al día.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec sec-dark">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha pale>Cómo trabajo</Ficha>
            <h2>Reglas que no negocio.</h2>
          </Reveal>
          <Reveal className="grid-2" style={{ gap: 'clamp(20px,3vw,32px)' }}>
            <div>
              <ul className="fields">
                <li><b>Directo</b><span>Trabajas conmigo, no con un equipo de cuentas. Me escribes y te contesto yo.</span></li>
                <li><b>Honesto</b><span>Si lo que necesitas no lo hago bien, te lo digo y te mando con quien sí.</span></li>
                <li><b>Sin humo</b><span>No vendo IA porque está de moda. Si un proceso se arregla con una llamada y una hoja de cálculo, eso te recomiendo.</span></li>
              </ul>
            </div>
            <div>
              <ul className="fields">
                <li><b>Clínico</b><span>El criterio farmacéutico manda sobre la tecnología, siempre. Nunca al revés.</span></li>
                <li><b>Sin amarres</b><span>Mes a mes. Si no te está sirviendo, cancelas. Prefiero que te quedes porque funciona.</span></li>
                <li><b>Reservado</b><span>Lo que pasa en tu operación se queda en tu operación. Ninguna información de pacientes toca este sitio web.</span></li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap narrow">
          <Reveal className="cta-band">
            <Ficha center>Hablemos</Ficha>
            <h2>Si llegaste hasta aquí, escríbeme.</h2>
            <p className="lead">
              Veinte minutos por WhatsApp y salimos de la duda. Sin costo y sin presentación de ventas.
            </p>
            <div className="btn-row">
              <WAButton msg={wa.general}>Escribirme por WhatsApp</WAButton>
              <Link className="btn btn-ghost" href="/contacto">Ver formas de contacto</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
