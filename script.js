const scenes = {
  intro: document.querySelector("#introScene"),
  balloon: document.querySelector("#balloonScene"),
  puzzle: document.querySelector("#puzzleScene"),
  stars: document.querySelector("#starsScene"),
};

const startButton = document.querySelector("#startButton");
const balloonStage = document.querySelector("#balloonStage");
const balloonStatus = document.querySelector("#balloonStatus");
const specialModal = document.querySelector("#specialModal");
const specialTitle = document.querySelector("#specialTitle");
const specialMessage = document.querySelector("#specialMessage");
const notYetButton = document.querySelector("#notYetButton");
const yesSpecialButton = document.querySelector("#yesSpecialButton");
const blackout = document.querySelector("#blackout");
const puzzleFrame = document.querySelector("#puzzleFrame");
const memoryCaption = document.querySelector("#memoryCaption");
const replayPuzzleButton = document.querySelector("#replayPuzzleButton");
const toStarsButton = document.querySelector("#toStarsButton");
const restartButton = document.querySelector("#restartButton");
const starCanvas = document.querySelector("#starCanvas");
const wishStarField = document.querySelector("#wishStarField");
const wishBox = document.querySelector("#wishBox");
const wishToggleButton = document.querySelector("#wishToggleButton");
const wishReference = document.querySelector("#wishReference");
const wishText = document.querySelector("#wishText");
const wishCount = document.querySelector("#wishCount");
const backgroundAudio = document.querySelector("#backgroundAudio");
const memoryConstellation = document.querySelector("#memoryConstellation");
const memoryModal = document.querySelector("#memoryModal");
const memoryCloseButton = document.querySelector("#memoryCloseButton");
const memoryModalImage = document.querySelector("#memoryModalImage");
const memoryModalKicker = document.querySelector("#memoryModalKicker");
const memoryModalTitle = document.querySelector("#memoryModalTitle");
const memoryModalCaption = document.querySelector("#memoryModalCaption");
const prevMemoryButton = document.querySelector("#prevMemoryButton");
const nextMemoryButton = document.querySelector("#nextMemoryButton");

const balloonColors = ["#ff7b72", "#f8b84e", "#88d8b0", "#7bb7ff", "#d44f6a", "#9d73e5", "#ffd166"];
const balloonPositions = [
  [12, 36],
  [26, 62],
  [40, 30],
  [54, 58],
  [68, 34],
  [82, 64],
  [50, 82],
];
const emptyMessages = [
  "Wala dre...",
  "Nope, dli pud ni.",
  "Try again friti gurl.",
  "Ngeee... la japon",
  "Try sa lain balloon.",
  "Wala ni sa imong gipangita.",
];
const burstShapes = ["spark", "heart", "dot"];
const wishes = [
  {
    reference: "Numbers 6:24-26",
    content: "May the Lord bless you, keep you, be gracious to you, and give you peace.",
  },
  {
    reference: "Psalm 20:4",
    content: "May God give you the desires of your heart and make your plans succeed.",
  },
  {
    reference: "3 John 1:2",
    content: "May you enjoy good health and may all go well with you.",
  },
  {
    reference: "Proverbs 9:11",
    content: "May wisdom add many days and years to your life.",
  },
  {
    reference: "Psalm 37:4",
    content: "May you delight in the Lord and receive the desires of your heart.",
  },
  {
    reference: "Psalm 20:4",
    content: "May your heart's hopes and plans be blessed by God.",
  },
  {
    reference: "Jeremiah 29:11",
    content: "God has plans to give you hope and a future.",
  },
  {
    reference: "Zephaniah 3:17",
    content: "The Lord is with you, rejoices over you, and surrounds you with love.",
  },
];
const puzzlePhotoSrc = "https://pub-b7169f7857ac4d578aa9207bd9ced69e.r2.dev/greetings-25/us.jpg";
const memories = [
  {
    image: "assets/memories/1.jpg",
    title: "Gabi ng Parangal",
    caption: "Friti kayka saimong dress kyutie. Muscician rko ani HAHAHA",
    x: 13,
    y: 26,
  },
  {
    image: "assets/memories/2.jpg",
    title: "Laag after review",
    caption: "Padulongay christmas. nindot DAW ang city hall.",
    x: 28,
    y: 56,
  },
  {
    image: "assets/memories/3.jpg",
    title: "Pic wid da tree",
    caption: "Boring ang christmas tree makita saotng nawong.",
    x: 42,
    y: 20,
  },
  {
    image: "assets/memories/4.jpg",
    title: "First campus nko kauban ka",
    caption: "Literal na kulba pers nako mag speak sa atubangan.",
    x: 59,
    y: 45,
  },
  {
    image: "assets/memories/5.jpg",
    title: "No comment",
    caption: "Basta friti ka dre hehehe. PEACE",
    x: 77,
    y: 25,
  },
  {
    image: "assets/memories/6.jpg",
    title: "Talaingod 1",
    caption: "Sheesh solo ang swimming pool ani before trabaho.",
    x: 88,
    y: 62,
  },
  {
    image: "assets/memories/7.jpg",
    title: "Talaingod 2",
    caption: "Gwapo ko dre......",
    x: 18,
    y: 77,
  },
  {
    image: "assets/memories/8.jpg",
    title: "Talaingod 3",
    caption: "Kyut ta dre HAHAHA.",
    x: 36,
    y: 84,
  },
  {
    image: "assets/memories/9.jpg",
    title: "Graduation na nako!",
    caption: "Thank you sa pag adto sa graduation hehe.",
    x: 52,
    y: 68,
  },
  {
    image: "assets/memories/10.jpg",
    title: "Talaingod 4",
    caption: "Nanatay tarong na pic duha, ANA KA.",
    x: 70,
    y: 81,
  },
  {
    image: "assets/memories/11.jpg",
    title: "My Last...",
    caption: "Our last memory before your birthday. I LOVE YOU FRITI. Happy birthday again.",
    x: 47,
    y: 38,
  },
];

