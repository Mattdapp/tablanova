import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Search, X, Filter, Package, Layers, ArrowRight, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import imgCatalogoHero from '../../assets/catalogo-hero.jpg';
import imgPoste1 from '../../assets/catalog/poste-1.jpg';
import imgPoste2 from '../../assets/catalog/poste-2.jpg';
import imgPoste3 from '../../assets/catalog/poste-3.jpg';
import imgPoste4 from '../../assets/catalog/poste-4.jpg';
import imgVarilla1 from '../../assets/catalog/varilla-1.jpg';
import imgVarilla2 from '../../assets/catalog/varilla-2.jpg';
import imgVarilla3 from '../../assets/catalog/varilla-3.jpg';
import imgVarillaRef1 from '../../assets/catalog/varilla-ref-1.jpg';
import imgVarillon1 from '../../assets/catalog/varillon-1.jpg';
import imgVarillon2 from '../../assets/catalog/varillon-2.jpg';
import imgTabla1 from '../../assets/catalog/tabla-1.jpg';
import imgTabla2 from '../../assets/catalog/tabla-2.jpg';
import imgTabla3 from '../../assets/catalog/tabla-3.jpg';
import imgTirantillo1 from '../../assets/catalog/tirantillo-1.jpg';
import imgTirantillo2 from '../../assets/catalog/tirantillo-2.jpg';
import imgTirantillo3 from '../../assets/catalog/tirantillo-3.jpg';
import imgTranquera1 from '../../assets/catalog/tranquera-1.jpg';
import imgTranquera2 from '../../assets/catalog/tranquera-2.jpg';
import imgTranquera3 from '../../assets/catalog/tranquera-3.jpg';
import imgReposera1 from '../../assets/catalog/reposera-1.jpg';

const SPRING = { type: 'spring' as const, stiffness: 80, damping: 20 };

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

