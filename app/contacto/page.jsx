import config, { waUrl, telUrl } from '@/site.config';
import Ficha from '@/components/Ficha';
import Reveal from '@/components/Reveal';
import ContactForm from '@/components/ContactForm';
import DemoCard from '@/components/DemoCard';
import FAQ from '@/components/FAQ';

const { wa, contact } = config;

export const metadata = {
  title: 'Agenda una llamada',
  description:
    'Escríbeme por WhatsApp o llena el formulario. Veinte minutos sin costo para revisar tu operación.',
  alternates: { canonical: '/contacto' },
  openGraph: { title: 'Veinte minutos y salimos de la duda. Sin costo y sin presentación de ventas.' },
};

const FAQS = [
  { q: '¿Cobras la primera conversación?', a: 'No. Los primeros 20 minutos no tienen costo ni compromiso, y de ahí sale una recomendación por escrito aunque no trabajemos juntos.' },
  { q: '¿Trabajas fuera de Puerto Rico?', a: 'La mayor parte de mi trabajo es en la isla, que es donde conozco el terreno, el idioma y la operación. Para proyectos fuera, escríbeme y evaluamos si tiene sentido.' },
  { q: '¿Trabajas con negocios que no son de salud?', a: 'Sí, para páginas web y automatización. Para todo lo clínico, trabajo exclusivamente con farmacias, médicos y clínicas.' },
  { q: '¿Puedo mandarte información de un paciente para consultarte?', a: 'Por este formulario y por WhatsApp, no. Son canales comerciales. Si necesitamos discutir un caso clínico, coordinamos el canal apropiado en la primera conversación.' },
];

export default function Contacto() {
  return (
    <>
      <section className="hero-slim">
        <div className="wrap">
          <Ficha>Agenda y contacto</Ficha>
          <h1>Veinte minutos y salimos de la duda.</h1>
          <p className="lead">
            Escríbeme por WhatsApp o llena el formulario y te contesto yo — no un vendedor,
            no un formulario que cae en un buzón que nadie revisa.
          </p>
        </div>
      </section>

      <section className="sec sec-dark" style={{ marginTop: 'clamp(30px,5vw,52px)' }}>
        <div className="wrap contact-grid">
          <Reveal>
            <Ficha pale>Contacto directo</Ficha>
            <h2>Como te sea más fácil.</h2>
            <p className="lead" style={{ marginTop: 18 }}>
              El formulario abre tu WhatsApp con el mensaje ya escrito. Si prefieres, escríbeme
              directo o llama primero al número de demo para escuchar a Sofía antes de hablar conmigo.
            </p>
            <div className="direct-list">
              <div className="direct">
                <span className="direct-k">WhatsApp</span>
                <a className="direct-v" href={waUrl(wa.general)} target="_blank" rel="noopener noreferrer">
                  {contact.whatsappDisplay}
                </a>
              </div>
              <div className="direct">
                <span className="direct-k">Demo Sofía</span>
                <a className="direct-v" href={telUrl}>{contact.demoPhoneDisplay}</a>
              </div>
              <div className="direct">
                <span className="direct-k">Base</span>
                <span className="direct-v">{contact.city}</span>
              </div>
              <div className="direct">
                <span className="direct-k">Alcance</span>
                <span className="direct-v">{contact.area}</span>
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
            <h2>Sin misterio, sin embudo de ventas.</h2>
          </Reveal>
          <Reveal className="steps tri">
            <div className="step">
              <div className="step-n">Primero</div>
              <h3>Te contesto</h3>
              <p>Generalmente el mismo día. Si estoy despachando, te contesto en la tarde — pero te contesto.</p>
            </div>
            <div className="step">
              <div className="step-n">Después</div>
              <h3>Coordinamos 20 minutos</h3>
              <p>Por WhatsApp o llamada. Me cuentas cómo opera tu negocio y qué te está costando tiempo o dinero.</p>
            </div>
            <div className="step">
              <div className="step-n">Al final</div>
              <h3>Te digo qué haría yo</h3>
              <p>Por escrito y priorizado. Si la respuesta es que no necesitas nada de lo que vendo, esa también es una respuesta válida.</p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="sec sec-alt">
        <div className="wrap">
          <Reveal>
            <DemoCard
              title="¿Prefieres escuchar antes de escribir?"
              lead="Llama a este número y habla con Sofía como si fueras un paciente. Es la forma más rápida de entender qué vendo."
              hints={false}
            />
          </Reveal>
        </div>
      </section>

      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head center narrow">
            <Ficha center>Antes de escribir</Ficha>
            <h2>Preguntas rápidas</h2>
          </Reveal>
          <Reveal><FAQ items={FAQS} /></Reveal>
        </div>
      </section>
    </>
  );
}
