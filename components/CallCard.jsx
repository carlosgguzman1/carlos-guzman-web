'use client';
import { useEffect, useRef, useState } from 'react';

const GUION = [
  ['ai', 'Sofía', 'Farmacia, buenas tardes. Le habla Sofía, ¿en qué le puedo ayudar?'],
  ['pt', 'Paciente', 'Buenas, quiero renovar mi medicamento de presión.'],
  ['ai', 'Sofía', '¡Claro que sí! ¿Me da su nombre completo y el número de receta?'],
  ['pt', 'Paciente', 'María Rosado. La receta es 4 4 8 2 1 0.'],
  ['ai', 'Sofía', 'Perfecto, doña María. Ya se lo pasé al técnico y le avisamos por texto cuando esté listo.'],
];

export default function CallCard() {
  const [shown, setShown] = useState(0);
  const bodyRef = useRef(null);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduce) { setShown(GUION.length); return; }

    let timer;
    const tick = (i) => {
      if (i <= GUION.length) {
        setShown(i);
        timer = setTimeout(() => tick(i + 1), i === 0 ? 600 : 2100);
      } else {
        timer = setTimeout(() => { setShown(0); tick(0); }, 6000);
      }
    };
    tick(0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shown]);

  return (
    <div className="rxcard" aria-label="Ejemplo de llamada atendida por Sofía RX">
      <div className="rxcard-top">
        <span>Llamada entrante · 6:42 PM</span>
        <span className="live"><span className="dot" /> En vivo</span>
      </div>
      <div className="perf" />
      <div className="rxcard-body" ref={bodyRef}>
        {GUION.slice(0, shown).map(([tipo, quien, texto], i) => (
          <div className={`turn ${tipo}`} key={`${shown}-${i}`}>
            <div className={`who ${tipo}`}>{quien}</div>
            <p className="said">{texto}</p>
          </div>
        ))}
      </div>
      <div className="rxcard-foot">
        <span>Refill registrado · <b>Cola del técnico</b></span>
        <span>Sofía RX</span>
      </div>
    </div>
  );
}
