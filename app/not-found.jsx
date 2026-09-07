import Link from 'next/link';
import config, { waUrl } from '@/site.config';

export const metadata = { title: 'Página no encontrada' };

export default function NotFound() {
  return (
    <section className="wrap err-page">
      <div className="err-code">Error 404 · Página no encontrada</div>
      <h1 style={{ maxWidth: '16ch' }}>Esta receta no está en el sistema.</h1>
      <p className="lead" style={{ marginTop: 20, maxWidth: '52ch' }}>
        El enlace que seguiste no existe o cambió de lugar. Vuelve al inicio o escríbeme
        directamente y te digo dónde está lo que buscas.
      </p>
      <div className="btn-row" style={{ justifyContent: 'center' }}>
        <Link className="btn btn-ink" href="/">Volver al inicio</Link>
        <a className="btn btn-ghost" href={waUrl(config.wa.general)} target="_blank" rel="noopener noreferrer">
          Escribirme
        </a>
      </div>
    </section>
  );
}
