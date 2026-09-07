# EMPIEZA AQUÍ — Subir tu página a Vercel

Sin terminal. Sin instalar nada. Solo el navegador.

**Tiempo total: 25 minutos.**

---

## Lo primero que tienes que entender

Vercel no funciona como Netlify. En Netlify arrastras una carpeta y ya.
En Vercel el sitio tiene que estar en **GitHub** primero, y Vercel lo lee de ahí.

Suena a paso extra, pero te conviene: una vez conectado, cada cambio que hagas
en GitHub se publica solo en el sitio. No tienes que volver a subir nada nunca.

**No necesitas instalar Node ni saber usar la terminal.** Vercel hace todo eso
en sus servidores.

---

# PARTE 1 — Cuenta de GitHub (5 min)

### Paso 1
Ve a **github.com** y dale a **Sign up**.

### Paso 2
Pon tu correo, inventa una contraseña, y escoge un nombre de usuario.
Sugerencia: `carlosguzmanpharmd` o `garxconsulting`.

### Paso 3
Te manda un código al correo. Lo pegas y ya estás adentro.

### Paso 4
Cuando te pregunte qué plan quieres, escoge **Free**. No necesitas pagar nada.

---

# PARTE 2 — Subir tu sitio a GitHub (10 min)

### Paso 5
Descomprime el ZIP que te di. Vas a tener una carpeta llamada
**`carlos-guzman-web`**. Ábrela — adentro debe haber `app`, `components`,
`public`, `site.config.js`, etc.

> **Importante:** lo que vas a subir es **el contenido de adentro** de esa
> carpeta, no la carpeta completa. Te explico en el paso 8.

### Paso 6
En GitHub, arriba a la derecha, dale al **+** → **New repository**.

### Paso 7
Llena así:

| Campo | Qué poner |
|---|---|
| Repository name | `carlos-guzman-web` |
| Description | déjalo vacío |
| Public / Private | **Private** (nadie más lo ve) |
| Add a README | **NO lo marques** |
| Add .gitignore | **None** |
| License | **None** |

Dale a **Create repository**.

### Paso 8
Te sale una página con instrucciones de terminal. **Ignóralas todas.**

Busca el enlace que dice **"uploading an existing file"** — está en el párrafo
que empieza con "…or push an existing repository". Dale click ahí.

### Paso 9
Ahora abre la carpeta `carlos-guzman-web` en tu computadora.

**Selecciona TODO lo de adentro** (Cmd+A en Mac, Ctrl+A en Windows) y
arrástralo a la ventana de GitHub donde dice "Drag files here".

Debes estar arrastrando: las carpetas `app`, `components`, `public`,
`plantilla-cliente`, `lib`, y los archivos `site.config.js`, `package.json`,
`next.config.mjs`, `jsconfig.json`, `README.md`.

> **Si no ves los archivos que empiezan con punto** (`.gitignore`,
> `.vercelignore`): en Mac presiona `Cmd + Shift + .` para mostrarlos.
> En Windows: pestaña Vista → marca "Elementos ocultos".
> No son obligatorios, pero mejor si van.

### Paso 10
Espera a que suban todos (vas a ver la lista llenarse). Abajo dale a
**Commit changes**.

Listo. Tu código está en GitHub.

---

# PARTE 3 — Conectar Vercel (5 min)

### Paso 11
Ve a **vercel.com** y dale a **Sign Up**.

### Paso 12
Escoge **Continue with GitHub**. Le das permiso. Así se conectan las dos cuentas.

### Paso 13
Te pregunta si es para trabajo o personal → escoge **Hobby** (es gratis).

### Paso 14
Te lleva a una pantalla que dice **Import Git Repository**. Ahí debe aparecer
`carlos-guzman-web`. Dale a **Import**.

> Si no aparece, dale a **Adjust GitHub App Permissions** y autoriza el
> repositorio.

### Paso 15
Vercel detecta Next.js solo. **No cambies nada** en esa pantalla — ni Framework,
ni Build Command, ni Output Directory.

Dale a **Deploy**.

### Paso 16
Espera 1 a 2 minutos. Ves el progreso en vivo.

Cuando termine sale confeti y una vista previa del sitio. **Ya está en línea.**

Dale a **Continue to Dashboard** → arriba ves tu URL, algo como
`carlos-guzman-web.vercel.app`.

**Ábrela en tu celular ahora mismo.** Ese es tu sitio, funcionando.

---

# PARTE 4 — Ponerlo bonito (5 min)

### Paso 17 — Cambiar la URL

En el dashboard: **Settings** → **Domains** → verás
`carlos-guzman-web.vercel.app` → dale a **Edit** y cámbialo a algo más limpio,
por ejemplo `carlosguzman.vercel.app` (si está disponible).

