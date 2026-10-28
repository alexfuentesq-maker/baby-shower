/* ==========================================
   AF DIGITALES
   BABY SHOWER - OSITOS CARIÑOSITOS
   JAVASCRIPT COMPLETO
========================================== */

"use strict";


/* ==========================================
   1. CONFIGURACIÓN DEL EVENTO
========================================== */

const CONFIG = {

  // Nombre del bebé
  nombreBebe: "Darely Aimee",

  // Fecha del evento
  fecha: {
    anio: 2026,
    mes: 11,
    dia: 28,
    hora: 17,
    minuto: 0
  },

  // Lugar del evento
  salon: "Te esperamos en casa",

  direccion: "Calle Tlaxcala mz 16 lt8",

  // Enlace completo de Google Maps
  googleMaps: "https://maps.app.goo.gl/SHB4DLXjx5sH9WYe8",

  // Número con lada de país, sin + ni espacios
  whatsapp: "5641092477"

};


/* ==========================================
   2. FUNCIONES AUXILIARES
========================================== */

// Buscar elementos por ID
function getElement(id) {
  return document.getElementById(id);
}

// Cambiar texto de forma segura
function setText(id, text) {

  const element = getElement(id);

  if (element) {
    element.textContent = text;
  }

}

// Detectar movimiento reducido
const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);


/* ==========================================
   3. DATOS DE LA INVITACIÓN
========================================== */

setText(
  "babyName",
  CONFIG.nombreBebe
);

setText(
  "venueName",
  CONFIG.salon
);

setText(
  "venueAddress",
  CONFIG.direccion
);


/* ==========================================
   4. FECHA DEL EVENTO
========================================== */

const fechaEvento = new Date(
  CONFIG.fecha.anio,
  CONFIG.fecha.mes - 1,
  CONFIG.fecha.dia,
  CONFIG.fecha.hora,
  CONFIG.fecha.minuto,
  0
);


// Formato del día
const formatoDia = new Intl.DateTimeFormat(
  "es-MX",
  {
    weekday: "long"
  }
);


// Formato del mes
const formatoMes = new Intl.DateTimeFormat(
  "es-MX",
  {
    month: "long",
    year: "numeric"
  }
);


// Formato de la hora
const formatoHora = new Intl.DateTimeFormat(
  "es-MX",
  {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }
);


// Mostrar día de la semana
const dateLabel = document.querySelector(
  ".date-label"
);

if (dateLabel) {

  dateLabel.textContent =
    formatoDia.format(fechaEvento).toUpperCase();

}


// Mostrar número del día
setText(
  "eventDay",
  CONFIG.fecha.dia
);


// Mostrar mes y año
setText(
  "eventMonth",
  formatoMes.format(fechaEvento).toUpperCase()
);


// Mostrar hora
setText(
  "eventTime",
  formatoHora.format(fechaEvento)
);


/* ==========================================
   5. ELEMENTOS DE BIENVENIDA
========================================== */

const welcome = getElement("welcome");

const openButton = getElement("openInvitation");

const heroContent = document.querySelector(
  ".hero-content"
);

const music = getElement("backgroundMusic");

const musicButton = getElement("musicButton");


/* ==========================================
   6. CONTROL DE MÚSICA
========================================== */

function updateMusicButton() {

  if (!music || !musicButton) {
    return;
  }

  const playing = !music.paused;

  musicButton.classList.toggle(
    "playing",
    playing
  );

  musicButton.textContent =
    playing ? "♫" : "♪";

  musicButton.setAttribute(
    "aria-pressed",
    String(playing)
  );

  musicButton.setAttribute(
    "aria-label",
    playing
      ? "Pausar música"
      : "Reproducir música"
  );

}


/* ==========================================
   7. REPRODUCIR MÚSICA
========================================== */

function playMusic() {

  if (!music) {
    return;
  }

  // No esperar la música para abrir la invitación
  music.play()
    .then(() => {

      updateMusicButton();

    })
    .catch(() => {

      console.info(
        "La música no pudo reproducirse."
      );

      updateMusicButton();

    });

}


/* ==========================================
   8. PAUSAR MÚSICA
========================================== */

