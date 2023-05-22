const grid = document.querySelector("#grid");
const gridSize = 640;
// grid.style.width = gridSize + "px";
// grid.style.height = gridSize + "px";

let noSquaresDefault = 16;
let noSquares = noSquaresDefault;

const noSquaresRange = document.querySelector("#no-squares-range");
const noSquaresText = document.querySelector("#no-squares-text");
noSquaresRange.value = noSquaresDefault;
noSquaresText.textContent = noSquaresDefault + " × " + noSquaresDefault;

// const fillButton = document.querySelector("#fill");
// const shadingButton = document.querySelector("#shading");
// const rgbButton = document.querySelector("#rgb");
// const eraserButton = document.querySelector("#eraser");

const modeButtons = document.querySelectorAll(".mode");
modeButtons.forEach(button => button.addEventListener("click", toggleMode));

const gridlinesButton = document.querySelector("#gridlines")
const clearButton = document.querySelector("#clear");

const defaultMode = "fill";
const defaultModeButton = document.querySelector("#" + defaultMode);
defaultModeButton.classList.add("selected-button");
let currentMode = defaultMode;

let squares;
let squareSize;
const squareBorderSize = 1;
const squareStartColour = "white";
const squareEndColour = "black";
const gridLineColour = "lightgrey";
let gridlinesOn = true;

redrawGrid(noSquaresDefault);

noSquaresRange.addEventListener("input", noSquaresRangeChange);

gridlinesButton.addEventListener("click", toggleGridlines);
clearButton.addEventListener("click", clearGrid);

let mouseDown = false;
const body = document.querySelector("body");
body.addEventListener("mousedown", () => mouseDown = true);
body.addEventListener("mouseup", () => mouseDown = false);
body.addEventListener("dragstart", (e) => e.preventDefault());

function colourSquare(square) {
  square.style.backgroundColor = squareEndColour;
}

function clearSquare(square) {
  square.style.backgroundColor = squareStartColour;
}

function noSquaresRangeChange(e) {
  noSquares = e.target.value;

  noSquaresText.textContent = noSquares + " × " + noSquares;
  redrawGrid(noSquares);
}

function redrawGrid(noSquares) {
  squares = [];
  grid.replaceChildren();

  for (let i = 0; i < noSquares; i++) {
    const row = document.createElement("div");

    row.style.margin = 0;
    row.style.padding = 0;
    row.style.border = 0;
    row.style.display = "flex";
    row.style.justifyContent = "center";

    for (let j = 0; j < noSquares; j++) {
      const square = document.createElement("div");
      square.setAttribute("id", i * noSquares + j)
    
      square.style.backgroundColor = squareStartColour;
      square.style.margin = 0;
      square.style.padding = 0;
      square.style.backgroundClip = "padding-box";
      
      squares.push(square);
      row.appendChild(square);
    }

    grid.appendChild(row);
  }

  if (gridlinesOn) {
    turnOnGridlines();
  } else {
    turnOffGridlines();
  }

  turnOnFill();
}

function clearGrid(e) {
  squares.forEach(clearSquare);
}

function toggleGridlines(e) {
  e.target.classList.toggle("selected-button");

  if (gridlinesOn) {
    gridlinesOn = false;
    turnOffGridlines();
  } else {
    gridlinesOn = true;
    turnOnGridlines();
  }
}

function turnOnGridlines() {
  squares.forEach(square => {
    squareSize = Math.round(((gridSize - 2 * squareBorderSize * noSquares) / noSquares));
    square.style.border = squareBorderSize + "px";
    square.style.borderStyle = "solid";
    square.style.borderColor = gridLineColour;
    square.style.width = squareSize + "px";
    square.style.height = squareSize + "px";
  })
}

function turnOffGridlines() {
  squares.forEach(square => {
    squareSize = Math.round(gridSize / noSquares);
    square.style.border = 0;
    square.style.width = squareSize + "px";
    square.style.height = squareSize + "px";
  })
}

function turnOffAllModes() {
  // squares.forEach(square => square.replaceWith(square.cloneNode()));
  for (let i = 0; i < squares.length; i++) {
    const old_square = squares[i];
    const new_square = old_square.cloneNode();
    old_square.replaceWith(new_square);
    squares[i] = new_square;
  }
}

function turnOnFill() {
  squares.forEach(square => {
    square.addEventListener("mouseenter", (e) => {
      if (mouseDown) {
        colourSquare(e.target);
      }
    });
  }, {
    once: true
  });
}

function toggleMode(e) {
  if (currentMode === e.target.id) {
    return;
  }

  turnOffAllModes();
  currentMode = e.target.id;

  modeButtons.forEach(button => button.classList.remove("selected-button"));
  e.target.classList.add("selected-button");

  if (currentMode === "fill") {
    turnOnFill();
  } else if (currentMode === "shading") {

  } else if (currentMode === "rgb") {

  } else if (currentMode === "eraser") {

  }
}
