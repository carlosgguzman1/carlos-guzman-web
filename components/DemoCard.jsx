import config, { telUrl } from '@/site.config';

const HINTS = [
  '"Quiero renovar mi medicamento"',
  '"¿A qué hora cierran?"',
  '"¿Está lista mi receta?"',
  '"Necesito hablar con el farmacéutico"',
];

export default function DemoCard({
  title = 'No me creas. Llámala.',
  lead = 'Marca este número desde tu celular y habla con Sofía como si fueras un paciente. Contesta en segundos, a cualquier hora.',
  hints = true,
}) {
  return (
    <div className="demo-card">
      <span className="demo-live"><span className="dot" /> Línea de demo activa</span>
      <h2>{title}</h2>
      <p className="lead">{lead}</p>
      <a className="demo-num" href={telUrl}>{config.contact.demoPhoneDisplay}</a>
      <div className="demo-sub">Toca para llamar</div>
      {hints && (
        <div className="demo-hints">
          {HINTS.map((h) => <span className="hint" key={h}>{h}</span>)}
        </div>
      )}
      <p className="demo-note">
        Esta es una farmacia de demostración. La versión de tu farmacia lleva tu nombre,
        tu horario, tus servicios y tu forma de contestar.
      </p>
    </div>
  );
}
