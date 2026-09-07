# Sitio de Carlos Guzmán, PharmD

Proyecto Next.js 16 (App Router) listo para Vercel. Seis páginas, calculadora
interactiva, y una arquitectura pensada para que puedas **clonarlo por cliente**.

---

## Subirlo a Vercel

### Opción A — Con GitHub (recomendada)

Es la mejor porque después editas desde github.com en el navegador y el sitio
se actualiza solo.

```bash
cd carlos-guzman-web
npm install
npm run dev        # http://localhost:3000 — revisa que todo se vea bien
```

Cuando estés conforme:

```bash
git init
git add .
git commit -m "Sitio inicial"
git branch -M main
git remote add origin https://github.com/TU-USUARIO/carlos-guzman-web.git
git push -u origin main
```

1. Entra a **vercel.com/new**
2. Importa el repositorio
3. Vercel detecta Next.js solo — no cambies nada
4. **Deploy**

Listo. Cada `git push` publica automáticamente.

### Opción B — Sin GitHub, desde la terminal

```bash
npm install -g vercel
cd carlos-guzman-web
vercel
```

Contesta las preguntas y ya. Para publicar en producción: `vercel --prod`.

---

## Antes de compartir el link

1. **Cambia el dominio.** En `site.config.js`, línea `domain`. Si no lo haces,
   Google puede confundirse con la URL canónica.

2. **Pon tus fotos reales.** En `public/` hay dos placeholders:
   - `carlos.jpg` (800×1000) → tu foto profesional
   - `portada.jpg` (1200×630) → lo que se ve al compartir el link

   Mantén los nombres y no toques código.

3. **Revisa los precios de páginas web.** Los números en `preciosWeb`
   ($750 / $1,500 / $2,800) son mi propuesta de partida para el mercado de
   Puerto Rico, no un dato verificado. Ajústalos a lo que decidas cobrar.

4. **Prueba el número de demo.** Llama al (760) 638-4205. Si esa línea está
   caída, la sección más fuerte del sitio queda muerta.

### Conectar tu dominio
En Vercel: *Settings → Domains → Add*. Vercel te da los registros DNS,
los pegas en Namecheap o donde compraste. SSL automático.

---

## Cómo editar

**Todo lo importante está en `site.config.js`.** Un solo archivo:

| Qué cambias | Dónde en el config |
|---|---|
| Números de teléfono | `contact` |
| Colores de todo el sitio | `theme` (escoge una paleta) |
| Menú de navegación | `nav` |
| Mensajes de WhatsApp | `wa` |
| Servicios del inicio | `servicios` |
| Precios de Sofía RX | `preciosSofia` |
| Precios de páginas web | `preciosWeb` |
| A quién le haces webs | `nichos` |
| Pasos del proceso | `proceso` |

Los textos largos (párrafos, FAQs) están en las páginas dentro de `app/`,
en español y sin código raro alrededor.

---

## Clonar el sitio para un cliente

Esta es la parte que convierte esto en negocio. Para hacerle la página a un
médico o a una estética:

```bash
cp -r carlos-guzman-web dra-melendez-derma
cd dra-melendez-derma
rm -rf .git node_modules .next
npm install
```

Abre `site.config.js` y cambia:

```js
theme: 'estetica',              // ← paleta rosa arena, un cambio de palabra

brand: {
  name: 'Dra. Ana Meléndez',
  suffix: 'MD',
  initials: 'AM',
  role: 'Dermatóloga',
  legalEntity: 'GA RX Consulting',   // tú quedas en el pie de página
  domain: 'https://dramelendez.com',
},

contact: {
  whatsapp: '17875551234',
  whatsappDisplay: '(787) 555-1234',
  city: 'Mayagüez, Puerto Rico',
},

nav: [
  { label: 'Inicio', href: '/' },
  { label: 'Tratamientos', href: '/paginas-web' },
  { label: 'Sobre mí', href: '/sobre' },
  { label: 'Citas', href: '/contacto' },
],
```

