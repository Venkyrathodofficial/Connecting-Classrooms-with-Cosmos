// Hidden word puzzle related to climate and space topics
const wordsToFind = ['EARTH', 'WIND', 'SUN', 'MARS', 'OZONE'];
const grid = [
    ['E', 'A', 'R', 'T', 'H', 'X'],
    ['W', 'I', 'N', 'D', 'L', 'N'],
    ['S', 'U', 'N', 'Y', 'M', 'K'],
    ['O', 'Z', 'O', 'N', 'E', 'O'],
    ['M', 'A', 'R', 'S', 'T', 'P']
];

let selectedLetters = [];
let foundWords = [];

// Create the grid
const gridContainer = document.getElementById('grid-container');
grid.forEach((row, rowIndex) => {
    row.forEach((letter, colIndex) => {
        const letterDiv = document.createElement('div');
        letterDiv.classList.add('letter');
        letterDiv.innerText = letter;
        letterDiv.addEventListener('click', () => selectLetter(letterDiv, rowIndex, colIndex));
        gridContainer.appendChild(letterDiv);
    });
});

// Display words to find
const wordsList = document.getElementById('words');
wordsToFind.forEach(word => {
    const wordItem = document.createElement('li');
    wordItem.innerText = word;
    wordsList.appendChild(wordItem);
});

// Handle letter selection
function selectLetter(letterDiv, row, col) {
    letterDiv.classList.toggle('selected');
    const letter = grid[row][col];

    if (selectedLetters.includes(letter)) {
        selectedLetters = selectedLetters.filter(l => l !== letter);
    } else {
        selectedLetters.push(letter);
    }
}

// Submit the selected words and check if they are correct
function submitWords() {
    const word = selectedLetters.join('').toUpperCase();
    if (wordsToFind.includes(word) && !foundWords.includes(word)) {
        foundWords.push(word);
        alert(`You found: ${word}`);
        document.getElementById('result').innerText = `You found: ${foundWords.join(', ')}`;
    } else {
        alert("That's not a correct word or you've already found it.");
    }
    selectedLetters = [];
    clearSelection();
    updateStars();
}

// Clear selection after submission
function clearSelection() {
    const letterDivs = document.querySelectorAll('.letter');
    letterDivs.forEach(div => div.classList.remove('selected'));
}

// Update stars based on the number of correct words found
function updateStars() {
    const starsContainer = document.getElementById('stars');
    starsContainer.innerHTML = ''; // Clear existing stars

    for (let i = 0; i < foundWords.length; i++) {
        const star = document.createElement('span');
        star.innerText = '⭐';
        starsContainer.appendChild(star);
    }

    if (foundWords.length === wordsToFind.length) {
        document.getElementById('result').innerText = "Congratulations! You've found all the words!";
    }
}
