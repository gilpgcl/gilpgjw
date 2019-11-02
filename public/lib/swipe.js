let xDown = null;
let yDown = null;
document.addEventListener('touchstart', evt => {
  const toquInicial = evt.touches[0];
  xDown = toquInicial.clientX;
  yDown = toquInicial.clientY;
});
document.addEventListener('touchmove', evt => {
  if (xDown && yDown) {
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    // Checa que el movimiento no sea muy corto,
    if (Math.abs(xDiff) + Math.abs(yDiff) > 150) {
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 70) {
          dispatchEvent(new Event("swipeizquierdo"));
        } else {
          dispatchEvent(new Event("swipederecho"));
        }
      } else if (yDiff > 70) {
        dispatchEvent(new Event("swipearriba"));
      } else {
        dispatchEvent(new Event("swipeabajo"));
      }
      /* reset values */
      xDown = null;
      yDown = null;
    }
  }
});
