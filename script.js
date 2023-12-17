let isPainting = false;
const pincel = document.getElementById("brush");
let selectedColor = "white";

function startPainting() {
  isPainting = true;
  pincel.textContent = "🖌️ ENABLED";
}

function stopPainting() {
  isPainting = false;
  pincel.textContent = "🖌️ DISABLED";
}

function paint(event) {
  if (isPainting) {
    event.target.style.backgroundColor = selectedColor;
  }
}


document.addEventListener("DOMContentLoaded", function () {
  let inputColor = document.querySelector(".color9");
  inputColor.addEventListener("change", function () {
    selectedColor = this.value;
    resetColorSelection();
    this.classList.add("selected");
  });
  const cellNumber = 90;
  const board = document.getElementById("drawingArea");
  const boardTable = document.createElement("table");
  boardTable.className = "drawingBoard";
  board.appendChild(boardTable);
  for (var i = 0; i < cellNumber; i++) {
    const row = document.createElement("tr");
    boardTable.appendChild(row);
    for (var j = 0; j < cellNumber; j++) {
      const cell = document.createElement("td");
      cell.className = "cell";
      cell.addEventListener("mousemove", paint);
      cell.addEventListener("mousedown", startPainting);
      cell.addEventListener("mouseup", stopPainting);
      row.appendChild(cell);
    }
  }
});

function selectColorHandler(selectedIndex) {
  return function () {
    selectedColor = getComputedStyle(this).backgroundColor;
    resetColorSelection();
    this.classList.add("selected");
  };
}

for (let i = 1; i <= 9; i++) {
  const colorElement = document.querySelector(`.color${i}`);
  colorElement.addEventListener("click", selectColorHandler(i));
}

function resetColorSelection() {
  for (let i = 1; i <= 9; i++) {
    const colorElement = document.querySelector(`.color${i}`);
    colorElement.classList.remove("selected");
  }
}

document.querySelector("#cleanButton").addEventListener("click", () => {
  window.location.reload();
});

document.body.addEventListener("dragstart", function (event) {
  event.preventDefault();
});
