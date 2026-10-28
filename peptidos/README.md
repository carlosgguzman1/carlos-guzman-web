# Peptide Academy · Carlos Guzmán · edición 2

Website de adiestramiento interno, listo para Vercel o GitHub Pages. Incluye 152 fichas, explorador corporal con render realista por ocho sistemas, buscador, filtros, comparación de hasta tres fichas, favoritos, apuntes y progreso local exportable. No requiere servidor de aplicación, API, claves ni base de datos.

## Abrir ahora

Abre `dist/index.html` con Chrome, Safari, Firefox o Edge. El HTML contiene sus estilos, código y datos; funciona sin conexión salvo los enlaces externos. Para servirlo localmente: `python3 -m http.server 3000 --directory dist` y abrir `http://localhost:3000`.

## Publicar en Vercel desde GitHub

1. Descomprime el ZIP. Crea un repositorio en tu cuenta de GitHub, preferiblemente privado para el código de adiestramiento, y sube el contenido de la carpeta del proyecto. `package.json`, `vercel.json` y `dist` deben quedar en la raíz del repositorio, no dentro de otra carpeta anidada.
2. En Vercel, selecciona **Add New → Project → Import Git Repository** y elige ese repositorio.
3. Usa **Framework Preset: Other**. Root Directory: la raíz del proyecto. Build Command: `npm run build`. Output Directory: `dist`. No hacen falta variables de entorno. La configuración incluida ya establece estas opciones.
4. Selecciona **Deploy**. Vercel entregará la URL y volverá a publicar cuando subas cambios al repositorio.

El build de Vercel utiliza los archivos ya generados en `dist`. No requiere Python ni instalar openpyxl allí. La versión web de revisión se publica de forma privada en Sites. El paquete también permite desplegar una copia independiente en Vercel o GitHub Pages.

## Alternativa: GitHub Pages

Incluye `.github/workflows/pages.yml` en tu repositorio. En **Settings → Pages → Build and deployment**, elige **GitHub Actions**. Ejecuta el workflow **Deploy MIA Academy to Pages** o sube un cambio a `main`. Publica exclusivamente `dist`. GitHub ofrece Pages para repositorios privados según el plan; un sitio Pages normalmente es público aunque el repositorio no lo sea.

Los nombres de opciones de Vercel y GitHub pueden cambiar. La aplicación es HTML estático y no depende de estas plataformas.

## Acceso del personal

La versión entregada no incorpora autenticación. `noindex` solicita a buscadores que no la indexen, pero no limita el acceso. Para acceso realmente interno, configura protección de acceso del proveedor antes de compartir la URL; las opciones dependen de su plan. No uses una contraseña incrustada en JavaScript como protección. No incluir información de pacientes.

El progreso se guarda en `localStorage` del navegador. No se sincroniza con otros equipos ni genera reportes de empleados. En equipos compartidos se comparte el mismo progreso. **Exportar mi progreso** descarga JSON; **Importar progreso** combina favoritos y fichas estudiadas, y los apuntes importados reemplazan los del mismo registro. Conservar una exportación antes de importar si necesitas guardar ambos textos.

## Contenido y revisión clínica

