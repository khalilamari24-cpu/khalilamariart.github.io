const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const colorPicker = document.getElementById('colorPicker');
const brushSize = document.getElementById('brushSize');
const clearCanvas = document.getElementById('clearCanvas');
const saveDrawing = document.getElementById('saveDrawing');

// Set canvas size to full window
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.6;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

// Set default drawing settings
ctx.strokeStyle = colorPicker.value;
ctx.lineWidth = parseInt(brushSize.value, 10);
ctx.lineJoin = 'round';
ctx.lineCap = 'round';

// Update drawing settings on control change
colorPicker.addEventListener('change', (e) => {
    ctx.strokeStyle = e.target.value;
});

brushSize.addEventListener('input', (e) => {
    ctx.lineWidth = parseInt(e.target.value, 10);
});

// Start drawing
canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

// Stop drawing
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));

// Draw on the canvas
canvas.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY];
});

// Clear the canvas
clearCanvas.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Save the drawing
saveDrawing.addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'drawing.png';
    link.href = canvas.toDataURL();
    link.click();
});
