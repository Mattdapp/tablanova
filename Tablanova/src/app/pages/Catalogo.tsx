import { useState } from 'react';
import { Search, X, Filter, Package, Weight, Layers, ArrowRight, MessageCircle } from 'lucide-react';
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
import imgVarillaRef2 from '../../assets/catalog/varilla-ref-2.jpg';
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
  weight: number;
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
    // VARILLAS
    { id: 'var-1', name: 'Varilla 0.35 × 0.35 × 1,10m', dimensions: '0.35 × 0.35 × 1.10m', weight: 1.1, minQuantity: 200, category: 'Varillas', image: imgVarilla1 },
    { id: 'var-2', name: 'Varilla 0,35 × 0,35 × 1,20m', dimensions: '0.35 × 0.35 × 1.20m', weight: 1.2, minQuantity: 200, category: 'Varillas', image: imgVarilla2 },
    { id: 'var-3', name: 'Varilla 0,35 × 0,35 × 1,40m', dimensions: '0.35 × 0.35 × 1.40m', weight: 1.4, minQuantity: 200, category: 'Varillas', image: imgVarilla3 },
    { id: 'var-4', name: 'Varilla Ref 0,45 × 0,45 × 1,20m', dimensions: '0.45 × 0.45 × 1.20m', weight: 2, minQuantity: 200, category: 'Varillas', image: imgVarillaRef1 },
    { id: 'var-5', name: 'Varilla Ref 0,45 × 0,45 × 1,40m', dimensions: '0.45 × 0.45 × 1.40m', weight: 2.5, minQuantity: 200, category: 'Varillas', image: imgVarillaRef2 },
    // VARILLONES
    { id: 'varon-1', name: 'Varillón 0,55 × 0,55 × 1,60m', dimensions: '0.55 × 0.55 × 1.60m', weight: 4.5, minQuantity: 50, category: 'Varillones', image: imgVarillon1 },
    { id: 'varon-2', name: 'Varillón 0.55 × 0.55 × 1.80m', dimensions: '0.55 × 0.55 × 1.80m', weight: 5.5, minQuantity: 50, category: 'Varillones', image: imgVarillon2 },
    // POSTES
    { id: 'post-1', name: 'Poste 0,80 × 0,80 × 2,50m', dimensions: '0.80 × 0.80 × 2.50m', weight: 15, minQuantity: 50, category: 'Postes', image: imgPoste1 },
    { id: 'post-2', name: 'Poste 0,10 × 0,10 × 2,50m', dimensions: '0.10 × 0.10 × 2.50m', weight: 20, minQuantity: 50, category: 'Postes', image: imgPoste2 },
    { id: 'post-3', name: 'Poste redondo Ø 0,10 × 1,80m', dimensions: 'Ø 0.10 × 1.80m', weight: 13, minQuantity: 30, category: 'Postes', image: imgPoste3 },
    { id: 'post-4', name: 'Poste redondo Ø 0,10 × 2,20m', dimensions: 'Ø 0.10 × 2.20m', weight: 16, minQuantity: 25, category: 'Postes', image: imgPoste4 },
    { id: 'post-5', name: 'Poste redondo Ø 0,10 × 2,40m', dimensions: 'Ø 0.10 × 2.40m', weight: 18, minQuantity: 25, category: 'Postes', image: imgPoste4 },
    // TABLAS
    { id: 'tab-1', name: 'Tabla 0,11 × 0,3 × 2m', dimensions: '0.11 × 0.30 × 2m', weight: 5.3, minQuantity: 50, category: 'Tablas', image: imgTabla1 },
    { id: 'tab-2', name: 'Tabla 0,11 × 0,30 × 3m', dimensions: '0.11 × 0.30 × 3m', weight: 11, minQuantity: 50, category: 'Tablas', image: imgTabla2 },
    { id: 'tab-3', name: 'Tabla 0,25 × 0,4 × 2m', dimensions: '0.25 × 0.40 × 2m', weight: 20, minQuantity: 50, category: 'Tablas', image: imgTabla3 },
    // TIRANTILLOS
    { id: 'tir-1', name: 'Tirantillo 0,45 × 0,45 × 2,40m', dimensions: '0.45 × 0.45 × 2.40m', weight: 4.5, minQuantity: 50, category: 'Tirantillos', image: imgTirantillo1 },
    { id: 'tir-2', name: 'Tirantillo 0,45 × 0,45 × 2,80m', dimensions: '0.45 × 0.45 × 2.80m', weight: 5, minQuantity: 50, category: 'Tirantillos', image: imgTirantillo2 },
    { id: 'tir-3', name: 'Tirantillo 0,55 × 0,55 × 2,80m', dimensions: '0.55 × 0.55 × 2.80m', weight: 6.5, minQuantity: 50, category: 'Tirantillos', image: imgTirantillo3 },
    // TRANQUERAS
    { id: 'tranq-1', name: 'Tranquera 1,20 × 1,50m', dimensions: '1.20 × 1.50m', weight: 70, minQuantity: 1, category: 'Tranqueras', image: imgTranquera1 },
    { id: 'tranq-2', name: 'Tranquera 1,20 × 2m', dimensions: '1.20 × 2m', weight: 90, minQuantity: 1, category: 'Tranqueras', image: imgTranquera2 },
    { id: 'tranq-3', name: 'Tranquera 1,20 × 3m', dimensions: '1.20 × 3m', weight: 160, minQuantity: 1, category: 'Tranqueras', image: imgTranquera3 },
    // BANCOS
    { id: 'banco-1', name: 'Banco Americano 1,20 × 1,50m', dimensions: '1.20 × 1.50m', weight: 100, minQuantity: 1, category: 'Bancos' },
    { id: 'banco-2', name: 'Banco Americano 1,20 × 1,90m', dimensions: '1.20 × 1.90m', weight: 130, minQuantity: 1, category: 'Bancos' },
    // REPOSERA
    { id: 'rep-1', name: 'Reposera 1,90 × 0,60m', dimensions: '1.90 × 0.60m', weight: 70, minQuantity: 1, category: 'Exterior', image: imgReposera1 },
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
    window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
  };

  return (
    <div style={{ backgroundColor: '#F5F0E8' }}>

      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="relative -mt-[72px] overflow-hidden flex flex-col justify-end"
        style={{ height: '100dvh', minHeight: 600 }}
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
              <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: '#9CA3AF' }}>
                <Search size={16} />
              </div>
              <input
                type="text"
                placeholder="Buscar por nombre, dimensiones o categoría..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-10 py-3 text-sm outline-none transition-colors duration-150"
                style={{ border: '1px solid #D1C4A8', borderRadius: 10, backgroundColor: '#fff', color: '#111827' }}
                onFocus={(e) => (e.currentTarget.style.borderColor = '#5E0F29')}
                onBlur={(e) => (e.currentTarget.style.borderColor = '#D1C4A8')}
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: '#9CA3AF' }}
                >
                  <X size={15} />
                </button>
              )}
            </div>
            <span className="self-center text-sm" style={{ color: '#9CA3AF', whiteSpace: 'nowrap' }}>
              {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''}
            </span>
          </div>

          {/* Category filters */}
          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className="px-4 py-1.5 text-sm font-medium transition-all duration-150"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                viewport={VIEWPORT}
                transition={{ ...SPRING, delay: (index % 3) * 0.08, layout: { duration: 0.2 } }}
                className="flex flex-col"
                style={{ backgroundColor: '#fff', border: '1px solid #D1C4A8', borderRadius: 16 }}
              >
                {/* Image */}
                <div
                  className="overflow-hidden relative"
                  style={{ borderRadius: '16px 16px 0 0', backgroundColor: '#F5F0E8', borderBottom: '1px solid #E8DCC8' }}
                >
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      style={{ display: 'block', width: '100%', height: 'auto' }}
                    />
                  ) : (
                    <div
                      className="flex items-center justify-center"
                      style={{ aspectRatio: '4/3' }}
                    >
                      <span style={{ fontSize: '0.7rem', color: '#CFC4A2', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        Foto próximamente
                      </span>
                    </div>
                  )}
                  {product.isNew && (
                    <span
                      className="absolute top-3 right-3 text-xs font-medium text-white"
                      style={{ backgroundColor: '#DB8F33', borderRadius: 4, padding: '2px 7px' }}
                    >
                      NUEVO
                    </span>
                  )}
                </div>

                {/* Header */}
                <div style={{ padding: '16px 20px 14px', borderBottom: '1px solid #E8DCC8' }}>
                  <span
                    className="text-xs font-medium uppercase"
                    style={{ color: '#5E0F29', letterSpacing: '0.07em', display: 'block', marginBottom: 6 }}
                  >
                    {product.category}
                  </span>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: '#111827', lineHeight: 1.35 }}>
                    {product.name}
                  </h4>
                </div>

                {/* Specs */}
                <div style={{ padding: '16px 20px', flex: 1 }}>
                  {[
                    { icon: <Layers size={12} />, label: 'Dimensiones', value: product.dimensions },
                    { icon: <Weight size={12} />, label: 'Peso', value: `${product.weight} kg` },
                    { icon: <Package size={12} />, label: 'Cantidad mínima', value: `${product.minQuantity} unidad${product.minQuantity !== 1 ? 'es' : ''}` },
                  ].map((spec, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between"
                      style={{ paddingTop: i > 0 ? 10 : 0, borderTop: i > 0 ? '1px solid #E8DCC8' : 'none', paddingBottom: 10 }}
                    >
                      <div className="flex items-center gap-1.5" style={{ color: '#9CA3AF' }}>
                        {spec.icon}
                        <span className="text-xs">{spec.label}</span>
                      </div>
                      <span className="text-xs font-medium" style={{ color: '#111827' }}>{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div style={{ padding: '0 20px 20px' }}>
                  <button
                    onClick={() => handleConsultar(product)}
                    className="w-full py-2.5 text-sm font-medium flex items-center justify-center gap-2 transition-opacity duration-150 rounded-full"
                    style={{ backgroundColor: '#5E0F29', color: '#fff' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = '0.85')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = '1')}
                  >
                    <MessageCircle size={14} />
                    Consultar precio
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <div className="text-5xl mb-4">🔍</div>
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
          <h2 className="text-white mb-4" style={{ letterSpacing: '-0.02em' }}>
            ¿No encontrás lo que buscás?
          </h2>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.65)', maxWidth: 440, margin: '0 auto 32px', lineHeight: 1.65 }}>
            Fabricamos a medida. Contanos tu proyecto y te respondemos con especificaciones y precio.
          </p>
          <button
            onClick={() => {
              const phone = '5493425683285';
              const msg = encodeURIComponent('Hola, quisiera consultar sobre productos Tablanova para mi proyecto');
              window.open(`https://wa.me/${phone}?text=${msg}`, '_blank');
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