let poppedCount = 0;
let puzzleStage = "hidden";
let puzzleAnimating = false;
let stars = [];
let discoveredWishes = new Set();
let starAnimationFrame = 0;
let specialPromptMode = "first";
let puzzleRevealRun = 0;
let backgroundAudioStarted = false;
let activeMemoryIndex = 0;
let memoriesBuilt = false;
let puzzlePhotoReady = false;
let puzzlePhotoFailed = false;
let puzzlePhotoPromise = null;

if (backgroundAudio) {
  backgroundAudio.volume = 0.35;
  backgroundAudio.loop = true;
}

function startBackgroundAudio() {
  if (!backgroundAudio || backgroundAudioStarted) return;

  backgroundAudio.play()
    .then(() => {
      backgroundAudioStarted = true;
    })
    .catch(() => {
      backgroundAudioStarted = false;
    });
}

function preloadPuzzlePhoto() {
  if (puzzlePhotoPromise) return puzzlePhotoPromise;

  puzzleFrame.style.setProperty("--photo-url", `url("${puzzlePhotoSrc}")`);

  puzzlePhotoPromise = new Promise((resolve) => {
    const photoProbe = new Image();
    photoProbe.onload = () => {
      puzzlePhotoReady = true;
      puzzlePhotoFailed = false;
      puzzleFrame.classList.add("has-photo");
      puzzleFrame.classList.remove("is-loading-photo");
      const photoRatio = photoProbe.naturalWidth / photoProbe.naturalHeight;
      scenes.puzzle.style.setProperty("--photo-aspect", `${photoProbe.naturalWidth} / ${photoProbe.naturalHeight}`);
      scenes.puzzle.style.setProperty("--photo-ratio", photoRatio.toFixed(4));
      resolve(true);
    };
    photoProbe.onerror = () => {
      puzzlePhotoReady = false;
      puzzlePhotoFailed = true;
      puzzleFrame.classList.remove("has-photo", "is-loading-photo");
      resolve(false);
    };
    photoProbe.decoding = "async";
    photoProbe.src = puzzlePhotoSrc;
  });

  return puzzlePhotoPromise;
}

