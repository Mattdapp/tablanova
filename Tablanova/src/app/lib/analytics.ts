// Helper de analytics — dispara eventos a Google Analytics 4 (gtag cargado en index.html)
type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
    dataLayer?: unknown[];
  }
}

/**
 * Registra un clic en cualquier CTA de WhatsApp como evento `whatsapp_click`.
 * `source` identifica desde dónde se hizo clic (ej: 'home_hero', 'catalogo_producto').
 * En GA4 → Administrar → Eventos, marcar `whatsapp_click` como evento clave (conversión).
 */
export function trackWhatsApp(source: string) {
  window.gtag?.('event', 'whatsapp_click', { source });
}
