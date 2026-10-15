# Entrega - Prueba Técnica EuroHeaters México

**Candidato:** Sebastian Tixe  
**Proyecto:** Sección de Producto B2B - Controlador Serie 8 Touch  
**Referencia:** [EuroHeaters México](https://www.euroheaters.mx/index.php/productos/controladores)  

---

## Resumen del Proyecto

Desarrollo de una landing/sección de producto técnico para el sector industrial (Hot Runner / inyección de plástico). La interfaz está pensada para compradores técnicos (ingenieros de planta, mantenimiento y compras), priorizando especificaciones técnicas claras, cálculo de potencia en tiempo real y solicitud de cotización sin fricción.

### Estructura de Archivos

* **Página principal:** [index.html](index.html)
* **Estilos:** [assets/css/styles.css](assets/css/styles.css) (CSS nativo, responsive, soporte tema claro y oscuro)
* **Lógica interactiva:** [assets/js/main.js](assets/js/main.js) (Vanilla JS)
* **Imágenes:** `assets/images/`

---

## Aspectos Clave de la Solución

1. **Enfoque Técnico B2B:**
   - La toma de decisiones en planta requiere datos concretos de compatibilidad (voltaje, corriente, tipo de termocupla J/K).
   - Se destacan funciones de protección como el arranque suave (*Soft-Start*) y el respaldo por falla de termocupla (*Fail-Safe*).

2. **Interactividad:**
   - **Galería Multi-ángulo:** Vistas del panel frontal, módulo extraíble y panel posterior de conexiones Harting.
   - **Configurador de Zonas:** Cálculo instantáneo de potencia estimada (kW) y tamaño de rack sugerido según el número de zonas (4 a 48) y amperaje.
   - **Modal de Cotización:** Precarga automática de la configuración seleccionada para agilizar el contacto con ventas/ingeniería.
   - **Tema Claro / Oscuro:** Alternador de interfaz con persistencia en `localStorage`.

3. **Sin Dependencias:**
   - Construido 100% con HTML5 semántico, CSS3 y JavaScript ES6+. No requiere instalación de paquetes (`npm install`) ni compiladores; basta con abrir `index.html` en el navegador.

---

## Cómo Probar el Proyecto

- **Directo:** Abrir `index.html` en cualquier navegador.
- **Servidor local (opcional):**
  ```bash
  npx serve
  # o con python:
  python -m http.server 8000
  ```
