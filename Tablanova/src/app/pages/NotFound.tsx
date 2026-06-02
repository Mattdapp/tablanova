import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

export function NotFound() {
  return (
    <>
      <Helmet>
        <title>Página no encontrada | Tablanova</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <section
        style={{ backgroundColor: '#F5F0E8', minHeight: '70vh' }}
        className="flex items-center justify-center px-4 py-20"
      >
        <div className="text-center max-w-lg mx-auto">
          <p
            style={{
              fontSize: 'clamp(6rem, 20vw, 10rem)',
              fontWeight: 600,
              lineHeight: 1,
              letterSpacing: '-0.04em',
              color: '#5E0F29',
              opacity: 0.15,
              userSelect: 'none',
              marginBottom: '0.5rem',
            }}
            aria-hidden="true"
          >
            404
          </p>

          <h1
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2.5rem)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              color: '#111827',
              marginBottom: '1rem',
            }}
          >
            Página no encontrada
          </h1>

          <p
            style={{
              fontSize: '1rem',
              lineHeight: 1.65,
              color: '#6B7280',
              marginBottom: '2.5rem',
            }}
          >
            La dirección que buscás no existe o fue movida.
            <br />
            Podés volver al inicio o explorar nuestro catálogo.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/"
              style={{
                display: 'inline-block',
                backgroundColor: '#5E0F29',
                color: '#ffffff',
                fontWeight: 500,
                fontSize: '0.9375rem',
                padding: '12px 28px',
                borderRadius: '6px',
                textDecoration: 'none',
                transition: 'background-color 150ms ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#4a0b20';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = '#5E0F29';
              }}
            >
              Volver al inicio
            </Link>

            <Link
              to="/catalogo"
              style={{
                display: 'inline-block',
                border: '1px solid #5E0F29',
                color: '#5E0F29',
                fontWeight: 500,
                fontSize: '0.9375rem',
                padding: '12px 28px',
                borderRadius: '6px',
                textDecoration: 'none',
                backgroundColor: 'transparent',
                transition: 'background-color 150ms ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  'rgba(94,15,41,0.06)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
              }}
            >
              Ver catálogo
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
