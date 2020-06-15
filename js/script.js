var popupContactsSection = document.querySelector('.popup-contacts-section');
var contactsHelp = document.querySelector('.contacts-help');
var popupMapSection = document.querySelector('.popup-map-section');
var mapLink = document.querySelector('.map-link');
var closeForm = document.querySelector('.close-form');
var closeMap = document.querySelector('.close-map');

var buyLinks = document.querySelectorAll('.buy-link');
var popupAlert = document.querySelector('.popup-alert');
var closeAlert = document.querySelector('.close-alert');

var addPopupFunctionOpen = function (button, popup) {
  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    popup.classList.add('popup-active');
 })
}

var addPopupFunctionClose = function (button, popup) {
  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    popup.classList.remove('popup-active');
  })
}

addPopupFunctionOpen(contactsHelp, popupContactsSection);
addPopupFunctionClose(closeForm, popupContactsSection);
addPopupFunctionOpen(mapLink, popupMapSection);
addPopupFunctionClose(closeMap, popupMapSection);

buyLinks.forEach(function (element) {
  addPopupFunctionOpen(element, popupAlert);
})
addPopupFunctionClose(closeAlert, popupAlert);
