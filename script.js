const grid = document.querySelector("#grid");
const gridSize = 640;

let noSquaresDefault = 16;

const noSquaresRange = document.querySelector("#no-squares-range");
const noSquaresText = document.querySelector("#no-squares-text");
noSquaresRange.value = noSquaresDefault;
noSquaresText.textContent = noSquaresDefault + " × " + noSquaresDefault;

const fillModeButton = document.querySelector("#fill-mode");
const gradientModeButton = document.querySelector("#gradient-mode");
const rgbModeButton = document.querySelector("#rgb-mode");
const clearButton = document.querySelector("#clear");

fillModeButton.style.backgroundColor = "grey";
fillModeButton.style.color = "white";

let squares;
const squareBorderSize = 1;
const squareStartColour = "lightgrey";
const squareEndColour = "black";

redrawGrid(noSquaresDefault);

noSquaresRange.addEventListener("input", noSquaresRangeChange);

clearButton.addEventListener("click", clearGrid);

let mouseDown = false;
const body = document.querySelector("body");
body.addEventListener("mousedown", () => mouseDown = true);
body.addEventListener("mouseup", () => mouseDown = false);
body.addEventListener("dragstart", (e) => e.preventDefault());

function colorSquare(e) {
  if(mouseDown) {
    e.target.style.backgroundColor = squareEndColour;
  }

  // e.target.style.backgroundColor = squareEndColour;
}

function clearSquare(square) {
  square.style.backgroundColor = squareStartColour;
}

function noSquaresRangeChange(e) {
  let noSquares = e.target.value;

  noSquaresText.textContent = noSquares + " × " + noSquares;
  redrawGrid(noSquares);
}

function redrawGrid(noSquares) {
  squares = [];
  grid.replaceChildren();

  const squareSize = Math.floor(((gridSize - 2 * squareBorderSize * noSquares) / noSquares));

  for (let i = 0; i < noSquares; i++) {
    const row = document.createElement("div");

    row.style.margin = 0;
    row.style.padding = 0;
    row.style.border = 0;
    row.style.display = "flex";

    for (let j = 0; j < noSquares; j++) {
      const square = document.createElement("div");
      square.setAttribute("id", i * noSquares + j)
    
      square.style.width = squareSize + "px";
      square.style.height = squareSize + "px";
      square.style.backgroundColor = squareStartColour;
      square.style.margin = 0;
      square.style.padding = 0;
      square.style.border = squareBorderSize + "px";
      square.style.borderStyle = "solid";
      square.style.borderColor = "transparent";
      square.style.backgroundClip = "padding-box";
      
      squares.push(square);
      row.appendChild(square);
    }

    grid.appendChild(row);
  }

  squares.forEach(square => {
    square.addEventListener("mouseenter", colorSquare);
  }, {
    once: true
  });
}

function clearGrid(e) {
  squares.forEach(clearSquare);
}
