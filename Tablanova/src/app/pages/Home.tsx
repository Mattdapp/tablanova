import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ChevronDown, CheckCircle, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import imgPostes from '../../assets/postes.jpg';
import imgVarillas from '../../assets/varillas.jpg';
import imgTablas from '../../assets/tablas.jpg';
import imgTranqueras from '../../assets/tranqueras.jpg';
import imgCercos from '../../assets/cercos.jpg';
import imgCorrales from '../../assets/corrales.jpg';
import imgMunicipios from '../../assets/municipios.jpg';
import imgObrasMedida from '../../assets/obras-medida.jpg';
import imgAgroBg from '../../assets/agro-bg.jpg';
import imgCtaBg from '../../assets/cta-bg.jpg';

// ─── Reusable design tokens ───────────────────────────────────────────────────
const EASE = [0.16, 1, 0.3, 1] as const;

// ─── Hero stagger animation variants ─────────────────────────────────────────
const heroContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const heroItem = {
  hidden: { y: '120%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, mass: 1, stiffness: 80, damping: 20 },
  },
};

const heroItemFade = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: 'spring' as const, mass: 1, stiffness: 80, damping: 20 },
  },
};

// ─── Scroll reveal variants ───────────────────────────────────────────────────
const VIEWPORT = { once: true, margin: '-100px' } as const;

const reveal = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, mass: 1, stiffness: 80, damping: 20 },
  },
};

const revealStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const revealMask = {
  hidden: { y: '110%' },
  visible: {
    y: 0,
    transition: { type: 'spring' as const, mass: 1, stiffness: 80, damping: 20 },
  },
};

function PillTag({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-medium uppercase rounded-full px-3 py-1"
      style={{
        backgroundColor: dark ? 'rgba(219,143,51,0.2)' : '#DB8F33',
        color: dark ? '#DB8F33' : '#fff',
        letterSpacing: '0.07em',
      }}
    >
      {children}
    </span>
  );
}

