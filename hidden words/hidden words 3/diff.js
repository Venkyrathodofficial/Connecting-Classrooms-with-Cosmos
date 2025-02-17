// List of climate and space-related words to be hidden in the grid
const words = ["EARTH", "PLANET", "SOLAR", "WIND", "CLIMATE", "SPACE", "MARS", "OCEAN", "STARS", "MOON", "SUN", "RAIN", "STORM", "GRAVITY", "ORBIT"];

// Create a 15x15 grid
const gridSize = 15;
const gridContainer = document.getElementById('grid-container');
const wordsList = document.getElementById('words-list');
const resultMessage = document.getElementById('result-message');
const starsMessage = document.getElementById('stars-message');

let selectedCells = [];
let correctWordsFound = 0;
let totalWords = words.length;

// Generate the grid
let grid = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

// Randomly place words horizontally or vertically
function placeWords() {
    words.forEach(word => {
        let placed = false;
        while (!placed) {
            const direction = Math.random() > 0.5 ? 'H' : 'V'; // Horizontal or Vertical
            const row = Math.floor(Math.random() * gridSize);
            const col = Math.floor(Math.random() * gridSize);
            if (canPlaceWord(word, row, col, direction)) {
                for (let i = 0; i < word.length; i++) {
                    if (direction === 'H') {
                        grid[row][col + i] = word[i];
                    } else {
                        grid[row + i][col] = word[i];
                    }
                }
                placed = true;
            }
        }
    });
}

// Check if the word can be placed in the grid without overlapping other words
function canPlaceWord(word, row, col, direction) {
    if (direction === 'H' && col + word.length > gridSize) return false;
    if (direction === 'V' && row + word.length > gridSize) return false;

    for (let i = 0; i < word.length; i++) {
        const currentCell = direction === 'H' ? grid[row][col + i] : grid[row + i][col];
        if (currentCell && currentCell !== word[i]) return false;
    }
    return true;
}

// Fill empty grid cells with random letters
function fillGridWithRandomLetters() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < gridSize; i++) {
        for (let j = 0; j < gridSize; j++) {
            if (!grid[i][j]) {
                grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
            }
        }
    }
}

// Render the grid in the DOM
function renderGrid() {
    gridContainer.innerHTML = '';
    grid.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
            const div = document.createElement('div');
            div.classList.add('cell');
            div.textContent = cell;
            div.addEventListener('click', () => selectCell(rowIndex, colIndex, div));
            gridContainer.appendChild(div);
        });
    });
}

// Handle cell selection
function selectCell(row, col, cellElement) {
    const cellKey = `${row}-${col}`;
    if (selectedCells.includes(cellKey)) {
        selectedCells = selectedCells.filter(c => c !== cellKey);
        cellElement.classList.remove('selected');
    } else {
        selectedCells.push(cellKey);
        cellElement.classList.add('selected');
    }
}

// Render the word list
function renderWordList() {
    wordsList.innerHTML = '';
    words.forEach(word => {
        const li = document.createElement('li');
        li.textContent = word;
        wordsList.appendChild(li);
    });
}

// Submit the selected cells and check for correct words
function submitWords() {
    correctWordsFound = 0;
    const selectedWords = selectedCells.map(cell => {
        const [row, col] = cell.split('-').map(Number);
        return grid[row][col];
    }).join('');

    // Check for each word
    words.forEach(word => {
        if (selectedWords.includes(word)) {
            correctWordsFound++;
            markWordAsFound(word);
        }
    });

    // Display result and stars
    showResult();
}

// Mark word as found
function markWordAsFound(word) {
    const listItems = wordsList.querySelectorAll('li');
    listItems.forEach(item => {
        if (item.textContent === word) {
            item.style.textDecoration = 'line-through';
            item.style.color = 'green';
        }
    });
}

// Show result and allot stars based on performance
function showResult() {
    resultMessage.textContent = `You found ${correctWordsFound} out of ${totalWords} words!`;
    starsMessage.textContent = `Stars earned: ${'⭐'.repeat(correctWordsFound)}`;
    document.getElementById('result-container').style.display = 'block';
}

// Initialize the game
function init() {
    placeWords();
    fillGridWithRandomLetters();
    renderGrid();
    renderWordList();
}

init();
