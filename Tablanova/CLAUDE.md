# Tablanova — Design Guidelines

## Concepto
Identidad visual 100% Tablanova. Estructura, ritmo y animaciones inspirados en Livohaus (https://livohaus.framer.website/).
Moderno, limpio, con mucho respiro. Sin ruido visual. Cada elemento justifica su lugar.

---

## Color Palette — IDENTIDAD TABLANOVA (no modificar)

```
--color-bordeaux:     #5E0F29   — acento primario fuerte, CTAs principales
--color-mustard:      #DB8F33   — acento secundario, highlights, iconos
--color-dark-green:   #414B28   — tercer acento, secciones de categoría agro
--color-beige:        #E8DCC8   — fondos de sección alternados
--color-beige-light:  #F5F0E8   — fondo principal en secciones claras
--color-text:         #111827   — texto principal
--color-text-muted:   #6B7280   — texto de apoyo, labels
--color-border:       #D1C4A8   — bordes sutiles sobre beige
--color-white:        #FFFFFF   — fondo base
```

### Regla de fondos por sección
- Hero: fondo oscuro usando `--color-bordeaux` o `#1a0a0f` (bordeaux muy oscuro)
- Secciones principales: `--color-beige-light` (`#F5F0E8`)
- Secciones alternadas: `--color-beige` (`#E8DCC8`)
- Secciones de impacto/CTA: `--color-dark-green` (`#414B28`) con texto blanco
- Nunca usar blanco puro (`#fff`) como fondo de sección completa — usar `#F5F0E8` mínimo

---

## Tipografía — estilo Livohaus

### Font Stack
```css
font-family: 'Inter', sans-serif;
```
Inter en toda la web, familia completa (100–900, italic incluido).
Importar desde Google Fonts con variable font: `ital,opsz,wght@0,14..32,100..900;1,14..32,100..900`.

### Escala tipográfica
- **H1:** `clamp(2.5rem, 6vw, 4.5rem)` — weight 600, line-height 1.05, letter-spacing -0.03em
- **H2:** `clamp(2rem, 4.5vw, 3rem)` — weight 600, line-height 1.1, letter-spacing -0.02em
- **H3:** `clamp(1.25rem, 2.5vw, 1.75rem)` — weight 500, line-height 1.2
- **Body:** `1rem (16px)` — weight 400, line-height 1.65
- **Label/Tag:** `0.75rem`, weight 500, uppercase, letter-spacing 0.08em
- **Caption:** `0.875rem`, weight 400, `--color-text-muted`

### Reglas
- Títulos grandes: tracking negativo (`-0.02em` a `-0.03em`) — da el aspecto compacto y moderno de Livohaus
- Cuerpo de texto: nunca menor a 16px en mobile
- Sin fuentes decorativas ni serif

---

## Layout & Estructura — al estilo Livohaus

### Breakpoints
- Mobile: `max-width: 809px`
- Tablet: `810px – 1199px`
- Desktop: `min-width: 1200px`

### Container
- Max-width: `1200px`, centrado, padding `0 24px` (mobile: `0 16px`)

### Ritmo de secciones
- Padding de sección: `120px 0` desktop → `80px 0` tablet → `60px 0` mobile
- Gap entre título de sección y contenido: `48px` desktop, `32px` mobile
- Las secciones se alternan entre fondo claro y oscuro (como en Livohaus) para crear ritmo visual

### Grilla
- Desktop: 12 columnas, gap `24px`
- Tablet: 8 columnas
- Mobile: 4 columnas (stack completo)

---

## Animaciones — clave del estilo Livohaus

### Principios
- **Entrada de elementos:** `opacity: 0 → 1` + `translateY(24px → 0)`, triggered al hacer scroll (Intersection Observer)
- **Duración:** `400ms`, easing `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out fuerte)
- **Stagger:** elementos en lista se animan con `delay` de `80ms` entre cada uno
- **Smooth scroll:** usar `lenis` (ya está en el proyecto como dependencia de Livohaus)
- **Hover en cards:** `translateY(-4px)`, `200ms ease`
- **Hover en botones:** transición de background/border en `150ms`

### Qué NO animar
- Sin rotaciones, sin escala, sin bouncing
- Sin animaciones de más de `500ms`
- Sin parallax agresivo (sutil o ninguno)
- Sin loaders de página completa

---

## Componentes

### Botones
- **Primary:** bg `--color-bordeaux`, texto blanco, `border-radius: 6px`, padding `12px 28px`, weight 500
- **Secondary:** bg `--color-mustard`, texto `#111827`, mismo border-radius
- **Ghost/Outline:** border `1px solid --color-bordeaux`, texto `--color-bordeaux`, bg transparente
- Hover primary: oscurecer 10% (`#4a0b20`)
- Sin border-radius mayor a `8px` — sin pills

### Cards
- Background: `--color-white` o `--color-beige-light`
- Border: `1px solid --color-border` (`#D1C4A8`)
- Border-radius: `12px`
- Sin sombras fuertes — si se usa sombra: `0 1px 4px rgba(0,0,0,0.08)`
- Padding: `32px` desktop, `24px` mobile
- Hover: `translateY(-4px)` + sombra leve más pronunciada

### Navigation
- Background: `#F5F0E8` (beige-light) con `backdrop-filter: blur(12px)` al hacer scroll
- Sticky
- Logo: `--color-bordeaux`
- Links: `--color-text-muted`, hover: `--color-bordeaux`
- CTA en nav: botón Primary bordeaux

### Tags / Badges
- `background: rgba(94,15,41,0.08)` (bordeaux tenue), texto `--color-bordeaux`
- Texto uppercase, 0.75rem, weight 500
- `border-radius: 4px`, padding `4px 10px`

### Separadores de sección
- Usar cambio de fondo entre secciones, no líneas horizontales
- Si se necesita divisor visual: `1px solid --color-border` muy sutil

---

## Reglas generales de estilo

1. **Respiro generoso** — whitespace es parte del diseño, no un desperdicio
2. **Un acento por sección** — no mezclar bordeaux + mustard + green en el mismo bloque
3. **Imágenes full-bleed** donde sea posible — sin marcos decorativos
4. **Sin gradientes** en texto (no `background-clip: text`)
5. **Iconos: Lucide** — ya instalado. Tamaño default 20px
6. **Fotos del producto** sobre fondo beige, nunca sobre blanco puro
7. **Tipografía como elemento visual** — los H1 grandes son parte del diseño, no solo texto

---

## Lo que NO hacer

- No usar `#ffffff` puro como fondo principal — usar `#F5F0E8` mínimo
- No mezclar 3+ colores de la paleta en un mismo componente
- No usar `border-radius` > 12px en cards, > 8px en botones
- No usar sombras con `blur` > 20px o `spread` > 0
- No centrar párrafos de más de 2 líneas
- No usar gradientes de fondo entre los colores de marca
- No agregar animaciones a elementos que ya están visibles al cargar (solo los que entran con scroll)

---

## Stack del proyecto
- Framework: React + Vite
- Estilos: TailwindCSS v4 + CSS custom properties
- Componentes base: shadcn/ui
- Iconos: Lucide React
- Archivos clave:
  - `src/styles/globals.css` — variables y base styles
  - `src/app/components/` — componentes
  - `src/app/pages/` — páginas