function PillCTA({
  children,
  to,
  onClick,
  dark = false,
  primary = false,
}: {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  dark?: boolean;
  primary?: boolean;
}) {
  const style: React.CSSProperties = {
    backgroundColor: primary ? '#5E0F29' : dark ? 'rgba(255,255,255,0.1)' : '#fff',
    color: primary || dark ? '#fff' : '#111827',
    border: dark && !primary ? '1px solid rgba(255,255,255,0.25)' : 'none',
    borderRadius: '9999px',
    padding: '10px 10px 10px 22px',
    fontWeight: 500,
    fontSize: '0.9rem',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '12px',
    transition: 'opacity 150ms',
    cursor: 'pointer',
  };
  const circle = (
    <span
      className="flex items-center justify-center rounded-full flex-shrink-0"
      style={{ width: 36, height: 36, backgroundColor: '#DB8F33' }}
    >
      <ArrowRight size={16} color="#fff" />
    </span>
  );

  if (to) {
    return (
      <Link to={to} style={style} onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')} onMouseLeave={e => (e.currentTarget.style.opacity = '1')}>
        {children}
        {circle}
      </Link>
    );
  }
  return (
    <button
      onClick={onClick}
      style={style}
      onMouseEnter={e => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
      onMouseLeave={e => ((e.currentTarget as HTMLElement).style.opacity = '1')}
    >
      {children}
      {circle}
    </button>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const agroProducts = [
  {
    image: imgPostes,
    title: 'Postes',
    description: 'Postes que no se pudren ni se rajan. Para alambrados, cercos rurales, divisiones y corrales.',
  },
  {
    image: imgVarillas,
    title: 'Varillas y Varillones',
    description: 'Resistentes, livianas y prácticas para cercos eléctricos y estructuras rurales.',
  },
  {
    image: imgTablas,
    title: 'Tablas y Tirantillos',
    description: 'Para corrales, mangas, feedlots, tinglados y estructuras exteriores exigentes.',
  },
  {
    image: imgTranqueras,
    title: 'Tranqueras',
    description: 'Alta resistencia a la intemperie y vida útil superior a las alternativas de madera.',
  },
];

const clientTypes = [
  'Productores agropecuarios',
  'Feedlots y tambos',
  'Establecimientos ganaderos',
  'Contratistas rurales',
  'Empresas de servicios rurales',
  'Municipios y espacios públicos',
  'Obras exteriores',
  'Proyectos a medida',
];

const comparison = [
  { feature: 'Vida útil', wood: 'Vida útil limitada', tablanova: 'Vida útil prolongada' },
  { feature: 'Mantenimiento', wood: 'Requiere pintura y tratamiento', tablanova: 'Sin pintura ni mantenimiento' },
  { feature: 'Resistencia a la humedad', wood: 'Puede pudrirse con humedad', tablanova: 'No se pudre' },
  { feature: 'Resistencia mecánica', wood: 'Puede rajarse o deformarse', tablanova: 'No se raja fácilmente' },
  { feature: 'Resistencia a insectos', wood: 'Es vulnerable a insectos', tablanova: 'No lo atacan insectos' },
  { feature: 'Reposición', wood: 'Necesita reposición periódica', tablanova: 'Reduce reposiciones' },
  { feature: 'Impacto ambiental', wood: 'Depende de la tala de árboles', tablanova: 'Fabricado con plástico reciclado' },
];

const projects = [
  {
    image: imgCercos,
    title: 'Cercos para establecimientos rurales',
    description: 'Postes y varillas para divisiones productivas, alambrados perimetrales y zonas de trabajo.',
    location: 'Campo',
  },
  {
    image: imgCorrales,
    title: 'Corrales y feedlots',
    description: 'Tablas y tirantillos preparados para contacto animal, humedad y exigencia diaria.',
    location: 'Ganadería',
  },
  {
    image: imgObrasMedida,
    title: 'Obras a medida',
    description: 'Soluciones desarrolladas según necesidad, cantidad, medidas y destino de uso.',
    location: 'Proyectos especiales',
  },
  {
    image: imgMunicipios,
    title: 'Municipios y espacios públicos',
    description: 'Mobiliario exterior resistente, sin pintura y con larga vida útil para plazas y parques.',
    location: 'Espacio público',
  },
];

const faqs = [
  {
    question: '¿Es más caro que la madera?',
    answer:
      'La comparación correcta no es solo el precio inicial. La madera suele requerir mantenimiento, tratamientos y reposiciones. Tablanova busca reducir esos costos durante los años de uso.',
  },
  {
    question: '¿Se puede usar en cercos rurales?',
    answer: 'Sí. Es una de sus principales aplicaciones. Se utiliza en postes, varillas y cerramientos para campo.',
  },
  {
    question: '¿Resiste humedad y barro?',
    answer: 'Sí. Al ser plástico reciclado, no absorbe humedad como la madera y no se pudre.',
  },
  {
    question: '¿Lo atacan los insectos?',
    answer: 'No. No es vulnerable a termitas ni plagas que afectan la madera.',
  },
  {
    question: '¿Necesita pintura o mantenimiento?',
    answer: 'No requiere pintura, barniz ni tratamientos periódicos.',
  },
  {
    question: '¿Hacen envíos?',
    answer:
      'Sí. Fabricamos en Esperanza, Santa Fe, y enviamos a diferentes puntos del país según el proyecto.',
  },
  {
    question: '¿Puedo pedir una cotización por cantidad?',
    answer:
      'Sí. Lo ideal es que nos indiques tipo de producto, cantidad aproximada, ubicación y uso previsto para calcular la mejor opción.',
  },
];

const testimonials = [
  {
    context: 'Cercos rurales',
    quote: 'Antes teníamos que estar revisando postes todos los años. Con Tablanova resolvimos el cerco y nos olvidamos del mantenimiento.',
    name: 'Carlos R.',
    role: 'Productor ganadero',
    location: 'Santa Fe',
    initials: 'CR',
  },
  {
    context: 'Feedlot / corrales',
    quote: 'En los corrales necesitábamos un material que aguante barro, humedad y contacto constante con animales. Las tablas respondieron muy bien desde el primer día.',
    name: 'Martín G.',
    role: 'Encargado de feedlot',
    location: 'Córdoba',
    initials: 'MG',
  },
  {
    context: 'Proyecto a medida',
    quote: 'Les contamos qué necesitábamos construir y nos ayudaron a definir medidas, cantidades y materiales. No fue solo comprar tablas: fue resolver una obra.',
    name: 'Andrea M.',
    role: 'Administración rural',
    location: 'Buenos Aires',
    initials: 'AM',
  },
  {
    context: 'Reemplazo de madera',
    quote: 'La madera nos salía barata al principio, pero después venían los arreglos, pintura y reposiciones. Con plástico reciclado hicimos una inversión más inteligente.',
    name: 'Jorge P.',
    role: 'Productor agropecuario',
    location: 'Entre Ríos',
    initials: 'JP',
  },
];

const agroConditions = [
  'Humedad permanente',
  'Barro',
  'Sol intenso',
  'Heladas',
  'Contacto animal',
  'Zonas costeras o rurales',
  'Uso continuo',
  'Bajo mantenimiento disponible',
];

// ─── AnimatedStat ─────────────────────────────────────────────────────────────
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const numMatch = value.match(/^(\d+)(.*)/);
  const [display, setDisplay] = useState(numMatch ? '0' + numMatch[2] : value);

  useEffect(() => {
    if (!inView || !numMatch) return;
    const target = parseInt(numMatch[1]);
    const suffix = numMatch[2];
    if (target === 0) { setDisplay('0' + suffix); return; }
    // Guard: skip rAF animation when user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }
    const duration = 1400;
    const t0 = Date.now();
    const tick = () => {
      const p = Math.min((Date.now() - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(eased * target) + suffix);
      if (p < 1) requestAnimationFrame(tick);
      else setDisplay(value);
    };
    requestAnimationFrame(tick);
  }, [inView]);

  return (
    <motion.div ref={ref} variants={reveal} className="text-center">
      <p className="text-white font-semibold" style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', letterSpacing: '-0.03em', lineHeight: 1 }}>
        {display}
      </p>
      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', marginTop: 8 }}>{label}</p>
    </motion.div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────
export const Home = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [marqueeHovered, setMarqueeHovered] = useState(false);
  const [projectIdx, setProjectIdx] = useState(1);
  const getCardW = () => Math.min(900, window.innerWidth * 0.8);
  const [slideOffset, setSlideOffset] = useState(() => getCardW() + 20);
  const [centerOffset, setCenterOffset] = useState(() => (window.innerWidth - getCardW()) / 2);

  useEffect(() => {
    const update = () => {
      const w = getCardW();
      setSlideOffset(w + 20);
      setCenterOffset((window.innerWidth - w) / 2);
    };
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handleWhatsApp = () => {
    const phone = '5493425683285';
    const msg = encodeURIComponent('Hola, quiero cotizar productos Tablanova para el campo');
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="overflow-x-hidden">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative flex items-center -mt-[72px] overflow-hidden"
        style={{ height: 'calc(100dvh + 72px)', minHeight: 'calc(580px + 72px)' }}
      >
        <div className="absolute inset-0">
          <img
            src="/hero.jpg"
            alt=""
            className="w-full h-full object-cover object-center"
            width={2400}
            height={1350}
            fetchPriority="high"
          />
          <div className="absolute inset-0 hidden md:block" style={{ background: 'linear-gradient(105deg, rgba(20,6,10,0.92) 45%, rgba(20,6,10,0.6) 100%)' }} />
          <div className="absolute inset-0 md:hidden" style={{ background: 'linear-gradient(to bottom, rgba(10,4,6,0.35) 0%, rgba(10,4,6,0.72) 40%, rgba(10,4,6,0.88) 70%, rgba(10,4,6,0.92) 100%)' }} />
        </div>

        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6 w-full" style={{ paddingTop: '72px', paddingBottom: '40px' }}>
          <div className="grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-end">

            {/* Texto — columna izquierda */}
            <motion.div variants={heroContainer} initial="hidden" animate="visible">
              <motion.div variants={heroItemFade} className="mb-6">
                <PillTag dark>Plástico reciclado · Sector agropecuario</PillTag>
              </motion.div>

              <div className="overflow-hidden mb-6" style={{ paddingBottom: '0.2em' }}>
                <motion.h1
                  variants={heroItem}
                  className="text-white"
                  style={{ maxWidth: 660, fontSize: 'clamp(2.5rem, 5.5vw, 4.2rem)', lineHeight: 1.05, letterSpacing: '-0.03em', fontWeight: 600 }}
                >
                  Para el campo.<br />Para toda la vida.
                </motion.h1>
              </div>

              <div className="sm:hidden overflow-hidden" style={{ marginBottom: '1.5rem' }}>
                <motion.p
                  variants={heroItem}
                  style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 520, fontSize: '1rem', lineHeight: 1.65 }}
                >
                  Postes, varillas, tablas y tranqueras de plástico 100% reciclado para el campo.
                </motion.p>
              </div>

              <div className="hidden sm:block overflow-hidden" style={{ marginBottom: '1.5rem' }}>
                <motion.p
                  variants={heroItem}
                  style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 520, fontSize: '1.1rem', lineHeight: 1.65 }}
                >
                  Postes, varillas, tablas, tirantillos y tranqueras fabricados con plástico 100% reciclado. Resistentes al sol, la lluvia, el barro, la humedad y el trabajo diario del sector agropecuario.
                </motion.p>
              </div>

              <div className="overflow-hidden" style={{ marginBottom: '1.75rem' }}>
                <motion.p
                  variants={heroItem}
                  style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', letterSpacing: '0.04em' }}
                >
                  Sin pudrición. Sin insectos. Sin mantenimiento.
                </motion.p>
              </div>

              <motion.div variants={heroItemFade} className="flex flex-row flex-wrap gap-3">
                <PillCTA to="/productos">Ver productos</PillCTA>
                <PillCTA primary onClick={handleWhatsApp}>Cotizar mi proyecto</PillCTA>
              </motion.div>
            </motion.div>

            {/* Testimonial — columna derecha, alineado al fondo */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.5 }}
              className="hidden lg:block"
            >
              <div
                style={{
                  background: 'rgba(255,255,255,0.07)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '20px',
                  padding: '24px',
                }}
              >
                <div className="flex gap-0.5 mb-3" aria-hidden="true">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#DB8F33" color="#DB8F33" />
                  ))}
                </div>
                <p className="text-white mb-4" style={{ fontSize: '0.875rem', lineHeight: 1.7 }}>
                  "Cambiamos la madera porque cada pocos años había que reparar, pintar o reemplazar. Con Tablanova instalamos una vez y nos olvidamos."
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0"
                    style={{ backgroundColor: '#5E0F29' }}
                  >
                    PA
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">Productor agropecuario</p>
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem' }}>Santa Fe · Córdoba</p>
                  </div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>

        <motion.div
          className="absolute left-0 right-0"
          style={{ bottom: 40 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
            <div className="grid grid-cols-2 gap-x-6 gap-y-2 pr-[88px] sm:pr-0 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8 sm:gap-y-2">
              {[
                { value: '100%', label: 'Plástico reciclado' },
                { value: '20+', label: 'Años de vida útil estimada' },
                { value: '0', label: 'Mantenimiento requerido' },
                { value: '+75.000 kg', label: 'de plástico reciclado' },
              ].map((s) => (
                <div key={s.value} className="sm:flex sm:items-baseline sm:gap-1.5">
                  <span className="block sm:inline" style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '-0.01em' }}>{s.value}</span>
                  <span className="block sm:inline" style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', lineHeight: 1.4 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PRODUCTS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-[60px] md:py-[120px]" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

          <motion.div
            className="grid lg:grid-cols-2 gap-12 items-end mb-14"
            variants={revealStagger}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <motion.div variants={reveal}>
              <div className="mb-5"><PillTag>Productos Tablanova</PillTag></div>
              <h2 style={{ color: '#111827', letterSpacing: '-0.02em' }}>
                Materiales para producir, cerrar,{' '}
                <span style={{ color: '#5E0F29' }}>proteger y construir en el campo</span>
              </h2>
            </motion.div>

            <motion.div variants={reveal} className="flex flex-col gap-5">
              <p style={{ color: '#6B7280', lineHeight: 1.65 }}>
                Desarrollamos piezas de plástico reciclado para reemplazar la madera tradicional en aplicaciones rurales, ganaderas, agrícolas y de infraestructura exterior.
              </p>
              <div>
                <PillCTA to="/catalogo">Ver catálogo</PillCTA>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4"
            variants={revealStagger}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {agroProducts.map((product, i) => {
              const isFeatured = i === 0;
              const isLast = i === agroProducts.length - 1;
              return (
                <motion.div
                  key={i}
                  variants={reveal}
                  className={`group relative overflow-hidden ${
                    isFeatured
                      ? 'col-span-2 md:col-span-3 aspect-[4/3] md:aspect-[16/7]'
                      : isLast
                      ? 'aspect-[3/4] md:col-span-1'
                      : 'aspect-[3/4]'
                  }`}
                  style={{ borderRadius: 12 }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)' }}
                  />
                  <div className={`absolute bottom-0 left-0 right-0 ${isFeatured ? 'p-5 md:p-8' : 'p-3 md:p-5'}`}>
                    <h3
                      className="text-white font-semibold mb-1"
                      style={{
                        fontSize: isFeatured ? 'clamp(1.1rem, 2.5vw, 1.75rem)' : 'clamp(0.85rem, 1.8vw, 1.1rem)',
                        letterSpacing: '-0.01em',
                      }}
                    >
                      {product.title}
                    </h3>
                    <p
                      className={isFeatured ? 'block' : 'hidden md:block'}
                      style={{ color: 'rgba(255,255,255,0.7)', fontSize: isFeatured ? 'clamp(0.82rem, 1.5vw, 0.95rem)' : '0.82rem', lineHeight: 1.55, maxWidth: isFeatured ? 560 : undefined }}
                    >
                      {product.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          CLIENTS — text ticker
      ════════════════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden py-[60px] md:py-[120px]" style={{ backgroundColor: '#5E0F29' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="text-center mb-16"
          >
            <div className="mb-5 flex justify-center"><PillTag dark>Quiénes eligen Tablanova</PillTag></div>
            <h2 style={{ color: '#fff', letterSpacing: '-0.02em' }}>
              El campo ya conoce{' '}
              <span style={{ color: '#DB8F33' }}>el plástico que trabaja.</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: 520, margin: '16px auto 0', lineHeight: 1.65 }}>
              Desde establecimientos ganaderos hasta municipios. Tablanova se usa donde los materiales tienen que rendir.
            </p>
          </motion.div>
        </div>

        <style>{`
          @keyframes marquee-left{from{transform:translateX(0)}to{transform:translateX(-50%)}}
          @keyframes marquee-right{from{transform:translateX(-50%)}to{transform:translateX(0)}}
        `}</style>

        {/* Row 1 — left */}
        <div
          className="overflow-hidden mb-5"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
          }}
          onMouseEnter={() => setMarqueeHovered(true)}
          onMouseLeave={() => setMarqueeHovered(false)}
        >
          <div
            className="flex items-center"
            style={{
              width: 'fit-content',
              animation: 'marquee-left 30s linear infinite',
              animationPlayState: marqueeHovered ? 'paused' : 'running',
            }}
          >
            {[...clientTypes, ...clientTypes].map((item, i) => (
              <div key={i} className="flex items-center flex-shrink-0">
                <span
                  style={{
                    color: i % 3 === 1 ? '#DB8F33' : '#fff',
                    fontSize: 'clamp(1.5rem, 2.8vw, 2.2rem)',
                    fontWeight: i % 3 === 1 ? 600 : 400,
                    letterSpacing: '-0.02em',
                    padding: '0 36px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.18)', fontSize: '1.8rem', lineHeight: 1 }}>·</span>
              </div>
            ))}
          </div>
        </div>

        {/* Row 2 — right, slower, muted */}
        <div
          className="overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)',
          }}
          onMouseEnter={() => setMarqueeHovered(true)}
          onMouseLeave={() => setMarqueeHovered(false)}
        >
          <div
            className="flex items-center"
            style={{
              width: 'fit-content',
              animation: 'marquee-right 38s linear infinite',
              animationPlayState: marqueeHovered ? 'paused' : 'running',
            }}
          >
            {[...[...clientTypes].reverse(), ...[...clientTypes].reverse()].map((item, i) => (
              <div key={i} className="flex items-center flex-shrink-0">
                <span
                  style={{
                    color: i % 4 === 0 ? '#DB8F33' : 'rgba(255,255,255,0.7)',
                    fontSize: 'clamp(1.1rem, 2vw, 1.6rem)',
                    fontWeight: i % 4 === 0 ? 600 : 400,
                    letterSpacing: '-0.01em',
                    padding: '0 28px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.1)', fontSize: '1.3rem', lineHeight: 1 }}>·</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          COMPARISON
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-[60px] md:py-[120px]" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-[860px] mx-auto px-4 sm:px-6">
          <motion.div
            variants={revealStagger}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <motion.div variants={reveal} className="mb-10">
              <div className="mb-5"><PillTag>La diferencia</PillTag></div>
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <h2 style={{ color: '#111827', letterSpacing: '-0.02em' }}>
                  Por qué dejar{' '}
                  <span style={{ color: '#5E0F29' }}>la madera</span>
                </h2>
                <p style={{ color: '#6B7280', maxWidth: 320, lineHeight: 1.65, flexShrink: 0 }}>
                  Porque en el campo la madera no solo se compra: también se mantiene, se repara y se reemplaza.
                </p>
              </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              {/* LEFT — Madera */}
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT}
                transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                className="flex flex-col"
                style={{ backgroundColor: '#fff', borderRadius: 20, border: '1px solid #D1C4A8', padding: '28px 32px' }}
              >
                {/* Top row: icon + label */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center justify-center" style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#FEE2E2' }}>
                    <X size={18} style={{ color: '#DC2626' }} />
                  </div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#6B7280' }}>Material convencional</p>
                </div>

                {/* Title */}
                <p style={{ fontWeight: 700, fontSize: '1.5rem', color: '#111827', letterSpacing: '-0.02em', marginBottom: 20 }}>
                  Madera tradicional
                </p>

                {/* Items */}
                <motion.ul
                  className="flex flex-col gap-2.5 flex-1"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                >
                  {comparison.map((row, i) => (
                    <motion.li
                      key={i}
                      variants={{ hidden: { opacity: 0, x: -8 }, visible: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 20 } } }}
                      className="flex items-center gap-2.5"
                    >
                      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#DC2626', flexShrink: 0, opacity: 0.5 }} />
                      <p style={{ fontSize: '0.88rem', color: '#6B7280', lineHeight: 1.4 }}>{row.wood}</p>
                    </motion.li>
                  ))}
                </motion.ul>
              </motion.div>

              {/* RIGHT — Tablanova */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={VIEWPORT}
                transition={{ type: 'spring', stiffness: 80, damping: 20, delay: 0.12 }}
                className="flex flex-col"
                style={{ backgroundColor: '#5E0F29', borderRadius: 20, padding: '28px 32px' }}
              >
                {/* Top row: icon + label */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center justify-center" style={{ width: 40, height: 40, borderRadius: 12, backgroundColor: '#DB8F33' }}>
                    <CheckCircle size={18} style={{ color: '#fff' }} />
                  </div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(219,143,51,0.7)' }}>Plástico reciclado</p>
                </div>

                {/* Title */}
                <p style={{ fontWeight: 700, fontSize: '1.5rem', color: '#fff', letterSpacing: '-0.02em', marginBottom: 20 }}>
                  Tablanova
                </p>

                {/* Items */}
                <motion.ul
                  className="flex flex-col gap-2.5 flex-1"
                  variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06, delayChildren: 0.2 } } }}
                  initial="hidden"
                  whileInView="visible"
                  viewport={VIEWPORT}
                >
                  {comparison.map((row, i) => (
                    <motion.li
                      key={i}
                      variants={{ hidden: { opacity: 0, x: 8 }, visible: { opacity: 1, x: 0, transition: { type: 'spring' as const, stiffness: 100, damping: 20 } } }}
                      className="flex items-center gap-2.5"
                    >
                      <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: '#DB8F33', flexShrink: 0 }} />
                      <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.4 }}>{row.tablanova}</p>
                    </motion.li>
                  ))}
                </motion.ul>

              </motion.div>
            </div>

            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="mt-8"
            >
              <PillCTA onClick={handleWhatsApp}>Quiero comparar costos para mi campo</PillCTA>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PENSADO PARA EL AGRO
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-[60px] md:py-[120px]">
        <img
          src={imgAgroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(15,25,8,0.88) 40%, rgba(15,25,8,0.65) 100%)' }} />
        <div className="relative max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-end">

            <motion.div
              variants={revealStagger}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <motion.div variants={reveal} className="mb-5">
                <PillTag>Uso agropecuario</PillTag>
              </motion.div>
              <div className="overflow-hidden mb-6">
                <motion.h2
                  variants={revealMask}
                  style={{ color: '#fff', letterSpacing: '-0.02em' }}
                >
                  Pensado para{' '}
                  <span style={{ color: '#DB8F33' }}>el agro</span>
                </motion.h2>
              </div>
              <motion.p variants={reveal} style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '1rem' }}>
                No es madera plástica decorativa. Es material de trabajo.
              </motion.p>
              <motion.p variants={reveal} style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7, maxWidth: 480 }}>
                Tablanova está pensada para productores, contratistas, establecimientos agropecuarios, feedlots, tambos, municipios y empresas que necesitan materiales resistentes, durables y simples de instalar.
              </motion.p>
              <motion.div variants={reveal} className="mt-10">
                <PillCTA onClick={handleWhatsApp}>Consultar para mi establecimiento</PillCTA>
              </motion.div>
            </motion.div>

            <motion.div
              variants={revealStagger}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <motion.p variants={reveal} style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1.25rem' }}>
                Funciona especialmente bien donde la madera sufre
              </motion.p>
              <div className="flex flex-wrap gap-2.5">
                {agroConditions.map((condition, i) => (
                  <motion.span
                    key={i}
                    variants={reveal}
                    style={{
                      backgroundColor: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      borderRadius: '9999px',
                      padding: '8px 18px',
                      color: 'rgba(255,255,255,0.85)',
                      fontSize: '0.9rem',
                    }}
                  >
                    {condition}
                  </motion.span>
                ))}
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          PROJECTS CAROUSEL
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-[60px] md:py-[120px]" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center"
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <div className="mb-5 flex justify-center"><PillTag>Proyectos reales</PillTag></div>
            <h2 style={{ color: '#111827', letterSpacing: '-0.02em' }}>
              Proyectos donde la madera{' '}
              <span style={{ color: '#5E0F29' }}>ya quedó atrás</span>
            </h2>
            <p style={{ color: '#6B7280', maxWidth: 480, margin: '14px auto 0', lineHeight: 1.65 }}>
              Materiales Tablanova aplicados en campos, corrales, cercos, espacios verdes y obras exteriores.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="relative"
          style={{ marginTop: 32 }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ type: 'spring', mass: 1, stiffness: 80, damping: 20, delay: 0.15 }}
        >
          <div style={{ overflow: 'hidden' }}>
            <motion.div
              className="flex"
              style={{ gap: 20 }}
              animate={{ x: centerOffset - projectIdx * slideOffset }}
              transition={{ type: 'spring', mass: 1, stiffness: 80, damping: 22 }}
            >
            {projects.map((project, i) => (
              <motion.div
                key={i}
                onClick={() => i !== projectIdx && setProjectIdx(i)}
                role="button"
                tabIndex={i !== projectIdx ? 0 : -1}
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (i !== projectIdx) setProjectIdx(i); } }}
                aria-label={`Ver proyecto: ${project.title}`}
                style={{
                  width: 'min(900px, 80vw)',
                  flexShrink: 0,
                  cursor: i !== projectIdx ? 'pointer' : 'default',
                }}
                animate={{ scale: i === projectIdx ? 1 : 0.78 }}
                transition={{ type: 'spring', mass: 1, stiffness: 80, damping: 22 }}
              >
                <div
                  className="group relative overflow-hidden"
                  style={{ borderRadius: 20 }}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    className="w-full object-cover object-center block group-hover:scale-105"
                    style={{
                      height: 'clamp(300px, 48vh, 520px)',
                      filter: i !== projectIdx ? 'brightness(0.5)' : 'none',
                      transition: 'filter 0.4s ease, transform 500ms ease-in-out',
                    }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)' }}
                  />
                  <div className="absolute top-0 left-0 p-6">
                    <span style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.73rem', fontWeight: 500, letterSpacing: '0.09em', textTransform: 'uppercase' }}>
                      {project.location}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0" style={{ padding: '32px 36px' }}>
                    <h3 className="text-white" style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)', fontWeight: 600, letterSpacing: '-0.01em', marginBottom: 10 }}>
                      {project.title}
                    </h3>
                    <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '0.92rem', lineHeight: 1.65, maxWidth: 480 }}>
                      {project.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div style={{
          position: 'absolute',
          left: centerOffset + 24,
          top: 'calc(clamp(300px, 48vh, 520px) / 2)',
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}>
          <motion.button
            onClick={() => setProjectIdx(i => Math.max(0, i - 1))}
            disabled={projectIdx === 0}
            whileHover={projectIdx > 0 ? { scale: 1.1 } : {}}
            whileTap={projectIdx > 0 ? { scale: 0.93 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            aria-label="Anterior"
            style={{
              width: 44, height: 44,
              borderRadius: '50%',
              backgroundColor: '#fff',
              border: 'none',
              boxShadow: '0 2px 10px rgba(0,0,0,0.22)',
              color: '#111827',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: projectIdx === 0 ? 'default' : 'pointer',
              opacity: projectIdx === 0 ? 0.4 : 1,
            }}
          >
            <ChevronLeft size={18} />
          </motion.button>
        </div>
        <div style={{
          position: 'absolute',
          right: centerOffset + 24,
          top: 'calc(clamp(300px, 48vh, 520px) / 2)',
          transform: 'translateY(-50%)',
          zIndex: 10,
        }}>
          <motion.button
            onClick={() => setProjectIdx(i => Math.min(projects.length - 1, i + 1))}
            disabled={projectIdx === projects.length - 1}
            whileHover={projectIdx < projects.length - 1 ? { scale: 1.1 } : {}}
            whileTap={projectIdx < projects.length - 1 ? { scale: 0.93 } : {}}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            aria-label="Siguiente"
            style={{
              width: 44, height: 44,
              borderRadius: '50%',
              backgroundColor: '#DB8F33',
              border: 'none',
              boxShadow: '0 2px 10px rgba(0,0,0,0.22)',
              color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: projectIdx === projects.length - 1 ? 'default' : 'pointer',
              opacity: projectIdx === projects.length - 1 ? 0.4 : 1,
            }}
          >
            <ChevronRight size={18} />
          </motion.button>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-7 flex items-center gap-2">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setProjectIdx(i)}
              aria-label={`Proyecto ${i + 1}`}
              aria-current={i === projectIdx ? 'true' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 44,
                height: 44,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  display: 'block',
                  width: i === projectIdx ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor: i === projectIdx ? '#5E0F29' : '#CFC4A2',
                  transition: 'all 0.25s ease',
                }}
              />
            </button>
          ))}
        </div>
        </motion.div>

        <motion.div
          className="max-w-[1200px] mx-auto px-4 sm:px-6 mt-10"
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
        >
          <PillCTA primary onClick={handleWhatsApp}>Tengo un proyecto parecido</PillCTA>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          NUMBERS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="pt-[72px] pb-[48px] md:py-[80px]" style={{ backgroundColor: '#5E0F29' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
            variants={revealStagger}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {[
              { value: '100%', label: 'Plástico reciclado' },
              { value: '20+', label: 'Años de vida útil estimada' },
              { value: '0', label: 'Mantenimiento requerido' },
              { value: '+75.000', label: 'kg de plástico reciclado' },
            ].map((s, i) => (
              <AnimatedStat key={i} value={s.value} label={s.label} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SUSTENTABILIDAD
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-[60px] md:py-[120px]" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-16 items-center">

            <motion.div
              variants={revealStagger}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
            >
              <motion.div variants={reveal} className="mb-5">
                <PillTag>Sustentabilidad</PillTag>
              </motion.div>
              <div className="overflow-hidden mb-6">
                <motion.h2
                  variants={revealMask}
                  style={{ color: '#111827', letterSpacing: '-0.02em' }}
                >
                  Reciclado que vuelve al campo{' '}
                  <span style={{ color: '#5E0F29' }}>como solución</span>
                </motion.h2>
              </div>
              <motion.p variants={reveal} style={{ color: '#6B7280', lineHeight: 1.7, marginBottom: '1.25rem' }}>
                Impulsamos la economía circular: recuperamos plástico, lo transformamos y vuelve a la vida como productos duraderos y funcionales.
              </motion.p>
              <motion.p variants={reveal} style={{ color: '#6B7280', lineHeight: 1.7 }}>
                Más de 75.000 kg de plástico ya reciclados. Cada producto Tablanova reduce residuos y la presión sobre la madera: una alternativa sustentable, pero también inteligente desde lo económico y operativo.
              </motion.p>
            </motion.div>

            <motion.div
              variants={revealStagger}
              initial="hidden"
              whileInView="visible"
              viewport={VIEWPORT}
              className="flex flex-col"
            >
              {[
                {
                  title: 'Menos residuos plásticos',
                  body: 'Usamos plástico post-consumo que de otro modo terminaría en basureros o cursos de agua.',
                },
                {
                  title: 'Menos tala de árboles',
                  body: 'Cada metro de poste Tablanova es un árbol que no se corta para reemplazarlo en unos años.',
                },
                {
                  title: 'Rendimiento sin resignar nada',
                  body: 'Porque cuidar el ambiente no debería significar resignar resistencia, durabilidad ni practicidad.',
                },
              ].map((item, i, arr) => (
                <motion.div
                  key={i}
                  variants={reveal}
                  style={{
                    display: 'flex',
                    gap: 20,
                    padding: '28px 0',
                    borderBottom: i < arr.length - 1 ? '1px solid #D1C4A8' : 'none',
                    alignItems: 'flex-start',
                  }}
                >
                  <div style={{
                    width: 40, height: 40,
                    borderRadius: 10,
                    backgroundColor: 'rgba(94,15,41,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                    marginTop: 2,
                  }}>
                    <CheckCircle size={18} color="#5E0F29" />
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: '#111827', marginBottom: 6, letterSpacing: '-0.01em', fontSize: '1rem' }}>{item.title}</p>
                    <p style={{ color: '#6B7280', fontSize: '0.9rem', lineHeight: 1.65 }}>{item.body}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FAQ
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-[60px] md:py-[120px]" style={{ backgroundColor: '#E8DCC8' }}>
        <div className="max-w-[720px] mx-auto px-4 sm:px-6">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            className="mb-12"
          >
            <div className="mb-5"><PillTag>Preguntas frecuentes</PillTag></div>
            <h2 style={{ color: '#111827', letterSpacing: '-0.02em' }}>
              Lo que más nos preguntan{' '}
              <span style={{ color: '#5E0F29' }}>antes de elegir Tablanova</span>
            </h2>
          </motion.div>

          <motion.div
            variants={revealStagger}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                variants={reveal}
                style={{ borderBottom: '1px solid #CFC4A2' }}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left py-5 flex items-start justify-between gap-4"
                  aria-expanded={openFaq === i}
                  aria-controls={`faq-${i}`}
                >
                  <span style={{ color: '#111827', fontWeight: 500, lineHeight: 1.5 }}>{faq.question}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ flexShrink: 0, marginTop: 2 }}
                  >
                    <ChevronDown size={20} style={{ color: '#5E0F29' }} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      id={`faq-${i}`}
                      role="region"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22 }}
                      className="overflow-hidden"
                    >
                      <p style={{ color: '#6B7280', fontSize: '0.93rem', lineHeight: 1.7, paddingBottom: 20 }}>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          TESTIMONIALS
      ════════════════════════════════════════════════════════════════════ */}
      <section className="py-[60px] md:py-[120px]" style={{ backgroundColor: '#F5F0E8', overflow: 'hidden' }}>

        {/* Header centrado */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            className="text-center mb-12"
            variants={revealStagger}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <motion.div variants={reveal} className="mb-5 flex justify-center">
              <PillTag>Testimonios</PillTag>
            </motion.div>
            <motion.h2 variants={reveal} style={{ color: '#111827', letterSpacing: '-0.02em' }}>
              Lo que dicen quienes{' '}
              <span style={{ color: '#5E0F29' }}>ya eligieron Tablanova</span>
            </motion.h2>
            <motion.p
              variants={reveal}
              style={{ color: '#6B7280', maxWidth: 460, margin: '14px auto 0', lineHeight: 1.65 }}
            >
              Productores, ganaderos y administradores rurales que reemplazaron la madera y no volvieron atrás.
            </motion.p>
          </motion.div>
        </div>

        {/* Carousel horizontal */}
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <style>{`.testimonials-scroll::-webkit-scrollbar{display:none}`}</style>
          <motion.div
            className="testimonials-scroll flex gap-4 overflow-x-auto pb-2"
            style={{ scrollbarWidth: 'none', scrollSnapType: 'x mandatory' }}
            variants={revealStagger}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={reveal}
                style={{
                  flexShrink: 0,
                  width: 'min(300px, 82vw)',
                  scrollSnapAlign: 'start',
                  backgroundColor: '#fff',
                  borderRadius: 16,
                  border: '1px solid #D1C4A8',
                  padding: '28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: 20,
                }}
              >
                {/* Quote */}
                <p style={{ color: '#111827', fontSize: '0.925rem', lineHeight: 1.72 }}>
                  "{t.quote}"
                </p>

                {/* Author row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                      width: 36, height: 36,
                      borderRadius: '50%',
                      backgroundColor: '#5E0F29',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      flexShrink: 0,
                    }}>
                      {t.initials}
                    </div>
                    <div>
                      <p style={{ color: '#111827', fontWeight: 600, fontSize: '0.88rem', lineHeight: 1.2 }}>{t.name}</p>
                      <p style={{ color: '#6B7280', fontSize: '0.76rem', marginTop: 2 }}>{t.role} · {t.location}</p>
                    </div>
                  </div>
                  <svg width="24" height="19" viewBox="0 0 32 24" fill="none" style={{ flexShrink: 0 }} aria-hidden="true">
                    <path d="M0 24V14.4C0 10.4 1.067 7.067 3.2 4.4C5.333 1.733 8.267 0.133 12 0L13.6 3.2C10.667 3.733 8.4 4.8 6.8 6.4C5.2 8 4.4 9.867 4.4 12H8.8V24H0ZM18.4 24V14.4C18.4 10.4 19.467 7.067 21.6 4.4C23.733 1.733 26.667 0.133 30.4 0L32 3.2C29.067 3.733 26.8 4.8 25.2 6.4C23.6 8 22.8 9.867 22.8 12H27.2V24H18.4Z" fill="#DB8F33"/>
                  </svg>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Scroll hint dots — mobile only */}
          <div className="flex sm:hidden justify-center gap-2 mt-4" aria-hidden="true">
            {testimonials.map((_, i) => (
              <span
                key={i}
                style={{
                  display: 'inline-block',
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  backgroundColor: i === 0 ? '#5E0F29' : '#D1C4A8',
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          FINAL CTA
      ════════════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden py-[60px] md:py-[120px]">
        <img
          src={imgCtaBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(105deg, rgba(20,6,10,0.92) 45%, rgba(20,6,10,0.6) 100%)' }} />
        <div className="relative max-w-[800px] mx-auto px-4 sm:px-6 text-center">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
          >
            <h2 className="text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
              ¿Vas a renovar cercos, corrales, <span style={{ color: '#DB8F33' }}>o estructuras rurales?</span>
            </h2>
            <p className="text-white font-medium mb-4" style={{ fontSize: '1.1rem', opacity: 0.85 }}>
              Cotizá materiales Tablanova para tu proyecto.
            </p>
            <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 500, margin: '0 auto 40px', lineHeight: 1.65 }}>
              Decinos qué necesitás, dónde se instala y qué cantidad aproximada estás evaluando. Te respondemos con opciones, precios y envío.
            </p>
            <div className="flex justify-center">
              <PillCTA onClick={handleWhatsApp}>Cotizar por WhatsApp</PillCTA>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem', marginTop: '1.5rem' }}>
              Respuesta personalizada para productores, contratistas, municipios y empresas.
            </p>
          </motion.div>
        </div>
      </section>

    </div>
  );
};
