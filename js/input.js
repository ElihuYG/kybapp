// js/input.js - Sistema de controles WASD

// Estado actual de las teclas
const input = {
    // Teclas principales
    left: false,      // A
    right: false,     // D  
    up: false,        // W
    down: false,      // S
    jump: false,      // Espaciadora
    
    // Detectar cuando se presiona por primera vez
    leftPressed: false,
    rightPressed: false,
    upPressed: false,
    downPressed: false,
    jumpPressed: false
};

// Función para detectar cuando se presiona una tecla
function handleKeyDown(event) {
    switch(event.code) {
        case 'KeyA':
            if (!input.left) input.leftPressed = true;
            input.left = true;
            event.preventDefault();
            break;
            
        case 'KeyD':
            if (!input.right) input.rightPressed = true;
            input.right = true;
            event.preventDefault();
            break;
            
        case 'KeyW':
            if (!input.up) input.upPressed = true;
            input.up = true;
            event.preventDefault();
            break;
            
        case 'KeyS':
            if (!input.down) input.downPressed = true;
            input.down = true;
            event.preventDefault();
            break;
            
        case 'Space':
            if (!input.jump) input.jumpPressed = true;
            input.jump = true;
            event.preventDefault();
            break;
    }
}

// Función para detectar cuando se suelta una tecla
function handleKeyUp(event) {
    switch(event.code) {
        case 'KeyA':
            input.left = false;
            break;
            
        case 'KeyD':
            input.right = false;
            break;
            
        case 'KeyW':
            input.up = false;
            break;
            
        case 'KeyS':
            input.down = false;
            break;
            
        case 'Space':
            input.jump = false;
            break;
    }
}

// Función para limpiar los "pressed" después de usarlos
function clearInputPressed() {
    input.leftPressed = false;
    input.rightPressed = false;
    input.upPressed = false;
    input.downPressed = false;
    input.jumpPressed = false;
}

// Conectar los eventos
document.addEventListener('keydown', handleKeyDown);
document.addEventListener('keyup', handleKeyUp);

// Prevenir que la página se mueva con las teclas
document.addEventListener('keydown', function(e) {
    if(['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].indexOf(e.code) > -1) {
        e.preventDefault();
    }
}, false);


