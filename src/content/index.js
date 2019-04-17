console.log('content-script!');

const popupDOM = document.createElement('div');

popupDOM.setAttribute('class', 'popup');
document.body.appendChild(popupDOM);

// Lets listen to mouseup DOM events.
document.addEventListener('mouseup', function (e) {
  const selection = window.getSelection().toString();
  console.log(selection, 'selection');
  console.log(e.pageX, e.pageY, e.clientX, e.clientY);

  if (selection.length > 0) {
    renderPopup(e.pageX, e.pageY, selection);
  } else {
    popupDOM.style.visibility = 'hidden';
  }
}, false);


// Close the bubble when we click on the screen.
// document.addEventListener('mousedown', function (e) {
// popupDOM.style.visibility = 'hidden';
// }, false);

// Move that bubble to the appropriate location.
function renderPopup(mouseX, mouseY, selection) {
  popupDOM.innerHTML = selection;
  popupDOM.style.position = 'absolute';
  popupDOM.style.fontFamily = 'Proxima Nova, sans-serif';
  popupDOM.style.top = mouseY + 'px';
  popupDOM.style.left = mouseX + 'px';
  popupDOM.style.visibility = 'visible';
  popupDOM.style.minHeight = '200px';
  popupDOM.style.width = '400px';
  popupDOM.style.background = '#fff';
  popupDOM.style.color = '#3C4858';
  popupDOM.style.zIndex = '100000';
  popupDOM.style.borderRadius = '2px';
  popupDOM.style.boxShadow = '10px 11px 28px -18px rgba(0,0,0,0.55)';
}