function showScene(name) {
  Object.values(scenes).forEach((scene) => scene.classList.remove("is-active"));
  scenes[name].classList.add("is-active");

  if (name === "stars") {
    startStarSky();
  } else {
    cancelAnimationFrame(starAnimationFrame);
  }
}

function showStarsScene() {
  discoveredWishes = new Set();
  wishCount.textContent = `0 / ${wishes.length} wishes found`;
  wishReference.textContent = "Choose a star";
  wishText.textContent = "Tap a bright star to reveal a blessing.";
  closeMemoryModal();
  memoryConstellation.hidden = true;
  scenes.stars.classList.remove("is-constellation-open");
  restartButton.hidden = false;
  setMemoryButtonLocked(true);
  setWishPanelMinimized(false);
  showScene("stars");
}

function setMemoryButtonLocked(isLocked) {
  restartButton.classList.toggle("is-locked", isLocked);
  restartButton.classList.toggle("is-ready", !isLocked);
  restartButton.textContent = isLocked ? "Finish the stars" : "Open our memories";
  restartButton.setAttribute("aria-disabled", String(isLocked));
}

function setWishPanelMinimized(isMinimized) {
  wishBox.classList.toggle("is-minimized", isMinimized);
  wishToggleButton.textContent = isMinimized ? "Show message" : "Hide";
  wishToggleButton.setAttribute("aria-expanded", String(!isMinimized));
}

function buildBalloons() {
  balloonStage.innerHTML = "";
  poppedCount = 0;
  balloonStatus.textContent = "Pop all 7 balloons.";

  balloonPositions.forEach(([x, y], index) => {
    const balloon = document.createElement("button");
    balloon.type = "button";
    balloon.className = "balloon";
    balloon.ariaLabel = `Pop balloon ${index + 1}`;
    balloon.style.setProperty("--x", `${x}%`);
    balloon.style.setProperty("--y", `${y}%`);
    balloon.style.setProperty("--message-x", `${Math.min(Math.max(x, 18), 82)}%`);
    balloon.style.setProperty("--message-y", `${Math.max(y - 18, 16)}%`);
    balloon.style.setProperty("--balloon-color", balloonColors[index]);
    balloon.style.setProperty("--tilt", `${index % 2 === 0 ? -7 : 7}deg`);
    balloon.style.setProperty("--duration", `${4.3 + index * 0.28}s`);
    balloon.addEventListener("click", () => popBalloon(balloon, index));
    balloonStage.appendChild(balloon);
  });
}

function popBalloon(balloon, index) {
  if (balloon.classList.contains("is-popped")) return;

  const isFinalBalloon = poppedCount + 1 === balloonPositions.length;
  createBalloonBurst(balloon, isFinalBalloon);
  balloon.classList.add("is-popped");
  poppedCount += 1;
  balloonStatus.textContent = `${poppedCount} / 7 popped`;
  balloonStatus.classList.remove("is-pulsing");
  void balloonStatus.offsetWidth;
  balloonStatus.classList.add("is-pulsing");

  if (poppedCount < balloonPositions.length) {
    showPopMessage(emptyMessages[index % emptyMessages.length], balloon);
    return;
  }

  setTimeout(() => {
    specialModal.hidden = false;
    yesSpecialButton.focus();
  }, 420);
}

