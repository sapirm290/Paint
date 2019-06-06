const canvas = document.getElementById("canvas");
var currentColor = "silver";
var currentSize = 10;
var isDrawing = false;
function changeColor(eventObject) {
  currentColor = lastWord(eventObject.target.className);
  canvas.style.border = `5px solid ${currentColor}`;
}
function lastWord(words) {
  var n = words.split(" ");
  return n[n.length - 1];
}
var colorChoices = document.getElementsByClassName("color-choice");
for (let index = 0; index < colorChoices.length; index++) {
  colorChoices[index].addEventListener("click", changeColor);
}
function drawPoint(x, y) {
  canvas.innerHTML += `<span class='dot' style='left:${x -
    currentSize / 2}px;top:${y -
    currentSize /
      2}px; width:${currentSize}px; height:${currentSize}px; background-color:${currentColor}'></span>`;
}
function startPainting(eventObject) {
  canvas.addEventListener("mousemove", keepPainting);
  var x = eventObject.layerX;
  var y = eventObject.layerY;
  drawPoint(x, y);
}
function keepPainting(eventObject) {
  var x = eventObject.layerX;
  var y = eventObject.layerY;
  drawPoint(x, y);
}
function stopPainting(eventObject) {
  canvas.removeEventListener("mousemove", keepPainting);
}
canvas.addEventListener("mousedown", startPainting);
document.body.addEventListener("mouseup", stopPainting);
document.getElementById("clear").addEventListener("click", () => {
  $("#canvas").empty();
});

function enLargeText() {
  if (currentSize < 10) currentSize++;
}
function reduceText() {
  if (currentSize > 2) currentSize--;
}
$("#Plus").click(enLargeText);
$("#Minus").click(reduceText);

function update(jscolor) {
  currentColor = "#" + jscolor;
}

function updateCanvasWidth() {
  var ratio =  $(this).val()/parseInt($(".row").css("width"))  ;
  var val = $(this).val();
  if (val < 100) $(".row").css("width", `100px`);
  else if (val > 1500) $(".row").css("width", `1500px`);
  else if (!isNaN(val)) $(".row").css("width", `${val}px`);
}
function updateCanvasHeight() {
  var val = $(this).val();
  if (val < 100) $("#canvas").css("height", `100px`);
  else if (val > 1500) $("#canvas").css("height", `1500px`);
  else if (!isNaN(val)) $("#canvas").css("height", `${val}px`);
}
$("#canvasWidth").on("change", updateCanvasWidth);
$("#canvasHeight").on("change", updateCanvasHeight);
