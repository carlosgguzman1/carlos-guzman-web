# Actualización — 5 archivos

Sube estos 5 a GitHub, en la misma ruta. GitHub te pregunta si quieres
reemplazar el que ya está — dile que sí.

| Archivo | Va en | Qué cambió |
|---|---|---|
| `layout.jsx` | `app/` | Tipografía nueva (adiós Fraunces) |
| `globals.css` | `app/` | Escala tipográfica ajustada para sans |
| `page.jsx` | `app/` | San Juan en vez de Aguadilla |
| `sobre/page.jsx` | `app/sobre/` | Recinto de Ciencias Médicas |
| `site.config.js` | raíz | San Juan, SEO, precios $500/$750/$1,200 |

## ⚠️ ANTES DE SUBIR site.config.js

Tú ya editaste ese archivo en GitHub para cambiar los precios. El que te doy
aquí **ya trae esos precios** ($500 / $750 / $1,200), así que puedes
reemplazarlo tranquilo.

Pero si cambiaste **algo más** además de los precios, ábrelo primero en GitHub,
mira qué más tocaste, y anótalo — al reemplazar el archivo se pierde.

## Cómo subirlos

1. GitHub → tu repositorio
2. **Add file** → **Upload files**
3. Arrastra los 4 de `app/` uno por uno a su carpeta correcta,
   y `site.config.js` a la raíz
4. **Commit changes**

Vercel republica solo en 60 segundos.

> **Truco:** si arrastras la carpeta `app` completa, GitHub respeta la
> estructura y sustituye los archivos que coinciden. Más rápido que uno por uno.

## Cambiar la tipografía después

Abre `app/layout.jsx`. Arriba hay tres opciones, con la A activa:

- **A · Clínica moderna** — Instrument Sans + Inter (la que está puesta)
- **B · Editorial** — Source Serif 4 + Inter
- **C · Institucional** — Libre Franklin + Open Sans

Para cambiar: comenta las dos líneas de la A (ponles `//` delante) y quítale
los `//` a las de la opción que quieras. Son dos bloques: el `import` de
arriba y las declaraciones `const display` / `const body`.

Ojo: **solo puede haber un bloque activo a la vez.** Si dejas dos, el build falla.
