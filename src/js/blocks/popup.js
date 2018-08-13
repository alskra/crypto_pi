'use strict';

export default popup;

popup.init = function () {

};

popup.bindUIActions = function () {
  document.addEventListener('click', close);
};

popup.popupOpen = function (id) {
  let popupContent = document.querySelector(id).cloneNode(true);
  let newPopup = document.createElement('div');
  newPopup.classList.add('popup');
  newPopup.innerHTML = '<div class="popup__overlay"></div><div class="popup__container"></div>';
  newPopup.querySelector('.popup__container').appendChild(popupContent);
  document.body.appendChild(newPopup);
  setTimeout(function () {
    newPopup.classList.add('popup--inited');
  }, 10);
};

function popup() {
  popup.init();
  popup.bindUIActions();
}

function close(e) {
  if (event.target.closest('[data-toggle=popup-close]')) {
    let popupElement = event.target.closest('.popup');

    event.preventDefault();
    document.body.removeChild(popupElement);
  }
}