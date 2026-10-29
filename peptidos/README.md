# Carlos Guzmán · Péptidos — edición 3.0

Guía pública informativa basada en la estructura del proyecto academia-peptidos de carlosgguzman1/demos, commit 77745d0964f22c4cad08f6fa70457f40beeffc49. Conserva portada con cuerpo 3D, biblioteca, fichas completas, flashcards, quiz y progreso local. Branding Carlos Guzmán, tonos claros, aviso educativo visible.

El cuerpo usa Three.js r128 vendorizado. Se puede arrastrar para girar y seleccionar sistemas. Movimiento automático con pausa persistente y respeto a movimiento reducido. En navegadores sin WebGL se muestra una ilustración interactiva con los mismos sistemas. La ilustración es artística, no diagnóstica.

Los resúmenes de 148 fichas se migraron de la edición 2.3 y las otras cuatro conservan sus contextos diferenciados de la fuente. Los detalles en español provienen del proyecto de referencia. La clasificación regulatoria se identifica como reportada por la fuente. Las aprobaciones corresponden a productos e indicaciones concretos. La reproducción no representa validación clínica integral; esta sigue pendiente. No se publican los protocolos de dosificación ni las instrucciones internas para personal del proyecto original.

## Comandos

- `npm run check`: sintaxis.
- `node tests/functional.mjs`: render de las 152 fichas, combinaciones de flashcards, generación de preguntas y regresiones.
- `npm run build`: copia los archivos a dist; no requiere dependencias npm ni backend.

## Vercel

Repositorio carlosgguzman1/carlos-guzman-web, carpeta peptidos. Framework Other, raíz peptidos, build npm run build, salida dist. Proyecto de producción carlos-guzman-peptides. Los datos de progreso son locales al dominio y no se sincronizan entre dispositivos o dominios.

El modelo y los metadatos no presentan afiliación comercial, inventario ni servicios de una farmacia. Solo para propósitos educativos.
