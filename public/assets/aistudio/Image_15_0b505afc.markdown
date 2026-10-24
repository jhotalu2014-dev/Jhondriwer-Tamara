---
name: Mordisco Ya Operations & POS
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#5a4138'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#8e7167'
  outline-variant: '#e2bfb3'
  surface-tint: '#a83900'
  primary: '#a43700'
  on-primary: '#ffffff'
  primary-container: '#ce4700'
  on-primary-container: '#fffbff'
  inverse-primary: '#ffb59a'
  secondary: '#006e2d'
  on-secondary: '#ffffff'
  secondary-container: '#7cf994'
  on-secondary-container: '#007230'
  tertiary: '#712ae2'
  on-tertiary: '#ffffff'
  tertiary-container: '#8a4cfc'
  on-tertiary-container: '#fffbff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdbcf'
  primary-fixed-dim: '#ffb59a'
  on-primary-fixed: '#380d00'
  on-primary-fixed-variant: '#812900'
  secondary-fixed: '#7ffc97'
  secondary-fixed-dim: '#62df7d'
  on-secondary-fixed: '#002109'
  on-secondary-fixed-variant: '#005320'
  tertiary-fixed: '#eaddff'
  tertiary-fixed-dim: '#d2bbff'
  on-tertiary-fixed: '#25005a'
  on-tertiary-fixed-variant: '#5a00c6'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '500'
    lineHeight: 24px
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: '0'
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
  currency-display:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 34px
    letterSpacing: -0.02em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-tablet: 1rem
  margin: 2rem
  margin-tablet: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

El sistema de diseño para la consola de administración y punto de venta (POS / Cajero) traduce el dinamismo, calidez y agilidad de la aplicación móvil de comida rápida hacia una interfaz operativa de alta densidad, profesional y sin fricciones. 

La personalidad visual combina **eficiencia operativa de grado comercial** con la **calidez apetecible y vibrante** del servicio gastronómico:
- **Agilidad y Precisión:** Diseñado para cajeros, administradores y personal de despacho que requieren procesar órdenes en segundos, validar pagos digitales al instante y monitorear el flujo de cocina sin fatiga visual.
- **Identidad de Marca Confiable:** Mantiene los rasgos identificativos de la app móvil: acentos naranja tostado/quemado, verificación de pagos con identidad Yape (morado característico) y confirmaciones directas en verde esmeralda.
- **Lenguaje Visual:** Moderno-corporativo con toques táctiles y redondeados suaves. La estructura general es limpia sobre fondo neutro slate claro, con tarjetas bien contenidas, botones estilo píldora de alta respuesta y señalética de estado inequívoca bajo norma WCAG 2.2 AA.

## Colors

La paleta cromática está calibrada para jerarquizar acciones críticas, reducir errores en momentos de alta afluencia de pedidos y garantizar ratios de contraste superiores a 4.5:1 en textos e información funcional.

### Roles Funcionales y Semánticos