function createBalloonBurst(balloon, isFinalBalloon = false) {
  scenes.balloon.classList.remove("pop-jolt");
  void scenes.balloon.offsetWidth;
  scenes.balloon.classList.add("pop-jolt");

  const x = balloon.style.getPropertyValue("--x");
  const y = balloon.style.getPropertyValue("--y");
  const burst = document.createElement("span");
  burst.className = isFinalBalloon ? "balloon-burst is-final" : "balloon-burst";
  burst.style.setProperty("--burst-x", x);
  burst.style.setProperty("--burst-y", y);
  balloonStage.appendChild(burst);

  const particleCount = isFinalBalloon ? 28 : 15;
  const colors = isFinalBalloon
    ? ["#ffd166", "#ff7b72", "#fff8ee", "#88d8b0", "#7bb7ff"]
    : [balloon.style.getPropertyValue("--balloon-color"), "#fff8ee", "#ffd166", "#7bb7ff"];

  for (let i = 0; i < particleCount; i += 1) {
    const particle = document.createElement("span");
    const angle = (Math.PI * 2 * i) / particleCount;
    const distance = isFinalBalloon ? 86 + (i % 7) * 12 : 54 + (i % 5) * 10;
    const shape = burstShapes[i % burstShapes.length];
    particle.className = `burst-particle is-${shape}`;
    particle.textContent = shape === "heart" ? "♥" : "";
    particle.style.setProperty("--particle-color", colors[i % colors.length]);
    particle.style.setProperty("--particle-x", `${Math.cos(angle) * distance}px`);
    particle.style.setProperty("--particle-y", `${Math.sin(angle) * distance}px`);
    particle.style.setProperty("--particle-rotate", `${i * 37}deg`);
    burst.appendChild(particle);
  }

  setTimeout(() => burst.remove(), isFinalBalloon ? 1100 : 850);
}

function showPopMessage(message, balloon) {
  const note = document.createElement("span");
  note.className = "pop-message";
  note.textContent = message;
  note.style.setProperty("--message-x", balloon.style.getPropertyValue("--message-x"));
  note.style.setProperty("--message-y", balloon.style.getPropertyValue("--message-y"));
  balloonStage.appendChild(note);
  setTimeout(() => note.remove(), 1500);
}

function setSpecialPrompt(mode) {
  specialPromptMode = mode;

  if (mode === "reflection") {
    specialTitle.textContent = "Kita ka?";
    specialMessage.textContent = "Nadidto and special.";
    notYetButton.textContent = "Look again";
    yesSpecialButton.textContent = "Yes";
    return;
  }

  specialTitle.textContent = "Gusto ka makakitag special?";
  specialMessage.textContent = "Only press yes when you are ready.";
  notYetButton.textContent = "Not yet";
  yesSpecialButton.textContent = "Yes";
}

function showBlackoutThenAskAgain() {
  specialModal.hidden = true;
  blackout.classList.add("is-visible");
  setTimeout(() => {
    blackout.classList.remove("is-visible");
    showScene("balloon");
    setSpecialPrompt("reflection");
    specialModal.hidden = false;
    yesSpecialButton.focus();
  }, 3000);
}

function continueToPuzzle() {
  specialModal.hidden = true;
  buildPuzzle();
  showScene("puzzle");
}

function buildPuzzle() {
  puzzleFrame.innerHTML = "";
  puzzleStage = "hidden";
  puzzleAnimating = false;
  puzzleRevealRun += 1;
  puzzleFrame.classList.remove("is-building", "is-heart", "is-complete");
  puzzleFrame.setAttribute("aria-label", "Reveal the photo heart");
  memoryCaption?.classList.remove("is-visible");

  const columns = 11;
  const rows = 10;
  const totalPieces = columns * rows;
  const revealOrder = Array.from({ length: totalPieces }, (_, index) => index)
    .sort((a, b) => {
      const ax = a % columns;
      const ay = Math.floor(a / columns);
      const bx = b % columns;
      const by = Math.floor(b / columns);

      return Math.hypot(ax - 5, ay - 4.5) - Math.hypot(bx - 5, by - 4.5);
    });

  preloadPuzzlePhoto();

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < columns; col += 1) {
      const index = row * columns + col;
      const piece = document.createElement("span");
      piece.className = "puzzle-piece";
      piece.dataset.order = revealOrder.indexOf(index);
      piece.dataset.heart = String(isHeartPiece(col, row, columns, rows));
      piece.style.setProperty("--row", row + 1);
      piece.style.setProperty("--col", col + 1);
      piece.style.setProperty("--bg-x", `${(col / (columns - 1)) * 100}%`);
      piece.style.setProperty("--bg-y", `${(row / (rows - 1)) * 100}%`);
      piece.style.backgroundSize = `${columns * 100}% ${rows * 100}%`;
      piece.style.setProperty("--start-x", `${(col - 5) * 34}px`);
      piece.style.setProperty("--start-y", `${(row - 4.5) * -30}px`);
      piece.style.setProperty("--tilt-x", `${row % 2 === 0 ? 62 : -62}deg`);
      piece.style.setProperty("--tilt-y", `${col % 2 === 0 ? -48 : 48}deg`);
      piece.style.setProperty("--rotate", `${(row + col) % 2 === 0 ? -18 : 18}deg`);
      puzzleFrame.appendChild(piece);
    }
  }
}