function pauseMusic() {

  if (!music) {
    return;
  }

  music.pause();

  updateMusicButton();

}


/* ==========================================
   9. BOTÓN DE MÚSICA
========================================== */

if (musicButton && music) {

  musicButton.addEventListener(
    "click",
    () => {

      if (music.paused) {

        playMusic();

      } else {

        pauseMusic();

      }

    }
  );


  music.addEventListener(
    "play",
    updateMusicButton
  );


  music.addEventListener(
    "pause",
    updateMusicButton
  );


  music.addEventListener(
    "ended",
    updateMusicButton
  );

}


/* ==========================================
   10. BLOQUEO INICIAL DEL SCROLL
========================================== */

// Bloquear únicamente mientras está la bienvenida
if (welcome && !welcome.hidden) {

  document.body.classList.add("locked");

} else {

  document.body.classList.remove("locked");

}


/* ==========================================
   11. APERTURA CINEMATOGRÁFICA
========================================== */

// Variable declarada UNA SOLA VEZ
let invitationOpened = false;


// Función para desbloquear el desplazamiento
function unlockScroll() {

  document.body.classList.remove("locked");

  // Eliminar posibles bloqueos anteriores
  document.body.style.overflow = "";

  document.body.style.overflowY = "";

  document.documentElement.style.overflow = "";

  document.documentElement.style.overflowY = "";

  document.body.style.position = "";

  document.body.style.height = "";

  document.documentElement.style.height = "";

}


// Función para finalizar la apertura
function finishOpening() {

  // Ocultar pantalla de bienvenida
  if (welcome) {

    welcome.classList.add("hide");

    welcome.hidden = true;

    welcome.style.display = "none";

  }

  // Desbloquear página
  unlockScroll();

  // Mostrar contenido principal
  if (heroContent) {

    heroContent.classList.add("visible");

  }

  // Regresar al inicio
  window.scrollTo(0, 0);

}


// Función principal
function abrirInvitacion() {

  // Evitar aperturas duplicadas
  if (invitationOpened) {
    return;
  }

  invitationOpened = true;

  // Desactivar botón
  if (openButton) {

    openButton.disabled = true;

  }

  // Activar animación cinematográfica
  if (welcome) {

    welcome.classList.add("opening");

  }

  // Reproducir música sin bloquear la apertura
  playMusic();

  // Duración de la animación
  const duration = reducedMotion.matches
    ? 0
    : 1500;

  // Finalizar después de la animación
  window.setTimeout(
    finishOpening,
    duration
  );

}


// Activar botón
if (openButton) {

  openButton.addEventListener(
    "click",
    abrirInvitacion
  );

}


// Si no existe la bienvenida, permitir scroll
if (!welcome) {

  unlockScroll();

}


/* ==========================================
   12. ANIMACIONES AL DESLIZAR
========================================== */

const revealElements = document.querySelectorAll(
  ".reveal"
);


// Mostrar todos los elementos si el navegador
// no soporta IntersectionObserver
if (!("IntersectionObserver" in window)) {

  revealElements.forEach((element) => {

    element.classList.add("visible");

  });

} else {

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "visible"
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -30px 0px"
    }
  );


  revealElements.forEach((element) => {

    revealObserver.observe(element);

  });

}


/* ==========================================
   13. CUENTA REGRESIVA
========================================== */

const daysElement = getElement("days");

const hoursElement = getElement("hours");

const minutesElement = getElement("minutes");

const secondsElement = getElement("seconds");

const countdownMessage = getElement(
  "countdownMessage"
);


// Actualizar cuenta regresiva
function updateCountdown() {

  const now = new Date();

  const difference =
    fechaEvento.getTime() - now.getTime();


  // Si el evento ya llegó
  if (difference <= 0) {

    setText("days", "00");

    setText("hours", "00");

    setText("minutes", "00");

    setText("seconds", "00");

    setText(
      "countdownMessage",
      "¡Llegó el gran día! 🧸🌈"
    );

    return;

  }


  // Calcular tiempo restante
  const days = Math.floor(
    difference / 86400000
  );

  const hours = Math.floor(
    (difference / 3600000) % 24
  );

  const minutes = Math.floor(
    (difference / 60000) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );


  // Mostrar números
  setText(
    "days",
    String(days).padStart(2, "0")
  );

  setText(
    "hours",
    String(hours).padStart(2, "0")
  );

  setText(
    "minutes",
    String(minutes).padStart(2, "0")
  );

  setText(
    "seconds",
    String(seconds).padStart(2, "0")
  );


  // Limpiar mensaje
  if (countdownMessage) {

    countdownMessage.textContent = "";

  }

}


