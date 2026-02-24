const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const knob = document.getElementById('joystick-knob');
const container = document.getElementById('joystick-container');

// إعدادات العالم
let worldImage = new Image();
worldImage.src = 'https://r2.erweima.ai/i/6O6y_e7XReWjX_q44i8K0Q.jpg'; // صورتك المفضلة

let viewX = 0;
let viewY = 0;
let speed = 5;

// إعدادات الجوستك
let dragging = false;
let joystickData = { x: 0, y: 0 };

// ضبط حجم الشاشة
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

// أحداث اللمس للجوستك
container.addEventListener('touchstart', (e) => { dragging = true; });
window.addEventListener('touchend', () => { 
    dragging = false; 
    knob.style.transform = `translate(0px, 0px)`;
    joystickData = { x: 0, y: 0 };
});

window.addEventListener('touchmove', (e) => {
    if (!dragging) return;
    const touch = e.touches[0];
    const rect = container.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    let dx = touch.clientX - centerX;
    let dy = touch.clientY - centerY;
    
    // حصر الحركة داخل الدائرة
    const distance = Math.min(60, Math.sqrt(dx*dx + dy*dy));
    const angle = Math.atan2(dy, dx);
    
    joystickData.x = Math.cos(angle) * (distance / 60);
    joystickData.y = Math.sin(angle) * (distance / 60);
    
    knob.style.transform = `translate(${Math.cos(angle)*distance}px, ${Math.sin(angle)*distance}px)`;
});

// حلقة اللعبة (Game Loop)
function update() {
    // تحريك الكاميرا بناءً على الجوستك
    viewX += joystickData.x * speed;
    viewY += joystickData.y * speed;

    // رسم الخلفية (تتكرر لتعطي إيحاء بعالم واسع)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // رسم الصورة بحيث نتحرك داخلها
    // ملاحظة: هنا نقوم برسم الصورة أكبر من الشاشة لتحريكها
    ctx.drawImage(worldImage, -viewX, -viewY, worldImage.width * 2, worldImage.height * 2);

    requestAnimationFrame(update);
}

worldImage.onload = () => {
    update();
};
