// Fecha del evento (año, mes [0-11], día, hora, minuto)
const eventDate = new Date(2025, 6, 20, 20, 0, 0);

// Función para actualizar el contador
function updateCountdown() {
    const now = new Date();
    const difference = eventDate - now;
    
    // Si la fecha ya pasó
    if (difference <= 0) {
        document.getElementById('days').innerText = '00';
        document.getElementById('hours').innerText = '00';
        document.getElementById('minutes').innerText = '00';
        document.getElementById('seconds').innerText = '00';
        return;
    }
    
    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    
    document.getElementById('days').innerText = days < 10 ? `0${days}` : days;
    document.getElementById('hours').innerText = hours < 10 ? `0${hours}` : hours;
    document.getElementById('minutes').innerText = minutes < 10 ? `0${minutes}` : minutes;
    document.getElementById('seconds').innerText = seconds < 10 ? `0${seconds}` : seconds;
}

// Actualizar el contador cada segundo
setInterval(updateCountdown, 1000);
updateCountdown();

// Menú móvil
const menuToggle = document.getElementById('menuToggle');
const mobileNav = document.getElementById('mobileNav');
const mobileLinks = document.querySelectorAll('.mobile-link');

menuToggle.addEventListener('click', () => {
    mobileNav.style.display = mobileNav.style.display === 'block' ? 'none' : 'block';
    menuToggle.innerHTML = mobileNav.style.display === 'block' ? 
        '<i class="fas fa-times"></i>' : 
        '<i class="fas fa-bars"></i>';
});

// Cerrar menú al hacer clic en un enlace
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.style.display = 'none';
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Mostrar/ocultar campo de número de invitados según asistencia
const attendanceRadios = document.querySelectorAll('input[name="attendance"]');
const guestsGroup = document.getElementById('guestsGroup');

attendanceRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        if (e.target.value === 'yes') {
            guestsGroup.style.display = 'block';
        } else {
            guestsGroup.style.display = 'none';
        }
    });
});

// Formulario RSVP
const rsvpForm = document.getElementById('rsvpForm');
const toast = document.getElementById('toast');
const toastClose = document.getElementById('toastClose');

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Aquí normalmente enviarías los datos a un servidor
    // Por ahora solo mostraremos la notificación
    
    // Mostrar toast
    toast.classList.add('show');
    
    // Ocultar toast después de 5 segundos
    setTimeout(() => {
        toast.classList.remove('show');
    }, 5000);
    
    // Resetear formulario
    rsvpForm.reset();
});

// Cerrar toast al hacer clic en el botón de cerrar
toastClose.addEventListener('click', () => {
    toast.classList.remove('show');
});

// Actualizar año en el footer
document.getElementById('currentYear').innerText = new Date().getFullYear();

// Añadir al final de script.js
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const hero = document.querySelector('.hero');
    const headerHeight = header.offsetHeight; // Obtiene la altura del header
    hero.style.paddingTop = `${headerHeight + 20}px`; // Añade un poco de margen extra
});
// Animación de desplazamiento de secciones
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.hero, .invitation, .details, .gallery, .rsvp');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});

// Efectos de sonido para interacciones
function playHoverSound() {
    const audio = new Audio('hover-sound.mp3');
    audio.volume = 0.2;
    audio.play();
}

// Añadir eventos de sonido a elementos interactivos
document.querySelectorAll('a, button, .gallery-item').forEach(element => {
    element.addEventListener('mouseover', playHoverSound);
});

// Animación de texto de bienvenida
function typeWriterEffect() {
    const quote = document.querySelector('.quote');
    if (quote) {
        const text = quote.textContent;
        quote.textContent = '';
        let index = 0;

        function type() {
            if (index < text.length) {
                quote.textContent += text.charAt(index);
                index++;
                setTimeout(type, 50);
            }
        }

        type();
    }
}

// Llamar a efectos al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    typeWriterEffect();
});

// Efecto de partículas de fondo (opcional, requiere librería)
function createBackgroundParticles() {
    const heroSection = document.querySelector('.hero');
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDuration = `${Math.random() * 5 + 3}s`;
        particle.style.opacity = Math.random();
        heroSection.appendChild(particle);
    }
}

// Descomentar si se desea agregar partículas
// createBackgroundParticles();