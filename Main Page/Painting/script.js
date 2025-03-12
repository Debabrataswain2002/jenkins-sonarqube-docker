const canvas = document.getElementById("paintCanvas");
const ctx = canvas.getContext("2d");

// Resize canvas dynamically
function resizeCanvas() {
    canvas.width = Math.min(window.innerWidth * 0.9, 600);
    canvas.height = canvas.width * 0.6; // Maintain aspect ratio
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let painting = false;
let erasing = false;
let history = [];

// Save canvas state for undo
function saveState() {
    history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
}

// Undo function
function goBack() {
    if (history.length > 0) {
        ctx.putImageData(history.pop(), 0, 0);
    }
}

// Start drawing
function startPosition(e) {
    painting = true;
    saveState();
    draw(e);
}
function endPosition() {
    painting = false;
    ctx.beginPath();
}

// Draw on canvas
function draw(e) {
    if (!painting) return;
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches[0].clientX) - rect.left;
    const y = (e.clientY || e.touches[0].clientY) - rect.top;
    
    ctx.lineWidth = document.getElementById("brushSize").value;
    ctx.lineCap = document.getElementById("brushType").value;
    ctx.strokeStyle = erasing ? "white" : document.getElementById("colorPicker").value;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Event Listeners for Mouse and Touch
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", endPosition);
canvas.addEventListener("mousemove", draw);

canvas.addEventListener("touchstart", startPosition);
canvas.addEventListener("touchend", endPosition);
canvas.addEventListener("touchmove", draw);

// Clear the canvas
function clearCanvas() {
    saveState();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Save the painting
function saveCanvas() {
    let link = document.createElement('a');
    link.download = 'painting.png';
    link.href = canvas.toDataURL();
    link.click();
}

// Eraser function
function setEraser() {
    erasing = !erasing;
    document.getElementById("eraserBtn").classList.toggle("selected", erasing);
}

// Draw preset shapes
function usePreset(shape) {
    saveState();
    ctx.fillStyle = document.getElementById("colorPicker").value;
    ctx.strokeStyle = document.getElementById("colorPicker").value;
    ctx.lineWidth = document.getElementById("brushSize").value;
    
    let size = document.getElementById("brushSize").value * 5;
    let x = Math.random() * (canvas.width - size);
    let y = Math.random() * (canvas.height - size);

    ctx.beginPath();
    if (shape === "circle") {
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
    } else if (shape === "rectangle") {
        ctx.fillRect(x, y, size * 2, size);
    } else if (shape === "line") {
        ctx.moveTo(x, y);
        ctx.lineTo(x + size * 2, y);
        ctx.stroke();
    } else if (shape === "triangle") {
        ctx.moveTo(x, y);
        ctx.lineTo(x - size, y + size * 2);
        ctx.lineTo(x + size, y + size * 2);
        ctx.closePath();
        ctx.fill();
    }
}

// Event Listeners for Buttons
document.getElementById("eraserBtn").addEventListener("click", setEraser);
document.getElementById("clearBtn").addEventListener("click", clearCanvas);
document.getElementById("saveBtn").addEventListener("click", saveCanvas);
document.getElementById("goBackBtn")
