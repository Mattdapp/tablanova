import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import logoImg from '../../assets/logo-tablanova.png';

const SPRING = { type: 'spring' as const, damping: 22, stiffness: 80 };

const navContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0 } },
};

const navItem = {
  hidden: { opacity: 0, y: -16 },
  visible: { opacity: 1, y: 0, transition: SPRING },
};

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isLightBg = false;

  const navTextColor = (active: boolean) =>
    isLightBg
      ? active ? '#111827' : 'rgba(17,24,39,0.55)'
      : active ? '#fff' : 'rgba(255,255,255,0.7)';
  const navActiveBg = (active: boolean) =>
    active ? (isLightBg ? 'rgba(0,0,0,0.07)' : 'rgba(255,255,255,0.15)') : 'transparent';
  const iconColor = isLightBg ? '#111827' : '#fff';

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 60;
      setIsScrolled(scrolled);
      if (!scrolled) setIsMenuOpen(false);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsMenuOpen(false); }, [location.pathname]);

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    if (!isMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isMenuOpen]);

  const navigation = [
    { name: 'Inicio', href: '/' },
    { name: 'Línea Agro', href: '/productos' },
    { name: 'Catálogo', href: '/catalogo' },
    { name: 'Nosotros', href: '/nosotros' },
    { name: 'Contacto', href: '/contacto' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* ── Header principal — visible cuando no hay scroll ───────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{ height: 72, backgroundColor: 'transparent', pointerEvents: isScrolled ? 'none' : 'auto' }}
      >
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              key="full-nav"
              className="max-w-[1200px] mx-auto px-4 sm:px-6 h-full flex items-center justify-between gap-8"
              variants={navContainer}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
            >
              {/* Logo */}
              <motion.div variants={navItem} className="flex-shrink-0">
                <Link to="/" className="flex items-center gap-2" style={{ pointerEvents: 'auto' }}>
                  <img
                    src={logoImg}
                    alt="Tablanova"
                    style={{ height: 40, width: 'auto', filter: 'brightness(0) invert(1)' }}
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                      const sib = (e.currentTarget as HTMLImageElement).nextElementSibling as HTMLElement | null;
                      if (sib) sib.style.removeProperty('display');
                    }}
                  />
                  <span style={{ display: 'none', color: '#fff', fontSize: '1.15rem', fontWeight: 600, letterSpacing: '-0.02em' }}>
                    Tablanova
                  </span>
                </Link>
              </motion.div>

              {/* Nav centrado */}
              <motion.nav variants={navItem} className="hidden md:flex items-center gap-0.5 flex-1 justify-center">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="px-4 py-2 text-sm transition-colors duration-200 rounded-full"
                    style={{
                      color: navTextColor(isActive(item.href)),
                      fontWeight: isActive(item.href) ? 500 : 400,
                      backgroundColor: navActiveBg(isActive(item.href)),
                    }}
                    onMouseEnter={(e) => { if (!isActive(item.href)) (e.currentTarget as HTMLElement).style.color = isLightBg ? '#111827' : '#fff'; }}
                    onMouseLeave={(e) => { if (!isActive(item.href)) (e.currentTarget as HTMLElement).style.color = navTextColor(false); }}
                  >
                    {item.name}
                  </Link>
                ))}
              </motion.nav>

              {/* CTA + hamburger mobile */}
              <motion.div variants={navItem} className="flex items-center gap-3 flex-shrink-0">
                <Link
                  to="/contacto"
                  className="hidden md:inline-flex items-center gap-2.5 text-sm font-medium rounded-full"
                  style={{ backgroundColor: '#5E0F29', color: '#fff', padding: '8px 8px 8px 18px', pointerEvents: 'auto' }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                >
                  Contacto
                  <span className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 28, height: 28, backgroundColor: '#DB8F33' }}>
                    <ArrowRight size={14} color="#fff" />
                  </span>
                </Link>

                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden flex items-center justify-center p-2 rounded-full"
                  style={{ color: iconColor, pointerEvents: 'auto' }}
                  aria-label="Menú"
                >
                  {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dropdown mobile (solo cuando NO scrolleado) */}
        <AnimatePresence>
          {isMenuOpen && !isScrolled && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden overflow-hidden"
              style={{ backgroundColor: '#5E0F29', borderTop: '1px solid rgba(255,255,255,0.12)' }}
            >
              <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-4 flex flex-col gap-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="px-4 py-3 text-sm rounded-xl transition-colors duration-150"
                    style={{
                      color: isActive(item.href) ? '#fff' : 'rgba(255,255,255,0.65)',
                      backgroundColor: isActive(item.href) ? 'rgba(255,255,255,0.12)' : 'transparent',
                      fontWeight: isActive(item.href) ? 500 : 400,
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  to="/contacto"
                  onClick={() => setIsMenuOpen(false)}
                  className="mt-2 inline-flex items-center justify-between px-5 py-3 text-sm font-medium rounded-full"
                  style={{ backgroundColor: '#DB8F33', color: '#fff' }}
                >
                  Contacto
                  <span className="flex items-center justify-center rounded-full" style={{ width: 28, height: 28, backgroundColor: 'rgba(255,255,255,0.2)' }}>
                    <ArrowRight size={14} color="#fff" />
                  </span>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Floating pill — visible cuando hay scroll ─────────────────── */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            ref={dropdownRef}
            className="fixed z-50"
            style={{ top: 16, right: 24 }}
            initial={{ opacity: 0, y: -12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.9 }}
            transition={{ type: 'spring', damping: 22, stiffness: 200 }}
          >
            {/* Pill */}
            <div
              style={{
                backgroundColor: 'rgba(94,15,41,0.97)',
                backdropFilter: 'blur(16px)',
                borderRadius: 999,
                padding: '8px 8px 8px 18px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
              }}
            >
              <Link to="/" style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src={logoImg}
                  alt="Tablanova"
                  style={{ height: 26, width: 'auto', filter: 'brightness(0) invert(1)' }}
                />
              </Link>

              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                  width: 36, height: 36,
                  borderRadius: '50%',
                  backgroundColor: isMenuOpen ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.1)',
                  border: 'none',
                  color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'background-color 150ms',
                }}
                aria-label="Menú"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMenuOpen
                    ? <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}><X size={18} /></motion.span>
                    : <motion.span key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}><Menu size={18} /></motion.span>
                  }
                </AnimatePresence>
              </button>
            </div>

            {/* Dropdown del pill */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ type: 'spring', damping: 22, stiffness: 220 }}
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 10px)',
                    right: 0,
                    minWidth: 220,
                    backgroundColor: 'rgba(94,15,41,0.97)',
                    backdropFilter: 'blur(16px)',
                    borderRadius: 16,
                    padding: '8px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.28)',
                    border: '1px solid rgba(255,255,255,0.1)',
                  }}
                >
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="block px-4 py-2.5 text-sm rounded-xl transition-colors duration-150"
                      style={{
                        color: isActive(item.href) ? '#fff' : 'rgba(255,255,255,0.65)',
                        backgroundColor: isActive(item.href) ? 'rgba(255,255,255,0.12)' : 'transparent',
                        fontWeight: isActive(item.href) ? 500 : 400,
                      }}
                      onMouseEnter={(e) => { if (!isActive(item.href)) (e.currentTarget as HTMLElement).style.backgroundColor = 'rgba(255,255,255,0.07)'; }}
                      onMouseLeave={(e) => { if (!isActive(item.href)) (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent'; }}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '6px 0' }} />
                  <Link
                    to="/contacto"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-between px-4 py-2.5 text-sm font-medium rounded-xl"
                    style={{ backgroundColor: '#DB8F33', color: '#fff' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                  >
                    Contacto
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
