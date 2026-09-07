'use client';
import { useEffect, useState } from 'react';
import config, { waUrl } from '@/site.config';
import WAIcon from './WAIcon';

export default function FloatWA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <a
      className={`float ${show ? 'show' : ''}`}
      href={waUrl(config.wa.general)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir por WhatsApp"
    >
      <WAIcon size={30} fill="#06301C" />
    </a>
  );
}
