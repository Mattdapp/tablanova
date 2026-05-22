import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Instagram } from 'lucide-react';
import logoImg from '../../assets/logo-tablanova.png';

export const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#5E0F29', overflow: 'hidden' }}>
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-10 md:pt-20 pb-0">

        {/* ── 4-column grid ─────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mb-10 md:mb-16">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="mb-5">
              <img
                src={logoImg}
                alt="Tablanova"
                className="h-8 w-auto brightness-0 invert"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                  const sib = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement | null;
                  if (sib) sib.style.display = 'block';
                }}
              />
              <span className="hidden text-white text-lg font-semibold" style={{ letterSpacing: '-0.02em' }}>
                Tablanova
              </span>
            </div>
            <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgba(255,255,255,0.45)', lineHeight: 1.7 }}>
              Materiales de plástico reciclado para el sector agropecuario y espacios verdes. Fabricados en Esperanza, Santa Fe.
            </p>
            <div className="flex items-center gap-2.5">
              <a
                href="mailto:tablanova.ar@gmail.com"
                className="flex items-center justify-center rounded-full transition-colors duration-150"
                style={{ width: 36, height: 36, backgroundColor: 'rgba(255,255,255,0.08)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.15)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.08)')}
                aria-label="Email"
              >
                <Mail size={15} color="#fff" />
              </a>
              <a
                href="https://instagram.com/tablanova.ar"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center rounded-full transition-colors duration-150"
                style={{ width: 36, height: 36, backgroundColor: 'rgba(255,255,255,0.08)' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.15)')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.08)')}
                aria-label="Instagram"
              >
                <Instagram size={15} color="#fff" />
              </a>
            </div>
          </div>

          {/* Productos */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase mb-5" style={{ letterSpacing: '0.09em' }}>
              Productos
            </h4>
            <ul className="space-y-3">
              {['Postes', 'Varillas y Varillones', 'Tablas y Tirantillos', 'Tranqueras', 'Mobiliario exterior'].map((label) => (
                <li key={label}>
                  <Link
                    to="/productos"
                    className="text-sm transition-colors duration-150"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#fff')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h4 className="text-white text-xs font-semibold uppercase mb-5" style={{ letterSpacing: '0.09em' }}>
              Empresa
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Inicio', href: '/' },
                { label: 'Catálogo con precios', href: '/catalogo' },
                { label: 'Nosotros', href: '/nosotros' },
                { label: 'Contacto', href: '/contacto' },
              ].map(({ label, href }) => (
                <li key={label}>
                  <Link
                    to={href}
                    className="text-sm transition-colors duration-150"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#fff')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white text-xs font-semibold uppercase mb-5" style={{ letterSpacing: '0.09em' }}>
              Contacto
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5">
                <MapPin size={15} style={{ color: '#DB8F33', flexShrink: 0, marginTop: 2 }} />
                <span className="text-sm leading-snug" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  Calle Soler Nº 613<br />
                  C.P. 3080 — Esperanza, Santa Fe
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={15} style={{ color: '#DB8F33', flexShrink: 0, marginTop: 2 }} />
                <div className="flex flex-col gap-1.5">
                  <a href="tel:+5493425683285" className="text-sm transition-colors duration-150" style={{ color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#fff')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
                  >
                    342 5 683285 — WhatsApp
                  </a>
                  <a href="tel:+5493496506699" className="text-sm transition-colors duration-150" style={{ color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#fff')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
                  >
                    3496 506699
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={15} style={{ color: '#DB8F33', flexShrink: 0, marginTop: 2 }} />
                <a href="mailto:tablanova.ar@gmail.com" className="text-sm transition-colors duration-150" style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#fff')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}
                >
                  tablanova.ar@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────────────────────── */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-3 py-6 text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.35)' }}
        >
          <p>© {new Date().getFullYear()} Tablanova. Todos los derechos reservados.</p>
          <p>Fabricado con plástico 100% reciclado en Argentina</p>
        </div>
      </div>

      {/* ── WATERMARK — brand name huge at bottom ─────────────────── */}
      <div
        className="w-full overflow-hidden select-none"
        style={{ marginTop: '-0.15em', lineHeight: 0.82 }}
        aria-hidden
      >
        <p
          className="text-center font-bold whitespace-nowrap"
          style={{
            fontSize: 'clamp(5rem, 18vw, 14rem)',
            color: 'rgba(255,255,255,0.04)',
            letterSpacing: '-0.02em',
            fontWeight: 700,
          }}
        >
          Tablanova
        </p>
      </div>
    </footer>
  );
};
