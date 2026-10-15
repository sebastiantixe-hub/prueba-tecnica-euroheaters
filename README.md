# EuroHeaters México - Controlador Serie 8 Touch

Landing y sección de producto industrial orientada a sistemas de colada caliente (*Hot Runner*) para moldes de inyección de plástico. Desarrollado como parte de la prueba técnica de diseño y desarrollo web.

Demostración en vivo basada en el catálogo de productos de [EuroHeaters México](https://www.euroheaters.mx/index.php/productos/controladores).

---

## Características

- **Diseño Responsivo:** Adaptado a pantallas de escritorio, tablets y dispositivos móviles.
- **Configurador de Zonas:** Cálculo dinámico de potencia térmica (kW) y tipo de rack en base al número de zonas (4 a 48) y amperaje seleccionado (15A / 30A).
- **Galería Interactiva:** Alternador de vistas (rack frontal HMI, módulo de control individual y panel posterior con conectores Harting).
- **Pestañas de Especificaciones:** Tablas técnicas, métricas operativas y datos de soporte local.
- **Modal de Cotización:** Formulario con precarga automática de la configuración activa y generación de folio.
- **Modo Oscuro / Claro:** Alternador visual con almacenamiento de preferencia en `localStorage`.

---

## Tecnologías Utilizadas

- **HTML5:** Marcado semántico y estructura accesible.
- **CSS3:** Custom properties (variables CSS), Flexbox, CSS Grid y media queries para diseño responsivo.
- **JavaScript (ES6+):** Lógica nativa sin librerías externas ni frameworks pesados.

---

## Estructura del Proyecto

```text
├── index.html                   # Documento HTML principal
├── README.md                    # Documentación del proyecto
├── ENTREGA_PRUEBA_TECNICA.md    # Resumen de entrega técnica
└── assets/
    ├── css/
    │   └── styles.css           # Estilos generales y variables
    ├── js/
    │   └── main.js              # Interactividad y eventos
    └── images/                  # Recursos gráficos del equipo
        ├── controller-main.jpg
        ├── controller-module.jpg
        └── controller-rear.jpg
```

---

## Visualización Local

No requiere dependencias ni compilación.

1. Abrir directamente `index.html` en el navegador.
2. O iniciar un servidor estático local:
   ```bash
   npx serve
   # o
   python -m http.server
   ```
