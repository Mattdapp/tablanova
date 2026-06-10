import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { MessageCircle, MapPin, Phone, Mail, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import imgContactoBg from '../../assets/contacto-hero.webp';

const SPRING = { type: 'spring' as const, stiffness: 80, damping: 20 };
const VIEWPORT = { once: true, margin: '-80px' } as const;

const heroContainer = { hidden: {}, visible: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } } };
const heroFade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: SPRING } };
const heroMask = { hidden: { y: '115%' }, visible: { y: 0, transition: SPRING } };

const faqs = [
  {
    question: '¿Realizan envíos a todo el país?',
    answer: 'Sí, realizamos envíos a todo Argentina. Consultanos por los costos según tu ubicación.',
  },
  {
    question: '¿Cuál es el tiempo de entrega?',
    answer: 'El tiempo de entrega varía según la zona. Generalmente entre 7 y 15 días hábiles.',
  },
  {
    question: '¿Ofrecen instalación?',
    answer: 'Brindamos asesoramiento técnico completo. La instalación es simple y podemos recomendar instaladores.',
  },
  {
    question: '¿Tienen showroom o planta de producción para visitar?',
    answer: 'Sí. Estamos en Calle Soler Nº 613, Esperanza, Santa Fe. Podés coordinar una visita a la planta directamente por WhatsApp para ver los productos en persona y hablar con nuestro equipo técnico.',
  },
];