function isHeartPiece(col, row, columns, rows) {
  const x = (col / (columns - 1)) * 3 - 1.5;
  const y = 1.3 - (row / (rows - 1)) * 2.6;
  return Math.pow(x * x + y * y - 1, 3) - x * x * y * y * y <= 0;
}

function revealPuzzle() {
  if (puzzleAnimating || puzzleStage === "complete") return;

  if (!puzzlePhotoReady && !puzzlePhotoFailed) {
    puzzleAnimating = true;
    puzzleFrame.classList.add("is-loading-photo");
    puzzleFrame.setAttribute("aria-label", "Loading the photo");
    preloadPuzzlePhoto().then(() => {
      puzzleAnimating = false;
      if (puzzleStage === "hidden") {
        revealPuzzle();
      }
    });
    return;
  }

  if (puzzleStage === "heart") {
    completePuzzle();
    return;
  }

  revealPuzzleHeart();
}

function revealPuzzleHeart() {
  puzzleStage = "revealing-heart";
  puzzleAnimating = true;
  puzzleFrame.classList.add("is-building");
  const runId = ++puzzleRevealRun;

  const pieces = [...puzzleFrame.querySelectorAll(".puzzle-piece")];
  pieces
    .filter((piece) => piece.dataset.heart === "true")
    .sort((a, b) => Number(a.dataset.order) - Number(b.dataset.order))
    .forEach((piece, index) => {
      setTimeout(() => {
        if (runId === puzzleRevealRun) {
          piece.classList.add("is-visible");
        }
      }, 48 * index);
    });

  setTimeout(() => {
    if (runId !== puzzleRevealRun) return;

    puzzleStage = "heart";
    puzzleAnimating = false;
    puzzleFrame.classList.remove("is-building");
    puzzleFrame.classList.add("is-heart");
    puzzleFrame.setAttribute("aria-label", "Complete the photo");
  }, 48 * pieces.filter((piece) => piece.dataset.heart === "true").length + 520);
}

function completePuzzle() {
  puzzleStage = "revealing-complete";
  puzzleAnimating = true;
  puzzleFrame.classList.remove("is-heart");
  puzzleFrame.classList.add("is-building");
  const runId = ++puzzleRevealRun;

  const pieces = [...puzzleFrame.querySelectorAll(".puzzle-piece")].filter((piece) => !piece.classList.contains("is-visible"));
  pieces
    .sort((a, b) => Number(a.dataset.order) - Number(b.dataset.order))
    .forEach((piece, index) => {
      setTimeout(() => {
        if (runId === puzzleRevealRun) {
          piece.classList.add("is-visible");
        }
      }, 36 * index);
    });

  setTimeout(() => {
    if (runId !== puzzleRevealRun) return;

    puzzleStage = "complete";
    puzzleAnimating = false;
    puzzleFrame.classList.remove("is-building");
    puzzleFrame.classList.add("is-complete");
    puzzleFrame.setAttribute("aria-label", "Photo revealed");
    memoryCaption?.classList.add("is-visible");
    createMemorySparks();
  }, 36 * pieces.length + 520);
}

function createMemorySparks() {
  const colors = ["#ff7b72", "#f8b84e", "#88d8b0", "#7bb7ff", "#d44f6a"];

  Array.from({ length: 22 }).forEach((_, index) => {
    const spark = document.createElement("span");
    const angle = (Math.PI * 2 * index) / 22;
    const distance = 80 + (index % 5) * 22;
    spark.className = "memory-spark";
    spark.style.setProperty("--spark-color", colors[index % colors.length]);
    spark.style.setProperty("--spark-x", `${Math.cos(angle) * distance}px`);
    spark.style.setProperty("--spark-y", `${Math.sin(angle) * distance}px`);
    puzzleFrame.appendChild(spark);
    setTimeout(() => spark.remove(), 950);
  });
}

