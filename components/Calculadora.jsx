'use client';
import { useMemo, useState } from 'react';
import { waUrl } from '@/site.config';
import WAIcon from './WAIcon';

/* Calculadora de llamadas perdidas.
   Todos los números salen de lo que el usuario mete — no hay promesas
   ni estadísticas inventadas de mi parte. Es su propia aritmética. */

const money = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

export default function Calculadora() {
  const [llamadas, setLlamadas] = useState(60);   // llamadas al día
  const [perdidas, setPerdidas] = useState(20);   // % que no se contesta
  const [valor, setValor] = useState(35);         // margen por receta

  const r = useMemo(() => {
    const diasMes = 26;
    const perdidasDia = (llamadas * perdidas) / 100;
    const perdidasMes = perdidasDia * diasMes;
    // Supuesto deliberadamente conservador: solo 1 de cada 3 llamadas
    // perdidas era una venta real que no regresó.
    const ventasPerdidas = perdidasMes * 0.35;
    const dineroMes = ventasPerdidas * valor;
    return {
      perdidasDia: Math.round(perdidasDia),
      perdidasMes: Math.round(perdidasMes),
      dineroMes: Math.round(dineroMes),
      dineroAno: Math.round(dineroMes * 12),
      horas: Math.round((perdidasMes * 3) / 60), // 3 min por llamada devuelta
    };
  }, [llamadas, perdidas, valor]);

  const msg =
    `Hola Carlos, usé la calculadora de tu página. ` +
    `Recibimos unas ${llamadas} llamadas al día, se nos pierde cerca del ${perdidas}%, ` +
    `y el resultado dio ${money(r.dineroMes)} al mes. Quiero conversar.`;

  return (
    <div className="calc">
      <div className="calc-grid">
        <div>
          <div className="slider-row">
            <div className="slider-top">
              <label className="slider-lbl" htmlFor="c-llamadas">Llamadas que recibes al día</label>
              <span className="slider-val">{llamadas}</span>
            </div>
            <input
              id="c-llamadas" type="range" min="10" max="200" step="5"
              value={llamadas}
              onChange={(e) => setLlamadas(Number(e.target.value))}
            />
          </div>

          <div className="slider-row">
            <div className="slider-top">
              <label className="slider-lbl" htmlFor="c-perdidas">Porciento que no se contesta</label>
              <span className="slider-val">{perdidas}%</span>
            </div>
            <input
              id="c-perdidas" type="range" min="5" max="50" step="1"
              value={perdidas}
              onChange={(e) => setPerdidas(Number(e.target.value))}
            />
          </div>

          <div className="slider-row">
            <div className="slider-top">
              <label className="slider-lbl" htmlFor="c-valor">Margen promedio por receta</label>
              <span className="slider-val">{money(valor)}</span>
            </div>
            <input
              id="c-valor" type="range" min="8" max="100" step="1"
              value={valor}
              onChange={(e) => setValor(Number(e.target.value))}
            />
          </div>

          <p className="calc-note">
            Estos son <b>tus</b> números, no míos. La cuenta asume 26 días de operación
            al mes y que solo una de cada tres llamadas perdidas era una venta real que no
            regresó — a propósito conservador. Ajusta los controles a tu realidad.
          </p>
        </div>

        <div>
          <div className="calc-out">
            <div className="calc-out-k">Se te está quedando en la mesa</div>
            <div className="calc-big">{money(r.dineroMes)}</div>
            <div className="calc-per">Cada mes</div>

            <div className="calc-split">
              <div className="calc-cell">
                <div className="calc-cell-k">Al año</div>
                <div className="calc-cell-v">{money(r.dineroAno)}</div>
              </div>
              <div className="calc-cell">
                <div className="calc-cell-k">Llamadas / mes</div>
                <div className="calc-cell-v">{r.perdidasMes}</div>
              </div>
              <div className="calc-cell">
                <div className="calc-cell-k">Horas devolviendo</div>
                <div className="calc-cell-v">{r.horas} h</div>
              </div>
            </div>
          </div>

          <div className="calc-cta">
            <a className="btn btn-wa" href={waUrl(msg)} target="_blank" rel="noopener noreferrer">
              <WAIcon />
              Mandarme este resultado
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