export const Contacto = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const handleWhatsApp = (msg = 'Hola, quiero consultar sobre productos Tablanova') => {
    window.open(`https://wa.me/5493425683285?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="overflow-x-hidden">
      <Helmet>
        <title>Contacto | Tablanova</title>
        <meta name="description" content="Contactá a Tablanova en Esperanza, Santa Fe. Cotizaciones por WhatsApp, teléfono y email para postes, varillas y tranqueras de plástico reciclado." />
        <link rel="canonical" href="https://tablanova.com.ar/contacto" />
        <meta property="og:title" content="Contacto | Tablanova" />
        <meta property="og:url" content="https://tablanova.com.ar/contacto" />
      </Helmet>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="hero-full relative -mt-[72px] overflow-hidden flex flex-col justify-end"
        style={{ minHeight: 600 }}
      >
        <motion.img
          src={imgContactoBg}
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
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <div style={{ maxWidth: 620 }}>
              <div className="overflow-hidden mb-4" style={{ paddingBottom: '0.15em' }}>
                <motion.h1
                  variants={heroMask}
                  className="text-white"
                  style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.06 }}
                >
                  Hablemos de<br />tu proyecto.
                </motion.h1>
              </div>
              <motion.p variants={heroFade} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: 500 }}>
                Respondemos rápido y asesoramos según cada proyecto. Contanos qué necesitás y te ayudamos a encontrar la mejor solución.
              </motion.p>
            </div>

            <motion.div variants={heroFade} className="flex flex-row md:flex-col gap-4 md:gap-3 flex-shrink-0 pb-1">
              {[
                { label: 'Atención', value: 'PERSONALIZADA' },
                { label: 'Respuesta', value: 'INMEDIATA' },
                { label: 'Ubicación', value: 'ESPERANZA, S.FE' },
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

      {/* ─── CONTACTO ─────────────────────────────────────────────────────── */}
      <section className="py-[60px] md:py-[120px]" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={SPRING}
            style={{ borderTop: '1px solid #D1C4A8', paddingTop: 'clamp(32px,5vw,48px)', marginBottom: 'clamp(32px,5vw,56px)' }}
          >
            <p style={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
              Contacto
            </p>
            <h2 style={{ color: '#111827', letterSpacing: '-0.02em' }}>Escribinos directamente</h2>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

            {/* WhatsApp — banner horizontal, acción principal */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={SPRING}
              className="flex flex-col md:flex-row md:items-center md:justify-between"
              style={{ backgroundColor: '#5E0F29', borderRadius: 20, padding: 'clamp(32px,4vw,52px)', gap: 32 }}
            >
              <div className="flex items-start md:items-center gap-5" style={{ flex: 1 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MessageCircle size={24} color="#fff" />
                </div>
                <div>
                  <h3 style={{ color: '#fff', fontSize: 'clamp(1.15rem,2vw,1.45rem)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: 8 }}>
                    Contanos tu proyecto y te asesoramos.
                  </h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', lineHeight: 1.65, maxWidth: 480 }}>
                    Respondemos todos los días. Indicanos qué necesitás, la cantidad y tu ubicación — precio y disponibilidad al instante.
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleWhatsApp('Hola, quiero consultar sobre productos Tablanova para mi proyecto')}
                className="inline-flex items-center gap-2.5 font-medium text-sm self-start md:self-auto flex-shrink-0 w-full sm:w-auto"
                style={{ backgroundColor: '#DB8F33', color: '#fff', borderRadius: 9999, padding: '12px 12px 12px 24px' }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
              >
                Escribir por WhatsApp
                <span style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <ArrowRight size={15} color="#fff" />
                </span>
              </button>
            </motion.div>

            {/* Teléfono + Email — secundarios en fila */}
            <div className="grid md:grid-cols-2 gap-4">
              {/* Phone card — each number is its own tappable link */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={SPRING}
                className="text-left flex items-center gap-4"
                style={{ backgroundColor: '#fff', border: '1px solid #D1C4A8', borderRadius: 16, padding: '28px 32px' }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(94,15,41,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Phone size={19} style={{ color: '#5E0F29' }} />
                </div>
                <div>
                  <p style={{ color: '#6B7280', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>
                    Teléfono
                  </p>
                  <a
                    href="tel:+5493425683285"
                    style={{ display: 'block', color: '#111827', fontSize: '0.975rem', fontWeight: 600, lineHeight: 1.4, textDecoration: 'none' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#5E0F29'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#111827'; }}
                  >
                    342 5 683285
                  </a>
                  <a
                    href="tel:+5493496506699"
                    style={{ display: 'block', color: '#6B7280', fontSize: '0.85rem', marginTop: 3, textDecoration: 'none' }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = '#5E0F29'; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = '#6B7280'; }}
                  >
                    3496 506699
                  </a>
                </div>
              </motion.div>

              {/* Email card */}
              <motion.a
                href="mailto:tablanova.ar@gmail.com"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ ...SPRING, delay: 0.08 }}
                className="text-left flex items-center gap-4"
                style={{ backgroundColor: '#fff', border: '1px solid #D1C4A8', borderRadius: 16, padding: '28px 32px' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#5E0F29'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#D1C4A8'; }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(94,15,41,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Mail size={19} style={{ color: '#5E0F29' }} />
                </div>
                <div>
                  <p style={{ color: '#6B7280', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>
                    Email
                  </p>
                  <p style={{ color: '#111827', fontSize: '0.975rem', fontWeight: 600, lineHeight: 1.4 }}>tablanova.ar@gmail.com</p>
                </div>
              </motion.a>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-[60px] md:py-[120px]" style={{ backgroundColor: '#E8DCC8' }}>
        <div className="max-w-[720px] mx-auto px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={SPRING}
            style={{ borderTop: '1px solid #D1C4A8', paddingTop: 'clamp(32px,5vw,48px)', marginBottom: 'clamp(32px,5vw,56px)' }}
          >
            <p style={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
              Preguntas frecuentes
            </p>
            <h2 style={{ color: '#111827', letterSpacing: '-0.02em', fontSize: 'clamp(2rem, 4.5vw, 3rem)', fontWeight: 600 }}>¿Tenés dudas?</h2>
          </motion.div>

          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={{ ...SPRING, delay: index * 0.06 }}
              style={{ borderBottom: '1px solid #D1C4A8' }}
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                className="w-full text-left py-5 flex items-center justify-between gap-4"
                aria-expanded={openFaqIndex === index}
                aria-controls={`faq-a-${index}`}
              >
                <span style={{ fontSize: '0.95rem', fontWeight: 500, color: '#111827', lineHeight: 1.5 }}>
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: openFaqIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ flexShrink: 0, marginTop: 2 }}
                >
                  <ChevronDown size={18} style={{ color: '#5E0F29' }} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openFaqIndex === index && (
                  <motion.div
                    id={`faq-a-${index}`}
                    role="region"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5" style={{ color: '#6B7280', fontSize: '0.9rem', lineHeight: 1.72 }}>
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={VIEWPORT}
            transition={{ ...SPRING, delay: 0.3 }}
            className="mt-12 flex flex-col items-start gap-3"
          >
            <p style={{ color: '#6B7280', fontSize: '0.9rem' }}>¿No encontraste lo que buscabas?</p>
            <button
              onClick={() => handleWhatsApp('Hola, tengo una consulta sobre productos Tablanova')}
              className="inline-flex items-center gap-2.5 font-medium text-sm"
              style={{ backgroundColor: '#5E0F29', color: '#fff', borderRadius: 9999, padding: '10px 10px 10px 22px' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
            >
              Escribinos por WhatsApp
              <span style={{ width: 32, height: 32, borderRadius: '50%', backgroundColor: '#DB8F33', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <ArrowRight size={13} color="#fff" />
              </span>
            </button>
          </motion.div>
        </div>
      </section>

    </div>
  );
};
