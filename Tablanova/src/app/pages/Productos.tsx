import { Link } from 'react-router-dom';
import { ArrowRight, Check, Leaf, Package } from 'lucide-react';
import { motion } from 'motion/react';
import imgPostes from '../../assets/postes.jpg';
import imgVarillas from '../../assets/varillas.jpg';
import imgTablas from '../../assets/tablas.jpg';
import imgTranqueras from '../../assets/tranqueras.jpg';
import imgAgroBg from '../../assets/agro-bg.jpg';
import imgReposera from '../../assets/catalog/reposera-1.jpg';

const SPRING = { type: 'spring' as const, stiffness: 80, damping: 20 };
const VIEWPORT = { once: true, margin: '-80px' } as const;

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: SPRING },
};

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
};

const heroFade = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: SPRING },
};

const heroMask = {
  hidden: { y: '115%' },
  visible: { y: 0, transition: SPRING },
};

const agroProducts = [
  {
    id: 'postes',
    title: 'Postes',
    tag: 'El más pedido',
    description: 'El cerco que no necesita mantenimiento.',
    longDescription:
      'Nuestros postes de plástico reciclado reemplazan definitivamente al poste de madera en cualquier tipo de cerco rural. No se pudren, no los atacan los insectos, no se agrietan con el sol ni se deforman con la humedad. Una inversión que se paga sola en los primeros 5 años: sin fungicidas, sin repintar, sin reponer.',
    image: imgPostes,
    benefits: [
      'Redondos: Ø 10cm × 1,80m / 2,20m / 2,40m',
      'Cuadrados: 8×8cm y 10×10cm × 2,50m',
      'De 13 a 20 kg por unidad',
      'No requiere tratamiento ni impregnación',
      'Instalación idéntica al poste de madera',
      'Mínimo desde 25 unidades',
    ],
  },
  {
    id: 'varillas',
    title: 'Varillas y Varillones',
    tag: 'Cercos eléctricos y perimetrales',
    description: 'La varilla que mantiene la tensión.',
    longDescription:
      'Sin óxido, sin deformación, sin pérdida de tensión a lo largo del tiempo. Las varillas y varillones de Tablanova están fabricados con plástico reciclado de alta densidad, resistentes al impacto de animales y a los agentes climáticos más extremos. Pensadas para cercos eléctricos y perimetrales de alta exigencia.',
    image: imgVarillas,
    benefits: [
      'Varillas 0,35×0,35cm a 0,45×0,45cm',
      'Varillones 0,55×0,55cm',
      'Largos: 1,10m / 1,20m / 1,40m / 1,60m / 1,80m',
      'De 1,1 a 5,5 kg por unidad',
      'Compatibles con grapas y alambres estándar',
      'Mínimo 50–200 unidades según tipo',
    ],
  },
  {
    id: 'tablas',
    title: 'Tablas y Tirantillos',
    tag: 'Construcción rural',
    description: 'Para construir estructuras que duran.',
    longDescription:
      'Las tablas y tirantillos de plástico reciclado son la alternativa definitiva a la madera en estructuras rurales. Corrales, tinglados, comederos, pasillos de trabajo: aplicaciones que exigen resistencia constante a la humedad, el barro y el contacto con animales. Sin tratamientos. Sin mantenimiento. Sin roturas por pudrición.',
    image: imgTablas,
    benefits: [
      'Tablas 0,11×0,30cm a 0,25×0,40cm',
      'Tirantillos 0,45×0,45cm a 0,55×0,55cm',
      'Largos: 2m / 2,40m / 2,80m / 3m',
      'De 4,5 a 20 kg por unidad',
      'Apto contacto con animales y humedad',
      'Mínimo 50 unidades',
    ],
  },
  {
    id: 'tranqueras',
    title: 'Tranqueras',
    tag: 'Accesos rurales',
    description: 'La tranquera que dura décadas.',
    longDescription:
      'Robustas, resistentes y sin mantenimiento. Las tranqueras Tablanova están fabricadas íntegramente con plástico reciclado y pensadas para accesos rurales de alta exigencia. No se oxidan, no se pudren y soportan el uso diario sin deterioro. Disponibles en múltiples medidas estándar, con posibilidad de solicitar tamaños a medida.',
    image: imgTranqueras,
    benefits: [
      '1,20 × 1,50m / 2m / 3m (ancho × alto)',
      '70 a 160 kg por unidad',
      'Sin pintura, sin tratamiento, sin óxido',
      'Sistema de cierre robusto incluido',
      'Medidas especiales a pedido',
      'Desde 1 unidad',
    ],
  },
];

