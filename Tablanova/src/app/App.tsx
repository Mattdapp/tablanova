import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollManager } from './components/ScrollManager';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Home } from './pages/Home';
import { Productos } from './pages/Productos';
import { Catalogo } from './pages/Catalogo';
import { Nosotros } from './pages/Nosotros';
import { Contacto } from './pages/Contacto';
import '../styles/globals.css';

export default function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollManager />
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/catalogo" element={<Catalogo />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/contacto" element={<Contacto />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </Router>
    </CartProvider>
  );
}