// Iniciar contador
updateCountdown();


// Actualizar cada segundo
window.setInterval(
  updateCountdown,
  1000
);


/* ==========================================
   14. GOOGLE MAPS
========================================== */

const mapsButton = getElement("mapsButton");


if (mapsButton) {

  if (CONFIG.googleMaps.trim()) {

    mapsButton.href =
      CONFIG.googleMaps.trim();

    mapsButton.target = "_blank";

    mapsButton.rel = "noopener noreferrer";

  } else {

    mapsButton.removeAttribute("href");

    mapsButton.removeAttribute("target");

    mapsButton.style.opacity = "0.6";

    mapsButton.style.cursor = "not-allowed";

    mapsButton.setAttribute(
      "aria-disabled",
      "true"
    );

    mapsButton.addEventListener(
      "click",
      (event) => {

        event.preventDefault();

        alert(
          "La ubicación estará disponible próximamente."
        );

      }
    );

  }

}


/* ==========================================
   15. CONFIRMACIÓN POR WHATSAPP
========================================== */

const rsvpForm = getElement("rsvpForm");


if (rsvpForm) {

  rsvpForm.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      // Obtener nombre
      const guestName = getElement("guestName");

      // Obtener asistencia
      const attendanceSelect = getElement(
        "attendance"
      );


      const name = guestName
        ? guestName.value.trim()
        : "";


      const attendance = attendanceSelect
        ? attendanceSelect.value
        : "";


      // Validar datos
      if (!name || !attendance) {

        alert(
          "Completa los datos para confirmar."
        );

        return;

      }


      // Validar WhatsApp
      if (!CONFIG.whatsapp.trim()) {

        alert(
          "Configura el número de WhatsApp del organizador."
        );

        return;

      }

// Obtener dedicatoria
const dedication = document
  .getElementById("dedication")
  ?.value.trim() || "";

// Crear mensaje de WhatsApp
const message =
  `Hola, soy ${name}.\n\n` +
  `Confirmación de Baby Shower:\n` +
  `Asistencia: ${attendance}\n\n` +
  (
    dedication
      ? `Un deseo para el bebé:\n"${dedication}"\n\n`
      : ""
  ) +
  `¡Con mucho cariño! 💗`;
      // Crear enlace
      const url =
        `https://wa.me/${CONFIG.whatsapp.trim()}?text=` +
        encodeURIComponent(message);


      // Abrir WhatsApp
      window.open(
        url,
        "_blank",
        "noopener,noreferrer"
      );

    }
  );

}


/* ==========================================
   16. PARALLAX DE LA PORTADA
========================================== */

const heroSection = document.querySelector(
  ".hero"
);

const careBears = document.querySelectorAll(
  ".care-bear"
);

const rainbowArc = document.querySelector(
  ".rainbow-arc"
);


let heroScrollScheduled = false;


function updateHeroParallax() {

  heroScrollScheduled = false;


  // Evitar animaciones si el usuario
  // tiene activado movimiento reducido
  if (reducedMotion.matches) {
    return;
  }


  // Verificar que exista la portada
  if (!heroSection) {
    return;
  }


  const rect = heroSection.getBoundingClientRect();


  // No animar si la portada está fuera de pantalla
  if (
    rect.bottom < 0 ||
    rect.top > window.innerHeight
  ) {
    return;
  }


  // Calcular progreso
  const progress = Math.max(
    0,
    Math.min(
      1,
      -rect.top / Math.max(rect.height, 1)
    )
  );


  // Mover ositos
  careBears.forEach((bear, index) => {

    const speed = (index + 1) * 12;

    bear.style.translate =
      `0 ${progress * speed}px`;

  });


  // Mover arcoíris
  if (rainbowArc) {

    rainbowArc.style.translate =
      `0 ${progress * 35}px`;

  }

}


