const grid = document.querySelector("#grid");
const gridSize = 640;
grid.style.width = gridSize + "px";
grid.style.height = gridSize + "px";

const squares = [];
let size = 16;
const squareSize = Math.floor((gridSize / size));
const squareStartColour = "lightgrey";

for (let i = 0; i < size; i++) {
  const row = document.createElement("div");

  row.style.margin = 0;
  row.style.padding = 0;
  row.style.border = 0;
  row.style.display = "flex";

  for (let j = 0; j < size; j++) {
    const square = document.createElement("div");
    square.setAttribute("id", i * size + j)
  
    square.style.width = squareSize + "px";
    square.style.height = squareSize + "px";
    square.style.backgroundColor = squareStartColour;
    square.style.margin = 0;
    square.style.padding = 0;
    square.style.border = 0;
    square.style.border = "1px";
    square.style.borderStyle = "solid";
    square.style.borderColor = "transparent";
    square.style.backgroundClip = "padding-box";
    
    squares.push(square);
    row.appendChild(square);
  }

  grid.appendChild(row);
}


