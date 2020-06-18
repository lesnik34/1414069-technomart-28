var CLOSE_KEY = 'Escape';

var popupContactsSection = document.querySelector('.popup-contacts-section');
var contactsHelp = document.querySelector('.contacts-help');
var popupMapSection = document.querySelector('.popup-map-section');
var mapLink = document.querySelector('.map-link');
var closeForm = document.querySelector('.close-form');
var closeMap = document.querySelector('.close-map');
var popupForm = document.querySelector('.popup-form');
var popupAlert = document.querySelector('.popup-alert');
var closeAlert = document.querySelector('.close-alert');


var checkAndSetStorage = function (item, keyWord) {
  var storage = isStorageSupportAndGet(keyWord).result;
  storage ? item.value = isStorageSupportAndGet(keyWord).result : item.focus();
}

var setFromStorage = function () {
  var clientsMemory = document.querySelectorAll('.client-memory');
  clientsMemory.forEach(function (item, i, items) {
    var reverseItem = items[items.length - i - 1];
    var keyWord = reverseItem.dataset.clientInformation;
    isStorageSupportAndGet(keyWord).question ? checkAndSetStorage(reverseItem, keyWord) : reverseItem.focus();
  });
}

var isStorageSupportAndGet = function (keyWord) {
  var isSupport = true;
  var storage = '';
  try{
    storage = localStorage.getItem(keyWord);
  } catch (err) {
    isSupport = false;
  }
  return {question: isSupport, result: storage};
}

var checkFormAndStore = function (form) {
  form.addEventListener('submit', function (evt) {
    var clientsMemory = document.querySelectorAll('.client-memory');
    var index = 0;
    var isContinue = true;

    while (index < clientsMemory.length && isContinue) {
      var keyWord = clientsMemory[index].dataset.clientInformation;

      if (!clientsMemory[index].value) {
        evt.preventDefault();
        isContinue = false;
      } else {
        isStorageSupportAndGet(keyWord).question ? localStorage.setItem(keyWord, clientsMemory[index].value) : false;
      }
      index++;
    }
  })
}

var setOpenBuyLinks = function () {
  var buyLinks = document.querySelectorAll('.buy-link');
  buyLinks.forEach(function (element) {
    addPopupFunctionOpen(element, popupAlert);
  })
}

var addPopupFunctionOpen = function (button, popup) {
  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    popup.classList.add('popup-active');

    var popupForm = document.querySelector('.popup-form');
    if (popup.contains(popupForm)) {
      setFromStorage();
    }
 })
}

var addPopupFunctionClose = function (button, popup) {
  button.addEventListener('click', function (evt) {
    evt.preventDefault();
    popup.classList.remove('popup-active');
  })
}

var closeByKey = function (key) {
  window.addEventListener('keydown', function (evt) {
    if (evt.code === key) {
      var popupSection = document.querySelectorAll('.popup-section');
      popupSection.forEach(function (item) {
        if (item.classList.contains('popup-active')) {
          item.classList.remove('popup-active');
        }
      })
    }
  })
}

var activeAndDisable = function (presentItem, nextItem, subItemPresent, subItemNext) {
  var arrowLeft = document.querySelector('.product-arrow-left');
  var arrowRight = document.querySelector('.product-arrow-right');
  var dotLeft = document.querySelector('.product-dot-left');
  var dotRight = document.querySelector('.product-dot-right');


  var isItLeftArrow = presentItem.classList.contains('product-arrow-left');
  var isItRightArrow = presentItem.classList.contains('product-arrow-right');
  if (isItLeftArrow || isItRightArrow) {
    presentItem.disabled = true;
    nextItem.disabled = false;
    subItemPresent.classList.remove('product-dot-active');
    subItemNext.classList.add('product-dot-active');
  } else {
    presentItem.classList.remove('product-dot-active');
    nextItem.classList.add('product-dot-active');
    subItemNext.disabled = false;
    subItemPresent.disabled = true;
  }
}

var controlsListener = function (presentItem, nextItem, subItemPresent, subItemNext) {
  var sliderItems = document.querySelectorAll('.product-slider-item');
  var sliderList = document.querySelector('.product-slider-list');
  var activeSlide = sliderList.querySelector('.slide-active');
  var slideIndex = activeSlide.dataset.productNumber * 1;
  var isRightDot = presentItem.classList.contains('product-dot-right');
  var isLeftArrow = presentItem.classList.contains('product-arrow-left');
  var term;

  activeSlide.classList.remove('slide-active');
  isRightDot || isLeftArrow  ? term = -1 : term = 1;
  sliderItems[slideIndex + term].classList.add('slide-active');

  activeAndDisable(presentItem, nextItem, subItemPresent, subItemNext)
}

var sliderProduct = function () {
  var arrowLeft = document.querySelector('.product-arrow-left');
  var arrowRight = document.querySelector('.product-arrow-right');
  var dotLeft = document.querySelector('.product-dot-left');
  var dotRight = document.querySelector('.product-dot-right');

  arrowLeft.addEventListener('click',function (evt) {
    evt.preventDefault();
    controlsListener(arrowLeft, arrowRight, dotRight, dotLeft);
  })
  arrowRight.addEventListener('click',function (evt) {
    evt.preventDefault();
    controlsListener(arrowRight, arrowLeft, dotLeft, dotRight);
  })

  dotLeft.addEventListener('click',function (evt) {
    evt.preventDefault();
    controlsListener(dotRight, dotLeft, arrowLeft, arrowRight);
  })
  dotRight.addEventListener('click',function (evt) {
    evt.preventDefault();
    controlsListener(dotLeft, dotRight, arrowRight, arrowLeft);
  })
}

var sliderServices = function () {
  var servicesControls = document.querySelectorAll('.services-control');
  var servicesItems = document.querySelectorAll('.services-item');
  var servicesList = document.querySelector('.services-list');

  servicesControls.forEach(function (item, index) {
    item.addEventListener('click', function () {
      var activeButton = document.querySelector('.services-control-active');
      activeButton.classList.remove('services-control-active');
      item.classList.add('services-control-active');

      var activeSlide = servicesList.querySelector('.slide-active');
      activeSlide.classList.remove('slide-active');
      var serviceName = item.dataset.serviceName;
      var expectedSlide = document.querySelector('.services-' + serviceName);
      expectedSlide.classList.add('slide-active');
    })
  })
}

addPopupFunctionOpen(contactsHelp, popupContactsSection);
addPopupFunctionClose(closeForm, popupContactsSection);
addPopupFunctionOpen(mapLink, popupMapSection);
addPopupFunctionClose(closeMap, popupMapSection);
setOpenBuyLinks();
addPopupFunctionClose(closeAlert, popupAlert);
checkFormAndStore(popupForm);
closeByKey(CLOSE_KEY);
sliderProduct();
sliderServices();
