// Word search grid and words list
const grid = [
    ['C', 'L', 'I', 'M', 'A', 'T', 'E', 'P', 'X', 'Y'],
    ['Z', 'F', 'O', 'S', 'S', 'I', 'L', 'G', 'E', 'N'],
    ['O', 'B', 'I', 'O', 'M', 'E', 'H', 'N', 'O', 'S'],
    ['C', 'L', 'I', 'O', 'R', 'A', 'N', 'G', 'E', 'A'],
    ['T', 'R', 'E', 'E', 'S', 'C', 'A', 'T', 'X', 'S'],
    ['E', 'P', 'L', 'A', 'N', 'E', 'T', 'T', 'R', 'V'],
    ['X', 'U', 'R', 'B', 'A', 'N', 'O', 'M', 'A', 'H'],
    ['A', 'S', 'T', 'E', 'R', 'O', 'I', 'D', 'Z', 'U'],
    ['T', 'W', 'E', 'A', 'T', 'H', 'E', 'R', 'S', 'P'],
    ['L', 'O', 'N', 'L', 'G', 'L', 'A', 'C', 'I', 'A']
];

const wordsToFind = ['CLIMATE', 'FOSSIL', 'BIOME', 'TREE', 'PLANET', 'URBAN', 'ASTEROID', 'WEATHER', 'GLACIER'];

let selectedCells = [];

// Initialize the game grid
function initializeGrid() {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';
    for (let row = 0; row < grid.length; row++) {
        for (let col = 0; col < grid[row].length; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.innerText = grid[row][col];
            cell.addEventListener('click', () => selectCell(cell, row, col));
            gridContainer.appendChild(cell);
        }
    }

    const wordsList = document.getElementById('words-to-find');
    wordsList.innerHTML = '';
    wordsToFind.forEach(word => {
        const li = document.createElement('li');
        li.innerText = word;
        wordsList.appendChild(li);
    });
}

// Handle cell selection
function selectCell(cell, row, col) {
    cell.classList.toggle('selected');
    const cellIndex = `${row}-${col}`;
    if (selectedCells.includes(cellIndex)) {
        selectedCells = selectedCells.filter(index => index !== cellIndex);
    } else {
        selectedCells.push(cellIndex);
    }
}

// Reset the game
function resetGame() {
    selectedCells = [];
    document.getElementById('result-message').innerText = '';
    document.getElementById('stars-container').innerHTML = '';
    initializeGrid();
}

// Check if all words are found
function submitGame() {
    const selectedWordCoordinates = selectedCells.map(cell => {
        const [row, col] = cell.split('-');
        return grid[row][col];
    }).join('');

    let correctWords = 0;
    wordsToFind.forEach(word => {
        if (selectedWordCoordinates.includes(word)) {
            correctWords++;
        }
    });

    displayResult(correctWords);
}

// Display result and award stars
function displayResult(correctWords) {
    const totalWords = wordsToFind.length;
    const resultMessage = `You found ${correctWords} out of ${totalWords} words!`;
    document.getElementById('result-message').innerText = resultMessage;

    // Award stars based on correct words
    const starsContainer = document.getElementById('stars-container');
    starsContainer.innerHTML = '';
    const stars = Math.min(correctWords, 3);  // Max 3 stars
    for (let i = 0; i < stars; i++) {
        const star = document.createElement('span');
        star.classList.add('star');
        star.innerText = '⭐';
        starsContainer.appendChild(star);
    }
}

// Initialize the game
initializeGrid();
