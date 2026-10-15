/**
 * EuroHeaters México - Lógica de Sección de Producto
 * Controlador Serie 8 Touch (Hot Runner)
 * 
 * Funcionalidades:
 * 1. Galería de producto con vistas en miniatura
 * 2. Selector dinámico de zonas y amperaje con cálculo en tiempo real
 * 3. Pestañas de especificaciones y datos técnicos
 * 4. Modal de cotización con validación y emisión de folio
 */

document.addEventListener('DOMContentLoaded', function () {
  iniciarModoOscuro();
  iniciarGaleria();
  iniciarConfigurador();
  iniciarPestanas();
  iniciarModalCotizacion();
});

// Alternador de tema oscuro / claro
function iniciarModoOscuro() {
  const toggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const root = document.documentElement;

  const temaGuardado = localStorage.getItem('eh-theme') || 'light';
  if (temaGuardado === 'dark') {
    root.setAttribute('data-theme', 'dark');
    if (themeIcon) themeIcon.textContent = '☀️';
  } else {
    root.removeAttribute('data-theme');
    if (themeIcon) themeIcon.textContent = '🌙';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      const esOscuro = root.getAttribute('data-theme') === 'dark';
      if (esOscuro) {
        root.removeAttribute('data-theme');
        localStorage.setItem('eh-theme', 'light');
        if (themeIcon) themeIcon.textContent = '🌙';
      } else {
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('eh-theme', 'dark');
        if (themeIcon) themeIcon.textContent = '☀️';
      }
    });
  }
}

/* ==========================================================================
   1. Galería de Imágenes
   ========================================================================== */
function iniciarGaleria() {
  const imagenPrincipal = document.getElementById('mainProductImg');
  const etiquetaVista = document.getElementById('galleryViewBadge');
  const botonesMiniaturas = document.querySelectorAll('.thumb-button');

  const vistas = {
    '1': {
      src: 'assets/images/controller-main.jpg',
      texto: 'Vista Frontal con Pantalla HMI',
      alt: 'Gabinete Rack de 12 zonas con pantalla táctil y módulos digitales'
    },
    '2': {
      src: 'assets/images/controller-module.jpg',
      texto: 'Módulo de Control Extraíble',
      alt: 'Tarjeta modular de temperatura con doble display digital y disipador'
    },
    '3': {
      src: 'assets/images/controller-rear.jpg',
      texto: 'Panel Posterior con Conexiones Harting',
      alt: 'Panel posterior con conectores multipolares industriales Harting'
    }
  };

  botonesMiniaturas.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const vistaId = btn.getAttribute('data-view');
      const datos = vistas[vistaId];

      if (!datos) return;

      // Actualizar botón activo
      botonesMiniaturas.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Transición suave de cambio de imagen
      imagenPrincipal.style.opacity = '0.4';
      setTimeout(function () {
        imagenPrincipal.src = datos.src;
        imagenPrincipal.alt = datos.alt;
        if (etiquetaVista) etiquetaVista.textContent = datos.texto;
        imagenPrincipal.style.opacity = '1';
      }, 120);
    });
  });
}

/* ==========================================================================
   2. Configurador de Zonas y Potencia
   ========================================================================== */
const estadoConfigurador = {
  zonas: 12,
  amperaje: 15
};

const datosGabinetes = {
  '4': {
    potenciaBase: 8.8,
    gabinete: 'Rack Compacto 19" (3U)',
    disponibilidad: 'Stock Inmediato'
  },
  '8': {
    potenciaBase: 17.6,
    gabinete: 'Rack Industrial 19" (4U)',
    disponibilidad: 'Stock Inmediato'
  },
  '12': {
    potenciaBase: 26.4,
    gabinete: 'Rack Modular 19" (6U)',
    disponibilidad: 'Stock Inmediato'
  },
  '24': {
    potenciaBase: 52.8,
    gabinete: 'Gabinete Torre 19" (12U)',
    disponibilidad: '2 a 3 Días Hábiles'
  },
  '48': {
    potenciaBase: 105.6,
    gabinete: 'Gabinete de Piso (24U)',
    disponibilidad: 'Fabricación 5 Días'
  }
};

