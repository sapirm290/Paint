"use strict";
const canvas = document.getElementById("canvas");
const colorChoices = document.getElementsByClassName("color-choice");
var canvasWidth = $("#canvasWidth").val();
var canvasHeight = $("#canvasHeight").val();
var brushColor = "#DFC1D4";
var brushSize = 4;
var zindex = 0;

function changeColor(eventObject) {
  endEraserMode();
  brushColor = $(this).css("background-color");
  $("#header").css("background-color", brushColor);
  $("#canvas").css("border", `8px solid ${brushColor}`);
}
$(".color-choice").click(changeColor);

function drawPoint(x, y) {
  if (x > 3 && y > 3 && x < canvasWidth - 3 && y < canvasHeight - 3) {
    canvas.innerHTML += `<span class='dot' style='left:${x -8  -
      brushSize / 2}px;top:${y - 6 -
      brushSize /
        2}px; width:${brushSize}px; height:${brushSize}px; background-color:${brushColor}';z-index:${zindex}></span>`;
    zindex--;
  }
}
function startPainting(eventObject) {
  drawPoint(eventObject.layerX, eventObject.layerY);
  canvas.addEventListener("mousemove", keepPainting);
  document.addEventListener("mouseup", stopPainting);
}
function keepPainting(eventObject) {
  drawPoint(eventObject.layerX, eventObject.layerY);
}
function stopPainting(eventObject) {
  canvas.removeEventListener("mousemove", keepPainting);
}
canvas.addEventListener("mousedown", startPainting);

document.getElementById("clear").addEventListener("click", () => {
  $("#canvas").empty();
});

function enLargeText() {
  if (brushSize < 10) brushSize++;
}
function reduceText() {
  if (brushSize > 2) brushSize--;
}
$("#Plus").click(enLargeText);
$("#Minus").click(reduceText);

function update(jscolor) {
  brushColor = "#" + jscolor;
  $("#header").css("background-color", brushColor);
  $("#canvas").css("border", `8px solid ${brushColor}`);
}

function updateCanvasWidth() {
  var oldWidth =  canvasWidth;
  var val = $(this).val();
  if (val < 200) canvasWidth = 200;
  else if (val > 1500) canvasWidth = 1500;
  else if (!isNaN(val)) canvasWidth = val;
  var ratio = canvasWidth/oldWidth;
  function adjustWidth(){
    $(this).css("left",parseInt($(this).css("left"))*ratio);
  }
  $("#canvas span").each(adjustWidth);
  $("#canvas").css("width", `${canvasWidth}`);
  $(this).val(canvasWidth);
}
function updateCanvasHeight() {
  var oldHeight =  canvasHeight;

  var val = $(this).val();
  if (val < 100) canvasHeight = 100;
  else if (val > 800) canvasHeight = 800;
  else if (!isNaN(val)) canvasHeight = val;
  var ratio = canvasHeight/oldHeight;
  function adjustHeight(){
    $(this).css("top",parseInt($(this).css("top"))*ratio);
  }
  $("#canvas span").each(adjustHeight);
  $("#canvas").css("height", `${canvasHeight}`);
  $(this).val(canvasHeight);
}
$("#canvasWidth").on("change", updateCanvasWidth);
$("#canvasHeight").on("change", updateCanvasHeight);
function eraseDot(eventObject) {
  $(this).remove();
}
function startErasing() {
  $("#canvas span").on("mousemove", eraseDot);
  $(document).on("mouseup", stopErasing);
}
function stopErasing() {
  $("#canvas span").off("mousemove", eraseDot);
  $(document).off("mouseup", stopErasing);
}
function endEraserMode() {
  canvas.addEventListener("mousedown", startPainting);
  $("#canvas").off("mousedown", startErasing);
  $(this).addClass("pressed");
  $("#eraser").removeClass("pressed");
}
function startEraserMode() {
  canvas.removeEventListener("mousedown", startPainting);
  $("#canvas span").on("mousedown", eraseDot);
  $("#canvas").on("mousedown", startErasing);
  $(this).addClass("pressed");
  $("#pen").removeClass("pressed");
}
$("#eraser").on("click", startEraserMode);
$("#pen").on("click", endEraserMode);

$("#canvasWidth").trigger("change");
$("#canvasHeight").trigger("change");