- Fuente aportada: `source/Superpower Peptide Library - 152 peptides graded.xlsx`, hojas Peptides, Full detail y Citations; 152 registros y 719 filas bibliográficas.
- Interfaz y resúmenes breves redactados en español. Mecanismos, estudios, seguridad y secciones completas del archivo se conservan en inglés. No se afirma traducción integral.
- Se preservan registros con nombres repetidos y contextos diferentes, como tesamorelin y trofinetide. Los conteos son registros, no necesariamente 152 sustancias únicas.
- Las clasificaciones regulatorias y de evidencia proceden del archivo y no fueron verificadas individualmente. Se corrigieron puntualmente las categorías de elamipretide, enlicitide y rusfertide con fuentes FDA enlazadas en cada ficha. Fecha de adaptación: 26 octubre 2026.
- Los campos extraídos del Excel pueden estar incompletos: un conteo de cero no significa que no existan estudios; algunas secciones pueden incluir material mal ubicado por la extracción original. Se conserva el contexto completo para revisión.
- La aprobación corresponde a productos e indicaciones específicos; no se transfiere a mezclas, preparados compuestos ni otras vías. La biblioteca no autoriza preparación, dispensación ni prescripción y no afirma disponibilidad en MIA.
- La ruta MIA es una selección educativa. «Wolverine Blend», las combinaciones con B6/glicina y NAD no se añaden como registros nuevos del archivo de 152 fichas. Las combinaciones se explican en la guía; NAD no está en la tabla original y no es un péptido.
- Los resúmenes y el contenido deben ser revisados por el farmacéutico responsable antes de adoptarlos como material institucional definitivo. No hay actualización clínica o regulatoria automática.
- Diseño oscuro de la edición 2, con render artístico realista de apariencia 3D y ocho puntos interactivos, ampliación y restablecimiento. El cuerpo es una imagen renderizada, no un modelo 3D con rotación libre; funciona sin WebGL. El wordmark es tipográfico, no un archivo de logo oficial suministrado por MIA.
- El material original se acredita dentro de la aplicación. Verificar derechos de redistribución del contenido aportado antes de publicar de forma abierta.

## Editar y regenerar

El código fuente está en `template.html`, `styles.css` y `app.js`. Los resúmenes en español se editan en `summaries.txt` con formato `nombre|resumen`. La fuente de datos editable es el Excel dentro de `source`.

Para regenerar después de editar, utiliza Python 3 con `openpyxl` y ejecuta `python3 build.py`. Eso reconstruye `dist/index.html`, `dist/data.json` y `dist/biblioteca.csv`. El script verifica los 152 registros, sus resúmenes y slugs únicos. Después ejecuta `npm run check` y `npm run build`. No edites solo `dist/index.html` si luego vas a regenerar: el cambio se perdería.

`dist/data.json` conserva los campos originales y el detalle completo. Las dosis importadas permanecen en los datos fuente; no se presentan como un protocolo institucional. El CSV contiene los campos principales, no todos los detalles narrativos.

## Estructura

| Archivo | Propósito |
| --- | --- |
| `dist/index.html` | Website completo, autocontenido |
| `dist/data.json` | Datos originales, resúmenes y trazabilidad |
| `dist/biblioteca.csv` | Exportación de campos principales |
| `app.js` | Búsqueda, filtros, fichas, comparación y progreso |
| `styles.css` | Diseño adaptable a móvil, escritorio e impresión |
| `template.html` | Estructura de la página |
| `summaries.txt` | Resúmenes educativos en español |
| `build.py` | Generación desde Excel y código fuente |
| `vercel.json` | Configuración de Vercel |
| `.github/workflows/pages.yml` | Publicación opcional con GitHub Pages |

No hay dependencias externas de ejecución, fuentes remotas ni rastreadores. Los enlaces a fuentes abren páginas externas y requieren conexión. La versión Sites tiene su propio repositorio de origen y acceso privado para el propietario. El ZIP se puede llevar a otro proveedor. El despliegue de una copia en Vercel o GitHub es independiente.

## Verificación de esta entrega

Se verificaron en navegador: buscador, filtro por sistema (13 fichas en cerebro), estado sin coincidencias, restauración de filtros, paginación, apertura de fichas y fuentes, comparación de semaglutide/tirzepatide, favoritos, apuntes y persistencia de estudio tras recargar. Se inspeccionaron vistas de escritorio y un marco de 390 px para móvil. También pasaron la comprobación de sintaxis JavaScript, la generación de 152 resúmenes con identificadores únicos y el comando de build estático. No se ejecutó un despliegue en Vercel/GitHub ni una revisión clínica integral.

## Corrección de la edición 2

