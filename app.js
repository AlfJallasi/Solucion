// =========================================================================
// MODULO DE AUTENTICACION INSTITUCIONAL
// =========================================================================

// Credenciales registradas en la arquitectura:
// Usuario:     evaluacion2026
// Contrasena:  GitAccess#Valid

document.addEventListener("DOMContentLoaded", () => {
    const claveStorage = "tiempoLimiteExamen2026";
    if (localStorage.getItem(claveStorage)) {
        desbloquearPortal(false);
    }
});

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const user = document.getElementById('usuario').value.trim();
    const pass = document.getElementById('password').value.trim();
    const msg = document.getElementById('mensaje');

    if (user === "evaluacion2026" && pass === "GitAccess#Valid") {
        msg.innerHTML = "";
        desbloquearPortal(true);
    } else {
        msg.className = "error";
        msg.innerText = "Credenciales incorrectas. Verifique el codigo fuente.";
    }
});

function desbloquearPortal(esPrimeraVez) {
    document.getElementById('loginForm').style.display = 'none';
    document.getElementById('panelExito').style.display = 'block';

    const cardAviso = document.getElementById('cardAviso');
    const boxImagen = document.getElementById('boxImagenAcceso');

    if (cardAviso && boxImagen) {
        cardAviso.style.display = 'none';
        boxImagen.style.display = 'block';
    }

    iniciarCronometroInmutable(2 * 60 * 60, esPrimeraVez);
}

function iniciarCronometroInmutable(duracionSegundos, esPrimeraVez) {
    const claveStorage = "tiempoLimiteExamen2026";
    let horaFinal = localStorage.getItem(claveStorage);

    if (!horaFinal || esPrimeraVez) {
        if (!horaFinal) {
            horaFinal = Date.now() + (duracionSegundos * 1000);
            localStorage.setItem(claveStorage, horaFinal);
        }
    } else {
        horaFinal = parseInt(horaFinal, 10);
    }

    const timerElement = document.getElementById("timerDisplay");

    const intervalo = setInterval(() => {
        const ahora = Date.now();
        const restanteMs = horaFinal - ahora;

        if (restanteMs <= 0) {
            clearInterval(intervalo);
            timerElement.innerText = "00:00:00";
            timerElement.style.color = "#ef4444";
            alert("TIEMPO AGOTADO: El protocolo de eliminacion ha finalizado.");
            return;
        }

        const totalSegundos = Math.floor(restanteMs / 1000);
        const horas = Math.floor(totalSegundos / 3600);
        const minutos = Math.floor((totalSegundos % 3600) / 60);
        const segundos = totalSegundos % 60;

        timerElement.innerText = 
            String(horas).padStart(2, '0') + ":" + 
            String(minutos).padStart(2, '0') + ":" + 
            String(segundos).padStart(2, '0');
    }, 1000);
}