function resetPuzzle() {
  puzzleStage = "hidden";
  puzzleAnimating = false;
  puzzleRevealRun += 1;
  puzzleFrame.classList.remove("is-building", "is-heart", "is-complete", "is-loading-photo");
  puzzleFrame.setAttribute("aria-label", "Reveal the photo heart");
  memoryCaption?.classList.remove("is-visible");
  puzzleFrame.querySelectorAll(".memory-spark").forEach((spark) => spark.remove());
  [...puzzleFrame.querySelectorAll(".puzzle-piece")].forEach((piece) => piece.classList.remove("is-visible"));
}

function resizeCanvas() {
  const pixelRatio = window.devicePixelRatio || 1;
  const width = scenes.stars.clientWidth;
  const bottomPadding = parseFloat(getComputedStyle(scenes.stars).paddingBottom);
  const height = Math.max(
    scenes.stars.clientHeight,
    restartButton.offsetTop + restartButton.offsetHeight + bottomPadding
  );
  starCanvas.width = Math.floor(width * pixelRatio);
  starCanvas.height = Math.floor(height * pixelRatio);
  starCanvas.style.width = `${width}px`;
  starCanvas.style.height = `${height}px`;

  const context = starCanvas.getContext("2d");
  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
}

function createStars() {
  const scatterPositions = [
    [0.06, 0.1],
    [0.32, 0.4],
    [0.6, 0.03],
    [0.96, 0.21],
    [0.02, 0.92],
    [0.41, 0.98],
    [0.72, 0.78],
    [0.99, 0.94],
  ];

  const sparkleStars = Array.from({ length: 90 }, () => ({
    x: Math.random() * scenes.stars.clientWidth,
    y: Math.random() * scenes.stars.scrollHeight,
    radius: Math.random() * 1.8 + 0.4,
    alpha: Math.random() * 0.75 + 0.2,
    phase: Math.random() * Math.PI * 2,
    interactive: false,
  }));

  const wishStars = wishes.map((_, index) => ({
    x: 0,
    y: 0,
    radius: 9,
    alpha: 1,
    phase: index,
    interactive: true,
    wishIndex: index,
    scatterX: Math.min(1, Math.max(0, scatterPositions[index][0] + (Math.random() - 0.5) * 0.02)),
    scatterY: Math.min(1, Math.max(0, scatterPositions[index][1] + (Math.random() - 0.5) * 0.04)),
  }));

  stars = [...sparkleStars, ...wishStars];
  positionWishStars();
}

function positionWishStars() {
  // Keep every tap target inside the layout space reserved for the stars.
  const inset = 28;
  const width = Math.max(0, wishStarField.clientWidth - inset * 2);
  const height = Math.max(0, wishStarField.clientHeight - inset * 2);

  stars.filter((star) => star.interactive).forEach((star) => {
    star.x = wishStarField.offsetLeft + inset + width * star.scatterX;
    star.y = wishStarField.offsetTop + inset + height * star.scatterY;
  });
}

function drawStarShape(context, x, y, outerRadius, innerRadius, points = 5) {
  context.beginPath();
  for (let i = 0; i < points * 2; i += 1) {
    const angle = Math.PI / points * i - Math.PI / 2;
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    context.lineTo(x + Math.cos(angle) * radius, y + Math.sin(angle) * radius);
  }
  context.closePath();
}

