import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollManager />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Suspense fallback={null}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/productos" element={<Productos />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/nosotros" element={<Nosotros />} />
                <Route path="/contacto" element={<Contacto />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </CartProvider>
  );
}
