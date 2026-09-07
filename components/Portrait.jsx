'use client';
import { useState } from 'react';
import Image from 'next/image';
import config from '@/site.config';

export default function Portrait({ alt, capLeft, capRight }) {
  const [failed, setFailed] = useState(false);
  const { brand } = config;

  return (
    <figure className="portrait">
      {failed ? (
        <div className="portrait-fallback">
          <div className="pf-mark">{brand.initials}</div>
          <div className="pf-t">{brand.name}, {brand.suffix}</div>
          <div className="pf-s">{config.footer.subtitulo}</div>
        </div>
      ) : (
        <Image
          className="portrait-img"
          src="/carlos.jpg"
          alt={alt}
          width={800}
          height={1000}
          priority
          onError={() => setFailed(true)}
        />
      )}
      <figcaption className="portrait-cap">
        <span>{capLeft}</span>
        <span><b>{capRight}</b></span>
      </figcaption>
    </figure>
  );
}
