/* ══════════════════════════════════════════════════════════════════════
   site.config.js — EL ÚNICO ARCHIVO QUE TIENES QUE TOCAR

   Para tu sitio: edita lo de abajo.
   Para un cliente nuevo: copia el proyecto completo, cambia este archivo,
   y ya tienes otro sitio. Nada más hay que tocar.
   ══════════════════════════════════════════════════════════════════════ */

/* ── PALETAS LISTAS ───────────────────────────────────────────────────
   Cambia `theme` abajo por el nombre de la paleta que quieras.
   Para un cliente nuevo: escoge una y listo, o crea la tuya.
   ─────────────────────────────────────────────────────────────────── */
export const PALETAS = {
  // Verde clínico — farmacia, medicina general, laboratorio
  clinico: {
    paper: '#F4F6F5', paper2: '#E8EDEB', white: '#FFFFFF',
    ink: '#0C1917', slate: '#566662', line: '#DCE3E0',
    primary: '#0B5D51', primaryDeep: '#062E29', soft: '#DCEBE5',
    bright: '#5FE3B0', accent: '#B67A22',
  },
  // Azul confianza — cardiología, pediatría, medicina interna, dental
  confianza: {
    paper: '#F4F6F8', paper2: '#E7ECF1', white: '#FFFFFF',
    ink: '#0D1721', slate: '#55636F', line: '#DBE2E9',
    primary: '#14507E', primaryDeep: '#0A2B45', soft: '#DCE9F4',
    bright: '#6EC1F0', accent: '#C08A2E',
  },
  // Rosa arena — estética, med spa, dermatología, ginecología
  estetica: {
    paper: '#FAF6F3', paper2: '#F0E7E1', white: '#FFFFFF',
    ink: '#1E1613', slate: '#6B5C55', line: '#E7DCD5',
    primary: '#9A5A4E', primaryDeep: '#57302A', soft: '#F3E2DB',
    bright: '#E8A894', accent: '#A98246',
  },
  // Verde oliva — bienestar, nutrición, medicina funcional, quiropráctica
  bienestar: {
    paper: '#F6F6F1', paper2: '#EBEBE1', white: '#FFFFFF',
    ink: '#16190F', slate: '#5D6353', line: '#DFE2D6',
    primary: '#4A6031', primaryDeep: '#28361A', soft: '#E4EBD8',
    bright: '#A8CE7B', accent: '#B07C2A',
  },
  // Grafito — cirugía, ortopedia, especialistas, práctica premium
  grafito: {
    paper: '#F5F5F4', paper2: '#E8E8E6', white: '#FFFFFF',
    ink: '#151513', slate: '#5E5E5A', line: '#DEDEDA',
    primary: '#2E2E2B', primaryDeep: '#161614', soft: '#E3E3DF',
    bright: '#C9B992', accent: '#9A7B3F',
  },
};