function drawStars(time = 0) {
  const context = starCanvas.getContext("2d");
  const width = scenes.stars.clientWidth;
  const height = starCanvas.clientHeight;
  context.clearRect(0, 0, width, height);

  const gradient = context.createLinearGradient(0, 0, 0, height);
  gradient.addColorStop(0, "#050611");
  gradient.addColorStop(0.58, "#10152b");
  gradient.addColorStop(1, "#1d1731");
  context.fillStyle = gradient;
  context.fillRect(0, 0, width, height);

  stars.forEach((star) => {
    const pulse = Math.sin(time / 650 + star.phase) * 0.26 + 0.74;
    if (star.interactive) {
      const found = discoveredWishes.has(star.wishIndex);
      context.save();
      context.shadowColor = found ? "#88d8b0" : "#ffd789";
      context.shadowBlur = found ? 16 : 28;
      context.fillStyle = found ? "rgba(136, 216, 176, 0.9)" : `rgba(255, 215, 137, ${0.82 + pulse * 0.18})`;
      drawStarShape(context, star.x, star.y, star.radius * (1 + pulse * 0.16), star.radius * 0.48);
      context.fill();
      context.restore();
    } else {
      context.fillStyle = `rgba(255, 255, 255, ${star.alpha * pulse})`;
      context.beginPath();
      context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      context.fill();
    }
  });

  starAnimationFrame = requestAnimationFrame(drawStars);
}

function startStarSky() {
  resizeCanvas();
  createStars();
  cancelAnimationFrame(starAnimationFrame);
  starAnimationFrame = requestAnimationFrame(drawStars);
}

function chooseWish(event) {
  if (scenes.stars.classList.contains("is-constellation-open")) return;

  const rect = starCanvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) * (starCanvas.clientWidth / rect.width);
  const y = (event.clientY - rect.top) * (starCanvas.clientHeight / rect.height);
  const selected = stars
    .filter((star) => star.interactive)
    .find((star) => Math.hypot(star.x - x, star.y - y) <= 28);

  if (!selected) return;

  discoveredWishes.add(selected.wishIndex);
  wishReference.textContent = wishes[selected.wishIndex].reference;
  wishText.textContent = wishes[selected.wishIndex].content;
  wishCount.textContent = `${discoveredWishes.size} / ${wishes.length} wishes found`;
  if (discoveredWishes.size === wishes.length) {
    wishReference.textContent = "Your birthday sky is complete";
    wishText.textContent = "Every wish is shining now. I saved one final surprise for you.";
    setMemoryButtonLocked(false);
  }
  setWishPanelMinimized(false);
  wishBox.animate(
    [
      { transform: "translateY(8px)", opacity: 0.7 },
      { transform: "translateY(0)", opacity: 1 },
    ],
    { duration: 260, easing: "ease-out" }
  );
}

function buildMemoryConstellation() {
  if (memoriesBuilt) return;

  memoryConstellation.innerHTML = "";

  Array.from({ length: 120 }).forEach((_, index) => {
    const galaxyStar = document.createElement("span");
    const bandBias = Math.random();
    const x = Math.random() * 100;
    const y = bandBias < 0.55
      ? 18 + Math.random() * 64
      : Math.random() * 100;
    const size = Math.random() < 0.16 ? 2.2 + Math.random() * 1.4 : 0.8 + Math.random() * 1.6;

    galaxyStar.className = "galaxy-dot";
    galaxyStar.style.setProperty("--galaxy-x", `${x}%`);
    galaxyStar.style.setProperty("--galaxy-y", `${y}%`);
    galaxyStar.style.setProperty("--galaxy-size", `${size}px`);
    galaxyStar.style.setProperty("--galaxy-alpha", `${0.18 + Math.random() * 0.66}`);
    galaxyStar.style.setProperty("--galaxy-blur", `${Math.random() < 0.22 ? 4 + Math.random() * 8 : 0}px`);
    galaxyStar.style.setProperty("--galaxy-delay", `${Math.random() * 3200}ms`);
    memoryConstellation.appendChild(galaxyStar);
  });

  memories.slice(0, -1).forEach((memory, index) => {
    const nextMemory = memories[index + 1];
    const deltaX = nextMemory.x - memory.x;
    const deltaY = nextMemory.y - memory.y;
    const length = Math.hypot(deltaX, deltaY);
    const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    const line = document.createElement("span");
    line.className = "memory-line";
    line.style.setProperty("--line-x", `${memory.x}%`);
    line.style.setProperty("--line-y", `${memory.y}%`);
    line.style.setProperty("--line-length", `${length}%`);
    line.style.setProperty("--line-angle", `${angle}deg`);
    line.style.setProperty("--line-delay", `${index * 70}ms`);
    memoryConstellation.appendChild(line);
  });

  memories.forEach((memory, index) => {
    const memoryStar = document.createElement("button");
    memoryStar.type = "button";
    memoryStar.className = "memory-star";
    memoryStar.style.setProperty("--memory-x", `${memory.x}%`);
    memoryStar.style.setProperty("--memory-y", `${memory.y}%`);
    memoryStar.style.setProperty("--memory-delay", `${180 + index * 75}ms`);
    memoryStar.setAttribute("aria-label", `Open ${memory.title}`);
    memoryStar.innerHTML = `
      <span class="memory-star-glow" aria-hidden="true"></span>
      <img src="${memory.image}" alt="">
    `;
    memoryStar.addEventListener("click", () => openMemory(index));
    memoryConstellation.appendChild(memoryStar);
  });

  memoriesBuilt = true;
}