El reporte de botones inactivos no se reprodujo al abrir el HTML como página web. Las vistas previas de archivos pueden bloquear JavaScript; para evitar esa dependencia se entrega un enlace web. La página ahora muestra un aviso visible mientras inicializa o cuando una vista impide ejecutar la interacción. Si aparece ese aviso al abrir el archivo, usar Safari/Chrome o el enlace web. No se afirma haber confirmado la causa exacta en el dispositivo del usuario.

Los puntos del cuerpo son botones HTML accesibles; seleccionar un sistema elimina filtros previos que podrían ocultar sus fichas. Las tarjetas se abren tanto desde el título/botón como desde su contenido. El zoom tiene límites y controles de restablecimiento. Se conserva la clave de progreso local de la edición 1. Cambiar de URL/origen no transfiere automáticamente el progreso; usar exportación/importación.

La edición 2 se verificó en ocho puntos del cuerpo, zoom/restablecimiento, búsqueda, comparación, apertura de fichas y panel de aprendizaje. La búsqueda y apertura de una ficha también se probaron dentro de una vista móvil de 390 px. Se añadió una pantalla de carga para evitar clics antes de la inicialización.

## Edición pública 2.1

El propietario solicitó acceso público para compartir en redes. Se ajustan textos de audiencia, se habilita indexación y se añaden metadatos sociales. Cada ficha puede compartirse con un enlace `#p=slug`; su vista previa social utiliza la portada general. No hay cuentas ni recopilación de datos de pacientes. El dominio propio .io no está registrado ni configurado; requiere seleccionar un nombre, registrarlo si corresponde y configurar DNS. GitHub Pages también ofrece direcciones bajo github.io sin registrar un dominio propio.

## Marca personal · edición 2.2

Por solicitud del propietario se sustituyó la marca de farmacia por Carlos Guzmán y se destacó el aviso «Solo para propósitos educativos» en portada, pie y fichas. El sitio conserva acceso público y los controles de exploración, comparación y aprendizaje. La clave técnica de almacenamiento anterior se conserva únicamente para no perder progreso local; las exportaciones nuevas usan el nombre Carlos Guzmán y aceptan importar archivos antiguos.

## Corrección de calidad 2.2.1 · 28 octubre 2026

Se corrigió la concatenación de campos vacíos que generaba «null» en la ficha de abaloparatide y otras combinaciones de datos. `content.js` trata campos ausentes sin ocultar usos científicos legítimos de la palabra null. Se recuperaron 61 campos desde la hoja Full detail: 23 mecanismos, 19 descripciones, 5 secciones de seguridad y 14 estados regulatorios que estaban abreviados en Peptides. Se conserva un aviso explícito cuando no existe una sección independiente de seguridad o de hallazgos.

La prueba de regresión recorre 152 vistas de detalle, 152 comparaciones y ocho sistemas, comprueba campos obligatorios y estructura de URL. También se recorrieron las 152 fichas reales en navegador y se inspeccionaron los textos DOM de 1,244 secciones, sin tokens vacíos independientes. Se comprobó visualmente el desplegable de abaloparatide que mostraba el error reportado. Se sustituyó además un resumen comparativo excesivamente amplio de ese compuesto por un resumen limitado a los resultados frente a placebo de la etiqueta FDA enlazada.

Estas comprobaciones verifican presentación y completitud de los campos; no demuestran que todas las afirmaciones clínicas sean vigentes ni que cada enlace bibliográfico esté accesible. La revisión clínica integral sigue pendiente. Resultados: `qa/data-audit.json`, `qa/browser-audit.json`. Ejecutar `python3 build.py` y `npm run check` antes de publicar futuras ediciones.


## Versión 2.3.0 · diseño claro

Tema blanco con acentos menta y azul, transiciones y movimiento ambiental con pausa persistente y respeto a prefers-reduced-motion. Archivo theme.css integrado por build.py. Se repitieron las pruebas de las 152 fichas y comparaciones; revisión visual de escritorio y móvil sin desbordamiento horizontal. Ver PUBLICAR.md para GitHub y Vercel.
