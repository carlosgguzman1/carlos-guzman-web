import { waUrl } from '@/site.config';
import WAIcon from './WAIcon';

export default function WAButton({ msg, children, className = 'btn btn-wa', icon = true }) {
  return (
    <a className={className} href={waUrl(msg)} target="_blank" rel="noopener noreferrer">
      {icon && <WAIcon />}
      {children}
    </a>
  );
}