function openMemoryConstellation() {
  if (discoveredWishes.size < wishes.length) return;

  buildMemoryConstellation();
  memoryConstellation.hidden = false;
  scenes.stars.classList.add("is-constellation-open");
  setWishPanelMinimized(true);
  restartButton.hidden = true;

  const firstMemory = memoryConstellation.querySelector(".memory-star");
  setTimeout(() => firstMemory?.focus(), 580);
}

function openMemory(index) {
  activeMemoryIndex = (index + memories.length) % memories.length;
  const memory = memories[activeMemoryIndex];

  memoryModalImage.src = memory.image;
  memoryModalImage.alt = memory.title;
  memoryModalKicker.textContent = `${activeMemoryIndex + 1} / ${memories.length}`;
  memoryModalTitle.textContent = memory.title;
  memoryModalCaption.textContent = memory.caption;
  memoryModal.hidden = false;
  nextMemoryButton.focus();
}

function closeMemoryModal() {
  if (!memoryModal) return;

  memoryModal.hidden = true;
}

function showAdjacentMemory(direction) {
  openMemory(activeMemoryIndex + direction);
}

startButton.addEventListener("click", () => {
  startBackgroundAudio();
  buildBalloons();
  setSpecialPrompt("first");
  showScene("balloon");
});

notYetButton.addEventListener("click", () => {
  if (specialPromptMode === "reflection") {
    showBlackoutThenAskAgain();
    return;
  }

  specialModal.hidden = true;
});

yesSpecialButton.addEventListener("click", () => {
  if (specialPromptMode === "reflection") {
    continueToPuzzle();
    return;
  }

  showBlackoutThenAskAgain();
});

puzzleFrame.addEventListener("click", revealPuzzle);
replayPuzzleButton.addEventListener("click", resetPuzzle);
toStarsButton.addEventListener("click", showStarsScene);
restartButton.addEventListener("click", () => {
  openMemoryConstellation();
});

starCanvas.addEventListener("click", chooseWish);
const starLayoutObserver = new ResizeObserver(() => {
  if (scenes.stars.classList.contains("is-active")) {
    resizeCanvas();
    positionWishStars();
  }
});
starLayoutObserver.observe(wishStarField);
starLayoutObserver.observe(wishBox);
window.addEventListener("resize", () => {
  if (scenes.stars.classList.contains("is-active")) {
    startStarSky();
  }
});

wishToggleButton.addEventListener("click", () => {
  setWishPanelMinimized(!wishBox.classList.contains("is-minimized"));
});

memoryCloseButton.addEventListener("click", closeMemoryModal);
prevMemoryButton.addEventListener("click", () => showAdjacentMemory(-1));
nextMemoryButton.addEventListener("click", () => showAdjacentMemory(1));
memoryModal.addEventListener("click", (event) => {
  if (event.target === memoryModal) {
    closeMemoryModal();
  }
});
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !memoryModal.hidden) {
    closeMemoryModal();
  }
});

buildPuzzle();
preloadPuzzlePhoto();