export const Productos = () => {
  const handleWhatsApp = () => {
    const phone = '5493425683285';
    const msg = encodeURIComponent('Hola, quiero cotizar productos Tablanova para el campo');
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="overflow-x-hidden">

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative -mt-[72px] overflow-hidden flex flex-col justify-end"
        style={{ height: '100dvh', minHeight: 600 }}
      >
        <motion.img
          src={imgAgroBg}
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

            {/* Left: title */}
            <div style={{ maxWidth: 620 }}>
              <div className="overflow-hidden mb-4" style={{ paddingBottom: '0.15em' }}>
                <motion.h1
                  variants={heroMask}
                  className="text-white"
                  style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 600, letterSpacing: '-0.03em', lineHeight: 1.06 }}
                >
                  Un material.<br />Múltiples soluciones.
                </motion.h1>
              </div>

              <motion.p variants={heroFade} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: 500 }}>
                Postes, varillas, tablas, tirantillos y tranqueras de plástico 100% reciclado para el sector agropecuario.
              </motion.p>
            </div>

            {/* Right: metadata — compact row on mobile, column on md+ */}
            <motion.div variants={heroFade} className="flex flex-row md:flex-col gap-4 md:gap-3 flex-shrink-0 pb-1">
              {[
                { label: 'Categoría', value: 'LÍNEA AGRO' },
                { label: 'Material', value: 'PLÁSTICO RECICLADO' },
                { label: 'Fabricación', value: 'ESPERANZA, SANTA FE' },
              ].map((m) => (
                <div key={m.label}>
                  <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
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

      {/* ─── BRIEF ────────────────────────────────────────────────────────── */}
      <section className="py-[48px] md:py-[80px]" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            className="grid md:grid-cols-2 gap-10 lg:gap-24"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={reveal}>
              <p style={{ color: '#5E0F29', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
                Descripción
              </p>
              <h3 style={{ color: '#111827', fontSize: '1.4rem', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 16 }}>
                Qué es la Línea Agro
              </h3>
              <p style={{ color: '#6B7280', lineHeight: 1.72 }}>
                Desarrollamos piezas de plástico reciclado para reemplazar la madera en el sector agropecuario. Postes, varillas, tablas, tirantillos y tranqueras fabricados para aguantar el campo real: humedad, barro, sol, animales y uso diario sin interrupciones.
              </p>
            </motion.div>

            <motion.div variants={reveal}>
              <p style={{ color: '#5E0F29', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 14 }}>
                El material
              </p>
              <h3 style={{ color: '#111827', fontSize: '1.4rem', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 16 }}>
                Sin madera. Sin mantenimiento.
              </h3>
              <p style={{ color: '#6B7280', lineHeight: 1.72 }}>
                No se pudren, no se astillan, no se rajan y no necesitan tratamiento. Se instalan con las mismas herramientas que la madera y duran décadas donde la madera no llegaría. Cero fungicidas, cero pintura, cero reposiciones.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ─── PRODUCTS ─────────────────────────────────────────────────────── */}
      <section style={{ backgroundColor: '#F5F0E8' }}>
        <style>{`
          @media (max-width: 767px) {
            .agro-img-wrap { margin-left: 0 !important; margin-right: 0 !important; }
            .agro-txt-wrap { padding-left: 20px !important; padding-right: 20px !important; padding-top: 28px !important; padding-bottom: 28px !important; }
          }
        `}</style>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            style={{ borderTop: '1px solid #D1C4A8', paddingTop: 48, paddingBottom: 48 }}
          >
            <p style={{ color: '#6B7280', fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
              Productos · Línea Agro
            </p>
            <h2 style={{ color: '#111827', letterSpacing: '-0.02em' }}>Para el campo</h2>
          </motion.div>
        </div>

        {agroProducts.map((product, index) => {
          const isReversed = index % 2 === 1;
          return (
            <motion.div
              key={index}
              id={product.id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={VIEWPORT}
              transition={SPRING}
              style={{ borderTop: '1px solid #D1C4A8', scrollMarginTop: 80 }}
            >
              <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

                {/* Photo — 60% */}
                <div
                  className="agro-img-wrap md:w-[60%] flex-shrink-0 overflow-hidden group"
                  style={{ borderRadius: 20, margin: isReversed ? 'clamp(16px,3vw,32px) clamp(16px,3vw,32px) clamp(16px,3vw,32px) 0' : 'clamp(16px,3vw,32px) 0 clamp(16px,3vw,32px) clamp(16px,3vw,32px)' }}
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    style={{ aspectRatio: '4/3', display: 'block' }}
                  />
                </div>

                {/* Text — 40% */}
                <div
                  className="agro-txt-wrap flex flex-col justify-center"
                  style={{ padding: 'clamp(40px, 5vw, 72px) clamp(32px, 4vw, 64px)', flex: 1 }}
                >
                  <p style={{ color: '#5E0F29', fontSize: '0.7rem', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 20 }}>
                    0{index + 1} — Línea Agro
                  </p>
                  <h3 style={{ color: '#111827', fontSize: 'clamp(1.5rem, 2.5vw, 2.2rem)', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 16 }}>
                    {product.title}
                  </h3>
                  <p style={{ color: '#6B7280', fontSize: '0.95rem', lineHeight: 1.72, marginBottom: 28 }}>
                    {product.longDescription}
                  </p>

                  <div style={{ borderTop: '1px solid #D1C4A8', paddingTop: 24, marginBottom: 28 }}>
                    {product.benefits.map((benefit, i) => (
                      <div
                        key={i}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          padding: '8px 0',
                          borderBottom: i < product.benefits.length - 1 ? '1px solid #E8DCC8' : 'none',
                        }}
                      >
                        <div style={{ width: 5, height: 5, borderRadius: '50%', backgroundColor: '#5E0F29', flexShrink: 0 }} />
                        <span style={{ color: '#6B7280', fontSize: '0.875rem' }}>{benefit}</span>
                      </div>
                    ))}
                  </div>

                  <div>
                    <Link
                      to="/catalogo"
                      className="inline-flex items-center gap-2.5 font-medium text-sm text-white"
                      style={{ backgroundColor: '#5E0F29', borderRadius: 9999, padding: '10px 10px 10px 22px', transition: 'opacity 150ms' }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                    >
                      Ver en catálogo
                      <span className="flex items-center justify-center rounded-full flex-shrink-0" style={{ width: 32, height: 32, backgroundColor: '#DB8F33' }}>
                        <ArrowRight size={15} color="#fff" />
                      </span>
                    </Link>
                  </div>
                </div>

              </div>
            </motion.div>
          );
        })}

        <div className="pb-[60px] md:pb-[120px]" />
      </section>

      {/* ─── MOBILIARIO ───────────────────────────────────────────────────── */}
      <section id="mobiliario" className="pt-[48px] md:pt-[80px] pb-[60px] md:pb-[120px]" style={{ backgroundColor: '#414B28', scrollMarginTop: 80 }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: 40, marginBottom: 56 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <span
                className="inline-flex items-center gap-2 text-xs font-medium uppercase"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.8)',
                  borderRadius: 4,
                  padding: '4px 10px',
                  letterSpacing: '0.08em',
                }}
              >
                <Leaf size={12} />
                Línea Mobiliario
              </span>
            </div>
            <h2 className="text-white" style={{ letterSpacing: '-0.02em' }}>Para espacios verdes</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 520, marginTop: 12, lineHeight: 1.65 }}>
              La misma tecnología del campo aplicada al diseño urbano. Parques, plazas y jardines que duran sin mantenimiento.
            </p>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={VIEWPORT}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {[
              {
                title: 'Bancos Americanos',
                description: 'Para parques, plazas y espacios de descanso que se disfrutan años.',
                image: undefined as string | undefined,
                benefits: ['Banco con mesa integrada estilo americano', 'Medidas: 1,20×1,50m y 1,20×1,90m', 'De 100 a 130 kg', 'Sin mantenimiento', 'Apto para uso en exteriores'],
              },
              {
                title: 'Reposeras',
                description: 'Comodidad al aire libre sin el deterioro de los materiales tradicionales.',
                image: imgReposera as string | undefined,
                benefits: ['Dimensiones: 1,90 × 0,60m', '70 kg', 'Resistente a piletas y humedad constante', 'Sin pintura ni barniz', 'Desde 1 unidad'],
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={reveal}
                className="group overflow-hidden"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 16,
                  transition: 'transform 200ms ease, border-color 200ms',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.22)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.1)';
                }}
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '16/9' }}>
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex flex-col items-center justify-center gap-2"
                      style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                    >
                      <Package size={26} style={{ color: 'rgba(255,255,255,0.3)' }} />
                      <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        Foto próximamente
                      </span>
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.65), transparent)' }}>
                    <h3 className="text-white" style={{ fontSize: '1.1rem' }}>{item.title}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', lineHeight: 1.65, marginBottom: 20 }}>
                    {item.description}
                  </p>
                  <ul className="space-y-2.5 mb-6">
                    {item.benefits.map((b, j) => (
                      <li key={j} className="flex items-center gap-2.5" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem' }}>
                        <Check size={13} color="#DB8F33" strokeWidth={3} style={{ flexShrink: 0 }} />
                        {b}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/catalogo"
                    className="inline-flex items-center gap-1.5 text-sm font-medium"
                    style={{ color: '#DB8F33', transition: 'color 150ms' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = '#fff')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = '#DB8F33')}
                  >
                    Ver en catálogo
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


    </div>
  );
};
