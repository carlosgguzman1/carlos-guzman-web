import Link from 'next/link';
import config from '@/site.config';
import Ficha from '@/components/Ficha';
import Reveal from '@/components/Reveal';
import WAButton from '@/components/WAButton';
import FAQ from '@/components/FAQ';

const { wa, brand, preciosWeb, nichos } = config;

export const metadata = {
  title: 'Páginas web para médicos, estéticas y clínicas en Puerto Rico',
  description:
    'Páginas web que convierten pacientes, hechas por un profesional de la salud. Para médicos, dentistas, med spas y clínicas en Puerto Rico. Entrega en 7 a 10 días.',
  alternates: { canonical: '/paginas-web' },
  openGraph: {
    title: 'Páginas web que traen pacientes, no portafolios bonitos.',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Páginas web para profesionales de la salud',
  serviceType: 'Diseño y desarrollo web para médicos, clínicas y estéticas',
  description:
    'Diseño, desarrollo y mantenimiento de páginas web para médicos, dentistas, med spas y clínicas en Puerto Rico, con enfoque en conversión de pacientes y SEO local.',
  provider: { '@type': 'Organization', name: brand.legalEntity, url: brand.domain },
  areaServed: { '@type': 'AdministrativeArea', name: 'Puerto Rico' },
  availableLanguage: ['es', 'en'],
};

const FAQS = [
  { q: '¿Cuánto tarda?', a: 'El plan Esencial en 7 días y el Profesional en 10, contando desde que me entregas el contenido y las fotos. Si te tardas con el material, se corre la fecha — te lo digo desde el principio para que no haya sorpresas.' },
  { q: '¿Qué necesitas de mi parte?', a: 'Tus servicios y precios, tu horario, tu logo si tienes, y fotos. Si no tienes fotos buenas, te coordino un fotógrafo — es la inversión que más rinde y no la debes saltar.' },
  { q: '¿Yo puedo editar la página después?', a: 'Sí. Te dejo un panel donde cambias textos, precios y fotos sin tocar código. Y si prefieres no lidiar con eso, los cambios están incluidos en el mantenimiento mensual: me escribes y lo hago yo.' },
  { q: '¿Para qué es el mantenimiento mensual?', a: 'Hospedaje, certificado de seguridad, respaldo, actualizaciones y los cambios que me pidas. Si prefieres pagar una sola vez y manejarlo tú, también se puede — te entrego el código y te explico cómo, pero de ahí en adelante corre por tu cuenta.' },
  { q: '¿La página aparece en Google?', a: 'La construyo optimizada y te configuro el Google Business Profile, que es lo que más pesa en búsquedas locales. Posicionar toma meses y depende de tus reseñas y tu competencia — no te voy a prometer el primer lugar en dos semanas.' },
  { q: '¿Puedo recibir información de pacientes por la página?', a: 'Los formularios que monto son para contacto comercial: nombre, teléfono y qué servicio te interesa. Cualquier intake que recoja información clínica necesita una plataforma con acuerdo de confidencialidad y se maneja aparte. Eso lo conversamos si tu práctica lo requiere.' },
  { q: '¿Trabajas con negocios que no son de salud?', a: 'Sí, pero salud es donde mejor trabajo. Entiendo cómo un paciente escoge un médico, qué le da confianza y qué lo espanta — eso no lo tiene un diseñador que hace páginas de restaurantes.' },
];

export default function PaginasWeb() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* ── HERO ── */}
      <section className="hero-slim">
        <div className="wrap">
          <Ficha>Para médicos, estéticas y clínicas</Ficha>
          <h1>Páginas que traen pacientes, no <em className="hl">portafolios bonitos.</em></h1>
          <p className="lead">
            Tu paciente compara tres páginas antes de llamar a nadie. Construyo la que hace
            que te escoja a ti — clara, rápida, en español, y con el botón de WhatsApp donde
            tiene que estar.
          </p>
          <div className="btn-row">
            <WAButton msg={wa.web}>Cotizar mi página</WAButton>
            <Link className="btn btn-ghost" href="#planes">Ver planes y precios</Link>
          </div>
        </div>
      </section>

      {/* ── FRANJA ── */}
      <section className="strip" style={{ marginTop: 'clamp(30px,5vw,52px)' }}>
        <div className="wrap" style={{ paddingInline: 0 }}>
          <div className="strip-in">
            <div className="strip-cell"><div className="strip-k">Quién la hace</div><div className="strip-v">Un profesional de la salud</div></div>
            <div className="strip-cell"><div className="strip-k">Entrega</div><div className="strip-v">7 a 10 días</div></div>
            <div className="strip-cell"><div className="strip-k">Incluye</div><div className="strip-v">Diseño, montaje y Google</div></div>
            <div className="strip-cell"><div className="strip-k">Idiomas</div><div className="strip-v">Español e inglés</div></div>
          </div>
        </div>
      </section>

      {/* ── EL PROBLEMA ── */}
      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Ficha 01 — Lo que veo todos los días</Ficha>
            <h2>La mayoría de las páginas médicas en Puerto Rico pierden pacientes.</h2>
            <p className="lead">
              No porque se vean feas. Porque nadie las pensó desde la cabeza del paciente
              que está buscando a las 9 de la noche desde el celular.
            </p>
          </Reveal>
          <Reveal className="facts">
            <div className="fact">
              <h3>No se ven bien en celular</h3>
              <p>Ocho de cada diez pacientes te buscan desde el teléfono. Si tienen que hacer zoom para leer tu horario, se van a la próxima.</p>
            </div>
            <div className="fact">
              <h3>No dicen qué haces</h3>
              <p>&quot;Excelencia y compromiso con nuestros pacientes&quot; no le dice nada a nadie. El paciente quiere saber si tratas lo que él tiene, cuánto cuesta y cuándo puede ir.</p>
            </div>
            <div className="fact">
              <h3>No hay cómo contactarte</h3>
              <p>Un formulario que cae en un correo que nadie revisa no es un canal de contacto. El paciente quiere escribirte por WhatsApp ahora mismo.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── QUÉ INCLUYE ── */}
      <section className="sec sec-alt">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Ficha 02 — Qué recibes</Ficha>
            <h2>Todo lo que hace falta para que la página produzca.</h2>
          </Reveal>
          <Reveal className="grid-3">
            <article className="card">
              <div className="card-n">Componente 01</div>
              <h3>Diseño de tu especialidad</h3>
              <p>Una estética hecha a la medida de lo que haces. Una dermatóloga no se ve como un ortopeda, y ninguno de los dos se ve como una plantilla comprada.</p>
            </article>
            <article className="card">
              <div className="card-n">Componente 02</div>
              <h3>Contacto por WhatsApp</h3>
              <p>Botones en cada sección que abren el chat con el mensaje ya escrito. Es como la gente en Puerto Rico realmente se comunica.</p>
            </article>
            <article className="card">
              <div className="card-n">Componente 03</div>
              <h3>Página por servicio</h3>
              <p>Una página dedicada a cada tratamiento que ofreces. Es lo que hace que Google te encuentre cuando alguien busca ese procedimiento específico.</p>
            </article>
            <article className="card">
              <div className="card-n">Componente 04</div>
              <h3>Citas conectadas</h3>
              <p>Sistema de citas enlazado a tu calendario, con recordatorios automáticos. Menos llamadas para coordinar y menos citas perdidas.</p>
            </article>
            <article className="card">
              <div className="card-n">Componente 05</div>
              <h3>Google local configurado</h3>
              <p>Tu perfil de Google Business optimizado, con categorías correctas, fotos y la ruta para pedir reseñas. Es lo que más mueve la aguja en tu pueblo.</p>
            </article>
            <article className="card">
              <div className="card-n">Componente 06</div>
              <h3>Mantenimiento real</h3>
              <p>Hospedaje, seguridad, respaldo y los cambios que me pidas. Me escribes por WhatsApp y lo hago — no abres un ticket.</p>
            </article>
          </Reveal>
        </div>
      </section>

      {/* ── NICHOS ── */}
      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Ficha 03 — Para quién</Ficha>
            <h2>Trabajo con profesionales de la salud.</h2>
            <p className="lead">
              No hago páginas de restaurantes ni de bienes raíces. Me especializo aquí porque
              entiendo cómo un paciente escoge, qué le da confianza y qué lo espanta.
            </p>
          </Reveal>
          <Reveal className="grid-3">
            {nichos.map((n) => (
              <div className="card-plain" key={n.t}>
                <h3>{n.t}</h3>
                <p>{n.d}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ── DIFERENCIA ── */}
      <section className="sec sec-dark">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha pale>Ficha 04 — Por qué yo</Ficha>
            <h2>Un diseñador te hace algo bonito. Yo entiendo a tu paciente.</h2>
          </Reveal>
          <Reveal className="grid-2" style={{ gap: 'clamp(20px,3vw,32px)' }}>
            <div>
              <ul className="fields">
                <li><b>Del campo</b><span>Soy PharmD en ejercicio. Sé cómo un paciente busca, pregunta y decide — porque lo veo todos los días.</span></li>
                <li><b>Cumplimiento</b><span>Sé qué puede decir una página de salud y qué no. Te evito afirmaciones que te pueden meter en problemas.</span></li>
                <li><b>Directo</b><span>Trabajas conmigo, no con una agencia. Me escribes por WhatsApp y te contesto yo.</span></li>
              </ul>
            </div>
            <div>
              <ul className="fields">
                <li><b>De aquí</b><span>Español de Puerto Rico, referencias locales, y entendimiento de cómo se busca un médico en la isla.</span></li>
                <li><b>Con IA</b><span>Puedo conectarte un agente que contesta el teléfono y agenda citas. Casi nadie más en la isla te ofrece las dos cosas.</span></li>
                <li><b>Honesto</b><span>Si tu problema no se arregla con una página web, te lo digo. A veces lo que hace falta es contestar el teléfono.</span></li>
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PROCESO ── */}
      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Ficha 05 — Cómo trabajamos</Ficha>
            <h2>Cuatro pasos y estás en línea.</h2>
          </Reveal>
          <Reveal className="steps">
            <div className="step">
              <div className="step-n">Paso 01</div>
              <h3>Conversamos</h3>
              <p>20 minutos. Me cuentas qué haces, a quién atiendes y qué quieres que la página logre. Sin costo.</p>
            </div>
            <div className="step">
              <div className="step-n">Paso 02</div>
              <h3>Me das el material</h3>
              <p>Servicios, precios, horario y fotos. Te mando una lista exacta de lo que necesito para que no adivines.</p>
            </div>
            <div className="step">
              <div className="step-n">Paso 03</div>
              <h3>Te la construyo</h3>
              <p>Te enseño un enlace privado cuando esté lista. Revisas, me dices qué cambiar, y ajusto hasta que estés conforme.</p>
            </div>
            <div className="step">
              <div className="step-n">Paso 04</div>
              <h3>Publicamos</h3>
              <p>Conecto tu dominio, configuro Google y te enseño a usar el panel. De ahí en adelante, los cambios me los pides y ya.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PLANES ── */}
      <section className="sec sec-alt" id="planes">
        <div className="wrap">
          <Reveal className="sec-head narrow">
            <Ficha>Ficha 06 — Planes</Ficha>
            <h2>Precios claros, sin cotizaciones misteriosas.</h2>
            <p className="lead">
              Escoges el plan, pagas la mitad para empezar y la otra mitad al publicar.
              El mantenimiento arranca el mes siguiente.
            </p>
          </Reveal>

          <Reveal className="price-grid">
            {preciosWeb.map((p) => (
              <div className={`price ${p.hi ? 'hi' : ''}`} key={p.t}>
                <h3>{p.t}</h3>
                <p className="price-sub">{p.sub}</p>
                <div className="price-amt">{p.amt}</div>
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
            El dominio se compra aparte (unos $15 al año) y queda a tu nombre.
            <br />
            La página es tuya. Si algún día quieres irte con otro, te la llevas.
          </p>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="sec">
        <div className="wrap">
          <Reveal className="sec-head center narrow">
            <Ficha center>Preguntas</Ficha>
            <h2>Antes de escribirme</h2>
          </Reveal>
          <Reveal><FAQ items={FAQS} /></Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="sec sec-alt">
        <div className="wrap narrow">
          <Reveal className="cta-band">
            <Ficha center>Empecemos</Ficha>
            <h2>Mándame el nombre de tu práctica.</h2>
            <p className="lead">
              Con eso me basta para decirte qué plan te conviene y qué resultado esperar.
              La primera conversación no tiene costo.
            </p>
            <div className="btn-row">
              <WAButton msg={wa.web}>Cotizar por WhatsApp</WAButton>
              <Link className="btn btn-ghost" href="/contacto">Llenar el formulario</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
