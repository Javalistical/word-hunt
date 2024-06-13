// script.js

const words = [
  "NATH", "STEPHANIE", "RAPGEN", "EPE", "MAINLAND", "PURPOSE",
  "GENERATION", "DISCOVERY", "CONFERENCE", "STAKEHOLDERS",
  "EQUIP", "SEND", "SAVE", "CHANGE AGENTS", "MANTLES",
  "REVIVAL", "DESTINY", "JESUS", "GOD", "CHRIST"
];

const gridSize = 15;
const puzzleContainer = document.getElementById('puzzle');
const wordsToFindContainer = document.getElementById('words-to-find');

const directions = [
  [0, 1], [1, 0], [1, 1], [1, -1],
  [0, -1], [-1, 0], [-1, -1], [-1, 1]
];

const puzzle = Array.from({ length: gridSize }, () => Array(gridSize).fill(''));

// Populate the word list in the HTML
words.forEach(word => {
  const li = document.createElement('li');
  li.textContent = word;
  wordsToFindContainer.appendChild(li);
});

// Generate random letter
const getRandomLetter = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  return alphabet[Math.floor(Math.random() * alphabet.length)];
};

// Try to place a word in the grid
const placeWord = (word) => {
  const length = word.length;
  let placed = false;
  while (!placed) {
      const direction = directions[Math.floor(Math.random() * directions.length)];
      const row = Math.floor(Math.random() * gridSize);
      const col = Math.floor(Math.random() * gridSize);

      if (canPlaceWord(word, row, col, direction)) {
          for (let i = 0; i < length; i++) {
              const newRow = row + direction[0] * i;
              const newCol = col + direction[1] * i;
              puzzle[newRow][newCol] = word[i];
          }
          placed = true;
      }
  }
};

// Check if the word can be placed in the grid
const canPlaceWord = (word, row, col, direction) => {
  const length = word.length;
  for (let i = 0; i < length; i++) {
      const newRow = row + direction[0] * i;
      const newCol = col + direction[1] * i;
      if (
          newRow < 0 || newRow >= gridSize ||
          newCol < 0 || newCol >= gridSize ||
          (puzzle[newRow][newCol] && puzzle[newRow][newCol] !== word[i])
      ) {
          return false;
      }
  }
  return true;
};

// Place all words in the grid
words.forEach(word => placeWord(word.replace(' ', '')));

// Fill empty cells with random letters
for (let row = 0; row < gridSize; row++) {
  for (let col = 0; col < gridSize; col++) {
      if (!puzzle[row][col]) {
          puzzle[row][col] = getRandomLetter();
      }
  }
}

// Render the grid
for (let row = 0; row < gridSize; row++) {
  for (let col = 0; col < gridSize; col++) {
      const cell = document.createElement('div');
      cell.className = 'puzzle-cell';
      cell.textContent = puzzle[row][col];
      puzzleContainer.appendChild(cell);
  }
}

// Add interaction to highlight words
document.querySelectorAll('.puzzle-cell').forEach(cell => {
  cell.addEventListener('click', () => {
      cell.classList.toggle('highlighted');
  });
});