### Paso 18 — Poner tu foto

Ahora mismo el sitio tiene un placeholder con tus iniciales. Para cambiarlo:

1. Ve a tu repositorio en GitHub
2. Entra a la carpeta **public**
3. Dale a **Add file** → **Upload files**
4. Arrastra tu foto profesional, **renombrada exactamente `carlos.jpg`**
5. **Commit changes**

Vercel republica solo en 60 segundos. Refrescas y ahí está tu cara.

Lo mismo con `portada.jpg` (1200 × 630 px) — es lo que se ve cuando compartes
el link por WhatsApp.

> **Medidas de la foto:** vertical, 800 × 1000 px o más grande con esa
> proporción. Compárala en **tinypng.com** antes de subirla para que cargue
> rápido.

---

# CÓMO EDITAR DE AHORA EN ADELANTE

**Todo desde github.com. Sin terminal, sin descargar nada.**

1. Entra a tu repositorio
2. Dale click al archivo que quieres cambiar
3. Dale al **lápiz** (arriba a la derecha)
4. Editas
5. Abajo, **Commit changes**

En 60 segundos el sitio está actualizado.

### Los archivos que más vas a tocar

| Qué cambiar | Archivo |
|---|---|
| Teléfonos, colores, menú, precios, servicios | `site.config.js` |
| Texto de la portada | `app/page.jsx` |
| Texto de Sofía RX | `app/sofia-rx/page.jsx` |
| Precios de páginas web | `site.config.js` → `preciosWeb` |
| Tu biografía | `app/sobre/page.jsx` |

**Si rompes algo:** Vercel te avisa que el deploy falló y **deja el sitio
anterior en línea**. No se cae nunca. Vas a GitHub, deshaces el cambio, y ya.

---

# CUANDO COMPRES TU DOMINIO

1. Cómpralo en **Namecheap** o **Cloudflare** (~$12 al año).
   Sugerencias: `carlosguzmanpharmd.com` o `garxconsulting.com`

2. En Vercel: **Settings → Domains → Add** → escribes tu dominio

3. Vercel te muestra unos registros DNS. Los copias y los pegas en Namecheap
   (en la sección "Advanced DNS")

4. Esperas de 1 a 24 horas. El certificado de seguridad se pone solo.

5. **Un paso más que no puedes olvidar:** en GitHub, edita `site.config.js`
   y cambia la línea `domain:` por tu dominio real. Si no, Google se confunde.

---

# ANTES DE COMPARTIR EL LINK

- [ ] Abrí el sitio en el celular y se ve bien
- [ ] Le di a un botón de WhatsApp y abre el chat con el mensaje escrito
- [ ] Llamé al (760) 638-4205 y Sofía contestó
- [ ] Moví los controles de la calculadora y los números cambian
- [ ] Subí `carlos.jpg` con mi foto real
- [ ] Subí `portada.jpg`
- [ ] Compartí el link en un chat y se ve la vista previa bonita
- [ ] Revisé los precios de páginas web (los que puse son propuesta, no dato)

---

# SI ALGO SALE MAL

**"El deploy falló"**
En Vercel, dale al deploy rojo → **Building** → busca la línea que dice `Error:`.
Cópiala completa y mándamela. Casi siempre es un archivo que no subió.

**"Solo veo una página en blanco"**
Casi seguro faltó subir la carpeta `app` o `components`. Revisa en GitHub que
estén las dos.

**"No me aparece el repositorio en Vercel"**
Dashboard → **Settings** → **Git** → **Adjust GitHub App Permissions** →
autoriza `carlos-guzman-web`.

**"Subí mal los archivos"**
No pasa nada. Borra el repositorio (Settings → abajo del todo → Delete this
repository) y empieza otra vez desde el paso 6.

---

# UNA COSA QUE TIENES QUE SABER

No pude ejecutar `npm run build` cuando armé esto — el ambiente donde trabajo
no tiene acceso a internet, así que no pude instalar las dependencias.

Lo que sí hice fue auditar todo el código con verificadores que escribí:
sintaxis, que todos los imports resuelvan, que los hooks estén donde deben,
que ningún enlace apunte a una página que no existe, que todas las claves de
configuración que el código usa existan de verdad, y que las imágenes que se
referencian estén ahí.

**Todo pasó.** Pero la prueba real es el deploy. Si Vercel te da un error,
mándamelo tal cual y lo arreglo — probablemente sea cosa de un minuto.

La ventaja de este método: **si falla, no pasa nada.** No hay sitio viejo que
se rompa. Simplemente no publica y te dice por qué.
