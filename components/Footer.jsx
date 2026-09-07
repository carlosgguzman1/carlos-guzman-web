import Link from 'next/link';
import config, { waUrl, telUrl } from '@/site.config';

export default function Footer() {
  const { brand, contact, nav, wa } = config;
  const year = new Date().getFullYear();

  return (
    <footer className="foot">
      <div className="wrap">
        <div className="foot-in">
          <div>
            <div className="brand">
              <span className="brand-mark">{brand.initials}</span>
              <span className="brand-txt">
                {brand.name}
                <small>{brand.role}</small>
              </span>
            </div>
            <p className="foot-txt">
              {config.footer.descripcion}
              <br />
              {contact.city} · {config.footer.alcance}
            </p>
          </div>

          <div className="foot-col">
            <h4>Navegar</h4>
            {nav.map((i) => (
              <Link key={i.href} href={i.href}>{i.label}</Link>
            ))}
          </div>

          <div className="foot-col">
            <h4>Contacto</h4>
            <a href={waUrl(wa.general)} target="_blank" rel="noopener noreferrer">
              {contact.whatsappDisplay}
            </a>
            <a href={telUrl}>{contact.demoPhoneDisplay}</a>
            <span>{contact.city}</span>
          </div>
        </div>

        <p className="legal">
          <b>Servicios de implementación provistos por {brand.legalEntity}.</b>{' '}
          El contenido de este sitio es informativo y educativo para profesionales de la salud
          y dueños de negocios. No constituye consejo médico, no establece una relación
          farmacéutico-paciente y no sustituye la evaluación de un profesional de la salud.
          Toda terapia mencionada está sujeta a evaluación y orden médica. Este sitio no recibe
          ni almacena información protegida de pacientes. © {year} {brand.name}, {brand.suffix}.
          Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
