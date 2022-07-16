function onDragStart(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function onDragOver(event) {
  event.preventDefault();
}
function onDrop(event) {
  const id = event.dataTransfer.getData("text"),
    draggableElement = document.getElementById(id);
  dropzone = event.target;
  dropzone.appendChild(draggableElement);

  event.dataTransfer.clearData();
}
