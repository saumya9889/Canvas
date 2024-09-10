let undoStack = [];
let redoStack = [];

let editableArea = document.getElementById("editableArea");
const box = document.querySelector('.box');

let offsetX, offsetY, isDragging = false;

// Save initial state for undo
saveState();

// Function to add text
function addText() {
    const inputText = document.getElementById("inputText").value;
    if (inputText) {
        saveState();
        editableArea.innerHTML += ` ${inputText}`;
        document.getElementById("inputText").value = ''; // clear input field
    }
}

// Function to save current state for undo
function saveState() {
    undoStack.push(editableArea.innerHTML);
    redoStack = []; // clear redo stack when new action occurs
}

// Function to undo the last change
function undo() {
    if (undoStack.length > 0) {
        redoStack.push(editableArea.innerHTML);
        const lastState = undoStack.pop();
        editableArea.innerHTML = lastState;
    }
}

// Function to redo the undone change
function redo() {
    if (redoStack.length > 0) {
        undoStack.push(editableArea.innerHTML);
        const redoState = redoStack.pop();
        editableArea.innerHTML = redoState;
    }
}

// Drag and drop functionality with boundary restriction
function dragStart(event) {
    isDragging = true;
    const rect = editableArea.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;

    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);
}

function drag(event) {
    if (!isDragging) return;

    const boxRect = box.getBoundingClientRect();
    const areaRect = editableArea.getBoundingClientRect();

    // Calculate new positions and keep them within box boundaries
    let x = event.clientX - offsetX;
    let y = event.clientY - offsetY;

    if (x < 0) x = 0; // Prevent moving left out of the box
    if (y < 0) y = 0; // Prevent moving top out of the box
    if (x + areaRect.width > boxRect.width) x = boxRect.width - areaRect.width; // Prevent moving right out of the box
    if (y + areaRect.height > boxRect.height) y = boxRect.height - areaRect.height; // Prevent moving bottom out of the box

    editableArea.style.left = `${x}px`;
    editableArea.style.top = `${y}px`;
}

function dragEnd() {
    isDragging = false;
    document.removeEventListener('mousemove', drag);
    document.removeEventListener('mouseup', dragEnd);
}

// Font Controls
function changeFontSize(value) {
    editableArea.style.fontSize = `${value}px`;
    document.getElementById("fontSizeNumber").value = value; // update number input box
}

function changeFontColor(value) {
    editableArea.style.color = value;
}

// Toggle bold
function toggleBold() {
    if (editableArea.style.fontWeight === 'bold') {
        editableArea.style.fontWeight = 'normal';
    } else {
        editableArea.style.fontWeight = 'bold';
    }
}

// Toggle italic
function toggleItalic() {
    if (editableArea.style.fontStyle === 'italic') {
        editableArea.style.fontStyle = 'normal';
    } else {
        editableArea.style.fontStyle = 'italic';
    }
}

// Toggle underline
function toggleUnderline() {
    if (editableArea.style.textDecoration === 'underline') {
        editableArea.style.textDecoration = 'none';
    } else {
        editableArea.style.textDecoration = 'underline';
    }
}