/* ==========================================
   17. ESCENAS ANIMADAS
========================================== */

const animatedScenes = document.querySelectorAll(
  ".animated-scene"
);


if (!("IntersectionObserver" in window)) {

  animatedScenes.forEach((scene) => {

    scene.classList.add("scene-active");

  });

} else {

  const sceneObserver = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "scene-active"
          );

        }

      });

    },
    {
      threshold: 0.15
    }
  );


  animatedScenes.forEach((scene) => {

    sceneObserver.observe(scene);

  });

}


/* ==========================================
   18. PARALLAX ENTRE ESCENAS
========================================== */

const cinematicScenes = document.querySelectorAll(
  ".story-section, .dream-section"
);


let cinematicFramePending = false;


function updateCinematicParallax() {

  cinematicFramePending = false;


  if (reducedMotion.matches) {
    return;
  }


  cinematicScenes.forEach((scene) => {

    const rect = scene.getBoundingClientRect();


    // Solo animar escenas visibles
    if (
      rect.bottom < 0 ||
      rect.top > window.innerHeight
    ) {
      return;
    }


    // Calcular progreso
    const progress =
      (window.innerHeight - rect.top) /
      (window.innerHeight + rect.height);


    const offset =
      (progress - 0.5) * 45;


    // Obtener personajes
    const characters = scene.querySelectorAll(
      ".scene-character"
    );


    characters.forEach((character, index) => {

      const direction =
        index % 2 === 0 ? 1 : -1;


      character.style.translate =
        `${offset * direction * 0.3}px ${offset}px`;

    });

  });

}


/* ==========================================
   19. EVENTO GLOBAL DE SCROLL
========================================== */

// Un solo evento para controlar ambos parallax

window.addEventListener(
  "scroll",
  () => {

    // Parallax de portada
    if (!heroScrollScheduled) {

      heroScrollScheduled = true;

      requestAnimationFrame(
        updateHeroParallax
      );

    }


    // Parallax de escenas
    if (!cinematicFramePending) {

      cinematicFramePending = true;

      requestAnimationFrame(
        updateCinematicParallax
      );

    }

  },
  {
    passive: true
  }
);


// Posiciones iniciales
updateHeroParallax();

updateCinematicParallax();


/* ==========================================
   20. PERSONAJES INTERACTIVOS
========================================== */

const sectionCharacters = document.querySelectorAll(
  ".section-character"
);


if (!("IntersectionObserver" in window)) {

  sectionCharacters.forEach((character) => {

    character.classList.add(
      "character-visible"
    );

  });

} else {

  const characterObserver = new IntersectionObserver(
    (entries, observer) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            "character-visible"
          );

          observer.unobserve(
            entry.target
          );

        }

      });

    },
    {
      threshold: 0.1
    }
  );


  sectionCharacters.forEach((character) => {

    characterObserver.observe(
      character
    );

  });

}


/* ==========================================
   21. DESPEDIDA CON CINCO OSITOS
========================================== */

const farewellCharacters = document.querySelector(
  ".farewell-characters"
);


if (farewellCharacters) {

  if (!("IntersectionObserver" in window)) {

    farewellCharacters.classList.add(
      "characters-visible"
    );

  } else {

    const farewellObserver = new IntersectionObserver(
      (entries, observer) => {

        entries.forEach((entry) => {

          if (entry.isIntersecting) {

            entry.target.classList.add(
              "characters-visible"
            );

            observer.unobserve(
              entry.target
            );

          }

        });

      },
      {
        threshold: 0.1
      }
    );


    farewellObserver.observe(
      farewellCharacters
    );

  }

}


/* ==========================================
   22. SEGURIDAD DEL DESPLAZAMIENTO
========================================== */

// Si la invitación ya fue abierta,
// evitar que vuelva a bloquearse.

window.addEventListener(
  "pageshow",
  () => {

    if (
      invitationOpened ||
      !welcome ||
      welcome.hidden
    ) {

      unlockScroll();

    }

  }
);


/* ==========================================
   23. INICIALIZACIÓN
========================================== */

// Actualizar estado inicial de música
updateMusicButton();

console.info(
  "AF Digitales | Invitación Baby Shower lista 🧸🌈"
);