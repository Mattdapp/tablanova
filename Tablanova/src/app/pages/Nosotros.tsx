import { Helmet } from 'react-helmet-async';
import { Recycle, Clock, Wrench, Target, ArrowRight } from 'lucide-react';
import { motion, useInView } from 'motion/react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import imgNosotrosHero from '../../assets/nosotros-hero.webp';

const SPRING_HERO = { type: 'spring' as const, stiffness: 80, damping: 20 };
const heroContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } } };
const heroFade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: SPRING_HERO } };
const heroMask = { hidden: { y: '115%' }, visible: { y: 0, transition: SPRING_HERO } };

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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(value);
      return;
    }
    const duration = 1400;
    const t0 = Date.now();
    let rafId = 0;
    const tick = () => {
      const p = Math.min((Date.now() - t0) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(eased * target) + suffix);
      if (p < 1) rafId = requestAnimationFrame(tick);
      else setDisplay(value);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [inView]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-semibold text-white mb-2" style={{ letterSpacing: '-0.03em' }}>
        {display}
      </div>
      <div className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
        {label}
      </div>
    </div>
  );
}

export const Nosotros = () => {
  const values = [
    {
      icon: Recycle,
      title: 'Sustentabilidad real',
      description: 'No es marketing: transformamos residuos en nuevas oportunidades. Cada producto está fabricado con plástico post-consumo, reduciendo residuos y la tala de árboles.',
    },
    {
      icon: Clock,
      title: 'Durabilidad probada',
      description: 'Diseñamos para décadas. No para temporadas. Nuestros materiales resisten el sol, la lluvia, los animales y el tiempo sin perder propiedades estructurales.',
    },
    {
      icon: Wrench,
      title: 'Cero mantenimiento',
      description: 'Sin pinturas, fungicidas ni reposiciones. La ventaja más concreta del plástico reciclado: se instala y se olvida, mientras la madera sigue pidiendo atención.',
    },
    {
      icon: Target,
      title: 'Costo-beneficio real',
      description: 'Puede ser más caro en la primera compra. Pero en 10 años, no repusiste, no repintaste, no contrataste mano de obra extra. La ecuación siempre favorece al plástico reciclado.',
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Reciclaje',
      description: 'Recolectamos plástico post-consumo e industrial que de otro modo terminaría en vertederos. Clasificamos y preparamos el material para el proceso productivo.',
    },
    {
      step: '02',
      title: 'Producción',
      description: 'Transformamos el plástico reciclado en perfiles sólidos mediante extrusión controlada. El resultado: material denso, resistente y homogéneo.',
    },
    {
      step: '03',
      title: 'Control de calidad',
      description: 'Cada lote se controla dimensionalmente y en densidad. Garantizamos uniformidad en todas las piezas para que la instalación sea siempre predecible.',
    },
  ];

  const features = [
    'Plástico 100% reciclado',
    'Sin mantenimiento',
    'Resistente a la intemperie',
    '10 años de garantía',
    'Instalación simple',
    'Empresa familiar argentina',
  ];

  return (
    <div className="overflow-x-hidden">
      <Helmet>
        <title>Nosotros — Fábrica en Esperanza, Santa Fe | Tablanova</title>
        <meta name="description" content="Tablanova fabrica materiales de plástico 100% reciclado para el agro en Esperanza, Santa Fe. Conocé nuestro proceso y compromiso." />
        <link rel="canonical" href="https://tablanova.com.ar/nosotros" />
        <meta property="og:title" content="Nosotros — Fábrica en Esperanza, Santa Fe | Tablanova" />
        <meta property="og:url" content="https://tablanova.com.ar/nosotros" />
      </Helmet>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="hero-full relative -mt-[72px] overflow-hidden flex flex-col justify-end"
        style={{ minHeight: 600 }}
      >
        <motion.img
          src={imgNosotrosHero}
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-center"
          initial={{ scale: 1.07, opacity: 0.7 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, rgba(10,4,6,0.92) 0%, rgba(10,4,6,0.55) 45%, rgba(10,4,6,0.2) 100%)' }}
        />

        <motion.div
          className="relative max-w-[1200px] mx-auto px-4 sm:px-6 w-full pb-10 md:pb-16"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-10">

            <div style={{ maxWidth: 620 }}>
              <div className="overflow-hidden mb-4" style={{ paddingBottom: '0.15em' }}>
                <motion.h1
                  variants={heroMask}
                  className="text-white"
                  style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.06 }}
                >
                  Fabricamos lo que<br />la madera no puede ser.
                </motion.h1>
              </div>
              <motion.p variants={heroFade} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: 500 }}>
                Tablanova nace en Esperanza, Santa Fe, con un objetivo concreto: reemplazar la madera en el campo con un material que dure de verdad.
              </motion.p>
            </div>

            <motion.div variants={heroFade} className="flex flex-row md:flex-col gap-4 md:gap-3 flex-shrink-0 pb-1">
              {[
                { label: 'Empresa', value: 'FAMILIAR ARGENTINA' },
                { label: 'Origen', value: 'ESPERANZA, SANTA FE' },
                { label: 'Material', value: 'PLÁSTICO RECICLADO' },
              ].map((m) => (
                <div key={m.label}>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
                    {m.label}
                  </p>
                  <p style={{ color: '#fff', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em' }}>
                    {m.value}
                  </p>
                </div>
              ))}
            </motion.div>

          </div>
        </motion.div>
      </section>

      {/* ─── STORY ────────────────────────────────────────────────────────── */}
      <section className="py-[60px] md:py-[120px]" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">

            {/* Text */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={SPRING_HERO}
            >
              <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#5E0F29', marginBottom: 10 }}>
                El origen del proyecto
              </p>

              <h2 style={{ color: '#111827', letterSpacing: '-0.02em', fontWeight: 600, marginBottom: 24 }}>
                El campo nos enseñó el problema. Nosotros fabricamos la solución.
              </h2>

              <div className="space-y-4 leading-relaxed" style={{ color: '#4B5563', fontSize: '1rem', marginBottom: 32 }}>
                <p>
                  Trabajando con el sector agropecuario entendimos un problema que se repite en cada establecimiento: la madera promete pero no cumple. Se pudre, se astilla, necesita pintura cada dos años, fungicidas, reposición constante. Un gasto permanente que nadie calcula del todo.
                </p>
                <p>
                  Tablanova surge para resolver exactamente eso. Fabricamos postes, varillas, tablas y tranqueras con plástico 100% reciclado que no absorbe humedad, no lo atacan los insectos y no necesita ningún mantenimiento. Se instala igual que la madera, pero dura décadas.
                </p>
                <p>
                  Somos una empresa familiar radicada en Esperanza, Santa Fe. Fabricamos en Argentina, con material argentino, para el campo argentino, y enviamos a todo el país. Apostamos a la economía circular y a concientizar al sector industrial y ganadero sobre el valor de reutilizar y reducir el impacto ambiental.
                </p>
              </div>

              {/* Features list — dot bullets + borderBottom dividers */}
              <div>
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ ...SPRING_HERO, delay: index * 0.08 }}
                    className="flex items-center gap-3"
                    style={{
                      borderBottom: index < features.length - 1 ? '1px solid #E8DCC8' : 'none',
                      padding: '12px 0',
                    }}
                  >
                    <div style={{ width: 7, height: 7, borderRadius: '50%', backgroundColor: '#5E0F29', flexShrink: 0 }} />
                    <span style={{ color: '#111827', fontSize: '0.9375rem' }}>{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ ...SPRING_HERO, delay: 0.1 }}
            >
              <div style={{ borderRadius: 20, overflow: 'hidden', height: 'clamp(280px, 50vw, 500px)' }}>
                <img
                  src={imgNosotrosHero}
                  alt="Tablanova - instalación en campo"
                  loading="lazy"
                  className="w-full"
                  style={{ height: '100%', objectFit: 'cover' }}
                />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ─── NUMBERS ──────────────────────────────────────────────────────── */}
      <section className="py-[60px] md:py-[80px]" style={{ backgroundColor: '#5E0F29' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
            {[
              { value: '100%', label: 'Plástico reciclado' },
              { value: '20+', label: 'Años de vida útil estimada' },
              { value: '10', label: 'Años de garantía' },
              { value: '0', label: 'Mantenimiento requerido' },
            ].map(({ value, label }, i) => (
              <AnimatedStat key={i} value={value} label={label} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── VALUES ───────────────────────────────────────────────────────── */}
      <section className="py-[60px] md:py-[120px]" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={SPRING_HERO}
            style={{ borderTop: '1px solid #D1C4A8', paddingTop: 'clamp(32px,5vw,48px)', marginBottom: 'clamp(32px,5vw,56px)' }}
          >
            <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7280', marginBottom: 10 }}>
              Lo que nos define
            </p>
            <h2 style={{ color: '#111827', letterSpacing: '-0.02em', fontWeight: 600 }}>
              Nuestros valores
            </h2>
          </motion.div>

          {/* Values grid — 2 columns, each row as flex row with icon + text */}
          <div className="grid md:grid-cols-2 gap-x-10 md:gap-x-16">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ ...SPRING_HERO, delay: index * 0.08 }}
                  className="flex gap-4"
                  style={{ borderBottom: '1px solid #D1C4A8', padding: '28px 0' }}
                >
                  {/* Icon badge */}
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 12,
                      backgroundColor: 'rgba(94,15,41,0.07)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={18} style={{ color: '#5E0F29' }} />
                  </div>
                  {/* Text */}
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#111827', marginBottom: 6 }}>
                      {value.title}
                    </h3>
                    <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: '#4B5563' }}>
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ─── PROCESS ──────────────────────────────────────────────────────── */}
      <section className="py-[60px] md:py-[120px]" style={{ backgroundColor: '#E8DCC8', scrollMarginTop: 80 }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={SPRING_HERO}
            style={{ borderTop: '1px solid #D1C4A8', paddingTop: 'clamp(32px,5vw,48px)', marginBottom: 'clamp(32px,5vw,56px)' }}
          >
            <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7280', marginBottom: 10 }}>
              Nuestro proceso
            </p>
            <h2 style={{ color: '#111827', letterSpacing: '-0.02em', fontWeight: 600 }}>
              De residuo a solución de campo
            </h2>
          </motion.div>

          {/* Steps list */}
          <div>
            {process.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ ...SPRING_HERO, delay: index * 0.08 }}
                className="flex gap-5 md:gap-8"
                style={{ borderBottom: '1px solid #D1C4A8', padding: '28px 0' }}
              >
                {/* Step number */}
                <div style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#D1C4A8', letterSpacing: '-0.03em', width: 52, flexShrink: 0, lineHeight: 1 }}>
                  {item.step}
                </div>
                {/* Content */}
                <div style={{ paddingTop: 4 }}>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#111827', marginBottom: 8 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.9375rem', lineHeight: 1.65, color: '#4B5563' }}>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <section className="pt-[60px] pb-[40px] md:py-[120px]" style={{ backgroundColor: '#5E0F29' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={SPRING_HERO}
            style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}
          >
            <h2
              className="text-white"
              style={{ letterSpacing: '-0.02em', fontWeight: 600, marginBottom: 20 }}
            >
              Menos mantenimiento.<br />Más tiempo para el campo.
            </h2>

            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', lineHeight: 1.65, marginBottom: 40 }}>
              Una inversión que se paga sola. Sin reponer, sin repintar, sin mano de obra extra. Solo el material haciendo su trabajo.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {/* Primary — mustard pill with ArrowRight circle */}
              <Link
                to="/catalogo"
                className="inline-flex items-center justify-center gap-3 font-medium text-sm"
                style={{
                  backgroundColor: '#DB8F33',
                  color: '#fff',
                  borderRadius: 9999,
                  padding: '12px 12px 12px 24px',
                  textDecoration: 'none',
                }}
              >
                Ver catálogo completo
                <span style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ArrowRight size={14} />
                </span>
              </Link>

              {/* Secondary ghost pill */}
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center font-medium text-sm"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  border: '1px solid rgba(255,255,255,0.2)',
                  borderRadius: 9999,
                  padding: '12px 24px',
                  textDecoration: 'none',
                }}
              >
                Contactanos
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};