/* ── CONFIGURACIÓN DEL SITIO ────────────────────────────────────────── */
const config = {
  /* Paleta activa: clinico | confianza | estetica | bienestar | grafito */
  theme: 'clinico',

  /* ── Marca ──────────────────────────────────────────────────────── */
  brand: {
    name: 'Carlos Guzmán',
    suffix: 'PharmD',
    initials: 'CG',
    role: 'Doctor en Farmacia',
    legalEntity: 'GA RX Consulting',
    domain: 'https://carlosguzmanai.com',
    locale: 'es_PR',
    lang: 'es',
  },

  /* ── SEO ────────────────────────────────────────────────────────── */
  seo: {
    titulo:
      'Carlos Guzmán, PharmD — Compounding e inteligencia artificial para farmacias en Puerto Rico',
    descripcion:
      'Farmacéutico de compounding 503A basado en San Juan, egresado del Recinto de Ciencias Médicas. Protocolos clínicos para médicos, agentes de voz con IA y páginas web para profesionales de la salud en Puerto Rico.',
  },

  /* ── Pie de página ──────────────────────────────────────────────── */
  footer: {
    descripcion: 'Compounding, práctica clínica e inteligencia artificial aplicada a la farmacia.',
    alcance: 'Servicio a toda la isla.',
    subtitulo: 'Compounding · IA aplicada',
  },

  /* ── Opciones del formulario de contacto ────────────────────────── */
  formulario: {
    etiquetaNegocio: 'Farmacia, clínica o práctica',
    opciones: [
      'Auditoría de flujo AI',
      'Sofía RX — agente de voz',
      'Página web para mi práctica',
      'Protocolos clínicos para médicos',
      'Automatización e integraciones',
      'Retainer de consultoría',
      'Todavía no sé — quiero orientación',
    ],
  },

  /* ── Contacto ───────────────────────────────────────────────────── */
  contact: {
    whatsapp: '19392901222',
    whatsappDisplay: '(939) 290-1222',
    demoPhone: '17606384205',
    demoPhoneDisplay: '(760) 638-4205',
    city: 'San Juan, Puerto Rico',
    region: 'PR',
    area: 'Toda la isla · remoto o presencial',
    email: '',
  },

  /* ── Navegación ─────────────────────────────────────────────────── */
  nav: [
    { label: 'Inicio', href: '/' },
    { label: 'Sofía RX', href: '/sofia-rx' },
    { label: 'Páginas web', href: '/paginas-web' },
    { label: 'Protocolos', href: '/protocolos' },
    { label: 'Sobre mí', href: '/sobre' },
    { label: 'Agenda', href: '/contacto' },
  ],

  /* ── Mensajes de WhatsApp precargados ───────────────────────────── */
  wa: {
    general: 'Hola Carlos, vi tu página web y quiero información.',
    auditoria: 'Hola Carlos, quiero solicitar la auditoría de mi farmacia.',
    demo: 'Hola Carlos, quiero una demo de Sofía RX para mi farmacia.',
    empezarSofia: 'Hola Carlos, quiero empezar con Sofía RX. ¿Cuándo hacemos la demo?',
    protocolos: 'Hola Carlos, soy médico y me interesan tus protocolos de compounding.',
    web: 'Hola Carlos, quiero cotizar una página web para mi práctica.',
    orientacion: 'Hola Carlos, no sé por dónde empezar. ¿Me orientas?',
  },

  /* ── Franja de datos (home) ─────────────────────────────────────── */
  strip: [
    { k: 'Quién ejecuta', v: 'Un farmacéutico licenciado' },
    { k: 'Alcance', v: 'Toda la isla · remoto o presencial' },
    { k: 'Idiomas', v: 'Español de aquí e inglés' },
    { k: 'Puesta en marcha', v: '48 a 72 horas' },
  ],

  /* ── Servicios (home) ───────────────────────────────────────────── */
  servicios: [
    {
      n: '01 · Punto de entrada',
      t: 'Auditoría de Flujo AI',
      d: 'Reviso tu operación completa y te entrego por escrito dónde la IA sí te ahorra dinero y dónde es humo.',
      li: ['Análisis de llamadas y mensajes', 'Refills, seguimiento e intake', 'Puntos de abandono del paciente', 'Plan priorizado por retorno'],
      cta: 'Solicitar auditoría', waKey: 'auditoria',
    },
    {
      n: '02 · Producto insignia',
      t: 'Sofía RX',
      d: 'El agente de voz que contesta el teléfono de tu farmacia 24/7, toma refills y escala al farmacéutico cuando hace falta.',
      li: ['Atiende llamadas en español e inglés', 'Captura solicitudes y clasifica intención', 'Escala a personal humano', 'Registra métricas de cada llamada'],
      cta: 'Ver Sofía RX', href: '/sofia-rx',
    },
    {
      n: '03',
      t: 'Páginas web para profesionales',
      d: 'Páginas que convierten pacientes, para médicos, dentistas, estéticas y clínicas. Diseño, montaje y mantenimiento.',
      li: ['Diseño a la medida de tu especialidad', 'Citas y contacto por WhatsApp', 'Optimizada para Google local', 'Lista en 7 a 10 días'],
      cta: 'Ver planes', href: '/paginas-web',
    },
    {
      n: '04',
      t: 'Automatización e Integraciones',
      d: 'Los procesos repetitivos que consumen a tu equipo, convertidos en flujos que corren solos.',
      li: ['Refills y recordatorios por WhatsApp', 'Seguimiento de prospectos y CRM', 'Formularios e intake administrativo', 'Dashboards de operación'],
      cta: 'Hablar del proyecto', waKey: 'general',
    },
    {
      n: '05',
      t: 'Compounding y Protocolos',
      d: 'Para médicos y clínicas que quieren prescribir terapias personalizadas con respaldo farmacéutico real.',
      li: ['Protocolos con evidencia y dosificación', 'Formularios de orden médica', 'Educación profesional al equipo', 'Retainer de consultoría continua'],
      cta: 'Ver protocolos', href: '/protocolos',
    },
    {
      n: '06',
      t: '¿No sabes cuál necesitas?',
      d: 'Escríbeme por WhatsApp y en 20 minutos te digo qué te conviene — incluso si la respuesta es que todavía no necesitas nada de esto.',
      li: ['Sin costo y sin compromiso', 'Te contesto yo, no un vendedor', 'Recomendación por escrito'],
      cta: 'Escribirme', waKey: 'orientacion',
    },
  ],

  /* ── Precios de Sofía RX ────────────────────────────────────────── */
  preciosSofia: [
    {
      t: 'Diagnóstico', sub: 'Para saber si te conviene',
      amt: 'Sin costo', then: 'Llamada de 20 minutos',
      li: ['Revisión de tu operación actual', 'Dónde estás perdiendo llamadas', 'Recomendación por escrito'],
      cta: 'Reservar', waKey: 'auditoria', style: 'ghost',
    },
    {
      t: 'Sofía RX', sub: 'Agente de voz en producción',
      amt: '$500', amtSmall: 'instalación', then: '+ $300 / mes',
      li: ['Agente configurado para tu farmacia', 'Alertas por WhatsApp al equipo', 'Panel de pendientes en vivo', 'Ajustes y soporte incluidos', 'Demo antes de comprometerte', 'Cancelas cuando quieras'],
      cta: 'Empezar por WhatsApp', waKey: 'empezarSofia', style: 'wa', hi: true,
    },
    {
      t: 'Multi-sucursal', sub: 'Cadenas y grupos',
      amt: 'Cotización', then: 'Según localidades',
      li: ['Configuración por sucursal', 'Panel consolidado', 'Reportes por localidad', 'Adiestramiento a cada equipo'],
      cta: 'Pedir cotización', waKey: 'demo', style: 'ghost',
    },
  ],

  /* ── Precios de páginas web ─────────────────────────────────────────
     AJUSTA ESTOS NÚMEROS a lo que decidas cobrar.
     Son una propuesta de partida para el mercado de Puerto Rico.
     ───────────────────────────────────────────────────────────────── */
  preciosWeb: [
    {
      t: 'Esencial', sub: 'Una página que convierte',
      amt: '$500', then: '+ $45 / mes de mantenimiento',
      li: ['Una página completa', 'Botones directos a WhatsApp', 'Formulario de contacto', 'Optimizada para celular', 'Google Business Profile configurado', 'Entrega en 7 días'],
      cta: 'Empezar', waKey: 'web', style: 'ghost',
    },
    {
      t: 'Profesional', sub: 'La práctica completa en línea',
      amt: '$750', then: '+ $75 / mes de mantenimiento',
      li: ['Hasta 5 páginas', 'Página por servicio o tratamiento', 'Galería de antes y después', 'Sistema de citas conectado', 'SEO local para tu pueblo', 'Fotografía profesional coordinada', 'Entrega en 10 días'],
      cta: 'Empezar', waKey: 'web', style: 'wa', hi: true,
    },
    {
      t: 'Práctica + IA', sub: 'La web y el teléfono resueltos',
      amt: '$1,200', then: '+ $300 / mes todo incluido',
      li: ['Todo lo del plan Profesional', 'Agente de voz que contesta tu teléfono', 'Recordatorios de cita automáticos', 'Panel de pacientes interesados', 'Seguimiento automático por WhatsApp', 'Soporte prioritario'],
      cta: 'Conversemos', waKey: 'web', style: 'ghost',
    },
  ],

  /* ── A quién le hago páginas web ────────────────────────────────── */
  nichos: [
    { t: 'Médicos y especialistas', d: 'Medicina general, pediatría, cardiología, ortopedia, ginecología. La página que hace que el paciente te escoja a ti y no al de al lado.' },
    { t: 'Estéticas y med spas', d: 'Tratamientos, antes y después, y un sistema de citas que llena tu agenda sin que nadie conteste el teléfono.' },
    { t: 'Dentistas y ortodoncistas', d: 'Servicios, financiamiento y confianza. El paciente compara tres páginas antes de llamar — que la tuya gane.' },
    { t: 'Dermatología y bienestar', d: 'Nutrición, medicina funcional, terapia de peso. Explicar bien lo que haces es la mitad de la venta.' },
    { t: 'Quiroprácticos y terapia física', d: 'Testimonios, condiciones que tratas y una ruta clara a la primera cita.' },
    { t: 'Farmacias y laboratorios', d: 'Mi terreno. Servicios, entrega, refills y todo lo que diferencia una farmacia independiente de una cadena.' },
  ],

  /* ── Proceso (home) ─────────────────────────────────────────────── */
  proceso: [
    { n: 'Paso 01', t: 'Conversamos', d: '20 minutos por WhatsApp o teléfono. Me cuentas cómo opera tu práctica y qué te está robando el tiempo. Sin costo.' },
    { n: 'Paso 02', t: 'Auditoría', d: 'Reviso llamadas, citas, intake y puntos de abandono. Te entrego un plan priorizado por retorno, no por lo que me convenga vender.' },
    { n: 'Paso 03', t: 'Implementación', d: 'Configuro, conecto y adiestro a tu equipo. Para Sofía RX, de 48 a 72 horas desde que apruebas la demo.' },
    { n: 'Paso 04', t: 'Ajuste continuo', d: 'Reviso los datos reales contigo y afino. Cambios y soporte incluidos en la mensualidad.' },
  ],
};

/* ── No toques nada de aquí para abajo ──────────────────────────────── */
export const T = PALETAS[config.theme] || PALETAS.clinico;
export const waUrl = (msg) =>
  `https://wa.me/${config.contact.whatsapp}?text=${encodeURIComponent(msg)}`;
export const telUrl = `tel:+${config.contact.demoPhone}`;
export default config;
