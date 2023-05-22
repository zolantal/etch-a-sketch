const grid = document.querySelector("#grid");
// const grid = document.getElementById("grid");
const gridSize = 640;
grid.style.width = gridSize + "px";
grid.style.height = gridSize + "px";

const squares = [];
let size = 16;

for (let i = 0; i < (size * size); i++) {
  const square = document.createElement("div");

  squares.push(square);
}