function iniciarConfigurador() {
  const chipsZonas = document.querySelectorAll('.zone-chip');
  const chipsAmperaje = document.querySelectorAll('.amp-chip');

  const displayPotencia = document.getElementById('specLivePower');
  const displayGabinete = document.getElementById('specLiveRack');
  const displayDisponibilidad = document.getElementById('specLiveDelivery');
  const resumenModal = document.getElementById('modalPrefillSummary');
  const selectModalZonas = document.getElementById('selectModalZones');

  function actualizarCalculo() {
    const info = datosGabinetes[estadoConfigurador.zonas] || datosGabinetes['12'];
    
    // Si se seleccionan 30 Amperes, se duplica la capacidad de entrega
    let potenciaCalculada = info.potenciaBase;
    if (estadoConfigurador.amperaje === 30) {
      potenciaCalculada = potenciaCalculada * 2;
    }

    if (displayPotencia) {
      displayPotencia.textContent = potenciaCalculada.toFixed(1) + ' kW';
    }
    if (displayGabinete) {
      displayGabinete.textContent = info.gabinete;
    }
    if (displayDisponibilidad) {
      displayDisponibilidad.textContent = info.disponibilidad;
    }

    // Actualizar texto informativo del modal
    if (resumenModal) {
      resumenModal.innerHTML = `Configuración elegida: <strong>${estadoConfigurador.zonas} Zonas</strong> | <strong>${estadoConfigurador.amperaje} Amperes</strong> | ${info.gabinete}`;
    }

    // Sincronizar el select del modal
    if (selectModalZonas) {
      selectModalZonas.value = String(estadoConfigurador.zonas);
    }
  }

  // Eventos para selección de número de zonas
  chipsZonas.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chipsZonas.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      estadoConfigurador.zonas = parseInt(chip.getAttribute('data-zones'), 10);
      actualizarCalculo();
    });
  });

  // Eventos para selección de amperaje
  chipsAmperaje.forEach(function (chip) {
    chip.addEventListener('click', function () {
      chipsAmperaje.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      estadoConfigurador.amperaje = parseInt(chip.getAttribute('data-amp'), 10);
      actualizarCalculo();
    });
  });

  // Inicializar estado
  actualizarCalculo();
}

/* ==========================================================================
   3. Pestañas de Especificaciones Técnicas
   ========================================================================== */
function iniciarPestanas() {
  const botonesPestanas = document.querySelectorAll('.tab-trigger');
  const panelesPestanas = document.querySelectorAll('.tab-panel');

  botonesPestanas.forEach(function (btn) {
    btn.addEventListener('click', function () {
      const objetivoId = btn.getAttribute('data-tab');

      botonesPestanas.forEach(b => b.classList.remove('active'));
      panelesPestanas.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const panelObjetivo = document.getElementById(objetivoId);
      if (panelObjetivo) {
        panelObjetivo.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   4. Modal de Cotización
   ========================================================================== */
function iniciarModalCotizacion() {
  const modal = document.getElementById('quoteModal');
  const botonesAbrir = document.querySelectorAll('.trigger-quote-modal');
  const botonCerrar = document.getElementById('closeModalBtn');
  const botonTerminar = document.getElementById('btnFinishModal');

  const formulario = document.getElementById('quoteForm');
  const seccionFormulario = document.getElementById('formSection');
  const seccionExito = document.getElementById('successSection');
  const spanFolio = document.getElementById('folioSpan');
  const btnEnviar = document.getElementById('btnSubmitForm');

  function abrirModal() {
    if (!modal) return;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function cerrarModal() {
    if (!modal) return;
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  botonesAbrir.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      abrirModal();
    });
  });

  if (botonCerrar) botonCerrar.addEventListener('click', cerrarModal);
  if (botonTerminar) botonTerminar.addEventListener('click', cerrarModal);

  // Cerrar al hacer clic fuera de la tarjeta
  if (modal) {
    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        cerrarModal();
      }
    });
  }

  // Cerrar con tecla Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      cerrarModal();
    }
  });

  // Procesamiento del formulario
  if (formulario) {
    formulario.addEventListener('submit', function (e) {
      e.preventDefault();

      // Efecto de envío
      btnEnviar.textContent = 'Enviando requerimiento...';
      btnEnviar.disabled = true;

      setTimeout(function () {
        // Generar un número de folio aleatorio realista
        const numeroFolio = 'EH-COT-' + Math.floor(100000 + Math.random() * 900000);
        if (spanFolio) spanFolio.textContent = numeroFolio;

        seccionFormulario.style.display = 'none';
        seccionExito.style.display = 'block';

        btnEnviar.textContent = 'Enviar Solicitud a Ingeniería';
        btnEnviar.disabled = false;
      }, 700);
    });
  }
}
