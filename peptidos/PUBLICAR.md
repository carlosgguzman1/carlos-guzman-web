# Carlos Guzmán · Publicar en GitHub y Vercel

Versión 2.3.0. Solo para propósitos educativos.

## Camino recomendado: GitHub guarda el proyecto y Vercel publica la web

1. Descomprime el ZIP. Crea un repositorio llamado `carlos-guzman-peptidos` en tu cuenta de GitHub.
2. Sube los archivos del proyecto a la raíz del repositorio, incluyendo `dist`, `package.json`, `vercel.json` y `.github`. No subas el ZIP dentro del repositorio. Si usas Git local: `git init`, `git add .`, `git commit -m "Publicar guía educativa"`, configura tu repositorio como origin y haz push de main.
3. En Vercel, elige Add New → Project e importa ese repositorio desde GitHub.
4. Mantén la raíz del proyecto. Framework: Other. Build Command: `npm run build`. Output Directory: `dist`. No requiere base de datos, claves ni dependencias npm.
5. Pulsa Deploy. Vercel devolverá la dirección real del sitio. Cada push posterior actualizará la web conectada.

El repositorio conserva la web generada. Para cambiar colores edita `theme.css`; para cambiar estructura edita `template.html`; para las interacciones edita `app.js`. Regenera con Python y openpyxl: `python build.py`; luego `npm run check` y sube también el `dist` actualizado. El despliegue no necesita Python.

## Alternativa: publicar también en GitHub Pages

El workflow `.github/workflows/pages.yml` publica `dist`. En Settings → Pages, selecciona GitHub Actions como Source. Después ejecuta el workflow o haz un push a main. GitHub te mostrará la URL. Si utilizas subida web, comprueba que la carpeta oculta `.github` también esté presente.

## Dominio .io

Una dirección personalizada .io requiere registrar un nombre disponible. No se ha comprado ninguno. Después de registrarlo, añádelo en Vercel → proyecto → Settings → Domains y configura los registros DNS exactos que te indique Vercel. Define la variable de entorno `SITE_URL=https://tu-dominio.io` y vuelve a desplegar para actualizar metadatos y sitemap. Sin dominio propio, Vercel asigna una URL .vercel.app; GitHub Pages usa .github.io.

## Datos y límites

Las notas y el progreso se guardan en el navegador de cada visitante. Exporta/importa el progreso para trasladarlo; no hay cuentas compartidas ni sincronización automática entre dominios. El cambio de dominio no mueve el almacenamiento local.

Las 152 fichas conservan la clasificación y las referencias del archivo original. Las pruebas verifican presentación y funcionamiento, no una revisión clínica independiente de todas las afirmaciones. La figura corporal es una ilustración con apariencia 3D, con puntos interactivos y zoom; no se rota.

## Documentación oficial

- https://vercel.com/docs/git
- https://vercel.com/docs/deployments
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site
