const mario = document.querySelector('.mario');
const pipe = document.querySelector('.pipe');
const clouds = document.querySelector('.clouds');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const scoreDisplay = document.getElementById('score');
const playerNameInput = document.getElementById('playerName');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreText = document.getElementById('finalScore');
const bgMusic = document.getElementById('bgMusic');
const gameOverSound = document.getElementById('gameOverSound');

let gameLoop = null;
let scoreLoop = null;
let score = 0;
let isGameRunning = false;
let playerName = "";


function jump() {
  if (!isGameRunning) return;
  if (mario.classList.contains('jump')) return;

  mario.classList.add('jump');

  setTimeout(() => {
    mario.classList.remove('jump');
  }, 650);
}


function startGame() {
  playerName = playerNameInput.value.trim();

  if (!playerName) {
    alert("Por favor, digite seu nome para jogar.");
    return;
  }

  isGameRunning = true;
  score = 0;
  scoreDisplay.textContent = score;

  
  playerNameInput.style.display = 'none';

  mario.src = './img/mario.gif';
  mario.style.width = '150px';
  mario.style.marginLeft = '0px';
  mario.style.bottom = '0px';

  pipe.style.left = '100%';
  pipe.classList.remove('pipe-animation');
  void pipe.offsetWidth; 
  pipe.classList.add('pipe-animation');

  clouds.classList.remove('pause-animation');
  gameOverScreen.style.display = 'none';

 
  startBtn.style.display = 'none';
  restartBtn.style.display = 'none';

 
  bgMusic.currentTime = 0;
  bgMusic.play();

  
  gameLoop = setInterval(() => {
    const pipePosition = pipe.offsetLeft;
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px', '');

    if (pipePosition <= 120 && pipePosition > 0 && marioPosition < 80) {
      gameOver();
    }
  }, 10);

  
  scoreLoop = setInterval(() => {
    score++;
    scoreDisplay.textContent = score;
  }, 200);
}


function gameOver() {
  isGameRunning = false;

  clearInterval(gameLoop);
  clearInterval(scoreLoop);

  pipe.classList.remove('pipe-animation');
  pipe.style.left = pipe.offsetLeft + 'px';

  clouds.classList.add('pause-animation');

  mario.src = './img/game-over.png';
  mario.style.width = '75px';
  mario.style.marginLeft = '50px';

  bgMusic.pause();
  gameOverSound.currentTime = 0;
  gameOverSound.play();

  
  finalScoreText.innerHTML = `Parabens <strong>${playerName}</strong>!<br>Seu placar final foi <strong>${score}</strong> pontos.`;
  gameOverScreen.style.display = 'block';

  
  restartBtn.style.display = 'inline';
}


function restartGame() {
  pipe.style.left = '100%';

  
  playerNameInput.style.display = 'block';
  playerNameInput.value = ''; 
  gameOverScreen.style.display = 'none';

  startBtn.style.display = 'inline';
  restartBtn.style.display = 'none';
}



startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', restartGame);
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' || event.code === 'ArrowUp') {
    jump();
  }
});