interface Product {
  id: string;
  name: string;
  dimensions: string;
  minQuantity: number;
  category: string;
  isNew?: boolean;
  image?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWPORT = { once: true, margin: '-80px' } as const;

export const Catalogo = () => {
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const products: Product[] = [
    // POSTES — redondos
    { id: 'post-r1', name: 'Poste redondo Ø 10 × 1,80 m', dimensions: 'Ø 10 cm × 1,80 m', minQuantity: 30, category: 'Postes', image: imgPoste3 },
    { id: 'post-r2', name: 'Poste redondo Ø 10 × 2,20 m', dimensions: 'Ø 10 cm × 2,20 m', minQuantity: 25, category: 'Postes', image: imgPoste4 },
    { id: 'post-r3', name: 'Poste redondo Ø 10 × 2,40 m', dimensions: 'Ø 10 cm × 2,40 m', minQuantity: 25, category: 'Postes', image: imgPoste4 },
    // POSTES — cuadrados
    { id: 'post-c1', name: 'Poste cuadrado 4,5 × 4,5 × 2,50 m', dimensions: '4,5 × 4,5 cm × 2,50 m', minQuantity: 50, category: 'Postes', image: imgPoste1 },
    { id: 'post-c2', name: 'Poste cuadrado 8 × 8 × 2,50 m', dimensions: '8 × 8 cm × 2,50 m', minQuantity: 50, category: 'Postes', image: imgPoste1 },
    { id: 'post-c3', name: 'Poste cuadrado 10 × 10 × 2,50 m', dimensions: '10 × 10 cm × 2,50 m', minQuantity: 50, category: 'Postes', image: imgPoste2 },
    // VARILLAS — 3,5 × 3,5 cm
    { id: 'var-1', name: 'Varilla 3,5 × 3,5 × 1,10 m', dimensions: '3,5 × 3,5 cm × 1,10 m', minQuantity: 200, category: 'Varillas', image: imgVarilla1 },
    { id: 'var-2', name: 'Varilla 3,5 × 3,5 × 1,40 m', dimensions: '3,5 × 3,5 cm × 1,40 m', minQuantity: 200, category: 'Varillas', image: imgVarilla2 },
    { id: 'var-3', name: 'Varilla 3,5 × 3,5 × 1,60 m', dimensions: '3,5 × 3,5 cm × 1,60 m', minQuantity: 200, category: 'Varillas', image: imgVarilla3 },
    { id: 'var-4', name: 'Varilla 3,5 × 3,5 × 1,80 m', dimensions: '3,5 × 3,5 cm × 1,80 m', minQuantity: 200, category: 'Varillas', image: imgVarillaRef1 },
    // VARILLONES — 4,5 × 4,5 cm
    { id: 'varon-1', name: 'Varillón 4,5 × 4,5 × 1,10 m', dimensions: '4,5 × 4,5 cm × 1,10 m', minQuantity: 50, category: 'Varillones', image: imgVarillon1 },
    { id: 'varon-2', name: 'Varillón 4,5 × 4,5 × 1,40 m', dimensions: '4,5 × 4,5 cm × 1,40 m', minQuantity: 50, category: 'Varillones', image: imgVarillon2 },
    { id: 'varon-3', name: 'Varillón 4,5 × 4,5 × 1,60 m', dimensions: '4,5 × 4,5 cm × 1,60 m', minQuantity: 50, category: 'Varillones', image: imgVarillon1 },
    { id: 'varon-4', name: 'Varillón 4,5 × 4,5 × 1,80 m', dimensions: '4,5 × 4,5 cm × 1,80 m', minQuantity: 50, category: 'Varillones', image: imgVarillon2 },
    // TABLAS — 11 × 3 cm
    { id: 'tab-a1', name: 'Tabla 11 × 3 × 2,00 m', dimensions: '11 × 3 cm × 2,00 m', minQuantity: 50, category: 'Tablas', image: imgTabla1 },
    { id: 'tab-a2', name: 'Tabla 11 × 3 × 2,40 m', dimensions: '11 × 3 cm × 2,40 m', minQuantity: 50, category: 'Tablas', image: imgTabla2 },
    { id: 'tab-a3', name: 'Tabla 11 × 3 × 2,80 m', dimensions: '11 × 3 cm × 2,80 m', minQuantity: 50, category: 'Tablas', image: imgTabla3 },
    { id: 'tab-a4', name: 'Tabla 11 × 3 × 3,00 m', dimensions: '11 × 3 cm × 3,00 m', minQuantity: 50, category: 'Tablas', image: imgTabla1 },
    // TABLAS — 25 × 4 cm
    { id: 'tab-b1', name: 'Tabla 25 × 4 × 2,00 m', dimensions: '25 × 4 cm × 2,00 m', minQuantity: 50, category: 'Tablas', image: imgTabla2 },
    { id: 'tab-b2', name: 'Tabla 25 × 4 × 2,40 m', dimensions: '25 × 4 cm × 2,40 m', minQuantity: 50, category: 'Tablas', image: imgTabla3 },
    { id: 'tab-b3', name: 'Tabla 25 × 4 × 2,80 m', dimensions: '25 × 4 cm × 2,80 m', minQuantity: 50, category: 'Tablas', image: imgTabla1 },
    { id: 'tab-b4', name: 'Tabla 25 × 4 × 3,00 m', dimensions: '25 × 4 cm × 3,00 m', minQuantity: 50, category: 'Tablas', image: imgTabla2 },
    // TIRANTILLOS — 4,5 × 5,5 cm
    { id: 'tir-a1', name: 'Tirantillo 4,5 × 5,5 × 2,00 m', dimensions: '4,5 × 5,5 cm × 2,00 m', minQuantity: 50, category: 'Tirantillos', image: imgTirantillo1 },
    { id: 'tir-a2', name: 'Tirantillo 4,5 × 5,5 × 2,40 m', dimensions: '4,5 × 5,5 cm × 2,40 m', minQuantity: 50, category: 'Tirantillos', image: imgTirantillo2 },
    { id: 'tir-a3', name: 'Tirantillo 4,5 × 5,5 × 2,80 m', dimensions: '4,5 × 5,5 cm × 2,80 m', minQuantity: 50, category: 'Tirantillos', image: imgTirantillo3 },
    { id: 'tir-a4', name: 'Tirantillo 4,5 × 5,5 × 3,00 m', dimensions: '4,5 × 5,5 cm × 3,00 m', minQuantity: 50, category: 'Tirantillos', image: imgTirantillo1 },
    // TIRANTILLOS — 5,5 × 5,5 cm
    { id: 'tir-b1', name: 'Tirantillo 5,5 × 5,5 × 2,00 m', dimensions: '5,5 × 5,5 cm × 2,00 m', minQuantity: 50, category: 'Tirantillos', image: imgTirantillo2 },
    { id: 'tir-b2', name: 'Tirantillo 5,5 × 5,5 × 2,40 m', dimensions: '5,5 × 5,5 cm × 2,40 m', minQuantity: 50, category: 'Tirantillos', image: imgTirantillo3 },
    { id: 'tir-b3', name: 'Tirantillo 5,5 × 5,5 × 2,80 m', dimensions: '5,5 × 5,5 cm × 2,80 m', minQuantity: 50, category: 'Tirantillos', image: imgTirantillo1 },
    { id: 'tir-b4', name: 'Tirantillo 5,5 × 5,5 × 3,00 m', dimensions: '5,5 × 5,5 cm × 3,00 m', minQuantity: 50, category: 'Tirantillos', image: imgTirantillo2 },
    // TRANQUERAS — medidas estándar (ancho × alto)
    { id: 'tranq-1', name: 'Tranquera 1,20 × 1,50 m', dimensions: '1,20 × 1,50 m', minQuantity: 1, category: 'Tranqueras', image: imgTranquera1 },
    { id: 'tranq-2', name: 'Tranquera 2,00 × 1,20 m', dimensions: '2,00 × 1,20 m', minQuantity: 1, category: 'Tranqueras', image: imgTranquera2 },
    { id: 'tranq-3', name: 'Tranquera 2,00 × 1,40 m', dimensions: '2,00 × 1,40 m', minQuantity: 1, category: 'Tranqueras', image: imgTranquera3 },
    { id: 'tranq-4', name: 'Tranquera 3,00 × 1,20 m', dimensions: '3,00 × 1,20 m', minQuantity: 1, category: 'Tranqueras', image: imgTranquera1 },
    { id: 'tranq-5', name: 'Tranquera 3,00 × 1,40 m', dimensions: '3,00 × 1,40 m', minQuantity: 1, category: 'Tranqueras', image: imgTranquera2 },
    // BANCOS
    { id: 'banco-1', name: 'Banco Americano 1,20 × 1,50 m', dimensions: '1,20 × 1,50 m', minQuantity: 1, category: 'Bancos' },
    { id: 'banco-2', name: 'Banco Americano 1,20 × 1,90 m', dimensions: '1,20 × 1,90 m', minQuantity: 1, category: 'Bancos' },
    // REPOSERA
    { id: 'rep-1', name: 'Reposera 1,90 × 0,60 m', dimensions: '1,90 × 0,60 m', minQuantity: 1, category: 'Exterior', image: imgReposera1 },
  ];

  const categories = ['Todos', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'Todos' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.dimensions.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleConsultar = (product: Product) => {
    const phone = '5493425683285';
    const msg = encodeURIComponent(
      `Hola, quiero consultar precio y disponibilidad de: ${product.name} (${product.dimensions})`
    );
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div style={{ backgroundColor: '#F5F0E8' }}>
      <Helmet>
        <title>Catálogo de productos | Tablanova</title>
        <meta name="description" content="Explorá el catálogo completo de Tablanova: postes, varillas, varillones, tablas, tirantillos y tranqueras de plástico reciclado con medidas y especificaciones." />
        <link rel="canonical" href="https://tablanova.com.ar/catalogo" />
        <meta property="og:title" content="Catálogo de productos | Tablanova" />
        <meta property="og:url" content="https://tablanova.com.ar/catalogo" />
      </Helmet>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="hero-full relative -mt-[72px] overflow-hidden flex flex-col justify-end"
        style={{ minHeight: 600 }}
      >
        <motion.img
          src={imgCatalogoHero}
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
                  Catálogo<br />de productos.
                </motion.h1>
              </div>
              <motion.p variants={heroFade} style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.05rem', lineHeight: 1.65, maxWidth: 500 }}>
                Explorá toda nuestra línea con especificaciones técnicas. Consultanos por precio y disponibilidad para tu proyecto.
              </motion.p>
            </div>

            <motion.div variants={heroFade} className="flex flex-row md:flex-col gap-4 md:gap-3 flex-shrink-0 pb-1">
              {[
                { label: 'Tipo', value: 'CATÁLOGO COMPLETO' },
                { label: 'Material', value: 'PLÁSTICO RECICLADO' },
                { label: 'Fabricación', value: 'ESPERANZA, SANTA FE' },
              ].map((m) => (
                <div key={m.label}>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.68rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
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

      <section className="pt-[40px] pb-[60px] md:pt-[80px] md:pb-[100px]" style={{ backgroundColor: '#F5F0E8' }}>
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">

        {/* ─── SEARCH & FILTERS ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
          className="mb-10"
          style={{ borderBottom: '1px solid #D1C4A8', paddingBottom: 32 }}
        >
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            {/* Search */}
            <div className="relative flex-1">
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#6B7280' }}>
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Buscar por nombre, dimensiones o categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-10 py-3 outline-none transition-colors duration-150"
                style={{ fontSize: 16, border: '1px solid #D1C4A8', borderRadius: 10, backgroundColor: '#fff', color: '#111827' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#5E0F29')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#D1C4A8')}
                aria-label="Buscar productos"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: '#6B7280' }}
                  aria-label="Limpiar búsqueda"
                >
                  <X size={15} />
                </button>
              )}
            </div>
            <span className="self-center text-sm" style={{ color: '#6B7280', whiteSpace: 'nowrap' }}>
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Category filters */}
          <div
            className="flex items-center gap-2 flex-nowrap overflow-x-auto -mx-4 px-4 sm:flex-wrap sm:mx-0 sm:px-0"
            role="group"
            aria-label="Filtrar por categoría"
            style={{ scrollbarWidth: 'none' }}
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className="flex-shrink-0 px-4 py-1.5 text-sm font-medium transition-all duration-150 min-h-[44px]"
                style={
                  selectedCategory === category
                    ? { backgroundColor: '#5E0F29', color: '#fff', borderRadius: 999, border: '1px solid #5E0F29' }
                    : { backgroundColor: 'transparent', color: '#6B7280', borderRadius: 999, border: '1px solid #D1C4A8' }
                }
                onMouseEnter={(e) => { if (selectedCategory !== category) { (e.currentTarget as HTMLElement).style.borderColor = '#5E0F29'; (e.currentTarget as HTMLElement).style.color = '#5E0F29'; } }}
                onMouseLeave={(e) => { if (selectedCategory !== category) { (e.currentTarget as HTMLElement).style.borderColor = '#D1C4A8'; (e.currentTarget as HTMLElement).style.color = '#6B7280'; } }}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* ─── PRODUCT GRID ─────────────────────────────────────────────── */}
        <h2 className="sr-only">Productos</h2>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={VIEWPORT}
                transition={{ ...SPRING, delay: (index % 2) * 0.08, layout: { duration: 0.2 } }}
                className="flex flex-col"
                style={{ backgroundColor: '#fff', border: '1px solid #D1C4A8', borderRadius: 16 }}
              >
                {/* Image — fixed aspect ratio, object-contain so the full piece (with measurements) shows; white bg blends with the photos' own white background */}
                <div
                  className="overflow-hidden relative flex items-center justify-center"
                  style={{ borderRadius: '16px 16px 0 0', backgroundColor: '#fff', borderBottom: '1px solid #E8DCC8', aspectRatio: '4/3' }}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="w-full h-full"
                      style={{ objectFit: 'contain', display: 'block', padding: '8px' }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Package size={24} style={{ color: '#9C8C6E' }} />
                      <span style={{ fontSize: '0.75rem', color: '#9C8C6E', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        Foto próximamente
                      </span>
                    </div>
                  )}
                  {product.isNew && (
                    <span
                      className="absolute top-2 right-2 text-xs font-medium text-white"
                      style={{ backgroundColor: '#DB8F33', borderRadius: 4, padding: '2px 6px' }}
                    >
                      NUEVO
                    </span>
                  )}
                </div>

                {/* Header */}
                <div className="px-3 pt-3 pb-2.5 md:px-5 md:pt-4 md:pb-3" style={{ borderBottom: '1px solid #E8DCC8' }}>
                  <span
                    className="text-xs font-medium uppercase block mb-1"
                    style={{ color: '#5E0F29', letterSpacing: '0.07em' }}
                  >
                    {product.category}
                  </span>
                  <h4 className="text-xs md:text-sm line-clamp-2" style={{ fontWeight: 600, color: '#111827', lineHeight: 1.35, minHeight: '2.7em' }}>
                    {product.name}
                  </h4>
                </div>

                {/* Specs */}
                <div className="px-3 py-2 md:px-5 md:py-4 flex-1">
                  {[
                    { icon: <Layers size={11} />, label: 'Dim.', labelFull: 'Dimensiones', value: product.dimensions },
                    { icon: <Package size={11} />, label: 'Mín.', labelFull: 'Cantidad mínima', value: `${product.minQuantity} u.` },
                  ].map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-2"
                      style={{ borderTop: i > 0 ? '1px solid #E8DCC8' : 'none' }}
                    >
                      <div className="flex items-center gap-1" style={{ color: '#6B7280' }}>
                        {spec.icon}
                        <span className="text-xs">
                          <span className="md:hidden">{spec.label}</span>
                          <span className="hidden md:inline">{spec.labelFull}</span>
                        </span>
                      </div>
                      <span className="text-xs font-medium" style={{ color: '#111827' }}>{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="px-3 pb-3 md:px-5 md:pb-5">
                  <button
                    onClick={() => handleConsultar(product)}
                    className="w-full py-2 md:py-2.5 text-xs md:text-sm font-medium flex items-center justify-center gap-1.5 transition-opacity duration-150 rounded-full min-h-[44px]"
                    style={{ backgroundColor: '#5E0F29', color: '#fff' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                  >
                    <MessageCircle size={12} />
                    <span className="md:hidden">Consultar</span>
                    <span className="hidden md:inline">Consultar precio</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <div className="text-5xl mb-4" aria-hidden="true">🔍</div>
            <h3 className="text-xl font-medium mb-2" style={{ color: '#111827' }}>Sin resultados</h3>
            <p className="text-sm" style={{ color: '#6B7280' }}>Intentá con otros términos o categorías</p>
          </motion.div>
        )}

        {/* ─── BOTTOM CTA ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE }}
          className="mt-20 text-center py-16 px-8"
          style={{ backgroundColor: '#5E0F29', borderRadius: 16 }}
        >
          <span
            className="inline-flex items-center text-xs font-medium uppercase rounded-full px-3 py-1 mb-5"
            style={{ backgroundColor: 'rgba(219,143,51,0.2)', color: '#DB8F33', letterSpacing: '0.07em' }}
          >
            Cotización sin compromiso
          </span>
          <h2 className="text-white mb-4 text-left sm:text-center" style={{ letterSpacing: '-0.02em' }}>
            ¿No encontrás lo que buscás?
          </h2>
          <p className="mb-8 text-left sm:text-center" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440, margin: '0 auto 32px', lineHeight: 1.65 }}>
            Fabricamos a medida. Contanos tu proyecto y te respondemos con especificaciones y precio.
          </p>
          <button
            onClick={() => {
              const phone = '5493425683285';
              const msg = encodeURIComponent('Hola, quisiera consultar sobre productos Tablanova para mi proyecto');
              window.open(`https://wa.me/${phone}?text=${msg}`, '_blank', 'noopener,noreferrer');
            }}
            className="inline-flex items-center gap-3 font-medium transition-opacity duration-150"
            style={{
              backgroundColor: '#fff',
              color: '#111827',
              borderRadius: 9999,
              padding: '10px 10px 10px 22px',
              fontSize: '0.9rem',
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
          >
            Consultar por WhatsApp
            <span
              className="flex items-center justify-center rounded-full flex-shrink-0"
              style={{ width: 36, height: 36, backgroundColor: '#DB8F33' }}
            >
              <ArrowRight size={16} color="#fff" />
            </span>
          </button>
        </motion.div>
        </div>
      </section>
    </div>
  );
};