Borra las carpetas de páginas que no apliquen (`app/sofia-rx`, `app/protocolos`),
ajusta el texto de las que quedan, cambia las fotos en `public/`, y despliega.

**Tiempo real por cliente: 3 a 5 horas.** A $1,500 el plan Profesional, eso te
da un margen que aguanta.

### Las 5 paletas incluidas

| Paleta | Color | Para quién |
|---|---|---|
| `clinico` | Verde clínico | Farmacia, medicina general, laboratorio |
| `confianza` | Azul | Cardiología, pediatría, dental, medicina interna |
| `estetica` | Rosa arena | Med spa, dermatología, ginecología |
| `bienestar` | Verde oliva | Nutrición, medicina funcional, quiropráctica |
| `grafito` | Gris oscuro | Cirugía, ortopedia, práctica premium |

Cambias una palabra en `theme` y el sitio entero cambia de identidad.

---

## Qué trae por dentro

**Páginas:** Inicio · Sofía RX · Páginas web · Protocolos · Sobre mí · Contacto · 404

**Dinámico:**
- Calculadora de llamadas perdidas con tres controles deslizantes, resultado en
  vivo, y botón que manda ese resultado por WhatsApp
- Tarjeta de llamada de Sofía que se escribe sola en bucle
- Aparición progresiva al hacer scroll
- Menú móvil, botón flotante de WhatsApp, navegación con estado activo
- Formulario con validación que arma el mensaje de WhatsApp

**SEO:** `sitemap.xml` y `robots.txt` generados automáticamente, schema JSON-LD
por página (Person, Service, ProfessionalService), Open Graph, y rastreadores de
IA permitidos a propósito para que ChatGPT y Perplexity te citen.

**Rutas cortas:** `/sofia`, `/demo`, `/agenda`, `/webs` redirigen a donde toca.

---

## Sobre la calculadora

Los números salen de lo que **el visitante** mete en los controles, no de
estadísticas que yo inventé. Los supuestos están escritos en la página: 26 días
de operación al mes y solo una de cada tres llamadas perdidas contada como venta
real. Es deliberadamente conservador — si alguien te cuestiona la cuenta, la
puedes defender línea por línea.

Con los valores por defecto da unos $3,800 al mes, que es 12 veces los $300 de
Sofía RX. La propuesta se vende sola sin exagerar nada.

---

## Privacidad

El sitio no guarda nada. El formulario abre WhatsApp con el mensaje escrito —
no hay base de datos, no hay servidor, no hay nada que se pueda filtrar.

Esto es a propósito: Vercel no firma BAA en el plan gratuito, así que la regla
es **cero información de pacientes en el sitio público**. El formulario lo dice
explícitamente. Si algún día montas un portal que sí maneje datos clínicos, va
en infraestructura aparte con el acuerdo firmado.

---

## Una cosa que tienes que saber

**No pude correr `npm run build` antes de entregarte esto** — el ambiente donde
trabajé no tiene acceso a internet, así que no pude instalar las dependencias.

Lo que sí hice fue auditar el código con analizadores que escribí para esto:
balance de sintaxis y etiquetas JSX, que todos los imports resuelvan a archivos
reales, que los hooks solo estén en componentes cliente, que ningún `metadata`
esté en un componente cliente, que todos los enlaces internos apunten a rutas que
existen, que las variables CSS estén definidas, y que la aritmética de la
calculadora dé números defendibles en todos los extremos.

Encontré y corregí dos cosas en el proceso: el `<Reveal>` descartaba en silencio
las props de estilo, y la calculadora daba $292,500 al mes en el extremo máximo
—un número que te haría ver como vendedor de humo.

Aun así, **corre `npm install && npm run dev` en tu máquina antes de desplegar.**
Si sale algún error, mándamelo y lo arreglo. Es una precaución de cinco minutos.

---

## Comandos

```bash
npm install      # instalar (la primera vez)
npm run dev      # servidor local en localhost:3000
npm run build    # verificar que compila
npm start        # correr la versión de producción local
```
