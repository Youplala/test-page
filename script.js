// Configuration
const hearts = ['💕', '💖', '💗', '💓', '💝', '💞', '💘'];
const fireworkColors = ['#FFB3D9', '#FFC8DD', '#FFAFCC', '#E4C1F9', '#D0D1FF', '#FFF6B7'];

// DOM Elements
const authScreen = document.getElementById('authScreen');
const authForm = document.getElementById('authForm');
const passwordInput = document.getElementById('passwordInput');
const authError = document.getElementById('authError');
const questionScreen = document.getElementById('questionScreen');
const celebrationScreen = document.getElementById('celebrationScreen');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const hintText = document.getElementById('hintText');
const heartsContainer = document.getElementById('heartsContainer');
const imageUpload = document.getElementById('imageUpload');
const coupleImage = document.getElementById('coupleImage');
const fireworksContainer = document.getElementById('fireworks');
const heartsExplosion = document.getElementById('heartsExplosion');
const secretBtn = document.getElementById('secretBtn');
const horrorScreen = document.getElementById('horrorScreen');
const bloodDrip = document.getElementById('bloodDrip');

// Hardcoded password
const CORRECT_PASSWORD = 'cacaboudin';

// Authentication
authForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const enteredPassword = passwordInput.value.trim();

    if (enteredPassword === CORRECT_PASSWORD) {
        // Correct password
        authError.textContent = '';
        authScreen.classList.remove('active');
        document.body.classList.remove('auth-active');

        setTimeout(() => {
            questionScreen.classList.add('active');
        }, 500);
    } else {
        // Wrong password
        authError.textContent = 'Incorrect password. Please try again.';
        passwordInput.value = '';
        passwordInput.focus();
    }
});

// Hint messages when trying to click "No"
const hints = [
    "Eh non",
    "Loser",
    "T'abuse là",
    "Forceuse 🙄",
    "Ah ouais tu veux vraiment pas",
    "Abrège frère",
    "Sérieux?",
    "Arrête un peu",
    "Allez quoi 🥺",
    "C'est non"
];

let hintIndex = 0;
let noButtonAttempts = 0;

// Initialize floating hearts background
function createFloatingHearts() {
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('floating-heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
        heart.style.fontSize = (Math.random() * 15 + 15) + 'px';
        heart.style.animationDelay = Math.random() * 2 + 's';

        heartsContainer.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 10000);
    }, 400);
}


// Move "No" button away from cursor
function moveNoButton() {
    // First time - set up the button for movement
    if (!noBtn.classList.contains('moving')) {
        const rect = noBtn.getBoundingClientRect();
        noBtn.classList.add('moving');
        noBtn.style.left = rect.left + 'px';
        noBtn.style.top = rect.top + 'px';
    }

    // Move to a random position in a safe zone
    setTimeout(() => {
        const vw = window.innerWidth;
        const vh = window.innerHeight;

        // Define safe zone (20% from edges, 60% of screen in middle)
        const safeZoneLeft = vw * 0.15;
        const safeZoneRight = vw * 0.70;
        const safeZoneTop = vh * 0.15;
        const safeZoneBottom = vh * 0.75;

        // Random position within safe zone
        const randomX = safeZoneLeft + Math.random() * (safeZoneRight - safeZoneLeft);
        const randomY = safeZoneTop + Math.random() * (safeZoneBottom - safeZoneTop);

        // Apply position
        noBtn.style.left = Math.floor(randomX) + 'px';
        noBtn.style.top = Math.floor(randomY) + 'px';
    }, 10);

    // Show random hint
    hintText.textContent = hints[hintIndex];
    hintIndex = (hintIndex + 1) % hints.length;

    // Make Yes button bigger with each attempt
    noButtonAttempts++;
    if (noButtonAttempts > 3) {
        const scale = 1 + (noButtonAttempts - 3) * 0.1;
        yesBtn.style.transform = `scale(${Math.min(scale, 1.5)})`;
    }
}

// No button event listeners - prevent clicking
noBtn.addEventListener('mouseenter', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveNoButton();
});

noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    moveNoButton();
});

// Yes button click - celebration!
yesBtn.addEventListener('click', () => {
    // Hide question screen
    questionScreen.classList.remove('active');

    // Show celebration screen
    setTimeout(() => {
        celebrationScreen.classList.add('active');
        startCelebration();
    }, 300);
});

// Celebration effects
function startCelebration() {
    // Create fireworks
    createFireworks();

    // Create heart explosion
    setTimeout(() => {
        createHeartExplosion();
    }, 500);

    // Continue fireworks for a while
    const fireworkInterval = setInterval(() => {
        createFireworks();
    }, 1000);

    setTimeout(() => {
        clearInterval(fireworkInterval);
    }, 5000);
}

function createFireworks() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const x = centerX + (Math.random() - 0.5) * 400;
            const y = centerY + (Math.random() - 0.5) * 300;

            for (let j = 0; j < 30; j++) {
                const firework = document.createElement('div');
                firework.classList.add('firework');

                const angle = (Math.PI * 2 * j) / 30;
                const velocity = 100 + Math.random() * 100;
                const tx = Math.cos(angle) * velocity;
                const ty = Math.sin(angle) * velocity;

                firework.style.left = x + 'px';
                firework.style.top = y + 'px';
                firework.style.setProperty('--tx', tx + 'px');
                firework.style.setProperty('--ty', ty + 'px');
                firework.style.backgroundColor = fireworkColors[Math.floor(Math.random() * fireworkColors.length)];

                fireworksContainer.appendChild(firework);

                setTimeout(() => {
                    firework.remove();
                }, 1500);
            }
        }, i * 300);
    }
}

function createHeartExplosion() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    for (let i = 0; i < 50; i++) {
        const heart = document.createElement('div');
        heart.classList.add('exploding-heart');
        heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];

        const angle = (Math.PI * 2 * i) / 50;
        const distance = 200 + Math.random() * 300;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        heart.style.left = centerX + 'px';
        heart.style.top = centerY + 'px';
        heart.style.setProperty('--tx', tx + 'px');
        heart.style.setProperty('--ty', ty + 'px');
        heart.style.animationDelay = (Math.random() * 0.5) + 's';

        heartsExplosion.appendChild(heart);

        setTimeout(() => {
            heart.remove();
        }, 2500);
    }
}

// Secret button - activate horror screen
secretBtn.addEventListener('click', () => {
    // Hide celebration screen
    celebrationScreen.classList.remove('active');

    // Show horror screen with delay
    setTimeout(() => {
        horrorScreen.classList.add('active');
        startHorror();
    }, 500);
});

// Horror effects
function startHorror() {
    // Create blood drips
    createBloodDrips();

    // Screen shake
    setTimeout(() => {
        document.body.style.animation = 'shake 0.3s infinite';
    }, 1000);

    // Remove shake after a while
    setTimeout(() => {
        document.body.style.animation = '';
    }, 3000);
}

function createBloodDrips() {
    const numDrips = 15;

    for (let i = 0; i < numDrips; i++) {
        setTimeout(() => {
            const drip = document.createElement('div');
            drip.classList.add('blood-drop');
            drip.style.left = Math.random() * 100 + '%';
            drip.style.animationDelay = Math.random() * 0.5 + 's';
            drip.style.animationDuration = (Math.random() * 1 + 1.5) + 's';

            bloodDrip.appendChild(drip);
        }, i * 200);
    }
}

// Initialize on load
window.addEventListener('load', () => {
    // Set plain background for auth screen
    document.body.classList.add('auth-active');

    createFloatingHearts();
});