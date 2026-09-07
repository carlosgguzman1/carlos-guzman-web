'use client';
import { useState } from 'react';
import config, { waUrl } from '@/site.config';
import WAIcon from './WAIcon';

const OPCIONES = config.formulario.opciones;

export default function ContactForm() {
  const [f, setF] = useState({
    nombre: '', negocio: '', tel: '', interes: OPCIONES[0], nota: '',
  });
  const [errs, setErrs] = useState({});
  const [ok, setOk] = useState(false);

  const set = (k) => (e) => {
    setF((p) => ({ ...p, [k]: e.target.value }));
    if (errs[k]) setErrs((p) => ({ ...p, [k]: false }));
  };

  const enviar = () => {
    const next = {
      nombre: !f.nombre.trim(),
      negocio: !f.negocio.trim(),
      tel: !f.tel.trim(),
    };
    setErrs(next);
    if (next.nombre || next.negocio || next.tel) return;

    const msg =
      `*Nueva solicitud desde la web*\n\n` +
      `*Nombre:* ${f.nombre.trim()}\n` +
      `*Práctica o negocio:* ${f.negocio.trim()}\n` +
      `*Teléfono:* ${f.tel.trim()}\n` +
      `*Interés:* ${f.interes}` +
      (f.nota.trim() ? `\n*Nota:* ${f.nota.trim()}` : '');

    setOk(true);
    window.open(waUrl(msg), '_blank', 'noopener');
  };

  const onKey = (e) => {
    if (e.key === 'Enter') { e.preventDefault(); enviar(); }
  };

  return (
    <div className="form">
      {ok && (
        <div className="form-ok">
          Listo. Se abre WhatsApp con tu mensaje — solo dale enviar.
        </div>
      )}

      <div className="privacy">
        <b>Importante:</b> no incluyas nombres de pacientes, recetas, diagnósticos ni
        información clínica en este formulario. Es un canal comercial, no clínico.
      </div>

      <div className={`field ${errs.nombre ? 'err' : ''}`}>
        <label htmlFor="nombre">Tu nombre</label>
        <input id="nombre" type="text" placeholder="Dr. José Rivera"
               autoComplete="name" value={f.nombre} onChange={set('nombre')} onKeyDown={onKey} />
        {errs.nombre && <div className="err-msg">Escribe tu nombre para saber con quién hablo.</div>}
      </div>

      <div className={`field ${errs.negocio ? 'err' : ''}`}>
        <label htmlFor="negocio">{config.formulario.etiquetaNegocio}</label>
        <input id="negocio" type="text" placeholder="Clínica Santa Rosa"
               autoComplete="organization" value={f.negocio} onChange={set('negocio')} onKeyDown={onKey} />
        {errs.negocio && <div className="err-msg">Dime el nombre del negocio o la práctica.</div>}
      </div>

      <div className={`field ${errs.tel ? 'err' : ''}`}>
        <label htmlFor="tel">Teléfono</label>
        <input id="tel" type="tel" placeholder="(787) 000-0000"
               autoComplete="tel" value={f.tel} onChange={set('tel')} onKeyDown={onKey} />
        {errs.tel && <div className="err-msg">Necesito un teléfono para devolverte la llamada.</div>}
      </div>

      <div className="field">
        <label htmlFor="interes">Qué te interesa</label>
        <select id="interes" value={f.interes} onChange={set('interes')}>
          {OPCIONES.map((o) => <option key={o}>{o}</option>)}
        </select>
      </div>

      <div className="field">
        <label htmlFor="nota">Cuéntame brevemente (opcional)</label>
        <textarea id="nota" value={f.nota} onChange={set('nota')}
                  placeholder="Clínica en Mayagüez, 3 empleados, perdemos muchas llamadas en la tarde." />
      </div>

      <button className="btn btn-wa" type="button" onClick={enviar}>
        <WAIcon />
        Enviar por WhatsApp
      </button>

      <p className="form-note">
        Se abre tu WhatsApp con el mensaje escrito.
        <br />
        Esta página no guarda ninguna información.
      </p>
    </div>
  );
}