- **Primario (#D84E0A / #EA580C):** Color insignia del restaurante. Utilizado en acciones prioritarias de navegación, botones de envío/continuación, totales destacados, estados activos del sidebar y bordes sutiles de selección.
- **Éxito y Despacho (#16A34A / #15803D):** Utilizado en el botón "Confirmar Pedido", botones de entrega completada, transacciones cobradas y badges de estado aprobado.
- **Integración Yape (#7C3AED / #6B21A8):** Canal visual exclusivo para validación y conciliación de pagos por Yape. Utilizado en botones de verificación de voucher, modales de QR y etiquetas identificadoras de canal de pago.
- **Advertencia (#D97706):** Señalización de alertas de stock mínimo, órdenes demoradas en cocina o pedidos pendientes de confirmación prolongada.
- **Error / Rechazo (#DC2626):** Cancelación de pedidos, anulación de comprobantes y alertas críticas de sistema.
- **Neutros y Superficies:**
  - Fondo de aplicación / canvas: `#F8FAFC` (Slate 50).
  - Superficies de tarjetas, modales y paneles: `#FFFFFF`.
  - Bordes y separadores sutiles: `#E2E8F0` (Slate 200).
  - Textos secundarios, placeholders y timestamps: `#64748B` (Slate 500).
  - Títulos principales, importes monetarios y texto base: `#0F172A` (Slate 900).

## Typography

El sistema tipográfico se fundamenta en **Inter** para asegurar máxima legibilidad de identificadores de pedidos (`MYA-0001`), cifras numéricas en soles (`S/. 15.00`) y metadatos de tickets en pantallas de escritorio y tablets de punto de venta.

- **Jerarquía y Escaneo Rápido:** Los códigos de pedido y montos utilizan pesos seminegrilla y negrita (`FontWeight: 600` a `800`) para que el cajero y personal de cocina puedan leerlos a una distancia de visualización de 60 a 90 cm.
- **Tipografía Tabular:** Para tablas contables, columnas de importes y contadores temporales, se debe activar la propiedad OpenType `tnum` (tabular numbers) para alinear decimales y ceros de manera impecable.
- **Labels y Badges:** Emplean texto en mayúsculas o estilo sentence-case estricto con `label-md` o `label-sm`, garantizando nitidez sin invadir el espacio del contenido clave.

## Layout & Spacing

El diseño emplea un modelo de **grilla fluida basada en columnas con contenedor estructurado**:

### Breakpoints y Estructura
- **Escritorio Estándar (1440x900px):**
  - **Sidebar:** Fijo a la izquierda con un ancho de 260px, conteniendo el logo oficial 'MORDISCO YA', estatus de caja (Abierta/Cerrada), selector de turno y accesos directos principales.
  - **Área de Trabajo Principal:** Ocupa el ancho restante con margen exterior de `2rem` (`margin`), grilla de 12 columnas con canaletas (`gutter`) de `1.5rem`.
  - **Vistas Específicas:** Tablero Kanban para despacho/cocina con 4 columnas simultáneas de 280px-320px; panel POS en split view (60% catálogo de platos y promociones, 40% comanda en vivo y cobro).
- **Tablet (768px):**
  - **Sidebar:** Se colapsa automáticamente a una barra lateral delgada de 72px con iconos tooltip o accesible mediante drawer toggle.
  - **Canvas:** Margen exterior reducido a `1rem` (`margin-tablet`), canaletas de `1rem` (`gutter-tablet`), grilla reducida a 8 columnas. Las tarjetas kanban permiten scroll horizontal con snap.
- **Ritmo Espacial:**
  - `space-xs` (4px): Espaciado entre iconos y etiquetas de badges.
  - `space-sm` (8px): Espacio entre ítems de listas de ingredientes y complementos.
  - `space-md` (16px): Padding interno de tarjetas de pedidos e inputs de texto.
  - `space-lg` (24px): Padding de tarjetas contenedoras y modales de confirmación Yape.
  - `space-xl` (32px): Separación entre bloques de resumen analítico y tablas principales.

## Elevation & Depth

La interfaz adopta una técnica de **superficies tonales limpias combinadas con sombras ambientales suaves** y bordes de delimitación sutiles (`#E2E8F0`), evitando recargas visuales para un entorno de alta concentración:

- **Nivel 0 (Fondo General):** `#F8FAFC`, superficie plana de absorción sobre la que flotan los paneles.
- **Nivel 1 (Tarjetas Operativas y Filas de Tabla):** Superficie `#FFFFFF` con borde delgado de 1px (`#E2E8F0`) y sombra difusa: `0 1px 3px 0 rgba(15, 23, 42, 0.05), 0 1px 2px -1px rgba(15, 23, 42, 0.05)`.
- **Nivel 2 (Tarjetas Activas, Hover y Tickets en Proceso):** Sombra sutilmente elevada: `0 4px 6px -1px rgba(15, 23, 42, 0.08), 0 2px 4px -2px rgba(15, 23, 42, 0.05)`, con borde perimetral que pasa de neutral a un acento naranja tenue (`rgba(216, 78, 10, 0.3)`).
- **Nivel 3 (Modales de Pago Yape, Comprobantes QR y Menús Flotantes):** Fondo blanco rígido con sombra proyectada amplia `0 20px 25px -5px rgba(15, 23, 42, 0.12), 0 8px 10px -6px rgba(15, 23, 42, 0.08)` y backdrop blur oscuro translúcido (`rgba(15, 23, 42, 0.45)` con desenfoque de 4px).

## Shapes

El lenguaje de formas establece una distinción intencional entre **elementos de acción interactiva** y **contenedores de datos**:

- **Acciones Interactivas (Píldora / Rounded-Full):** Todos los botones primarios, secundarios, switches y chips de filtrado heredan el redondeo extremo de píldora visto en la app móvil (`roundedness: 3` / radio de 9999px), comunicando amabilidad y facilidad de pulsación táctil tanto en tablet como con mouse.
- **Contenedores de Información (Suaves y Estructurados):** Las tarjetas de pedidos, tarjetas de platos y paneles de comanda utilizan `rounded-lg` (16px / 1rem) para aprovechar de manera eficiente el espacio de visualización sin perder suavidad visual.
- **Campos de Entrada (Inputs):** Redondeados a `0.75rem` (12px) con borde neutro definido para brindar claridad de inserción táctil en el punto de venta.

## Components

### 1. Botones (Buttons)
- **Botón Primario (Marca):** Altura 44px (48px en tablet), acabado píldora (`rounded-full`), fondo `#D84E0A`, texto blanco Inter SemiBold, hover `#EA580C`. Utilizado para "Continuar", "Nuevo Pedido", "Guardar Cambios".
- **Botón Confirmar / Despachar:** Acabado píldora, fondo verde `#16A34A`, hover `#15803D`, texto blanco con icono de verificación (`CheckCircle2`).
- **Botón Ver Yape / Comprobante:** Acabado píldora, fondo morado Yape `#7C3AED`, hover `#6B21A8`, texto blanco acompañado del icono de voucher/QR.
- **Botón Secundario / Outline:** Fondo transparente o `#FFFFFF`, borde de 1.5px `#E2E8F0`, texto `#0F172A`, hover `#F1F5F9`.

### 2. Badges de Estado (Status Badges)
Todos los badges combinan icono de 14px + etiqueta de texto visible para cumplir con accesibilidad WCAG 2.2 AA:
- **Pendiente / En Espera:** Fondo `#F1F5F9`, borde `#CBD5E1`, texto `#475569`, icono de reloj.
- **En Preparación (Cocina):** Fondo `#FEF3C7`, borde `#FDE68A`, texto `#92400E`, icono de llama/olla.
- **Listo para Entrega:** Fondo `#EFF6FF`, borde `#BFDBFE`, texto `#1E40AF`, icono de paquete.
- **Entregado / Pagado:** Fondo `#DCFCE7`, borde `#BBF7D0`, texto `#166534`, icono de check.
- **Pago Yape Validado:** Fondo `#F3E8FF`, borde `#E9D5FF`, texto `#6B21A8`, icono de código QR/teléfono.
- **Stock Bajo:** Fondo `#FFFBEB`, borde `#FCD34D`, texto `#B45309`, icono de alerta triangular.

### 3. Tarjetas de Pedido (Order Cards & Kanban)
- Estructura limpia sobre fondo blanco con borde de 1px `#E2E8F0`.
- Encabezado: Código de orden en texto destacado (`MYA-0001`), timestamp y badge de origen (Mostrador / Delivery).
- Cuerpo: Listado indentado de artículos con modificadores legibles (ej. "Broaster + arroz blanco", opciones extras: mayonesa, kétchup).
- Pie de tarjeta: Total monetario en negrita destacado (`currency-display` o `body-lg`) y botones de acción rápida en píldora según la etapa ("Confirmar", "Ver Yape", "Marcar Despachado").

### 4. Tablas Ejecutivas de Administración
- Encabezados en fondo `#F8FAFC`, texto `label-sm` en mayúsculas color `#64748B`.
- Filas de 56px de alto con separador inferior de 1px, efecto hover en `#F8FAFC`.
- Columnas numéricas justificadas a la derecha con formato tabular.
- Paginación fija inferior con recuento total de órdenes, selector de filas por página y botones estilo píldora de página previa/siguiente.

### 5. Campos de Entrada (Input Fields)
- Altura de 42px (46px en tablet), borde de 1.5px `#E2E8F0`, fondo blanco, texto `#0F172A`.
- Estado de foco: borde exterior activo con anillo de resplandor sutil color naranja de marca (`box-shadow: 0 0 0 3px rgba(216, 78, 10, 0.15)`).

### 6. Modal de Validación Yape & QR
- Ventana modal centrada de 480px con superficie blanca y esquinas de 20px.
- Encabezado con distintivo visual en tono `#7C3AED` e indicación de monto exacto a cobrar en soles (`S/. 37.00`).
- Contenedor de código QR enmarcado con borde sutil y campo de entrada rápida para los 4 últimos dígitos de operación o teléfono del comprobante Yape.
- Botones de acción inferior: "Aprobar Pago" (verde `#16A34A`) y "Cerrar" (secundario).