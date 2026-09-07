'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import config from '@/site.config';
import WAButton from './WAButton';

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const { brand, nav, wa } = config;

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > 8);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [path]);

  const isOn = (href) => (href === '/' ? path === '/' : path.startsWith(href));

  return (
    <header className={`nav ${stuck ? 'stuck' : ''}`}>
      <div className="wrap nav-in">
        <Link href="/" className="brand" aria-label={`${brand.name}, inicio`}>
          <span className="brand-mark">{brand.initials}</span>
          <span className="brand-txt">
            {brand.name}
            <small>{brand.role}</small>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Principal">
          {nav.map((i) => (
            <Link key={i.href} href={i.href} className={isOn(i.href) ? 'on' : undefined}>
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="nav-cta">
          <WAButton msg={wa.general} className="btn btn-wa btn-sm">
            <span>WhatsApp</span>
          </WAButton>
          <button
            className="burger"
            onClick={() => setOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={open}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {nav.map((i) => (
          <Link key={i.href} href={i.href} className={isOn(i.href) ? 'on' : undefined}>
            {i.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
