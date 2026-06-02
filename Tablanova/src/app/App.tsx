import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { MotionConfig } from 'motion/react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollManager } from './components/ScrollManager';
import { WhatsAppButton } from './components/WhatsAppButton';
import '../styles/globals.css';

const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Productos = lazy(() => import('./pages/Productos').then(m => ({ default: m.Productos })));
const Catalogo = lazy(() => import('./pages/Catalogo').then(m => ({ default: m.Catalogo })));
const Nosotros = lazy(() => import('./pages/Nosotros').then(m => ({ default: m.Nosotros })));
const Contacto = lazy(() => import('./pages/Contacto').then(m => ({ default: m.Contacto })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function App() {
  return (
    <HelmetProvider>
      <CartProvider>
        <Router>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-white focus:px-4 focus:py-2 focus:rounded-md"
            style={{ color: '#5E0F29' }}
          >
            Saltar al contenido principal
          </a>
          <MotionConfig reducedMotion={prefersReduced ? 'always' : 'never'}>
            <ScrollManager />
            <div className="min-h-screen flex flex-col">
              <Header />
              <main id="main-content" className="flex-1">
                <Suspense fallback={<div style={{ height: '100dvh', backgroundColor: '#1a0a0f' }} />}>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/productos" element={<Productos />} />
                    <Route path="/catalogo" element={<Catalogo />} />
                    <Route path="/nosotros" element={<Nosotros />} />
                    <Route path="/contacto" element={<Contacto />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </main>
              <Footer />
              <WhatsAppButton />
            </div>
          </MotionConfig>
        </Router>
      </CartProvider>
    </HelmetProvider>
  );
}
