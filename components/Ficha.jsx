export default function Ficha({ children, center = false, pale = false }) {
  const cls = ['ficha', center && 'center', pale && 'pale'].filter(Boolean).join(' ');
  return <div className={cls}>{children}</div>;
}
