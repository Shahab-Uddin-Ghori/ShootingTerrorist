// Select the cursor element
const cursor = document.querySelector(".cursor");

// Move the custom cursor to follow the mouse pointer
window.addEventListener("mousemove", (e) => {
  cursor.style.top = e.pageY + "px";
  cursor.style.left = e.pageX + "px";
});

// Select the blood spot element
const bloodSpot = document.querySelector(".bloodSpot");

// Initialize the score and lives variables
let score = 0;
let lives = 3;
let intervalTime = 3000; // Initial interval time in ms
let gameInterval;
let gameStarted = false;
let terroristClicked = false;

// Select the container and the button elements
const container = document.querySelector(".container");
const startBtn = document.querySelector(".button");

// Create the terrorist image element
const terrorist = document.createElement("img");
terrorist.setAttribute("class", "terrorist");
terrorist.setAttribute("src", "./img/terrorist.png");

// Function to position the terrorist at a random position within the container
const contHeight = container.offsetHeight;
const contWidth = container.offsetWidth;
function positionTerrorist() {
  const ranTop = Math.random() * (contHeight - 100);
  const ranLeft = Math.random() * (contWidth - 100);

  terrorist.style.position = "absolute";
  terrorist.style.top = ranTop + "px";
  terrorist.style.left = ranLeft + "px";

  // If the terrorist image was not clicked before repositioning, decrement lives
  if (!terroristClicked) {
    lives--;
    startBtn.innerText = "Score: " + score + " | Lives: " + lives;
    if (lives <= 0) {
      gameOver();
    }
  }

  // Reset the flag for the next appearance
  terroristClicked = false;
}

// Function to handle the game over logic
function gameOver() {
  clearInterval(gameInterval);
  gameStarted = false;
  alert("Game Over! Your score: " + score);
  const restart = confirm("Do you want to restart the game?");
  if (restart) {
    score = 0;
    lives = 3;
    intervalTime = 2000;
    startBtn.innerText = "Start Game";
  }
}

// Function to handle the start game logic
function startGame() {
  if (!gameStarted) {
    container.appendChild(terrorist);
    startBtn.innerText = "Score: " + score + " | Lives: " + lives;
    gameStarted = true;

    // Set interval to reposition the terrorist
    gameInterval = setInterval(() => {
      positionTerrorist();
    }, intervalTime);
  }
}

// Add the terrorist image to the container when the button is clicked
startBtn.addEventListener("click", startGame);

// Event listener to handle mouse clicks
window.addEventListener("click", (e) => {
  // Only proceed if the game has started
  if (!gameStarted) return;

  bloodSpot.style.top = e.pageY + "px";
  bloodSpot.style.left = e.pageX + "px";

  if (e.target === terrorist) {
    terroristClicked = true; // Mark that the terrorist image was clicked
    score++;
    if (score % 10 === 0) {
      intervalTime = Math.max(500, intervalTime - 500); // Decrease interval time, minimum 500ms
      clearInterval(gameInterval);
      gameInterval = setInterval(() => {
        positionTerrorist();
      }, intervalTime);
    }
  } else if (e.target !== startBtn) {
    lives--;
  }
  startBtn.innerText = "Score: " + score + " | Lives: " + lives;

  if (lives <= 0) {
    gameOver();
  }
});
