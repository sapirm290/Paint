const canvas = document.getElementById("canvas");
const colorChoices = document.getElementsByClassName("color-choice");
var currentColor = "#DFC1D4";
var currentSize = 4;
var zindex = 0;

function changeColor(eventObject) {
  currentColor = $(this).css("background-color");
  $("#header").css("background-color", currentColor);
  $("#canvas").css("border", `8px solid ${currentColor}`);
}
$(".color-choice").click(changeColor);

function drawPoint(x, y) {
  canvas.innerHTML += `<span class='dot' style='left:${x -
    currentSize / 2}px;top:${y -
    currentSize /
      2}px; width:${currentSize}px; height:${currentSize}px; background-color:${currentColor}';z-index:${zindex}></span>`;
  zindex--;
}
function startPainting(eventObject) {
  canvas.addEventListener("mousemove", keepPainting);
  drawPoint(eventObject.layerX, eventObject.layerY);
}
function keepPainting(eventObject) {
  drawPoint(eventObject.layerX, eventObject.layerY);
}
function stopPainting(eventObject) {
  canvas.removeEventListener("mousemove", keepPainting);
}
canvas.addEventListener("mousedown", startPainting);
document.addEventListener("mouseup", stopPainting);
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
  $("#header").css("background-color", currentColor);
  $("#canvas").css("border", `8px solid ${currentColor}`);
}

function updateCanvasWidth() {
  var ratio = $(this).val() / parseInt($(".row").css("width"));
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
function eraseDot(eventObject) {
  $(this).remove();
}
function startErasing() {
  $("#canvas span").on("mousemove", keepErasing);
}
function keepErasing() {}
function stopErasing() {
  $("#canvas span").off("mousemove", keepErasing);
}
function endEraserMode() {
  canvas.addEventListener("mousedown", startPainting);
  $("#canvas span").off("mousedown", startErasing);
}
function startEraserMode() {
  console.log("started erasing");
  canvas.removeEventListener("mousedown", startPainting);
  $("#canvas span").on("mousedown", startErasing);
  $("#canvas span").on("mousemove", stopErasing);
}
$("#eraser").on("click", startEraserMode);
$("#pen").on("click", endEraserMode);
